import { useEffect, useState } from "react";
import {
  VStack,
  Text,
  HStack,
  Heading,
  useTheme,
  Toast,
} from "native-base";
import { TouchableOpacity } from "react-native";
import { ArrowRight, Tag } from "phosphor-react-native";

import { ProductDTO } from "@dtos/ProductDTO";

import { useNavigation } from '@react-navigation/native'
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { api } from "@services/api";

export function Sell() {

  const navigation = useNavigation<AppNavigatorRoutesProps>();

  const [productsCounter, setProductsCounter] = useState(0);
  const theme = useTheme();

  function handleAnnouncements(){
    navigation.navigate('announcements');
  }

  async function fetchUserProducts(){
    try {
      const response = await api.get('users/products');
      const products = response.data as ProductDTO[];
      if(products){
        setProductsCounter(products.length);
      }

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    fetchUserProducts();
  },[]);

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
              {productsCounter}
            </Heading>
            <Text fontSize={"xs"} color={"gray.200"} fontFamily={"body"}>
              anúncios ativos
            </Text>
          </VStack>
        </HStack>
        <TouchableOpacity onPress={handleAnnouncements}>
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
