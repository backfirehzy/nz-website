import { apiVersion, dataset, projectId } from '@/sanity/env';
import { createClient } from 'next-sanity';
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// 联系表单：Turnstile 校验 → Resend 邮件通知 → Sanity 留存（contactSubmission）
// 三个环节各自独立降级：未配置对应环境变量时跳过并记录警告。

async function verifyTurnstile(token: string | null): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    console.warn('[contact] TURNSTILE_SECRET_KEY 未配置，跳过校验（仅限开发环境）');
    return true;
  }
  if (!token) return false;

  const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ secret, response: token }),
  });
  const result = (await response.json()) as { success: boolean };
  return result.success;
}

async function sendNotificationEmail(fields: {
  name: string;
  email: string;
  phone: string;
  message: string;
  attachment: File | null;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_EMAIL_TO;
  if (!apiKey || !to) {
    // 邮件未配置不视为失败：询盘仍会留存到 Sanity，客户可在后台查看
    console.warn('[contact] Resend 未配置，跳过邮件通知（询盘仍会留存到 Sanity）');
    return;
  }

  const resend = new Resend(apiKey);
  const attachments = fields.attachment
    ? [
        {
          filename: fields.attachment.name,
          content: Buffer.from(await fields.attachment.arrayBuffer()),
        },
      ]
    : [];

  await resend.emails.send({
    from: process.env.CONTACT_EMAIL_FROM ?? 'Website <onboarding@resend.dev>',
    to,
    replyTo: fields.email,
    subject: `New enquiry from ${fields.name}`,
    text: `Name: ${fields.name}\nEmail: ${fields.email}\nPhone: ${fields.phone}\n\n${fields.message}`,
    attachments,
  });
}

async function saveToSanity(fields: {
  name: string;
  email: string;
  phone: string;
  message: string;
  locale: string;
  attachment: File | null;
}) {
  const token = process.env.SANITY_API_TOKEN;
  if (!token || projectId === 'placeholder') {
    console.warn('[contact] Sanity 未配置，跳过询盘留存');
    return;
  }

  const client = createClient({ projectId, dataset, apiVersion, token, useCdn: false });

  let attachmentRef;
  if (fields.attachment) {
    const asset = await client.assets.upload(
      'file',
      Buffer.from(await fields.attachment.arrayBuffer()),
      { filename: fields.attachment.name },
    );
    attachmentRef = { _type: 'file', asset: { _type: 'reference', _ref: asset._id } };
  }

  await client.create({
    _type: 'contactSubmission',
    name: fields.name,
    email: fields.email,
    phone: fields.phone,
    message: fields.message,
    locale: fields.locale,
    submittedAt: new Date().toISOString(),
    ...(attachmentRef ? { attachment: attachmentRef } : {}),
  });
}

export async function POST(request: Request) {
  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: 'Invalid form data' }, { status: 400 });
  }

  try {
    const name = String(formData.get('name') ?? '').trim();
    const email = String(formData.get('email') ?? '').trim();
    const phone = String(formData.get('phone') ?? '').trim();
    const message = String(formData.get('message') ?? '').trim();
    const locale = String(formData.get('locale') ?? 'en');
    const rawAttachment = formData.get('attachment');
    const attachment = rawAttachment instanceof File && rawAttachment.size > 0 ? rawAttachment : null;

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const turnstileOk = await verifyTurnstile(
      formData.get('cf-turnstile-response') as string | null,
    );
    if (!turnstileOk) {
      return NextResponse.json({ error: 'Turnstile verification failed' }, { status: 403 });
    }

    const fields = { name, email, phone, message, locale, attachment };
    const [emailResult, sanityResult] = await Promise.allSettled([
      sendNotificationEmail(fields),
      saveToSanity(fields),
    ]);
    // 任一环节失败不阻断用户，但必须在服务端日志中可见
    if (emailResult.status === 'rejected') {
      console.error('[contact] 邮件发送失败:', emailResult.reason);
    }
    if (sanityResult.status === 'rejected') {
      console.error('[contact] Sanity 留存失败:', sanityResult.reason);
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('[contact] 提交处理失败', error);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
