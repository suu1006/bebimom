import { Text, View } from "react-native";

type Props = {
  title: string;
  value: string;
  desc: string;
  className: string;
};

export function SummaryMiniCard({ title, value, desc, className }: Props) {
  return (
    <View className={`flex-1 rounded-2xl px-4 py-4 ${className}`}>
      <Text className="text-[15px] font-semibold text-foreground">{title}</Text>
      <Text className="mt-2 text-[36px] font-bold text-foreground">{value}</Text>
      <Text className="mt-1 text-[13px] text-subtle">{desc}</Text>
    </View>
  );
}
