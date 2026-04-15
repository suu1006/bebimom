import Ionicons from "@expo/vector-icons/Ionicons";
import { Image, Text, View } from "react-native";
import noUserIcon from "@shared/assets/icon/empty_user_profile_icon.png";
import { APP_COLORS } from "@shared/src/colors";

const AVATAR_PX = 64;

export function ProfileHeader() {
  return (
    <View className="rounded-2xl bg-white px-4 py-4">
      <View className="flex-row items-center">
        <View className="h-16 w-16 overflow-hidden rounded-full bg-primary/80">
          <Image
            source={noUserIcon}
            style={{ width: AVATAR_PX, height: AVATAR_PX }}
            resizeMode="cover"
            accessibilityLabel="프로필 사진"
          />
        </View>
        <View className="ml-3 flex-1">
          <Text className="text-[32px] font-bold text-foreground">짱아</Text>
          <Text className="mt-0.5 text-[22px] font-semibold text-subtle">D+40</Text>
          <Text className="mt-1 text-sm text-subtle">오늘도 사랑해, 우리 아기 🍼</Text>
        </View>
        <Ionicons name="settings-outline" size={24} color={APP_COLORS.subtle} accessibilityLabel="설정" />
      </View>
    </View>
  );
}
