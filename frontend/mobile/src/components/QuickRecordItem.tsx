import Ionicons from "@expo/vector-icons/Ionicons";
import type { ComponentProps } from "react";
import { Pressable, Text, View } from "react-native";
import { APP_COLORS } from "@shared/src/colors";

export type QuickRecordIonIcon = NonNullable<ComponentProps<typeof Ionicons>["name"]>;

type Props = {
  ionIcon: QuickRecordIonIcon;
  label: string;
  bgClass: string;
  /** 기본값: APP_COLORS.foreground */
  iconColor?: string;
  onPress?: () => void;
};

export function QuickRecordItem({
  ionIcon,
  label,
  bgClass,
  iconColor = APP_COLORS.foreground,
  onPress,
}: Props) {
  const content = (
    <>
      <View className={`h-16 w-16 items-center justify-center rounded-2xl ${bgClass}`}>
        <Ionicons name={ionIcon} size={28} color={iconColor} />
      </View>
      <Text className="mt-2 text-[15px] font-medium text-subtle">{label}</Text>
    </>
  );

  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        className="w-[22%] items-center active:opacity-80"
        accessibilityRole="button"
        accessibilityLabel={label}
      >
        {content}
      </Pressable>
    );
  }

  return <View className="w-[22%] items-center">{content}</View>;
}
