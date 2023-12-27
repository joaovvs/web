import { useState } from "react";
import { useTheme } from "native-base";
import LogoSvg from "@assets/logo.svg";
import MarketplaceSVg from "@assets/marketspace.svg";

import {
  ScrollView,
  VStack,
  Center,
  Text,
  Heading,
  Pressable,
  Icon,
} from "native-base";
import { useForm, Controller } from "react-hook-form";

import { Eye, EyeSlash } from "phosphor-react-native";

import { Input } from "@components/Input";
import { Button } from "@components/Button";

export function SignIn() {
  const [show, setShow] = useState(false);

  const theme = useTheme();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({});

  function handleSignIn() {
    console.log("signIn");
  }

  return (
    <ScrollView flex={1} bg={"gray.600"} py={16} px={12}>
      <VStack mb={20}>
        <Center>
          <LogoSvg/>
          <MarketplaceSVg />
          <Text color={"gray.300"} fontFamily={"body"} fontSize={"sm"}>
            Seu espaço de compra e venda
          </Text>
        </Center>
      </VStack>

      <VStack
        flex={1}
        bg={"gray.600"}
        roundedBottomLeft={8}
        roundedBottomRight={8}
        marginBottom={16}
      >
        <Center>
          <Heading
            color={"gray.200"}
            fontFamily={"body"}
            fontSize={"sm"}
            mb={4}
          >
            Acesse sua conta
          </Heading>
        </Center>

        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value } }) => (
            <Input
              placeholder="E-mail"
              keyboardType="email-address"
              autoCapitalize="none"
              onChangeText={onChange}
              value={value}
              errorMessage={errors.email?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value } }) => (
            <Input
              placeholder="Senha"
              onChangeText={onChange}
              value={value}
              onSubmitEditing={handleSubmit(handleSignIn)}
              returnKeyType="send"
              errorMessage={errors.password?.message}
              type={show ? "text" : "password"}
              InputRightElement={
                <Pressable mr={4} onPress={() => setShow(!show)}>
                  {show ? (
                    <Eye color={theme.colors.gray[300]} />
                  ) : (
                    <EyeSlash color={theme.colors.gray[300]} />
                  )}
                </Pressable>
              }
            />
          )}
        />
        <Button title="Entrar" variant={"blue"} />
      </VStack>

      <VStack flex={1} marginTop={12}>
        <Center>
          <Heading fontFamily={"body"} fontSize={"sm"} mb={4}>
            Ainda não tem acesso?
          </Heading>
        </Center>

        <Button title="Crie uma conta" variant={"gray"} />
      </VStack>
    </ScrollView>
  );
}
