import { Box, Image, Text } from "native-base";
import productImg from "@assets/product1.png";
import { ProfileImage } from "./ProfileImage";
import { Tag } from "./Tag";

type ProductCardProps = {
  isActive?: boolean;
  showAvatarImg?: boolean;
};

export function Card({
  isActive = true,
  showAvatarImg = true,
}: ProductCardProps) {
  return (
    <Box
      overflow={"hidden"}
      position={"relative"}
      borderRadius={"lg"}
      marginBottom={5}
    >
      <Box>
        <Image
          w={150}
          h={100}
          source={productImg}
          alt="Imagem do produto 1"
          borderRadius={"lg"}
        />
        <ProfileImage
          opacity={showAvatarImg ? 1 : 0}
          source={{ uri: "https://github.com/joaovvs.png" }}
          borderWidth={1}
          position={"absolute"}
          top={1}
          left={1}
          size={6}
        />
        <Tag type="new" variant="blue" position="absolute" top={1} right={1} />

        {!isActive && (
          <Box
            flex={1}
            bg={"gray.100:alpha"}
            opacity={0.5}
            alignItems={"flex-end"}
            borderRadius={"lg"}
            position={"absolute"}
            top={0}
            right={0}
            left={0}
            bottom={0}
          />
        )}
        {!isActive && (
          <Text
            textTransform={"uppercase"}
            color={"gray.700"}
            fontSize={11}
            fontFamily={"heading"}
            position={"absolute"}
            bottom={2}
            left={2}
          >
            Anúncio desativado
          </Text>
        )}
      </Box>
      <Text
        fontFamily={"body"}
        fontSize={"sm"}
        color={isActive ? "gray.200" : "gray.400"}
        numberOfLines={1}
      >
        Tênis vermelho
      </Text>
      <Text
        fontFamily={"heading"}
        fontSize={"sm"}
        color={isActive ? "gray.200" : "gray.400"}
        numberOfLines={1}
      >
        {" "}
        <Text fontSize={"xs"}>R$</Text> 59,90
      </Text>
    </Box>
  );
}
