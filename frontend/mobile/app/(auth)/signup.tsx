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
import { registerApi } from "@/lib/api";
import { useAuthStore } from "@/store/authStore";
import { BOTTOM_PATH } from "@shared/constant/bottomPath";
import {
  isValidSignupPassword,
  SIGNUP_PASSWORD_RULE_MESSAGE,
} from "@shared/src/password";
import logoImage from "@shared/assets/image/logo.png";
import { EmailDomainField } from "@/components/EmailDomainField";

export default function SignupScreen() {
  const setAuth = useAuthStore((s) => s.setAuth);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [agreedAll, setAgreedAll] = useState(false);
  const [agreedTerms, setAgreedTerms] = useState(false);
  const [agreedPrivacy, setAgreedPrivacy] = useState(false);

  const handleAllAgree = () => {
    const next = !agreedAll;
    setAgreedAll(next);
    setAgreedTerms(next);
    setAgreedPrivacy(next);
  };

  const handleTerms = () => {
    const next = !agreedTerms;
    setAgreedTerms(next);
    setAgreedAll(next && agreedPrivacy);
  };

  const handlePrivacy = () => {
    const next = !agreedPrivacy;
    setAgreedPrivacy(next);
    setAgreedAll(agreedTerms && next);
  };

  const { mutate: register, isPending } = useMutation({
    mutationFn: registerApi,
    onSuccess: async (data) => {
      await setAuth(data.user, data.accessToken);
      router.replace(BOTTOM_PATH.HOME);
    },
    onError: (err: Error) => {
      Alert.alert("회원가입 실패", err.message);
    },
  });

  const handleSignup = () => {
    if (!name.trim() || !email.trim() || !password.trim()) {
      Alert.alert("입력 오류", "모든 항목을 입력해주세요");
      return;
    }
    if (!isValidSignupPassword(password)) {
      Alert.alert("비밀번호 규칙", SIGNUP_PASSWORD_RULE_MESSAGE);
      return;
    }
    if (password !== passwordConfirm) {
      Alert.alert("입력 오류", "비밀번호가 일치하지 않습니다");
      return;
    }
    if (!agreedTerms || !agreedPrivacy) {
      Alert.alert("약관 동의", "필수 약관에 동의해주세요");
      return;
    }
    register({ name: name.trim(), email: email.trim(), password });
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      {/* 헤더 */}
      <View className="px-4 pt-2 pb-1">
        <TouchableOpacity
          onPress={() => router.back()}
          activeOpacity={0.7}
          className="w-10 h-10 items-center justify-center rounded-full"
        >
          <Text className="text-foreground text-2xl">←</Text>
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView
          contentContainerClassName="px-7 pb-10"
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* 로고 + 타이틀 */}
          <Image
            source={logoImage}
            className="w-full h-[120px]"
            resizeMode="contain"
          />
          <View className="items-center mb-8 mt-5">
            <Text className="text-[27px] font-extrabold text-foreground tracking-tight">
              회원가입
            </Text>
            <Text className="text-[13px] text-subtle mt-1.5 tracking-widest">
              베비맘과 함께 시작해요
            </Text>
          </View>

          {/* 입력 폼 */}
          <View className="gap-4">
            <View className="gap-1.5">
              <Text className="text-[13px] font-semibold text-foreground">
                이름
              </Text>
              <TextInput
                className="bg-input-bg border-[1.5px] border-border rounded-xl px-4 py-[14px] text-[15px] text-foreground"
                placeholder="이름을 입력하세요"
                placeholderTextColor="#BBA9B0"
                value={name}
                onChangeText={setName}
                autoCorrect={false}
              />
            </View>

            <View className="gap-1.5">
              <Text className="text-[13px] font-semibold text-foreground">
                이메일
              </Text>
              <EmailDomainField onChangeEmail={setEmail} />
            </View>

            <View className="gap-1.5">
              <View className="flex-row flex-wrap items-center gap-x-2 gap-y-0.5">
                <Text className="text-[13px] font-semibold text-foreground">
                  비밀번호
                </Text>
                {password.length > 0 && isValidSignupPassword(password) ? (
                  <View className="flex-row items-center gap-1.5">
                    <View className="w-[15px] h-[15px] rounded-full bg-[#22c55e] items-center justify-center">
                      <Text className="text-[8px] font-bold text-white leading-none">
                        ✓
                      </Text>
                    </View>
                    <Text className="text-[12px] font-semibold text-[#16a34a]">
                      가능
                    </Text>
                  </View>
                ) : null}
              </View>
              <TextInput
                className={`bg-input-bg border-[1.5px] rounded-xl px-4 py-[14px] text-[15px] text-foreground ${password.length > 0 && !isValidSignupPassword(password)
                  ? "border-red-300"
                  : "border-border"
                  }`}
                placeholderTextColor="#BBA9B0"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
              {password.length > 0 && !isValidSignupPassword(password) ? (
                <Text className="text-[12px] text-red-400 ml-1">
                  특수문자, 8자 이상이어야 합니다
                </Text>
              ) : null}
            </View>

            <View className="gap-1.5">
              <View className="flex-row flex-wrap items-center gap-x-2 gap-y-0.5">
                <Text className="text-[13px] font-semibold text-foreground">
                  비밀번호 확인
                </Text>
                {passwordConfirm.length > 0 && password === passwordConfirm ? (
                  <View className="flex-row items-center gap-1.5">
                    <View className="w-[15px] h-[15px] rounded-full bg-[#22c55e] items-center justify-center">
                      <Text className="text-[8px] font-bold text-white leading-none">
                        ✓
                      </Text>
                    </View>
                    <Text className="text-[12px] font-semibold text-[#16a34a]">
                      일치
                    </Text>
                  </View>
                ) : null}
              </View>
              <TextInput
                className={`bg-input-bg border-[1.5px] rounded-xl px-4 py-[14px] text-[15px] text-foreground ${passwordConfirm && password !== passwordConfirm
                  ? "border-red-300"
                  : "border-border"
                  }`}
                placeholderTextColor="#BBA9B0"
                value={passwordConfirm}
                onChangeText={setPasswordConfirm}
                secureTextEntry
              />
              {passwordConfirm.length > 0 && password !== passwordConfirm ? (
                <Text className="text-[12px] text-red-400 ml-1">
                  비밀번호가 일치하지 않습니다
                </Text>
              ) : null}
            </View>

            {/* 이용약관 */}
            <View className="bg-input-bg border-[1.5px] border-border rounded-xl p-4 gap-3 mt-1">
              {/* 전체 동의 */}
              <TouchableOpacity
                onPress={handleAllAgree}
                activeOpacity={0.7}
                className="flex-row items-center gap-3"
              >
                <View
                  className={`w-5 h-5 rounded-md border-[1.5px] items-center justify-center ${agreedAll
                    ? "bg-primary border-primary"
                    : "bg-white border-border"
                    }`}
                >
                  {agreedAll && (
                    <Text className="text-white text-[11px] font-bold">✓</Text>
                  )}
                </View>
                <Text className="text-[14px] font-bold text-foreground">
                  전체 동의
                </Text>
              </TouchableOpacity>

              {/* 구분선 */}
              <View className="h-[1px] bg-border" />

              {/* 이용약관 동의 */}
              <TouchableOpacity
                onPress={handleTerms}
                activeOpacity={0.7}
                className="flex-row items-center justify-between"
              >
                <View className="flex-row items-center gap-3">
                  <View
                    className={`w-5 h-5 rounded-md border-[1.5px] items-center justify-center ${agreedTerms
                      ? "bg-primary border-primary"
                      : "bg-white border-border"
                      }`}
                  >
                    {agreedTerms && (
                      <Text className="text-white text-[11px] font-bold">
                        ✓
                      </Text>
                    )}
                  </View>
                  <Text className="text-[13px] text-foreground">
                    <Text className="text-primary font-semibold">[필수] </Text>
                    이용약관 동의
                  </Text>
                </View>
                <Text className="text-[12px] text-subtle">보기 &gt;</Text>
              </TouchableOpacity>

              {/* 개인정보 처리방침 동의 */}
              <TouchableOpacity
                onPress={handlePrivacy}
                activeOpacity={0.7}
                className="flex-row items-center justify-between"
              >
                <View className="flex-row items-center gap-3">
                  <View
                    className={`w-5 h-5 rounded-md border-[1.5px] items-center justify-center ${agreedPrivacy
                      ? "bg-primary border-primary"
                      : "bg-white border-border"
                      }`}
                  >
                    {agreedPrivacy && (
                      <Text className="text-white text-[11px] font-bold">
                        ✓
                      </Text>
                    )}
                  </View>
                  <Text className="text-[13px] text-foreground">
                    <Text className="text-primary font-semibold">[필수] </Text>
                    개인정보 처리방침 동의
                  </Text>
                </View>
                <Text className="text-[12px] text-subtle">보기 &gt;</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              className={`bg-primary rounded-xl py-4 items-center mt-2 shadow-md shadow-primary/30 ${isPending ? "opacity-60" : ""}`}
              onPress={handleSignup}
              disabled={isPending}
              activeOpacity={0.8}
            >
              {isPending ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text className="text-white text-base font-bold tracking-wide">
                  회원가입
                </Text>
              )}
            </TouchableOpacity>

            <View className="flex-row justify-center items-center mt-2">
              <Text className="text-sm text-subtle">이미 계정이 있으신가요? </Text>
              <Link href="/(auth)/login" asChild>
                <TouchableOpacity>
                  <Text className="text-sm font-bold text-primary">로그인</Text>
                </TouchableOpacity>
              </Link>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
