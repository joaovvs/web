import {
  VStack,
  Text,
  HStack,
  Heading,
  useTheme,
} from "native-base";
import { TouchableOpacity } from "react-native";
import { ArrowRight, Tag } from "phosphor-react-native";

export function Sell() {
  const theme = useTheme();
  return (
    <VStack mb={8}>
      <Text fontSize={"sm"} 
        fontFamily={"body"} 
        color={"gray.300"}
        mb={3}
        >
        Seus produtos anunciados para venda
      </Text>
      <HStack
        backgroundColor={"blue.500:alpha.10"}
        pl={4}
        pr={5}
        py={3}
        alignItems={"center"}
        justifyContent={"space-between"}
        borderRadius={"lg"}
      >
        <HStack alignItems={"center"}>
          <Tag color={theme.colors.blue[500]} />

          <VStack ml={4}>
            <Heading fontSize={"lg"} color={"gray.200"} fontFamily={"heading"}>
              4
            </Heading>
            <Text fontSize={"xs"} color={"gray.200"} fontFamily={"body"}>
              anúncios ativos
            </Text>
          </VStack>
        </HStack>
        <TouchableOpacity>
          <HStack>
            <Text
              color={"blue.500"}
              fontFamily={"heading"}
              mr={2}
              fontSize={"xs"}
            >
              Meus anúncios
            </Text>
            <ArrowRight color={theme.colors.blue[500]} />
          </HStack>
        </TouchableOpacity>
      </HStack>
    </VStack>
  );
}
