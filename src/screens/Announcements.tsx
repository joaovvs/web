import { Card } from "@components/Card";
import {
  Button as NativeButton,
  HStack,
  Heading,
  VStack,
  Select,
  Text,
  FlatList,
} from "native-base";
import { Plus } from "phosphor-react-native";
import { useState } from "react";

export function Announcements() {
  const [userAnnouncements, setUserAnnouncements] = useState([
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
    { id: 6 },
    { id: 7 },
    { id: 8 },
    { id: 9 },
  ]);

  return (
    <VStack flex={1}>
      <HStack mt={5}>
        <Heading flex={1} textAlign={"center"}>
          Meus anúncios
        </Heading>
        <NativeButton bgColor="transparent">
          <Plus />
        </NativeButton>
      </HStack>

      <VStack flex={1} px={6}>
        <HStack justifyContent={"space-between"} mb={5}>
          <Text>9 anúncios</Text>
          <Select selectedValue="all">
            <Select.Item label="Todos" value="all" />
            <Select.Item label="Ativos" value="active" />
            <Select.Item label="Inativos" value="inactive" />
          </Select>
        </HStack>

        <FlatList
          data={userAnnouncements}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          renderItem={(item) => <Card showAvatarImg={false}/>}
          showsVerticalScrollIndicator={false}
          columnWrapperStyle={{ gap: 10 }}
          flex={1}
          mt={7}
        />
      </VStack>
    </VStack>
  );
}
