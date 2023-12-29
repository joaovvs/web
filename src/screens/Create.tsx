import {
  Button as NativeButton,
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
import { useState } from "react";
import productImg from "@assets/product.png";
import { SafeAreaView } from "react-native-safe-area-context";
import { Input } from "@components/Input";

import { useForm, Controller } from "react-hook-form";
import { TextArea } from "@components/TextArea";
import { RadioButton } from "@components/RadioButton";
import { Toggle } from "@components/Toggle";
import { Button } from "@components/Button";
import { AcceptedPaymentsType } from "src/@types/payments";
import { Checkbox } from "@components/Checkbox";

export function Create() {
  const theme = useTheme();
  const [productType, setProductType] = useState<string>("");
  const [acceptTrade, setAcceptTrade] = useState(false);
  const [selectedPaymentsModes, setSelectedPaymentsModes] = useState<
    AcceptedPaymentsType[]
  >([]);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({});

  const [uploadedImage, setUploadedImg] = useState([productImg, productImg]);

  function toggleSelectedPayments(type: AcceptedPaymentsType) {
    if (!!selectedPaymentsModes.find((mode) => mode === type)) {
      const filtered = selectedPaymentsModes.filter((mode) => mode! != type);
      setSelectedPaymentsModes(filtered);
    } else {
      setSelectedPaymentsModes([...selectedPaymentsModes, type]);
    }
  }
  return (
    <SafeAreaView style={{flex: 1, paddingTop: 24}}>
      <ScrollView>
        <VStack px={5} mt={5} mb={7}>
          <HStack alignItems={"center"} justifyContent={"center"} pr={8}>
            <NativeButton bg={"transparent"} p={0}>
              <ArrowLeft color={theme.colors.gray[100]} />
            </NativeButton>
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
            {uploadedImage.map((item, index) => (
              <Box
                key={index}
                size={100}
                rounded={"lg"}
                mr={2}
                overflow={"hidden"}
                position={"relative"}
              >
                <Image
                  source={item}
                  alt="Imagem carregada"
                  size={100}
                  resizeMode="cover"
                />
                <NativeButton
                  position={"absolute"}
                  bg={"transparent"}
                  top={1}
                  right={1}
                  p={0}
                >
                  <XCircle
                    color={theme.colors.gray[100]}
                    weight="fill"
                    size={16}
                  />
                </NativeButton>
              </Box>
            ))}
            {uploadedImage.length < 4 && (
              <NativeButton size={100} bg={"gray.500"} rounded={"lg"} mr={2}>
                <Plus />
              </NativeButton>
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
            <RadioButton
              title="Produto novo"
              isChecked={productType === "new"}
              onPress={() => setProductType("new")}
            />

            <RadioButton
              title="Produto usado"
              isChecked={productType === "used"}
              onPress={() => setProductType("used")}
            />
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

          <Toggle
            onPress={() => setAcceptTrade(!acceptTrade)}
            isPressed={acceptTrade}
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
            <Checkbox
              title="Boleto"
              isChecked={
                !!selectedPaymentsModes.find((mode) => mode === "ticket")
              }
              onPress={() => toggleSelectedPayments("ticket")}
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
            <Button title="Cancelar" variant={"gray"} mr={3}/>
            <Button title="Avançar" variant={"black"} />
          </HStack>
        
      </ScrollView>
    </SafeAreaView>
  );
}
