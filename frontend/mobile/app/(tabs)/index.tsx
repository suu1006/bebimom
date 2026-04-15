import { useState } from "react";
import {
  ScrollView,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { QuickRecordItem, type QuickRecordIonIcon } from "@/components/QuickRecordItem";
import { SummaryMiniCard } from "@/components/SummaryMiniCard";
import { GrowthCard } from "@/features/home/components/GrowthCard";
import { MOCK_HOME_TIMELINE, RecordTimeline } from "@/features/home/components/RecordTimeline";
import { ProfileHeader } from "@/features/home/components/ProfileHeader";
import { QuickRecordBottomSheet } from "@/features/records/components/QuickRecordBottomSheet";
import type { QuickRecordKind } from "@/features/records/constants";

const QUICK_RECORD_GRID: {
  kind: QuickRecordKind;
  label: string;
  bgClass: string;
  ionIcon: QuickRecordIonIcon;
}[] = [
  { kind: "feeding", label: "수유", bgClass: "bg-[#FFECEF]", ionIcon: "nutrition-outline" },
  { kind: "sleep", label: "수면", bgClass: "bg-[#EEF1FF]", ionIcon: "moon-outline" },
  { kind: "diaper", label: "기저귀", bgClass: "bg-[#E8F5FF]", ionIcon: "bandage-outline" },
  { kind: "growth", label: "성장", bgClass: "bg-[#E8FFF0]", ionIcon: "trending-up-outline" },
  { kind: "temperature", label: "체온", bgClass: "bg-[#FFF4E8]", ionIcon: "thermometer-outline" },
  { kind: "medication", label: "투약", bgClass: "bg-[#F3ECFF]", ionIcon: "medical-outline" },
  { kind: "activity", label: "활동", bgClass: "bg-[#E8F7FF]", ionIcon: "fitness-outline" },
];

export default function HomeScreen() {
  const [sheetKind, setSheetKind] = useState<QuickRecordKind | null>(null);

  return (
    <>
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      <ScrollView
        className="flex-1"
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: 12,
          paddingBottom: 28,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* 프로필 헤더 */}
        <ProfileHeader />

        {/* 오늘의 요약 */}
        <View className="mt-5">
          <View className="mb-3 flex-row items-center justify-between">
            <Text className="text-[20px] font-bold text-foreground">오늘의 요약</Text>
            <Text className="text-sm font-semibold text-primary">● 방금</Text>
          </View>
          <View className="flex-row gap-2.5">
            <SummaryMiniCard
              title="수유"
              value="1"
              desc="1시간 전"
              className="bg-[#FFF1F4]"
            />
            <SummaryMiniCard
              title="수면"
              value="3"
              desc="오늘 누적"
              className="bg-[#EEF1FF]"
            />
            <SummaryMiniCard
              title="기저귀"
              value="1"
              desc="1시간 전"
              className="bg-[#FFFCE8]"
            />
          </View>
        </View>

        {/* 빠른 기록 */}
        <View className="mt-7">
          <Text className="mb-3 text-[20px] font-bold text-foreground">빠른 기록</Text>
          <View className="flex-row flex-wrap justify-between gap-y-4">
            {QUICK_RECORD_GRID.map((item) => (
              <QuickRecordItem
                key={item.kind}
                ionIcon={item.ionIcon}
                label={item.label}
                bgClass={item.bgClass}
                onPress={() => setSheetKind(item.kind)}
              />
            ))}
            <View className="w-[22%] items-center">
              <View className="h-16 w-16 items-center justify-center rounded-2xl border-2 border-dashed border-border bg-white">
                <Text className="text-[30px] text-subtle">+</Text>
              </View>
              <Text className="mt-2 text-[15px] font-medium text-subtle">더보기</Text>
            </View>
          </View>
        </View>

        <RecordTimeline items={MOCK_HOME_TIMELINE} />

        {/* 성장 기록 */}
        {/* <GrowthCard /> */}
      </ScrollView>
    </SafeAreaView>

    {sheetKind !== null && (
      <QuickRecordBottomSheet
        visible
        kind={sheetKind}
        onClose={() => setSheetKind(null)}
      />
    )}
    </>
  );
}
