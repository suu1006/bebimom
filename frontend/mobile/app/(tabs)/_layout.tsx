import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#FF6B9D",
        tabBarInactiveTintColor: "#999",
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{ title: "홈" }}
      />
      <Tabs.Screen
        name="report"
        options={{ title: "리포트" }}
      />
      <Tabs.Screen
        name="chat"
        options={{ title: "AI 상담" }}
      />
      <Tabs.Screen
        name="settings"
        options={{ title: "설정" }}
      />
    </Tabs>
  );
}
