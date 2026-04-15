# 모바일(Expo) 가이드

## 프로젝트 구조

- `app/` — Expo Router 라우트만 두고, 화면 진입·레이아웃만 담당합니다.
- `src/components/` — 앱 전역 공용 UI(버튼, 입력 등).
- `src/features/` — 기능 단위(auth, home, report 등) 화면 조각·도메인 UI.
- `src/hooks/` — 공용 훅.
- `src/lib/` — API 클라이언트, 토큰 저장 등 설정·유틸.
- `src/store/` — Zustand 스토어.

앱 코드 import는 `@/` alias로 `src/` 기준 경로를 사용합니다 (`@/components/...`, `@/features/...`).

## 라우팅
- Expo Router route group(`/(auth)`, `/(tabs)`) 표기를 그대로 사용합니다.
- 반복 이동 경로는 공용 라우트 상수를 우선 사용합니다.
- 인증 분기 리다이렉트는 진입 지점에서 일관되게 관리합니다.

## 환경 변수
- 런타임 설정은 `EXPO_PUBLIC_*` 변수에서만 읽습니다.
- `EXPO_PUBLIC_*`는 공개값으로 취급하며 비밀값을 넣지 않습니다.
- 로컬 `.env` 파일은 커밋에 포함하지 않습니다.

## 인증/저장소
- 토큰 영속화는 `expo-secure-store`를 사용합니다.
- 토큰 키 이름은 빌드마다 바뀌지 않도록 고정합니다.
- 앱 시작 시 hydrate를 수행하고 로딩 상태를 반드시 종료합니다.

## 스타일링
- 하드코딩 값보다 `frontend/shared`의 디자인 토큰을 우선 사용합니다.
- NativeWind 사용 시 유틸리티 클래스 작성 스타일을 일관되게 유지합니다.
- 특별한 이유 없이 한 컴포넌트에 스타일링 방식을 혼합하지 않습니다.

## 에셋
- 공용 에셋은 `frontend/shared/assets`에 배치합니다.
- 이미지 import에는 TypeScript 에셋 선언(`*.png`)을 반드시 준비합니다.
- 파일/폴더 네이밍(`image` vs `images`)은 하나로 통일합니다.
