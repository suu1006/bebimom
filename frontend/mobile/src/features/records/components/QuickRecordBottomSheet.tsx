import Ionicons from "@expo/vector-icons/Ionicons";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Easing,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { APP_COLORS } from "@shared/src/colors";
import type { QuickRecordKind } from "../constants";
import { QUICK_RECORD_SHEET_META } from "../constants";

const WINDOW_HEIGHT = Dimensions.get("window").height;
const OFFSCREEN_Y = Math.min(WINDOW_HEIGHT * 1.05, 880);
const SHEET_MAX_H = WINDOW_HEIGHT * 0.9;

type FeedingType = "formula" | "breast" | "solid";

const FEEDING_TYPE_OPTIONS: { key: FeedingType; label: string }[] = [
  { key: "formula", label: "분유" },
  { key: "breast", label: "모유" },
  { key: "solid", label: "이유식" },
];

type Props = {
  visible: boolean;
  kind: QuickRecordKind;
  onClose: () => void;
  onComplete?: (payload: Record<string, string | undefined>) => void;
};

export function QuickRecordBottomSheet({
  visible,
  kind,
  onClose,
  onComplete,
}: Props) {
  const insets = useSafeAreaInsets();
  const meta = QUICK_RECORD_SHEET_META[kind];

  const translateY = useRef(new Animated.Value(OFFSCREEN_Y)).current;
  const backdropOpacity = useRef(new Animated.Value(0)).current;

  const [feedingType, setFeedingType] = useState<FeedingType>("formula");
  const [time, setTime] = useState("오전 09:00");
  const [amountMl, setAmountMl] = useState("0");
  const [memo, setMemo] = useState("");
  const [sleepMinutes, setSleepMinutes] = useState("");
  const [diaperType, setDiaperType] = useState<"wet" | "dirty" | "mixed">("wet");
  const [extraValue, setExtraValue] = useState("");

  const resetFields = useCallback(() => {
    setFeedingType("formula");
    setTime("오전 09:00");
    setAmountMl("0");
    setMemo("");
    setSleepMinutes("");
    setDiaperType("wet");
    setExtraValue("");
  }, []);

  useEffect(() => {
    if (visible) {
      resetFields();
    }
  }, [visible, kind, resetFields]);

  useLayoutEffect(() => {
    if (!visible) return;
    translateY.setValue(OFFSCREEN_Y);
    backdropOpacity.setValue(0);
    Animated.parallel([
      Animated.timing(backdropOpacity, {
        toValue: 1,
        duration: 220,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 340,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();
  }, [visible, translateY, backdropOpacity]);

  const dismissAnimated = useCallback(
    (afterClose?: () => void) => {
      Keyboard.dismiss();
      Animated.parallel([
        Animated.timing(backdropOpacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: OFFSCREEN_Y,
          duration: 280,
          easing: Easing.in(Easing.cubic),
          useNativeDriver: true,
        }),
      ]).start(({ finished }) => {
        if (finished) {
          afterClose?.();
          onClose();
        }
      });
    },
    [onClose, translateY, backdropOpacity],
  );

  const buildPayload = (): Record<string, string | undefined> => {
    const base = { memo: memo.trim() || undefined };
    let payload: Record<string, string | undefined> = { ...base };
    if (kind === "feeding") {
      payload = {
        ...base,
        feedingType,
        time: time.trim() || undefined,
        amountMl: amountMl.trim() || undefined,
      };
    } else if (kind === "sleep") {
      payload = { ...base, sleepMinutes: sleepMinutes.trim() || undefined };
    } else if (kind === "diaper") {
      payload = { ...base, diaperType };
    } else if (kind === "growth" || kind === "temperature" || kind === "medication") {
      payload = { ...base, value: extraValue.trim() || undefined };
    }
    return payload;
  };

  const handleComplete = () => {
    const payload = buildPayload();
    dismissAnimated(() => onComplete?.(payload));
  };

  const renderFeedingFields = () => (
    <>
      <Text className="mb-2 text-[13px] font-medium text-subtle">유형 선택</Text>
      <View className="mb-5 flex-row gap-2">
        {FEEDING_TYPE_OPTIONS.map((opt) => {
          const selected = feedingType === opt.key;
          return (
            <Pressable
              key={opt.key}
              onPress={() => setFeedingType(opt.key)}
              className={`flex-1 rounded-full py-2.5 ${selected ? "bg-primary" : "bg-report-segment"}`}
            >
              <Text
                className={`text-center text-[14px] font-semibold ${selected ? "text-white" : "text-subtle"}`}
              >
                {opt.label}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <View className="mb-5 flex-row gap-3">
        <View className="flex-1">
          <Text className="mb-2 text-[13px] font-medium text-subtle">시간</Text>
          <View className="flex-row items-center rounded-2xl border border-border bg-input-bg px-3 py-3">
            <TextInput
              value={time}
              onChangeText={setTime}
              placeholder="오전 09:00"
              placeholderTextColor={APP_COLORS.placeholder}
              className="flex-1 text-[15px] text-foreground"
            />
            <Ionicons name="time-outline" size={20} color={APP_COLORS.subtle} />
          </View>
        </View>
        <View className="flex-1">
          <Text className="mb-2 text-[13px] font-medium text-subtle">양 (ML)</Text>
          <TextInput
            value={amountMl}
            onChangeText={setAmountMl}
            placeholder="0"
            placeholderTextColor={APP_COLORS.placeholder}
            keyboardType="decimal-pad"
            className="rounded-2xl border border-border bg-input-bg px-3 py-3 text-[15px] text-foreground"
          />
        </View>
      </View>
    </>
  );

  const renderSleepFields = () => (
    <View className="mb-5">
      <Text className="mb-2 text-[13px] font-medium text-subtle">수면 시간 (분)</Text>
      <TextInput
        value={sleepMinutes}
        onChangeText={setSleepMinutes}
        placeholder="예: 90"
        placeholderTextColor={APP_COLORS.placeholder}
        keyboardType="number-pad"
        className="rounded-2xl border border-border bg-input-bg px-3 py-3 text-[15px] text-foreground"
      />
    </View>
  );

  const renderDiaperFields = () => (
    <>
      <Text className="mb-2 text-[13px] font-medium text-subtle">유형 선택</Text>
      <View className="mb-5 flex-row gap-2">
        {(
          [
            { key: "wet" as const, label: "소변" },
            { key: "dirty" as const, label: "대변" },
            { key: "mixed" as const, label: "혼합" },
          ] as const
        ).map((opt) => {
          const selected = diaperType === opt.key;
          return (
            <Pressable
              key={opt.key}
              onPress={() => setDiaperType(opt.key)}
              className={`flex-1 rounded-full py-2.5 ${selected ? "bg-primary" : "bg-report-segment"}`}
            >
              <Text
                className={`text-center text-[14px] font-semibold ${selected ? "text-white" : "text-subtle"}`}
              >
                {opt.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </>
  );

  const renderExtraNumberField = (label: string, placeholder: string) => (
    <View className="mb-5">
      <Text className="mb-2 text-[13px] font-medium text-subtle">{label}</Text>
      <TextInput
        value={extraValue}
        onChangeText={setExtraValue}
        placeholder={placeholder}
        placeholderTextColor={APP_COLORS.placeholder}
        keyboardType="decimal-pad"
        className="rounded-2xl border border-border bg-input-bg px-3 py-3 text-[15px] text-foreground"
      />
    </View>
  );

  const renderExtraTextField = (label: string, placeholder: string) => (
    <View className="mb-5">
      <Text className="mb-2 text-[13px] font-medium text-subtle">{label}</Text>
      <TextInput
        value={extraValue}
        onChangeText={setExtraValue}
        placeholder={placeholder}
        placeholderTextColor={APP_COLORS.placeholder}
        className="rounded-2xl border border-border bg-input-bg px-3 py-3 text-[15px] text-foreground"
      />
    </View>
  );

  const renderKindFields = () => {
    switch (kind) {
      case "feeding":
        return renderFeedingFields();
      case "sleep":
        return renderSleepFields();
      case "diaper":
        return renderDiaperFields();
      case "growth":
        return renderExtraNumberField("몸무게 (kg)", "예: 5.2");
      case "temperature":
        return renderExtraNumberField("체온 (°C)", "예: 36.5");
      case "medication":
        return renderExtraTextField("약 이름", "복용한 약을 입력해 주세요");
      case "activity":
      default:
        return null;
    }
  };

  const sheetChrome = {
    width: "100%" as const,
    maxHeight: SHEET_MAX_H,
    backgroundColor: APP_COLORS.background,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingBottom: Math.max(insets.bottom, 16),
    transform: [{ translateY }],
  };

  return (
    <Modal
      visible={visible}
      animationType="none"
      transparent
      onRequestClose={() => dismissAnimated()}
      statusBarTranslucent
    >
      <View className="flex-1 justify-end">
        <Animated.View
          pointerEvents="box-none"
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.45)",
            opacity: backdropOpacity,
          }}
        >
          <Pressable
            style={{ position: "absolute", left: 0, right: 0, top: 0, bottom: 0 }}
            onPress={() => dismissAnimated()}
            accessibilityLabel="시트 닫기"
          />
        </Animated.View>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={{ width: "100%", maxHeight: SHEET_MAX_H }}
        >
          <Animated.View style={sheetChrome}>
            <View className="items-center pt-2 pb-1">
              <View className="h-1 w-10 rounded-full bg-border" />
            </View>

            <ScrollView
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
              className="px-5 pt-2"
              contentContainerStyle={{ paddingBottom: 8 }}
            >
              <View className="mb-5 flex-row items-start justify-between">
                <View className="flex-row items-center gap-3 pr-2">
                  <View className="h-12 w-12 items-center justify-center rounded-2xl bg-primary/15">
                    <Ionicons name={meta.ionIcon} size={26} color={APP_COLORS.primary} />
                  </View>
                  <View className="flex-1">
                    <Text className="text-[20px] font-bold text-foreground">{meta.title}</Text>
                    <Text className="mt-0.5 text-[13px] text-subtle">{meta.subtitle}</Text>
                  </View>
                </View>
                <Pressable
                  onPress={() => dismissAnimated()}
                  hitSlop={12}
                  className="h-9 w-9 items-center justify-center rounded-full bg-report-segment"
                  accessibilityLabel="닫기"
                >
                  <Ionicons name="close" size={22} color={APP_COLORS.subtle} />
                </Pressable>
              </View>

              {renderKindFields()}

              <Text className="mb-2 text-[13px] font-medium text-subtle">메모</Text>
              <TextInput
                value={memo}
                onChangeText={setMemo}
                placeholder="특이사항이 있다면 적어주세요."
                placeholderTextColor={APP_COLORS.placeholder}
                multiline
                textAlignVertical="top"
                className="mb-6 min-h-[100px] rounded-2xl border border-border bg-input-bg px-3 py-3 text-[15px] text-foreground"
              />

              <Pressable
                onPress={handleComplete}
                className="mb-1 items-center rounded-2xl bg-primary py-4 active:opacity-90"
              >
                <Text className="text-[16px] font-bold text-white">기록 완료하기</Text>
              </Pressable>
            </ScrollView>
          </Animated.View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
}
