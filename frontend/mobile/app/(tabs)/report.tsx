import { useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MetricCard } from "@/features/report/components/MetricCard";
import {
  CARD_SHADOW,
  CHILD_NAME,
  METRICS,
  TOP_REPORT_CARD_IMAGE_URI,
} from "@/features/report/constants";

type ReportTab = "growth" | "health";

export default function ReportScreen() {
  const [tab, setTab] = useState<ReportTab>("growth");

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      <ScrollView
        className="flex-1"
        nestedScrollEnabled
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: 16,
          paddingBottom: 32,
        }}
        showsVerticalScrollIndicator={false}
      >
        <Text className="text-2xl font-bold leading-tight text-foreground">
          {CHILD_NAME}의{" "}
          <Text className="text-report-green">성장 스토리</Text>
        </Text>
        <Text className="mt-2 text-sm text-subtle">
          하루하루 몰라보게 크고 있어요!
        </Text>

        <View className="mt-6 flex-row rounded-2xl bg-report-segment p-1">
          <Pressable
            onPress={() => setTab("growth")}
            className={`flex-1 rounded-[14px] py-2.5 ${tab === "growth" ? "bg-white" : ""}`}
            style={tab === "growth" ? CARD_SHADOW : undefined}
          >
            <Text
              className={`text-center text-sm font-bold ${tab === "growth" ? "text-report-green" : "text-subtle"
                }`}
            >
              성장 지표
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setTab("health")}
            className={`flex-1 rounded-[14px] py-2.5 ${tab === "health" ? "bg-white" : ""}`}
            style={tab === "health" ? CARD_SHADOW : undefined}
          >
            <Text
              className={`text-center text-sm font-bold ${tab === "health" ? "text-report-green" : "text-subtle"
                }`}
            >
              건강 관리
            </Text>
          </Pressable>
        </View>

        {tab === "growth" ? (
          <>
            <View className="mt-6 overflow-hidden rounded-3xl border border-border/30 bg-white">
              <Image
                source={{ uri: TOP_REPORT_CARD_IMAGE_URI }}
                resizeMode="contain"
                className="h-[360px] w-full"
                accessibilityLabel="인지 영역 리포트 카드"
              />
            </View>

            <ScrollView
              horizontal
              nestedScrollEnabled
              showsHorizontalScrollIndicator={false}
              className="mt-6 -mx-0 bg-"
              contentContainerStyle={{ paddingRight: 4, paddingVertical: 2 }}
            >
              {METRICS.map((m) => (
                <MetricCard key={m.label} {...m} />
              ))}
            </ScrollView>

            <View className="mt-6 rounded-3xl border border-border/30 bg-white px-5 py-5">
              <View className="flex-row items-center gap-3">
                <View className="h-12 w-12 items-center justify-center rounded-2xl bg-primary/20">
                  <Text className="text-2xl" accessibilityElementsHidden>
                    ✨
                  </Text>
                </View>
                <Text className="text-2xl font-extrabold tracking-tight text-foreground">
                  맞춤 AI 리포트
                </Text>
              </View>

              <View className="mt-6 border-t border-border/25 pt-5">
                <View className="flex-row items-start gap-4">
                  <View className="mt-0.5 h-10 w-10 items-center justify-center rounded-full bg-report-green-soft">
                    <Text className="text-xl" accessibilityElementsHidden>
                      ↗️
                    </Text>
                  </View>
                  <View className="flex-1">
                    <Text className="text-[16px] font-bold tracking-tight text-foreground">
                      수면의 질이 향상되었어요
                    </Text>
                    <Text className="mt-2 text-[15px] font-medium leading-7 text-[#5E759D]">
                      이번 주 총 수면 시간이 15% 증가했고, 밤중 깸 횟수도 1회로
                      줄었어요.
                    </Text>
                  </View>
                </View>
              </View>

              <View className="mt-5 border-t border-border/25 pt-5">
                <View className="flex-row items-start gap-4">
                  <View className="mt-0.5 h-10 w-10 items-center justify-center rounded-full bg-[#EAF1FF]">
                    <Text className="text-xl" accessibilityElementsHidden>
                      ✅
                    </Text>
                  </View>
                  <View className="flex-1">
                    <Text className="text-[16px] font-bold tracking-tight text-foreground">
                      수유량이 일정해요
                    </Text>
                    <Text className="mt-2 text-[15px] font-medium leading-7 text-[#5E759D]">
                      일평균 수유량은 690ml로 현재 월령과 체중 백분위수에 아주
                      적절합니다.
                    </Text>
                  </View>
                </View>
              </View>

              <View className="mt-5 border-t border-border/25 pt-5">
                <View className="flex-row items-start gap-4">
                  <View className="mt-0.5 h-10 w-10 items-center justify-center rounded-full bg-[#FFF4E6]">
                    <Text className="text-xl" accessibilityElementsHidden>
                      ⚠️
                    </Text>
                  </View>
                  <View className="flex-1">
                    <Text className="text-[16px] font-bold tracking-tight text-foreground">
                      이앓이를 주의 깊게 살펴보세요
                    </Text>
                    <Text className="mt-2 text-[15px] font-medium leading-7 text-[#5E759D]">
                      최근 기록에서 침 흘림과 약간의 보챔이 관찰되었어요. 이앓이가
                      시작되었을 수 있어요.
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </>
        ) : (
          <>
            <View
              className="mt-6 rounded-3xl border border-border/50 bg-white px-5 py-5"
              style={CARD_SHADOW}
            >
              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center gap-2">
                  {/* <Text className="text-xl" accessibilityElementsHidden>
                    🛡️
                  </Text> */}
                  <Text className="text-xl font-bold text-foreground">
                    예방접종 현황
                  </Text>
                </View>
                <Pressable>
                  <Text className="text-sm font-semibold text-subtle">전체보기 〉</Text>
                </Pressable>
              </View>

              <View className="mt-5 rounded-3xl bg-[#F5F6F8] px-4 py-5">
                <View className="flex-row items-center justify-between gap-3">
                  <View className="flex-1">
                    <Text className="text-lg font-bold text-foreground">
                      Dtap (파상풍/디프테리아)
                    </Text>
                    <Text className="mt-1 text-sm text-subtle">
                      2차 접종 완료 (2024.03.15)
                    </Text>
                  </View>
                  <View className="h-16 w-16 items-center justify-center rounded-full bg-[#CFF5E4]">
                    <Text className="text-2xl" accessibilityElementsHidden>
                      🛡️
                    </Text>
                  </View>
                </View>
              </View>

              <View className="mt-4 rounded-3xl border border-[#F6D7B2] bg-[#FFF8EF] px-4 py-5">
                <View className="flex-row items-center justify-between gap-3">
                  <View className="flex-1">
                    <Text className="text-lg font-bold text-[#FF6A00]">
                      다음 접종: B형 간염
                    </Text>
                    <Text className="mt-1 text-base font-semibold text-[#FF8A3D]">
                      D-12 (2024.04.22 예정)
                    </Text>
                  </View>
                  <View className="h-16 w-16 items-center justify-center rounded-full bg-[#FCE8CC]">
                    <Text className="text-2xl" accessibilityElementsHidden>
                      📅
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            <View
              className="mt-6 rounded-3xl border border-border/50 bg-white px-5 py-5"
              style={CARD_SHADOW}
            >
              <View className="flex-row items-center gap-2">
                <Text className="text-xl" accessibilityElementsHidden>
                  🩺
                </Text>
                <Text className="text-xl font-bold text-foreground">
                  영유아 건강검진
                </Text>
              </View>

              <View className="mt-5 flex-row items-center justify-between gap-3 rounded-3xl bg-[#DCF5EA] px-4 py-5">
                <View className="flex-1">
                  <Text className="text-lg font-bold text-[#0E8D64]">
                    2차 건강검진 대상
                  </Text>
                  <Text className="mt-1 text-base font-semibold text-[#45A987]">
                    생후 4~6개월 (현재 5개월)
                  </Text>
                </View>
                <Pressable className="rounded-2xl bg-[#03C07D] px-5 py-3">
                  <Text className="text-base font-extrabold text-white">예약하기</Text>
                </Pressable>
              </View>
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
