import { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  Pressable,
  HStack,
  ScrollView,
  VStack,
  Heading,
  useTheme,
  Text,
  Box,
  Image,
} from "native-base";
import { ArrowLeft, Plus, XCircle } from "phosphor-react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { Input } from "@components/Input";

import { useForm, Controller } from "react-hook-form";
import { TextArea } from "@components/TextArea";
import { Button } from "@components/Button";
import { AcceptedPaymentsType } from "src/@types/payments";


import * as ImagePicker from "expo-image-picker";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { ProductDTO } from "@dtos/ProductDTO";

type RouteParamsProps = {
  id: string;
};

export function Edit() {
  const theme = useTheme();
  const [productType, setProductType] = useState<string>("");
  const [acceptTrade, setAcceptTrade] = useState(false);
  const [selectedPaymentsModes, setSelectedPaymentsModes] = useState<
    AcceptedPaymentsType[]
  >([]);

  const [photoIsLoading, setPhotoIsLoading] = useState(false);
  const [announcementPhotos, setAnnouncementPhotos] = useState<string []>([]);
  const [product, setProduct] = useState<ProductDTO>({} as ProductDTO);

  const route = useRoute();

  const { id } = route.params as RouteParamsProps;

  const navigation = useNavigation<AppNavigatorRoutesProps>();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({});



  function handleShowDetail(){
    navigation.navigate('details', {id: product.id});
  }

  function handlePreview(){
    navigation.navigate("preview", {id: product.id})
  }


  function toggleSelectedPayments(type: AcceptedPaymentsType) {
    if (!!selectedPaymentsModes.find((mode) => mode === type)) {
      const filtered = selectedPaymentsModes.filter((mode) => mode! != type);
      setSelectedPaymentsModes(filtered);
    } else {
      setSelectedPaymentsModes([...selectedPaymentsModes, type]);
    }
  }

  async function handleAnnouncementPhotosSelect() {
    setPhotoIsLoading(true);

    try {
      const photosSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4, 4],
        allowsMultipleSelection: true,
        selectionLimit: 3 - announcementPhotos.length
      });

      if (photosSelected.canceled) {
        return;
      }

      if (photosSelected.assets.length>0) {
        setAnnouncementPhotos([...announcementPhotos,...photosSelected.assets.map(photo => photo.uri)]);
      }
    } catch (error) {
      return error;
    } finally {
      setPhotoIsLoading(false);
    }
  }

  function handleAnnouncementPhotosRemove(removed: string){
    setAnnouncementPhotos(announcementPhotos.filter(photo=> photo !==removed));

  }


  return (
    <SafeAreaView style={{flex: 1, paddingTop: 24}}>
      <ScrollView>
        <VStack px={5} mb={7}>
          <HStack alignItems={"center"} justifyContent={"center"} pr={8}>
            <Pressable bg={"transparent"} p={0} onPress={handleShowDetail}>
              <ArrowLeft color={theme.colors.gray[100]} />
            </Pressable>
            <Heading
              flex={1}
              color={"gray.100"}
              fontFamily={"heading"}
              fontSize={"lg"}
              textAlign={"center"}
            >
              Editar Anúncio
            </Heading>
          </HStack>
        </VStack>

        <VStack px={5}>
          <Heading
            fontFamily={"heading"}
            fontSize={"md"}
            color={"gray.200"}
            mb={1}
          >
            Imagens
          </Heading>
          <Text fontFamily={"body"} fontSize={"sm"} color={"gray.300"} mb={4}>
            Escolha até 3 imagens para mostrar o quanto o seu produto é
            incrível!
          </Text>

          <HStack mb={8}>
            {announcementPhotos.map((item, index) => (
              <Box
                key={index}
                size={100}
                rounded={"lg"}
                mr={2}
                overflow={"hidden"}
                position={"relative"}
              >
                <Image
                  source={{uri: item}}
                  alt="Imagem carregada"
                  size={100}
                  resizeMode="cover"
                />
                <Pressable
                  position={"absolute"}
                  bg={"transparent"}
                  top={1}
                  right={1}
                  p={0}
                  onPress={() => handleAnnouncementPhotosRemove(item)}
                >
                  <XCircle
                    color={theme.colors.gray[100]}
                    weight="fill"
                    size={16}
                  />
                </Pressable>
              </Box>
            ))}
            {announcementPhotos.length < 3 && (
              <Pressable 
              alignItems={"center"}
              justifyContent={"center"}
              size={100} bg={"gray.500"} 
              rounded={"lg"} 
              mr={2} 
              onPress={handleAnnouncementPhotosSelect}>
                <Plus />
              </Pressable>
            )}
          </HStack>
        
          <Heading
            fontFamily={"heading"}
            fontSize={"md"}
            color={"gray.200"}
            mb={4}
          >
            Sobre o produto
          </Heading>

          <Controller
            control={control}
            name="title"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Título do Produto"
                keyboardType="default"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.root?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="description"
            render={({ field: { onChange, value } }) => (
              <TextArea
                placeholder="Descrição do produto"
                h={40}
                keyboardType="default"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.root?.message}
              />
            )}
          />

          <HStack mb={8}>

          </HStack>

          <Heading
            fontFamily={"heading"}
            fontSize={"md"}
            color={"gray.200"}
            mb={4}
          >
            Venda
          </Heading>

          <Controller
            control={control}
            name="value"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Valor do Produto"
                keyboardType="default"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.root?.message}
              />
            )}
          />

          <Heading
            fontFamily={"heading"}
            fontSize={"sm"}
            color={"gray.200"}
            mb={4}
          >
            Aceita troca?
          </Heading>

          <Heading
            fontFamily={"heading"}
            fontSize={"sm"}
            color={"gray.200"}
            my={4}
          >
            Meios de Pagamento
          </Heading>

          <VStack mb={26}>
            <Checkbox
              title="Boleto"
              isChecked={
                !!selectedPaymentsModes.find((mode) => mode === "boleto")
              }
              onPress={() => toggleSelectedPayments("boleto")}
            />

            <Checkbox
              title="Pix"
              isChecked={!!selectedPaymentsModes.find((mode) => mode === "pix")}
              onPress={() => toggleSelectedPayments("pix")}
            />
            <Checkbox
              title="Dinheiro"
              isChecked={
                !!selectedPaymentsModes.find((mode) => mode === "cash")
              }
              onPress={() => toggleSelectedPayments("cash")}
            />
            <Checkbox
              title="Cartão de Crédito"
              isChecked={
                !!selectedPaymentsModes.find((mode) => mode === "card")
              }
              onPress={() => toggleSelectedPayments("card")}
            />
            <Checkbox
              title="Depósito"
              isChecked={
                !!selectedPaymentsModes.find((mode) => mode === "deposit")
              }
              onPress={() => toggleSelectedPayments("deposit")}
            />
          </VStack>
        </VStack>
          <HStack flex={1} px={5} background={"gray.700"} h={90} py={5}>
            <Button title="Cancelar" variant={"gray"} mr={3} onPress={handleShowDetail}/>
            <Button title="Avançar" variant={"black"} onPress={handlePreview}/>
          </HStack>
        
      </ScrollView>
    </SafeAreaView>
  );
}
