import { Text, View } from "react-native";

export function GrowthCard() {
  return (
    <View className="mt-7">
      <Text className="mb-3 text-[32px] font-bold text-foreground">성장 기록</Text>
      <View className="rounded-3xl border border-border bg-white px-5 py-5">
        <Text className="text-[24px] font-bold text-foreground">성장 추이</Text>
        <View className="mt-4 gap-12">
          <View className="h-[1px] bg-border/70" />
          <View className="items-center">
            <View className="h-8 w-8 items-center justify-center rounded-full bg-primary/20">
              <View className="h-3.5 w-3.5 rounded-full bg-primary" />
            </View>
          </View>
          <View className="h-[1px] bg-border/70" />
        </View>
        <Text className="mt-4 text-center text-[15px] font-medium text-subtle">4 / 6</Text>
      </View>
    </View>
  );
}
