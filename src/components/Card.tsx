import { Box, Image, Text } from "native-base";
import productImg from "@assets/product1.png";
import { ProfileImage } from "./ProfileImage";
import { Tag } from "./Tag";

export function Card() {
  return (
    <Box
      overflow={"hidden"}
      position={"relative"}
      borderRadius={"lg"}
      marginBottom={5}
    >
      <Image
        w={150}
        h={100}
        source={productImg}
        alt="Imagem do produto 1"
        borderRadius={"lg"}
      />
      <ProfileImage
        source={{ uri: "https://github.com/joaovvs.png" }}
        borderWidth={1}
        position={"absolute"}
        top={1}
        left={1}
        size={6}
      />
      <Tag type="new" variant="blue" position="absolute" top={1} right={1} />

      <Text fontFamily={"body"} fontSize={"sm"} numberOfLines={1}>Tênis vermelho</Text>
      <Text fontFamily={"heading"} fontSize={"sm"} numberOfLines={1}> <Text fontSize={"xs"}>R$</Text> 59,90</Text>
    </Box>
  );
}
