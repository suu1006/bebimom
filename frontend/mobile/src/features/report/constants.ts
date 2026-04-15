import type { ViewStyle } from "react-native";
import type { MetricCardProps } from "./components/MetricCard";

export const CARD_SHADOW: ViewStyle = {
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.08,
  shadowRadius: 10,
  elevation: 4,
};

/** 플레이스홀더 — 추후 아이 프로필·API 연동 */
export const CHILD_NAME = "짱아";

export const METRICS: MetricCardProps[] = [
  {
    label: "신장",
    value: "64.2 cm",
    badge: "상위 15%",
    badgeVariant: "good",
  },
  {
    label: "체중",
    value: "7.1 kg",
    badge: "상위 22%",
    badgeVariant: "good",
  },
  {
    label: "머리",
    value: "41.5 cm",
    badge: "보통",
    badgeVariant: "neutral",
  },
];

/** 윗니·아랫니 유치 (true = 맹출) 플레이스홀더 */
export const TEETH_UPPER = [true, true, true, true, false, false, false, false];
export const TEETH_LOWER = [true, true, true, false, false, false, false, false];

export const TOP_REPORT_CARD_IMAGE_URI =
  "file:///Users/jeongsu/.cursor/projects/Users-jeongsu-Documents-bebimom/assets/image-455b2773-84db-4d6a-a480-ef953dd97f55.png";
