// 사용자 & 인증
export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
}

export interface AuthTokens {
  accessToken: string;
}

// 아기
export interface Baby {
  id: string;
  name: string;
  birthDate: string;
  gender: "male" | "female";
}

// 수유 기록
export type FeedingType = "formula" | "breast" | "baby_food";

export interface FeedingRecord {
  id: string;
  babyId: string;
  type: FeedingType;
  amount?: number; // ml
  duration?: number; // 분 (모유 수유)
  recordedAt: string;
}

// 수면 기록
export type SleepType = "nap" | "night";

export interface SleepRecord {
  id: string;
  babyId: string;
  type: SleepType;
  startedAt: string;
  endedAt?: string;
}

// 기저귀 기록
export type DiaperType = "wet" | "dirty" | "both";

export interface DiaperRecord {
  id: string;
  babyId: string;
  type: DiaperType;
  recordedAt: string;
}

// 유축 기록
export interface PumpingRecord {
  id: string;
  babyId: string;
  amount: number; // ml
  recordedAt: string;
}

// AI 상담 채팅
export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  createdAt: string;
}

// API 공통 응답
export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface ApiError {
  error: string;
  statusCode: number;
}

// K-DST 발달 선별 검사
export interface DstQuestion {
  id: number;
  category: string;
  question: string;
}

export type DstAnswer = "yes" | "no" | "sometimes";

export interface DstResult {
  score: number;
  category: string;
  recommendation: string;
}
