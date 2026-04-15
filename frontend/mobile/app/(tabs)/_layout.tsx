import { Tabs } from "expo-router";
import { TAB_COLORS } from "@shared/src/colors";
import homeIcon from "@shared/assets/icon/home.png";
import reportIcon from "@shared/assets/icon/report.png";
import robotIcon from "@shared/assets/icon/robot.png";
import settingIcon from "@shared/assets/icon/setting.png";
import { TabBarImageIcon } from "@/components/TabBarImageIcon";

const ACTIVE = TAB_COLORS.active;
const INACTIVE = TAB_COLORS.inactive;

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: ACTIVE,
        tabBarInactiveTintColor: INACTIVE,
        tabBarStyle: {
          backgroundColor: "#FFFFFF",
        },
        tabBarLabelStyle: {
          fontWeight: "700",
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "홈",
          tabBarIcon: ({ focused, size }) => (
            <TabBarImageIcon
              source={homeIcon}
              focused={focused}
              size={size}
              activeColor={ACTIVE}
              inactiveColor={INACTIVE}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="report"
        options={{
          title: "성장 리포트",
          tabBarIcon: ({ focused, size }) => (
            <TabBarImageIcon
              source={reportIcon}
              focused={focused}
              size={size}
              activeColor={ACTIVE}
              inactiveColor={INACTIVE}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: "AI 상담",
          tabBarIcon: ({ focused, size }) => (
            <TabBarImageIcon
              source={robotIcon}
              focused={focused}
              size={size}
              activeColor={ACTIVE}
              inactiveColor={INACTIVE}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "설정",
          tabBarIcon: ({ focused, size }) => (
            <TabBarImageIcon
              source={settingIcon}
              focused={focused}
              size={size}
              activeColor={ACTIVE}
              inactiveColor={INACTIVE}
            />
          ),
        }}
      />
    </Tabs>
  );
}
