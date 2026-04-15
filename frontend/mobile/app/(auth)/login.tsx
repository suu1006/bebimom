import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, router } from "expo-router";
import { useMutation } from "@tanstack/react-query";
import { loginApi } from "@/lib/api";
import { useAuthStore } from "@/store/authStore";
import { BOTTOM_PATH } from "@shared/constant/bottomPath";
import logoImage from "@shared/assets/image/logo.png";

export default function LoginScreen() {
  const setAuth = useAuthStore((s) => s.setAuth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { mutate: login, isPending } = useMutation({
    mutationFn: loginApi,
    onSuccess: async (data) => {
      await setAuth(data.user, data.accessToken);
      router.replace(BOTTOM_PATH.HOME);
    },
    onError: (err: Error) => {
      Alert.alert("로그인 실패", err.message);
    },
  });

  const handleLogin = () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert("입력 오류", "이메일과 비밀번호를 입력해주세요");
      return;
    }
    login({ email: email.trim(), password });
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        className="flex-1"
        keyboardVerticalOffset={Platform.OS === "ios" ? 2 : 0}
      >
        <ScrollView
          className="flex-1"
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "center",
            paddingHorizontal: 28,
            paddingBottom: 32,
          }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          automaticallyAdjustKeyboardInsets={Platform.OS === "ios"}
        >
          <Image
            source={logoImage}
            className="w-full h-[160px]"
            resizeMode="contain"
          />

          <View className="items-center mb-6 mt-1">
            <Text className="text-[36px] font-extrabold text-foreground tracking-tight">
              베비맘
            </Text>
            <Text className="text-[13px] text-subtle mt-1.5 tracking-widest">
              우리 아이 성장 기록
            </Text>
          </View>

          <View className="gap-4">
            <View className="gap-1.5">
              <Text className="text-[13px] font-semibold text-foreground">
                이메일
              </Text>
              <TextInput
                className="bg-input-bg border-[1.5px] border-border rounded-xl px-4 py-[14px] text-[15px] text-foreground"
                placeholder="example@email.com"
                placeholderTextColor="#BBA9B0"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            <View className="gap-1.5">
              <Text className="text-[13px] font-semibold text-foreground">
                비밀번호
              </Text>
              <TextInput
                className="bg-input-bg border-[1.5px] border-border rounded-xl px-4 py-[14px] text-[15px] text-foreground"
                placeholder="비밀번호를 입력하세요"
                placeholderTextColor="#BBA9B0"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>

            <TouchableOpacity
              className={`bg-primary rounded-xl py-4 items-center mt-2 shadow-md shadow-primary/30 ${isPending ? "opacity-60" : ""}`}
              onPress={handleLogin}
              disabled={isPending}
              activeOpacity={0.8}
            >
              {isPending ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text className="text-white text-base font-bold tracking-wide">
                  로그인
                </Text>
              )}
            </TouchableOpacity>

            <View className="flex-row justify-center items-center mt-2">
              <Text className="text-sm text-subtle">아직 계정이 없으신가요? </Text>
              <Link href="/(auth)/signup" asChild>
                <TouchableOpacity>
                  <Text className="text-sm font-bold text-primary">회원가입</Text>
                </TouchableOpacity>
              </Link>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
