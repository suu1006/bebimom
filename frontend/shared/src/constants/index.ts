// API 경로
export const API_PATHS = {
  auth: {
    login: "/api/auth/login",
    signup: "/api/auth/signup",
    refresh: "/api/auth/refresh",
    logout: "/api/auth/logout",
  },
  baby: {
    list: "/api/babies",
    detail: (id: string) => `/api/babies/${id}`,
  },
  records: {
    feeding: "/api/records/feeding",
    sleep: "/api/records/sleep",
    diaper: "/api/records/diaper",
    pumping: "/api/records/pumping",
  },
  chat: {
    messages: "/api/chat/messages",
    send: "/api/chat/send",
  },
  dst: {
    questions: "/api/dst/questions",
    submit: "/api/dst/submit",
  },
  report: {
    weekly: "/api/reports/weekly",
    health: "/api/reports/health",
  },
} as const;

// 수유 타입 레이블
export const FEEDING_TYPE_LABELS = {
  formula: { ko: "분유", en: "Formula" },
  breast: { ko: "모유", en: "Breast" },
  baby_food: { ko: "이유식", en: "Baby Food" },
} as const;

// 수면 타입 레이블
export const SLEEP_TYPE_LABELS = {
  nap: { ko: "낮잠", en: "Nap" },
  night: { ko: "밤잠", en: "Night Sleep" },
} as const;

// 기저귀 타입 레이블
export const DIAPER_TYPE_LABELS = {
  wet: { ko: "소변", en: "Wet" },
  dirty: { ko: "대변", en: "Dirty" },
  both: { ko: "소변+대변", en: "Both" },
} as const;

// 지원 locale
export const SUPPORTED_LOCALES = ["ko", "en"] as const;
export type Locale = (typeof SUPPORTED_LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "ko";

// 토큰 갱신 최소 간격 (ms)
export const MIN_REFRESH_INTERVAL = 1000;

// 최대 재시도 횟수
export const MAX_RETRY_ATTEMPTS = 1;
