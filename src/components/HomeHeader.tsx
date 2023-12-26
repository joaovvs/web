import { HStack, VStack, Text, Image } from "native-base";
import { Button } from "@components/Button";
import { ProfileImage } from "./ProfileImage";

export function HomeHeader() {
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

      <Button title="Criar anúncio" variant={"black"} type="add" />
    </HStack>
  );
}
