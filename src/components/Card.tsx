import { Box, Image, Text, Pressable, IPressableProps } from "native-base";
import { useNavigation} from '@react-navigation/native';

import productImg from "@assets/product1.png";
import { ProfileImage } from "./ProfileImage";
import { Tag } from "./Tag";
import { AppNavigatorRoutesProps } from "@routes/app.routes";




type ProductCardProps = IPressableProps &{
  isActive?: boolean;
  showAvatarImg?: boolean;
  announcement: any;
};



export function Card({announcement, isActive = true, showAvatarImg = true, ...rest}: ProductCardProps) {
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  function handleShowDetails(){
    navigation.navigate("details", {id: announcement.id});
  }

  return (
    <Pressable
      overflow={"hidden"}
      position={"relative"}
      borderRadius={"lg"}
      marginBottom={5}
      onPress={handleShowDetails}
      {...rest}
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
        Tênis vermelho {announcement.id}
      </Text>
      <Text
        fontFamily={"heading"}
        fontSize={"sm"}
        color={isActive ? "gray.200" : "gray.400"}
        numberOfLines={1}
      >
        <Text fontSize={"xs"}>R$</Text> 59,90
      </Text>
    </Pressable>
  );
}
