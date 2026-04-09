"use client";

import { usePathname } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { useLocale } from "next-intl";

/**
 * 언어 전환 UI
 */
export function LocaleSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();

  const pathWithoutLocale = pathname.replace(/^\/(ko|en)/, "") || "/";

  return (
    <div className="flex items-center gap-1 text-sm">
      <Link
        href={pathWithoutLocale}
        locale="ko"
        className={`px-2 py-0.5 rounded transition ${
          locale === "ko"
            ? "font-semibold text-zinc-900 dark:text-zinc-50"
            : "text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300"
        }`}
      >
        KO
      </Link>
      <span className="text-zinc-300 dark:text-zinc-700">|</span>
      <Link
        href={pathWithoutLocale}
        locale="en"
        className={`px-2 py-0.5 rounded transition ${
          locale === "en"
            ? "font-semibold text-zinc-900 dark:text-zinc-50"
            : "text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300"
        }`}
      >
        EN
      </Link>
    </div>
  );
}
