import type { QuickRecordIonIcon } from "@/components/QuickRecordItem";

export const QUICK_RECORD_KINDS = [
  "feeding",
  "sleep",
  "diaper",
  "growth",
  "temperature",
  "medication",
  "activity",
] as const;

export type QuickRecordKind = (typeof QUICK_RECORD_KINDS)[number];

export const QUICK_RECORD_SHEET_META: Record<
  QuickRecordKind,
  { title: string; subtitle: string; ionIcon: QuickRecordIonIcon }
> = {
  feeding: {
    title: "수유 기록",
    subtitle: "오늘의 발자취 남기기",
    ionIcon: "nutrition-outline",
  },
  sleep: {
    title: "수면 기록",
    subtitle: "잠든 흔적을 남겨두세요",
    ionIcon: "moon-outline",
  },
  diaper: {
    title: "기저귀 기록",
    subtitle: "교체 시점을 남겨두세요",
    ionIcon: "bandage-outline",
  },
  growth: {
    title: "성장 기록",
    subtitle: "오늘의 성장을 기록해요",
    ionIcon: "trending-up-outline",
  },
  temperature: {
    title: "체온 기록",
    subtitle: "측정값을 남겨두세요",
    ionIcon: "thermometer-outline",
  },
  medication: {
    title: "투약 기록",
    subtitle: "복용 내역을 남겨두세요",
    ionIcon: "medical-outline",
  },
  activity: {
    title: "활동 기록",
    subtitle: "오늘의 활동을 남겨두세요",
    ionIcon: "fitness-outline",
  },
};
