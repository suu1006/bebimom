import { Text, View, type ViewStyle } from "react-native";

const METRIC_CARD_SHADOW: ViewStyle = {
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.08,
  shadowRadius: 10,
  elevation: 4,
};

export type MetricCardProps = {
  label: string;
  value: string;
  badge: string;
  badgeVariant: "good" | "neutral";
};

export function MetricCard({ label, value, badge, badgeVariant }: MetricCardProps) {
  return (
    <View
      className="mr-3 w-[118px] rounded-2xl border border-border/40 bg-white px-3.5 py-3.5"
      style={METRIC_CARD_SHADOW}
    >
      <Text className="text-xs text-subtle">{label}</Text>
      <Text className="mt-1.5 text-lg font-bold text-foreground">{value}</Text>
      <View
        className={`mt-2 self-start rounded-full px-2 py-1 ${badgeVariant === "good" ? "bg-report-green-soft" : "bg-report-neutral-pill"}`}
      >
        <Text
          className={`text-[11px] font-bold ${badgeVariant === "good" ? "text-report-green-dark" : "text-report-neutral-text"}`}
        >
          {badge}
        </Text>
      </View>
    </View>
  );
}
