import { ProfileImage } from "@components/ProfileImage";
import { Tag } from "@components/Tag";
import {  } from "react-native";
import {
  HStack,
  Image,
  ScrollView,
  VStack,
  Text,
  useTheme,
  Heading,
  Button as BackButton,
  FlatList
} from "native-base";
import { ArrowLeft, Barcode, Money, QrCode } from "phosphor-react-native";
import { useState } from "react";
import { Payments } from "@components/Payments";
import { AcceptedPaymentsMode } from "src/@types/payments";

export function Details() {
  const [acceptedPaymentsMode,setAcceptedPaymentsMode] = useState<AcceptedPaymentsMode []>([{type: 'ticket'},{type:'pix'},{type:'cash'},{type: 'card'},{type: 'deposit'}]);
  const theme = useTheme();
  return (
    <VStack>
      <BackButton alignSelf={'flex-start'} ml={7} mt={5} background={'transparent'}>
          <ArrowLeft color={theme.colors.gray[100]} />
      </BackButton>
      <VStack px={7}>
        <Image size={20} alt="Foto do item" />
        <HStack alignItems={"center"} mt={5} mb={7}>
          <ProfileImage
            source={{ uri: "https://github.com/joaovvs.png" }}
            size={7}
            mr={2}
            borderWidth={2}
          />
          <Text color={"gray.100"} fontFamily={"body"} fontSize={"sm"}>
            Makenna Baptista
          </Text>
        </HStack>

        <VStack alignItems={"flex-start"} mb={2}>
          <Tag variant="gray" type="new" />
        </VStack>

        <HStack alignItems={"center"}>
          <Heading flex={1} fontFamily={"heading"} fontSize={"lg"} color={"gray.100"}>Bicicleta</Heading>
          <Text fontSize={"lg"} color={"blue.300"} fontFamily={"heading"}>
            <Text fontSize={"sm"}>{"R$ "}</Text>
             120,00
          </Text>
        </HStack>

        <Text>Cras congue cursus in tortor sagittis placerat nunc, tellus arcu. Vitae ante leo eget maecenas urna mattis cursus. Mauris metus amet nibh mauris mauris accumsan, euismod. Aenean leo nunc, purus iaculis in aliquam.</Text>
        
        <HStack>
        <Text>Aceita troca?</Text>
        </HStack>

        <VStack>
            <Heading>Meios de pagamento:</Heading>
            <FlatList
              data={acceptedPaymentsMode}
              keyExtractor={(item)=> item.type}
              renderItem={({item})=> (<Payments type={item.type}/>)}
            
            />

        </VStack>
     </VStack>
    </VStack>
  );
}
