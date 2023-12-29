import { useState } from "react";
import { useNavigation } from "@react-navigation/native";


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


export function Announcements() {
  const [userAnnouncements, setUserAnnouncements] = useState([
    { id: '1' },
    { id: '2' },
    { id: '3' },
    { id: '4' },
    { id: '5' },
    { id: '6' },
    { id: '7' },
    { id: '8' },
    { id: '9' },
  ]);

  const navigation = useNavigation<AppNavigatorRoutesProps>();

  const [filter, setFilter] = useState("all");

  function handleCreate(){
    navigation.navigate('create');
  }

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
          <Text>9 anúncios</Text>
          <Select w={100} selectedValue={filter} borderColor={"gray.500"} onValueChange={(itemValue)=> setFilter(itemValue)}>
            <Select.Item label="Todos" value ="all"/>
            <Select.Item label="Ativos" value="active"/>
            <Select.Item label="Inativos" value="inactive"/>
          </Select>
        </HStack>

        <FlatList
          data={userAnnouncements}
          keyExtractor={(item) => item.id}
          numColumns={2}
          renderItem={(item) => <Card announcement={item} showAvatarImg={false}/>}
          showsVerticalScrollIndicator={false}
          columnWrapperStyle={{ gap: 10 }}
          flex={1}
          mt={5}
        />
      </VStack>
    </SafeAreaView>
  );
}
