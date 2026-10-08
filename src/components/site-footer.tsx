import type { Dictionary } from '@/i18n/dictionaries';
import { CurrentYear } from '@/components/current-year';

export function SiteFooter({
  dict,
  siteName,
  footerText,
}: {
  dict: Dictionary;
  siteName: string;
  footerText: string;
}) {
  return (
    <footer className="mt-16 border-t border-neutral-200">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6 text-sm text-neutral-500">
        <span>
          © <CurrentYear /> {siteName}. {dict.footer.rights}
        </span>
        <span>{footerText}</span>
      </div>
    </footer>
  );
}
