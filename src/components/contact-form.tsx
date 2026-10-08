'use client';

import type { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/dictionaries';
import Script from 'next/script';
import { useState } from 'react';

interface ContactFormProps {
  locale: Locale;
  dict: Dictionary['contact'];
  turnstileSiteKey?: string;
}

export function ContactForm({ locale, dict, turnstileSiteKey }: ContactFormProps) {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus('submitting');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        body: new FormData(form),
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      setStatus('success');
      form.reset();
    } catch {
      setStatus('error');
    }
  }

  const inputClass =
    'w-full rounded border border-neutral-300 px-3 py-2 text-sm focus:border-neutral-500 focus:outline-none';

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input type="hidden" name="locale" value={locale} />

      <div>
        <label className="mb-1 block text-sm font-medium">{dict.name} *</label>
        <input name="name" required className={inputClass} />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium">{dict.email} *</label>
        <input name="email" type="email" required className={inputClass} />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium">{dict.phone}</label>
        <input name="phone" type="tel" className={inputClass} />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium">{dict.message} *</label>
        <textarea name="message" required rows={5} className={inputClass} />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium">{dict.attachment}</label>
        <input name="attachment" type="file" className="w-full text-sm" />
      </div>

      {turnstileSiteKey ? (
        <>
          <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="afterInteractive" />
          <div className="cf-turnstile" data-sitekey={turnstileSiteKey} />
        </>
      ) : (
        <p className="text-xs text-neutral-400">
          Turnstile 未配置（NEXT_PUBLIC_TURNSTILE_SITE_KEY），开发模式下跳过人机校验。
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="rounded bg-neutral-900 px-6 py-2 text-sm text-white hover:bg-neutral-700 disabled:opacity-50"
      >
        {dict.submit}
      </button>

      {status === 'success' && <p className="text-sm text-green-600">{dict.success}</p>}
      {status === 'error' && <p className="text-sm text-red-600">{dict.error}</p>}
    </form>
  );
}
