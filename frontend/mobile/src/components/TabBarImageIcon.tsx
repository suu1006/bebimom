import { Image, type ImageSourcePropType } from "react-native";

type Props = {
  source: ImageSourcePropType;
  focused: boolean;
  size: number;
  activeColor: string;
  inactiveColor: string;
};

export function TabBarImageIcon({
  source,
  focused,
  size,
  activeColor,
  inactiveColor,
}: Props) {
  return (
    <Image
      source={source}
      style={{
        width: size,
        height: size,
        tintColor: focused ? activeColor : inactiveColor,
      }}
      resizeMode="contain"
    />
  );
}
