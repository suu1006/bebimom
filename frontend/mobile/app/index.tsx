import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { useRouter } from "expo-router";
import { useAuthStore } from "@/store/authStore";

export default function Index() {
  const router = useRouter();
  const accessToken = useAuthStore((s) => s.accessToken);
  const isLoading = useAuthStore((s) => s.isLoading);

  useEffect(() => {
    if (isLoading) return;
    const href = accessToken ? "/(tabs)" : "/(auth)/login";
    setTimeout(() => {
      router.replace(href);
    }, 0);
  }, [isLoading, accessToken]);

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FFFFFF",
      }}
    >
      <ActivityIndicator size="large" color="#F4A7B9" />
    </View>
  );
}