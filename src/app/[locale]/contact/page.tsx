import { isLocale, type Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionaries';
import { ContactForm } from '@/components/contact-form';
import { notFound } from 'next/navigation';

export default async function ContactPage({ params }: PageProps<'/[locale]/contact'>) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale as Locale);

  return (
    <section className="mx-auto max-w-xl space-y-8">
      <h1 className="text-3xl font-bold">{dict.contact.title}</h1>
      <ContactForm
        locale={locale as Locale}
        dict={dict.contact}
        turnstileSiteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
      />
    </section>
  );
}
