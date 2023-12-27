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
  Plus
} from "phosphor-react-native";

import { useTheme } from "native-base";

type Props = IButtonProps & {
  title: string;
  type?: "default" | "contact" | "trash" | "power" | "tag" | "back" | 'add';
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
    const iconSize = 16;
    switch (type) {
      case "contact":
        return <WhatsappLogo size={iconSize} color={contentColorSwitch()} weight="fill" />;
      case "trash":
        return <TrashSimple size={iconSize} color={contentColorSwitch()} />;
      case "power":
        return <Power size={iconSize} color={contentColorSwitch()} />;
      case "tag":
        return <Tag size={iconSize} color={contentColorSwitch()} />;
      case "back":
        return <ArrowLeft size={iconSize} color={contentColorSwitch()} />;
      case "add":
        return <Plus size={iconSize} color={contentColorSwitch()} />;
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
      borderRadius={'lg'}
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
