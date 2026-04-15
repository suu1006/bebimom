import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import robotIcon from "@shared/assets/icon/robot.png";

const CHAT_BG = "#EAF1FF";
const BOT_BUBBLE_BG = "#ECECEF";
const USER_BUBBLE_BG = "#6760F3";

export default function ChatScreen() {
  return (
    <SafeAreaView className="flex-1 bg-[#CFE0FF]" edges={["top"]}>
      <View className="mx-3 mb-3 flex-1 overflow-hidden rounded-[28px] bg-white">
        <View className="border-b border-border/60 px-4 pb-3 pt-2">
          <View className="flex-row items-center justify-between">
            <Text className="text-2xl font-semibold text-[#6565FF]">‹</Text>
            <View className="flex-1 flex-row items-center px-2">
              <View className="mr-2 h-10 w-10 items-center justify-center rounded-full bg-[#5D52D9]/10">
                <Image source={robotIcon} className="h-6 w-6" resizeMode="contain" />
              </View>
              <View>
                <View className="flex-row items-center gap-1">
                  <Text className="text-2xl font-extrabold text-foreground">ALF</Text>
                  <Text className="rounded-md bg-border px-1.5 py-0.5 text-[10px] font-bold text-subtle">
                    AI
                  </Text>
                </View>
                <Text className="text-xs text-subtle">AI 챗봇이 바로 답변드려요</Text>
              </View>
            </View>
            <Text className="text-xl text-[#6565FF]">⋮</Text>
          </View>
        </View>

        <ScrollView
          className="flex-1"
          contentContainerStyle={{
            paddingHorizontal: 16,
            paddingTop: 14,
            paddingBottom: 20,
          }}
          showsVerticalScrollIndicator={false}
        >
          <Text className="mb-2 ml-11 text-xs text-subtle">맘마봇</Text>
          <View className="mb-3 flex-row items-end gap-2">
            <View className="h-8 w-8 items-center justify-center rounded-full bg-[#5D52D9]/15">
              <Image source={robotIcon} className="h-5 w-5" resizeMode="contain" />
            </View>
            <View
              className="max-w-[82%] rounded-2xl px-4 py-3"
              style={{ backgroundColor: BOT_BUBBLE_BG }}
            >
              <Text className="text-base leading-6 text-foreground">
                안녕하세요 쭝이 부모님.{"\n"}
                어떤 고민이 있으세요?
              </Text>
            </View>
          </View>

          <View className="mb-5 items-end">
            <View
              className="max-w-[78%] rounded-2xl px-4 py-3"
              style={{ backgroundColor: USER_BUBBLE_BG }}
            >
              <Text className="text-base leading-6 text-white">
                그저께였나..? 애가 토한거같은데 며칠전에도 토한것같았어. 혹시 그 날이 언제였어?
              </Text>
            </View>
          </View>

          <Text className="mb-2 ml-11 text-xs text-subtle">맘마봇</Text>
          <View className="flex-row items-end gap-2">
            <View className="h-8 w-8 items-center justify-center rounded-full bg-[#5D52D9]/15">
              <Image source={robotIcon} className="h-5 w-5" resizeMode="contain" />
            </View>
            <View
              className="max-w-[84%] rounded-2xl px-3 py-3"
              style={{ backgroundColor: BOT_BUBBLE_BG }}
            >
              <Text className="text-xl font-extrabold text-foreground">2026.01.24 우유먹다가 토함.</Text>
              <Text className="mt-0.5 text-base leading-6 text-foreground">
                1월 24일을 말씀하시는 거군요. 걱정이 많으시겠어요. 도움이 되는 관련 자료를 보시겠어요?
              </Text>
              <Pressable
                className="mt-3 items-center rounded-xl py-3"
                style={{ backgroundColor: CHAT_BG }}
              >
                <Text className="text-base font-bold text-[#8B76FF]">육아 자료 보기</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>

        <View className="border-t border-border/60 px-4 py-3">
          <View className="flex-row items-center rounded-2xl bg-[#F4F5F7] px-3 py-3">
            <Text className="flex-1 text-base text-subtle">AI 챗봇에게 질문해주세요.</Text>
            <View className="flex-row items-center gap-3">
              <Text className="text-lg text-subtle">📎</Text>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
