# Bebimom 모노레포

웹(Next.js), 모바일(Expo), 백엔드(Express)가 한 저장소에서 함께 관리되는 구조입니다. 공용 타입·디자인 토큰·에셋은 `frontend/shared`에 두고, 웹·모바일에서 참조합니다.

## 기술 스택 요약

| 영역 | 스택 |
|------|------|
| **백엔드** | Node.js, Express, TypeScript, Prisma, PostgreSQL |
| **웹** | Next.js 16, React 19, Tailwind CSS v4, next-intl |
| **모바일** | Expo 54, Expo Router, React Native, NativeWind v4, TanStack Query, Zustand |
| **공용** | `frontend/shared` — 색상 토큰, 타입, 상수, 에셋 등 |

## 디렉터리 구조

```
.
├── backend/                 # API 서버 (npm workspace)
│   ├── prisma/              # 스키마·마이그레이션
│   └── src/                 # Express 앱, 라우트, 미들웨어
├── frontend/
│   ├── shared/              # 웹·모바일 공용 (npm workspace)
│   │   ├── assets/          # 이미지·아이콘 등
│   │   └── src/             # colors, types, constants …
│   ├── web/                 # Next.js 앱 (npm workspace)
│   └── mobile/              # Expo 앱 (워크스페이스 미포함, 독립 설치)
│       ├── app/             # Expo Router 라우트만 (화면 진입점)
│       └── src/
│           ├── components/  # 공용 UI
│           ├── features/    # 기능 단위 (home, report 등)
│           ├── hooks/       # 공용 훅
│           ├── lib/         # API, 설정
│           └── store/       # Zustand
├── package.json             # 루트 스크립트·워크스페이스 정의
├── CLAUDE.md                # 모노레포 공통 규칙
└── .env                     # 로컬 환경 변수 (커밋 제외)
```

### npm workspaces

루트 `package.json`의 workspaces는 다음만 포함합니다.

- `frontend/web`
- `frontend/shared`
- `backend`

**`frontend/mobile`은 workspace에 없습니다.** 의존성은 `frontend/mobile`에서 별도로 설치합니다.

### 아키텍처 경계

- `frontend/shared`는 **웹·모바일이 import할 수 있고**, shared 쪽에서 web/mobile을 import하지 않습니다.
- 모바일은 Metro에서 `@shared` → `frontend/shared`로 alias 되며, `watchFolders`로 공용 폴더를 감시합니다 (`frontend/mobile/metro.config.js`).

## 사전 요구 사항

- Node.js (프로젝트에 맞는 LTS 권장)
- PostgreSQL (Prisma·백엔드 사용 시)
- iOS/Android 개발 시 Xcode / Android Studio (모바일 네이티브 빌드 시)

## 설치

```bash
# 저장소 루트 — 웹·백엔드·shared
npm install

# 모바일 (필수)
cd frontend/mobile && npm install && cd ../..
```

## 환경 변수

- **백엔드**: 루트 `.env` 및 필요 시 `backend/.env`를 로드합니다 (`backend/src/index.ts`). DB URL, JWT 비밀 등 **서버 전용** 값은 클라이언트에 노출하지 않습니다.
- **모바일(Expo)**: 공개해도 되는 값만 `EXPO_PUBLIC_*` 사용 (예: `EXPO_PUBLIC_API_BASE_URL`, `EXPO_PUBLIC_ACCESS_TOKEN_KEY`). 자세한 규칙은 루트 `CLAUDE.md`를 참고합니다.
- **웹(Next.js)**: 브라우저에 필요한 값은 `NEXT_PUBLIC_*` 규칙을 따릅니다.

`.env` 파일은 저장소에 커밋하지 않습니다.

## 실행 스크립트 (루트)

| 명령 | 설명 |
|------|------|
| `npm run dev` | Next.js 웹 + Express 백엔드를 동시에 개발 모드로 실행 |
| `npm run dev:web` | 웹만 |
| `npm run dev:backend` | 백엔드만 (기본 포트 `4000` 등은 env 기준) |
| `npm run dev:mobile` | `frontend/mobile`에서 `expo start` |
| `npm run build` | 웹·백엔드 프로덕션 빌드 |

모바일만 따로:

```bash
cd frontend/mobile
npx expo start
```

설정·캐시 이슈 시 `npx expo start -c`로 Metro 캐시를 비울 수 있습니다.

## 백엔드 (요약)

- 진입점: `backend/src/index.ts`
- REST API 예: `/api/auth`, `/api/health` 등
- CORS에 로컬 웹·Expo 관련 origin이 허용되어 있습니다 (개발용).
- Prisma 마이그레이션 등은 `backend` 패키지 스크립트·문서를 따릅니다.

## 모바일 (요약)

- **Expo Router**: `app/` 아래 `_layout.tsx`, `(auth)/`, `(tabs)/` 등으로 화면이 구성됩니다.
- **NativeWind**: `global.css`, `tailwind.config.js`, `babel.config.js`, `withNativeWind` Metro 설정을 사용합니다.
- **인증**: SecureStore + Zustand, 앱 레이아웃에서 hydrate 후 스택 전환 (`app/_layout.tsx`).

## 웹 (요약)

- Next.js 앱은 `frontend/web`에 있습니다.
- 자세한 내용은 `frontend/web/README.md` 및 `frontend/web/CLAUDE.md`를 참고합니다.

## 문서

- 루트 `CLAUDE.md` — 모노레포 공통 규칙(환경 변수, shared 경계, 라우팅·인증 가이드)
- `frontend/shared/CLAUDE.md`, `frontend/mobile/CLAUDE.md`, `frontend/web/CLAUDE.md` — 패키지별 보조 규칙
