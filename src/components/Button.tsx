import {
  Icon,
  Button as ButtonNativeBase,
  HStack,
  IButtonProps,
  Text,
} from "native-base";
import {
  WhatsappLogo,
  TrashSimple,
  Power,
  Tag,
  ArrowLeft,
} from "phosphor-react-native";

import { useTheme } from "native-base";
import { Feather, FontAwesome } from "@expo/vector-icons";

type Props = IButtonProps & {
  title: string;
  type?: "default" | "contact" | "trash" | "power" | "tag" | "back";
  variant?: "black" | "blue" | "gray";
};

export function Button({title,type = "default", variant = "black", ...rest}: Props) {

  const theme = useTheme();

  function bgColorSwitch() {
    switch (variant) {
      case "black":
        return theme.colors.gray[100];
      case "blue":
        return theme.colors.blue[300];
      case "gray":
        return theme.colors.gray[500];
      default:
        return theme.colors.gray[100];
    }
  }

  function contentColorSwitch() {
    switch (variant) {
      case "black":
        return theme.colors.gray[700];
      case "blue":
        return theme.colors.gray[700];
      case "gray":
        return theme.colors.gray[200];
      default:
        return theme.colors.gray[700];
    }
  }

  function buttonIconRender() {
    switch (type) {
      case "contact":
        return <WhatsappLogo size={16} color={contentColorSwitch()} weight="fill" />;
      case "trash":
        return <TrashSimple size={16} color={contentColorSwitch()} />;
      case "power":
        return <Power size={16} color={contentColorSwitch()} />;
      case "tag":
        return <Tag size={16} color={contentColorSwitch()} />;
      case "back":
        return <ArrowLeft size={16} color={contentColorSwitch()} />;
      default:
        return "";
    }
  }

  return (
    <ButtonNativeBase
      flex={1}
      padding={3}
      alignItems={"center"}
      bgColor={bgColorSwitch()}
      {...rest}
    >
      <HStack alignItems={"center"}>
        {buttonIconRender()}
        <Text  fontSize="sm" fontFamily={"heading"} color={contentColorSwitch()} ml={2}>
          {title}
        </Text>
      </HStack>
    </ButtonNativeBase>
  );
}
