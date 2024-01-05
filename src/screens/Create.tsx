import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
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
import { useForm, Controller, DefaultValues } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import * as ImagePicker from "expo-image-picker";
import { SafeAreaView } from "react-native-safe-area-context";

import { api } from "@services/api";
import { ProductDTO } from "@dtos/ProductDTO";
import { AppNavigatorRoutesProps } from "@routes/app.routes";

import { Input } from "@components/Input";
import { TextArea } from "@components/TextArea";
import { Button } from "@components/Button";
import { AcceptedPaymentsType } from "src/@types/payments";
import { PaymentsSelector } from "@components/PaymentsSelector";
import { Switch } from "@components/Switch";
import { Radio } from "@components/Radio";

type FormDataProps = {
  name: string;
  description: string;
  is_new: string;
  price: number;
  accept_trade: boolean;
  payment_methods: AcceptedPaymentsType[];
};

export const defaultValues: DefaultValues<FormDataProps> = {
  name: "",
  description: "",
  is_new: "false",
  price: 0,
  accept_trade: false,
  payment_methods: [],
};

const signInSchema = yup.object({
  name: yup
    .string()
    .required("Informe o nome do produto.")
    .min(3, "O nome deve possuir ao menos 3 caracteres"),
  description: yup.string().required("Informe a descrição do produto."),
  price: yup.number().required("Informe o valor do produto."),
  is_new: yup.string().required("Informe se o produto é novo ou usado."),
  accept_trade: yup.boolean().required("Informe se aceita troca."),
  payment_methods: yup
    .array()
    .required("Informe ao menos uma forma de pagamento"),
});

export function Create() {
  const theme = useTheme();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedPaymentsModes, setSelectedPaymentsModes] = useState<
    AcceptedPaymentsType[]
  >([]);
  const [photoIsLoading, setPhotoIsLoading] = useState(false);
  const [productPhotos, setProductPhotos] = useState<string[]>([]);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    resolver: yupResolver(signInSchema),
    defaultValues,
  });

  const navigation = useNavigation<AppNavigatorRoutesProps>();

  function handleBack() {
    navigation.goBack();
  }

  async function handleCreateProduct({
    name,
    description,
    price,
    accept_trade,
    is_new,
    payment_methods,
  }: FormDataProps) {
    try {
      setIsSubmitting(true);

      console.log({
        name,
        description,
        price,
        is_new,
        accept_trade,
        payment_methods,
      });
      /* navigation.navigate('preview', {id: product.id})*/
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
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
        selectionLimit: 3 - productPhotos.length,
      });

      if (photosSelected.canceled) {
        return;
      }

      if (photosSelected.assets.length > 0) {
        setProductPhotos([
          ...productPhotos,
          ...photosSelected.assets.map((photo) => photo.uri),
        ]);
      }
    } catch (error) {
      return error;
    } finally {
      setPhotoIsLoading(false);
    }
  }

  function handleProductPhotosRemove(removed: string) {
    setProductPhotos(productPhotos.filter((photo) => photo !== removed));
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: 24,
        backgroundColor: theme.colors.gray[600],
      }}
    >
      <ScrollView>
        <VStack px={5} mb={7}>
          <HStack alignItems={"center"} justifyContent={"center"} pr={8}>
            <Pressable bg={"transparent"} p={0} onPress={handleBack}>
              <ArrowLeft color={theme.colors.gray[100]} />
            </Pressable>
            <Heading
              flex={1}
              color={"gray.100"}
              fontFamily={"heading"}
              fontSize={"lg"}
              textAlign={"center"}
            >
              Criar Anúncio
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
            {productPhotos.map((item, index) => (
              <Box
                key={index}
                size={100}
                rounded={"lg"}
                mr={2}
                overflow={"hidden"}
                position={"relative"}
              >
                <Image
                  source={{ uri: item }}
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
                  onPress={() => handleProductPhotosRemove(item)}
                >
                  <XCircle
                    color={theme.colors.gray[100]}
                    weight="fill"
                    size={16}
                  />
                </Pressable>
              </Box>
            ))}
            {productPhotos.length < 3 && (
              <Pressable
                alignItems={"center"}
                justifyContent={"center"}
                size={100}
                bg={"gray.500"}
                rounded={"lg"}
                mr={2}
                onPress={handleAnnouncementPhotosSelect}
              >
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
            name="name"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Título do Produto"
                keyboardType="default"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.name?.message}
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
                errorMessage={errors.description?.message}
              />
            )}
          />

          <Controller
            name="is_new"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Radio
                name="isNewRadio"
                onChange={onChange}
                value={String(value)}
                errorMessage={errors.is_new?.message}
              />
            )}
          />

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
            name="price"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Valor do Produto"
                keyboardType="numeric"
                onChangeText={onChange}
                value={String(value)}
                errorMessage={errors.price?.message}
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

          <Controller
            name="accept_trade"
            control={control}
            render={({ field}) => (
              <Switch
              errorMessage={errors.accept_trade?.message}
              {...field}
              />
            )}
          />

          <Heading
            fontFamily={"heading"}
            fontSize={"sm"}
            color={"gray.200"}
            my={4}
          >
            Meios de Pagamento
          </Heading>

          <VStack mb={26}>
            <Controller
              name="payment_methods"
              control={control}
              render={({ field: { onChange, value } }) => (
                <PaymentsSelector
                  value={value}
                  onChange={()=> console.log(value)}
                  errorMessage={errors.payment_methods?.message}
                />
              )}
            />
          </VStack>
        </VStack>

        <HStack flex={1} px={5} background={"gray.700"} h={90} py={5}>
          <Button
            title="Cancelar"
            variant={"gray"}
            mr={3}
            onPress={handleBack}
          />
          <Button
            title="Avançar"
            variant={"black"}
            onPress={handleSubmit(handleCreateProduct)}
            isLoading={isSubmitting}
          />
        </HStack>
      </ScrollView>
    </SafeAreaView>
  );
};
