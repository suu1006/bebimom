import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  reactCompiler: true,
  // turbopack 설정 제거 - Next.js가 자동으로 감지하도록 함
  // 이를 통해 불필요한 파일 감시를 줄이고 CPU 사용률을 낮춤
};

export default withNextIntl(nextConfig);
