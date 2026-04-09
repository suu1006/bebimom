# 베이비케어 AI — 프론트엔드

영아 육아를 도와주는 AI 기반 베이비케어 앱의 프론트엔드입니다.  
수유·수면·기저귀 기록, K-DST 발달 선별 검사, AI 육아 상담 기능을 제공합니다.

---

## 주요 기능

| 탭 | 설명 |
|---|---|
| **홈** | 오늘의 수유·수면·기저귀 요약, 최근 활동 타임라인, AI 인사이트 |
| **리포트** | 주간 통계 분석, AI 건강 리포트, K-DST 발달 선별 검사 (30문항) |
| **AI 상담** | 베이비케어 AI 챗봇 — 수유량·수면·예방접종 등 육아 질문 응답 |
| **설정** | 아기 정보, 알림 설정, 계정 관리 |

**기록 바텀시트**: 수유 (분유/모유/이유식), 수면 (낮잠/밤잠), 기저귀 (소변/대변), 유축량을 빠르게 입력

---

## 사용 기술

| 분류 | 기술 |
|---|---|
| 프레임워크 | [Next.js](https://nextjs.org) 16 (App Router) |
| UI 언어 | React 19 + TypeScript 5 |
| 스타일링 | Tailwind CSS v4 (PostCSS 플러그인 방식) |
| 국제화 (i18n) | [next-intl](https://next-intl-docs.vercel.app) v4 — 한국어(ko) / 영어(en) |
| 인증 | JWT Access Token (메모리) + Refresh Token (httpOnly 쿠키) |
| React 최적화 | React Compiler (`babel-plugin-react-compiler`) |
| 코드 품질 | ESLint 9 (Next.js Core Web Vitals + TypeScript 규칙) |

---

## 디렉터리 구조

```
frontend/
├── message/                # i18n 번역 파일
│   ├── ko.json
│   └── en.json
├── middleware.ts           # 인증 가드 + locale 라우팅
└── src/
    ├── app/
    │   ├── layout.tsx          # 루트 레이아웃
    │   └── [locale]/           # locale 기반 라우팅
    │       ├── layout.tsx      # HTML 래퍼 (IntlProvider + AuthProvider)
    │       ├── page.tsx        # / → /dashboard 리다이렉트
    │       ├── dashboard/      # 메인 대시보드
    │       ├── login/          # 로그인 페이지
    │       └── signup/         # 회원가입 페이지
    ├── auth/               # 인증 관련 공통 컴포넌트
    ├── components/         # 공통 컴포넌트 (LocaleSwitcher 등)
    ├── contexts/
    │   └── AuthContext.tsx # 전역 인증 상태 관리
    ├── i18n/               # next-intl 설정
    └── lib/
        └── api.ts          # API 클라이언트 (자동 토큰 갱신 포함)
```

---

## 환경 변수 설정

프로젝트 루트에 `.env.local` 파일을 생성하고 아래 변수를 설정하세요.

```bash
# 백엔드 API 서버 주소
NEXT_PUBLIC_API_URL=http://localhost:8000
```

---

## 실행 방법

### 사전 요구사항

- Node.js 18 이상
- npm / yarn / pnpm / bun 중 하나

### 개발 서버 실행

```bash
npm install
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열면 앱이 실행됩니다.  
접속 시 기본 locale인 `/ko`로 자동 리다이렉트됩니다.

### 빌드 및 프로덕션 실행

```bash
npm run build
npm run start
```

### 린트 검사

```bash
npm run lint
```

---

## 인증 흐름

1. 로그인 성공 시 서버가 **Access Token**(JSON 응답)과 **Refresh Token**(httpOnly 쿠키)을 발급합니다.
2. Access Token은 메모리(`AuthContext`)에만 저장되며, 페이지 새로고침 시 쿠키의 Refresh Token으로 자동 재발급합니다.
3. API 요청 시 `Authorization: Bearer <token>` 헤더를 자동으로 추가합니다.
4. 401 응답이 오면 Refresh Token으로 Access Token을 갱신 후 요청을 1회 재시도합니다.
5. `middleware.ts`에서 인증 여부(`refreshToken` 쿠키 유무)를 확인하여 비로그인 사용자를 `/login`으로 리다이렉트합니다.

---

## 국제화 (i18n)

- URL 경로에 locale prefix가 포함됩니다 (`/ko/dashboard`, `/en/dashboard`).
- 기본 언어는 한국어(`ko`)이며, 영어(`en`)를 추가로 지원합니다.
- 번역 파일은 `message/ko.json`, `message/en.json`에서 관리합니다.
- `LocaleSwitcher` 컴포넌트로 언어를 전환할 수 있습니다.
