import { Box, Image, Text, Pressable, IPressableProps } from "native-base";
import { useNavigation} from '@react-navigation/native';

import productImg from "@assets/product1.png";
import { ProfileImage } from "./ProfileImage";
import { Tag } from "./Tag";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { ProductDTO } from "@dtos/ProductDTO";
import { api } from "@services/api";
import { ImageSquare } from "phosphor-react-native";




type ProductCardProps = IPressableProps & {
  product: ProductDTO;
}



export function Card({product, ...rest}: ProductCardProps) {
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  function handleShowDetails(){
    navigation.navigate("details", {id: product.id});
  }

  console.log(product);

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
        {product.product_images?.length>0  ?
        <Image
          w={150}
          h={100}
          source={{uri: `${api.defaults.baseURL}/images/${product.product_images[0].path}`}}
          alt="Imagem do produto 1"
          borderRadius={"lg"}

        /> :
        <Box w={150}
          h={100}
          rounded={"lg"}
          bgColor={"gray.500"}
          alignContent={"center"}
          alignItems={"center"}
          overflow={"hidden"}>
          <ImageSquare size={90}/>   
        </Box >       
      }
        
        
        <ProfileImage
          source={product.user?.avatar ? {  uri: `${api.defaults.baseURL}/images/${product.user.avatar}`}: productImg}
          borderWidth={1}
          position={"absolute"}
          top={1}
          left={1}
          size={6}
        />
        <Tag type={product.is_new ? 'new': 'used'} variant="blue" position="absolute" top={1} right={1} />

        {product.is_active !==false &&(
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
        {product.is_active===false &&(
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
        color={product.is_active===false ? "gray.400": "gray.200"}
        numberOfLines={1}
      >
        {product.name}
      </Text>
      <Text
        fontFamily={"heading"}
        fontSize={"sm"}
        color={product.is_active===false ? "gray.400": "gray.200"}
        numberOfLines={1}
      >
        <Text fontSize={"xs"}>R$</Text> {product.price}
      </Text>
    </Pressable>
  );
}
