import type { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/dictionaries';
import { CurrentYear } from '@/components/current-year';

export function SiteFooter({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <footer className="mt-16 border-t border-neutral-200">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6 text-sm text-neutral-500">
        <span>© <CurrentYear /> Studio Name. {dict.footer.rights}</span>
        <span>{locale === 'zh' ? '新西兰' : 'New Zealand'}</span>
      </div>
    </footer>
  );
}
