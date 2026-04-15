import { Alert, Image, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { useAuthStore } from "@/store/authStore";
import noUserIcon from "@shared/assets/icon/empty_user_profile_icon.png";

/** 설정 화면만 중립 테두리 (홈 등은 `border-border` 연핑크 유지) */
const SETTINGS_BORDER = "#E5E5EA";
const SETTINGS_BORDER_SOFT = "rgba(229, 229, 234, 0.65)";

/** 와이어프레임용 — 추후 아이/성장 API와 연결 */
const PLACEHOLDER_PROFILE = {
  name: "김민준",
  birthLabel: "2024-05-15 출생 (남아)",
  weight: "8.4kg",
  height: "69.2cm",
};

function SettingsRow({
  iconBgClass,
  icon,
  title,
  subtitle,
  onPress,
  isLast,
}: {
  iconBgClass: string;
  icon: string;
  title: string;
  subtitle?: string;
  onPress?: () => void;
  isLast?: boolean;
}) {
  return (
    <Pressable
      onPress={onPress}
      disabled={!onPress}
      className="flex-row items-center gap-3 px-1 py-3.5 active:opacity-80"
      style={
        isLast
          ? undefined
          : { borderBottomWidth: 1, borderBottomColor: SETTINGS_BORDER_SOFT }
      }
    >
      <View
        className={`h-10 w-10 items-center justify-center rounded-xl ${iconBgClass}`}
      >
        <Text className="text-lg">{icon}</Text>
      </View>
      <View className="min-w-0 flex-1">
        <Text className="text-[15px] font-bold text-foreground">{title}</Text>
        {subtitle ? (
          <Text className="mt-0.5 text-xs text-subtle" numberOfLines={2}>
            {subtitle}
          </Text>
        ) : null}
      </View>
      <Text className="text-base text-subtle">›</Text>
    </Pressable>
  );
}

export default function SettingsScreen() {
  const user = useAuthStore((s) => s.user);
  const clearAuth = useAuthStore((s) => s.clearAuth);

  const displayName = user?.name?.trim() || PLACEHOLDER_PROFILE.name;

  const onLogout = () => {
    Alert.alert("로그아웃", "로그아웃 하시겠어요?", [
      { text: "취소", style: "cancel" },
      {
        text: "로그아웃",
        style: "destructive",
        onPress: async () => {
          await clearAuth();
          router.replace("/(auth)/login");
        },
      },
    ]);
  };

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: 16,
          paddingBottom: 32,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* 프로필 카드 */}
        <View
          className="overflow-hidden rounded-2xl bg-white shadow-sm shadow-foreground/5"
          style={{ borderWidth: 2, borderColor: SETTINGS_BORDER }}
        >
          <View className="h-[100px] items-center bg-[#E8E4F7] pt-5">
            <View className="absolute -bottom-10 h-[88px] w-[88px] items-center justify-center rounded-full border-[4px] border-white bg-white">
              <Image
                source={noUserIcon}
                className="h-[72px] w-[72px]"
                resizeMode="contain"
                accessibilityLabel="프로필 사진"
              />
            </View>
          </View>
          <View className="items-center px-4 pb-5 pt-12">
            <Text className="text-xl font-bold text-foreground">{displayName}</Text>
            <Text className="mt-1 text-sm text-subtle">
              {PLACEHOLDER_PROFILE.birthLabel}
            </Text>
            <View
              className="mt-5 w-full flex-row pt-4"
              style={{ borderTopWidth: 1, borderTopColor: SETTINGS_BORDER_SOFT }}
            >
              <View
                className="flex-1 items-center pr-2"
                style={{
                  borderRightWidth: 1,
                  borderRightColor: SETTINGS_BORDER_SOFT,
                }}
              >
                <Text className="text-xs text-subtle">몸무게</Text>
                <Text className="mt-1 text-base font-bold text-foreground">
                  {PLACEHOLDER_PROFILE.weight}
                </Text>
              </View>
              <View className="flex-1 items-center pl-2">
                <Text className="text-xs text-subtle">키</Text>
                <Text className="mt-1 text-base font-bold text-foreground">
                  {PLACEHOLDER_PROFILE.height}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* 계정 설정 */}
        <Text className="mb-2 mt-6 text-xs font-bold text-subtle">계정 설정</Text>
        <View
          className="overflow-hidden rounded-2xl bg-white px-3 shadow-sm shadow-foreground/5"
          style={{ borderWidth: 2, borderColor: SETTINGS_BORDER }}
        >
          <SettingsRow
            iconBgClass="bg-[#7C6CF5]"
            icon="💳"
            title="프리미엄 구독 관리"
            subtitle="월 12,900원 멤버십 이용 중"
            onPress={() => {}}
          />
          <SettingsRow
            iconBgClass="bg-primary"
            icon="🔔"
            title="알림 설정"
            subtitle="예방 접종 및 기록 리마인더"
            onPress={() => {}}
          />
          <SettingsRow
            iconBgClass="bg-[#5CB88F]"
            icon="🛡"
            title="데이터 보안 및 개인정보"
            onPress={() => {}}
          />
          <SettingsRow
            iconBgClass="bg-[#C8C4CC]"
            icon="🚪"
            title="로그아웃"
            onPress={onLogout}
            isLast
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
