import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

/**
 *  locale을 신경 쓰지 않고 편하게 링크를 쓸 수 있게 해주는 편의 도구
 * /${locale}/dashboard -> /dashboard
 */
export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);
