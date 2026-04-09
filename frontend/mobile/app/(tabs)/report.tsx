import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ReportScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>리포트</Text>
      <Text style={styles.subtitle}>주간 통계 분석 · K-DST 발달 검사</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
  },
});
