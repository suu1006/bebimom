import Ionicons from "@expo/vector-icons/Ionicons";
import { Image, Text, View } from "react-native";
import noUserIcon from "@shared/assets/icon/empty_user_profile_icon.png";
import { APP_COLORS } from "@shared/src/colors";

export function ProfileHeader() {
  return (
    <View className="rounded-2xl bg-white px-4 py-4">
      <View className="flex-row items-center">
        <View className="h-20 w-20 overflow-hidden rounded-full">
          <Image
            source={noUserIcon}
            className="h-full w-full"
            resizeMode="cover"
            accessibilityLabel="프로필 사진"
          />
        </View>
        <View className="ml-3 flex-1">
          <Text className="text-[20px] font-bold text-foreground">짱아</Text>
          <Text className="mt-0.5 text-[14px] font-semibold text-subtle">D+40</Text>
          <Text className="mt-1 text-[12px] text-subtle">오늘도 사랑해, 우리 아기 🍼</Text>
        </View>
        <Ionicons name="settings-outline" size={24} color={APP_COLORS.subtle} accessibilityLabel="설정" />
      </View>
    </View>
  );
}
