import { getRequestConfig } from "next-intl/server";

/**
 * 번역 파일 로더
 */
export default getRequestConfig(async ({ requestLocale }) => {
  const locale = (await requestLocale) ?? "ko";
  return {
    locale,
    messages: (await import(`../../message/${locale}.json`)).default,
  };
});
