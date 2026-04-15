import { useCallback, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  Pressable,
  ScrollView,
  Keyboard,
} from "react-native";

const CUSTOM_VALUE = "__custom__";

const PRESET_OPTIONS: { label: string; value: string }[] = [
  { label: "네이버", value: "naver.com" },
  { label: "Gmail", value: "gmail.com" },
  { label: "다음", value: "daum.net" },
  { label: "한메일", value: "hanmail.net" },
  { label: "네이트", value: "nate.com" },
  { label: "카카오", value: "kakao.com" },
  { label: "Outlook", value: "outlook.com" },
  { label: "Hotmail", value: "hotmail.com" },
  { label: "직접 입력", value: CUSTOM_VALUE },
];

type Props = {
  /** 완성된 이메일(local@domain). 도메인 미입력 등이면 빈 문자열 */
  onChangeEmail: (email: string) => void;
};

export function EmailDomainField({ onChangeEmail }: Props) {
  const [localPart, setLocalPart] = useState("");
  const [selectedDomain, setSelectedDomain] = useState("naver.com");
  const [customDomain, setCustomDomain] = useState("");
  const [pickerOpen, setPickerOpen] = useState(false);

  const emit = useCallback(
    (local: string, domainKey: string, custom: string) => {
      const l = local.trim();
      if (!l) {
        onChangeEmail("");
        return;
      }
      if (domainKey === CUSTOM_VALUE) {
        const d = custom.trim().toLowerCase();
        if (!d) {
          onChangeEmail("");
          return;
        }
        onChangeEmail(`${l}@${d}`);
        return;
      }
      onChangeEmail(`${l}@${domainKey}`);
    },
    [onChangeEmail]
  );

  const onLocalChange = (text: string) => {
    const t = text.replace(/@/g, "");
    setLocalPart(t);
    emit(t, selectedDomain, customDomain);
  };

  const onCustomDomainChange = (text: string) => {
    const t = text.replace(/^@+/, "").replace(/\s/g, "");
    setCustomDomain(t);
    emit(localPart, CUSTOM_VALUE, t);
  };

  const pickDomain = (domainValue: string) => {
    setSelectedDomain(domainValue);
    if (domainValue !== CUSTOM_VALUE) {
      setCustomDomain("");
      emit(localPart, domainValue, "");
    } else {
      emit(localPart, CUSTOM_VALUE, customDomain);
    }
    setPickerOpen(false);
    Keyboard.dismiss();
  };

  const displayRight =
    selectedDomain === CUSTOM_VALUE
      ? customDomain.trim()
        ? customDomain.trim().toLowerCase()
        : "도메인 입력"
      : selectedDomain;

  const inputClass =
    "bg-input-bg border-[1.5px] border-border rounded-xl px-3 py-[14px] text-[15px] text-foreground";

  return (
    <View className="gap-2">
      <View className="flex-row items-stretch gap-2">
        <TextInput
          className={`${inputClass} flex-1 min-w-[96px]`}
          placeholder="아이디"
          placeholderTextColor="#BBA9B0"
          value={localPart}
          onChangeText={onLocalChange}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />
        <View className="justify-center px-0.5">
          <Text className="text-[17px] font-semibold text-foreground">@</Text>
        </View>
        <TouchableOpacity
          activeOpacity={0.75}
          onPress={() => {
            Keyboard.dismiss();
            setPickerOpen(true);
          }}
          className={`${inputClass} flex-1 min-w-[100px] justify-center`}
        >
          <Text
            className="text-[15px] text-foreground"
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {selectedDomain === CUSTOM_VALUE && !customDomain.trim()
              ? "직접 입력"
              : displayRight}
          </Text>
        </TouchableOpacity>
      </View>

      {selectedDomain === CUSTOM_VALUE && (
        <TextInput
          className={inputClass}
          placeholder="도메인 직접 입력 (예: company.co.kr)"
          placeholderTextColor="#BBA9B0"
          value={customDomain}
          onChangeText={onCustomDomainChange}
          autoCapitalize="none"
          autoCorrect={false}
        />
      )}

      <Modal
        visible={pickerOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setPickerOpen(false)} 
      >
        <View className="flex-1 justify-end">
          <Pressable
            className="absolute inset-0 bg-black/40"
            onPress={() => setPickerOpen(false)}
          />
          <View className="bg-white rounded-t-3xl max-h-[70%] pb-8 pt-3">
            <View className="w-10 h-1 bg-border rounded-full self-center mb-3" />

            <ScrollView
              keyboardShouldPersistTaps="handled"
              className="px-2"
              showsVerticalScrollIndicator={false}
            >
              {PRESET_OPTIONS.map((opt) => (
                <TouchableOpacity
                  key={opt.value}
                  onPress={() => pickDomain(opt.value)}
                  activeOpacity={0.65}
                  className={`py-3.5 px-4 rounded-xl mb-1 flex-row justify-between items-center ${selectedDomain === opt.value ? "bg-primary/10" : ""
                    }`}
                >
                  <Text className="text-[15px] text-foreground font-medium">
                    {opt.label}
                  </Text>
                  {opt.value !== CUSTOM_VALUE && (
                    <Text className="text-[13px] text-subtle">{opt.value}</Text>
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}
