import { HStack, VStack, Text } from "native-base";
import { Button } from "@components/Button";
import { ProfileImage } from "./ProfileImage";

import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";

export function HomeHeader() {

  const navigation = useNavigation<AppNavigatorRoutesProps>();

  function handleCreateAnnouncement(){
    navigation.navigate('create');
  }

  return (
    <HStack mt={5} mb={8} justifyContent={"space-between"}>
      <HStack flex={1} mr={8}>
        <ProfileImage
          w={45}
          h={45}
          source={{ uri: "https://github.com/joaovvs.png" }}
        />
        <VStack ml={2} >
          <Text fontFamily={"body"} fontSize={"md"} color={'gray.100'}>Boas vindas,</Text>
          <Text fontFamily={"heading"} fontSize={"md"} color={'gray.100'}>Usuário!</Text>
        </VStack>
      </HStack>

      <Button title="Criar anúncio" variant={"black"} type="add" onPress={handleCreateAnnouncement} />
    </HStack>
  );
}
