import { useCallback, useState } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";


import {
  Pressable,
  HStack,
  Heading,
  VStack,
  Select,
  Text,
  FlatList,
} from "native-base";
import { Plus } from "phosphor-react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Card } from "@components/Card";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { ProductDTO } from "@dtos/ProductDTO";
import { Loading } from "@components/Loading";
import { api } from "@services/api";


export function Announcements() {
  const [ isLoading, setIsLoading] = useState(true);
  const [userProducts, setUserProducts] = useState<ProductDTO []>([]);

  const navigation = useNavigation<AppNavigatorRoutesProps>();

  const [filter, setFilter] = useState("all");

  function handleCreate(){
    navigation.navigate('create');
  }

  async function fetchUserProducts(){
    try {
      setIsLoading(true);

      const result = await api.get('user/products');
      
      console.log(result.data);
      setUserProducts(result.data);
      
    } catch (error) {
      console.log(error);
    }finally{
      setIsLoading(false);
    }
  }

  useFocusEffect(useCallback(()=>{
    fetchUserProducts();
  },[]));
  return (
    <SafeAreaView style={{flex: 1, paddingTop: 24,  paddingLeft:24, paddingRight:24 }}>
      <HStack pl={8} mb={8}>
        <Heading flex={1} textAlign={"center"} mr={2}>
          Meus anúncios
        </Heading>
        <Pressable onPress={handleCreate}>
          <Plus />
        </Pressable>
      </HStack>

      <VStack flex={1} >
        <HStack justifyContent={"space-between"} >
          <Text>{userProducts.length} anúncios</Text>
          <Select w={100} selectedValue={filter} borderColor={"gray.500"} onValueChange={(itemValue)=> setFilter(itemValue)}>
            <Select.Item label="Todos" value ="all"/>
            <Select.Item label="Ativos" value="active"/>
            <Select.Item label="Inativos" value="inactive"/>
          </Select>
        </HStack>
        { isLoading ? <Loading/> : 
        <FlatList
          data={userProducts}
          keyExtractor={(item) => item.id}
          numColumns={2}
          renderItem={({item}) => <Card product={item}/>}
          showsVerticalScrollIndicator={false}
          columnWrapperStyle={{ gap: 10 }}
          flex={1}
          mt={5}
        />}
        
      </VStack>
    </SafeAreaView>
  );
}
