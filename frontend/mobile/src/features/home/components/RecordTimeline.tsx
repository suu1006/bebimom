import Ionicons from "@expo/vector-icons/Ionicons";
import type { ComponentProps } from "react";
import { Text, View } from "react-native";
import { APP_COLORS } from "@shared/src/colors";

export type TimelineIonIcon = NonNullable<ComponentProps<typeof Ionicons>["name"]>;

export type RecordTimelineItem = {
  id: string;
  /** 예: 오전 9:00 */
  timeLabel: string;
  /** 예: 수유 */
  label: string;
  /** 예: 분유 120ml */
  detail: string;
  ionIcon: TimelineIonIcon;
  iconBgClass: string;
  iconColor?: string;
};

type Props = {
  items: RecordTimelineItem[];
};

/** 홈 타임라인용 샘플 (추후 API 연동 시 교체) */
export const MOCK_HOME_TIMELINE: RecordTimelineItem[] = [
  {
    id: "1",
    timeLabel: "오전 9:00",
    label: "수유",
    detail: "분유 120ml",
    ionIcon: "nutrition-outline",
    iconBgClass: "bg-[#FFECEF]",
  },
  {
    id: "2",
    timeLabel: "오전 7:30",
    label: "수면",
    detail: "2시간 30분",
    ionIcon: "moon-outline",
    iconBgClass: "bg-[#EEF1FF]",
  },
  {
    id: "3",
    timeLabel: "오전 6:00",
    label: "기저귀",
    detail: "소변",
    ionIcon: "water-outline",
    iconBgClass: "bg-[#E8F5FF]",
  },
];

export function RecordTimeline({ items }: Props) {
  if (items.length === 0) return null;

  return (
    <View className="mt-8">
      <Text className="mb-4 text-[20px] font-bold text-foreground">오늘 기록</Text>
      <View className="rounded-2xl border border-border bg-white px-4 py-1">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const iconColor = item.iconColor ?? APP_COLORS.foreground;

          return (
            <View
              key={item.id}
              className={`flex-row py-4 ${!isLast ? "border-b border-border" : ""}`}
            >
              <Text className="w-[76px] shrink-0 pt-1 text-[14px] font-medium tabular-nums text-subtle">
                {item.timeLabel}
              </Text>
              <View className="mx-3 w-10 shrink-0 items-center justify-start pt-0.5">
                <View
                  className={`h-9 w-9 items-center justify-center rounded-full ${item.iconBgClass}`}
                >
                  <Ionicons
                    name={item.ionIcon}
                    size={18}
                    color={iconColor}
                    accessibilityElementsHidden
                  />
                </View>
              </View>
              <View className="min-w-0 flex-1 pt-0.5">
                <Text className="text-[16px] font-semibold text-foreground">
                  {item.label}
                </Text>
                <Text className="mt-0.5 text-[14px] leading-5 text-subtle">{item.detail}</Text>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
}
