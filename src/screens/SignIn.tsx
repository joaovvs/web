import { useState } from "react";
import { useTheme } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import LogoSvg from "@assets/logo.svg";
import MarketplaceSVg from "@assets/marketspace.svg";
import { Eye, EyeSlash } from "phosphor-react-native";

import {
  ScrollView,
  VStack,
  Center,
  Text,
  Heading,
  Pressable,
  useToast
} from "native-base";

import { AuthNavigatorRoutesProps} from '@routes/auth.routes'


import { Input } from "@components/Input";
import { Button } from "@components/Button";

import { useAuth } from "@hooks/useAuth";
import { AppError } from "@utils/AppError";


type FormDataProps = {
  email: string;
  password: string;
};

const signInSchema = yup.object({
  email: yup.string().required("Informe o e-mail.").email("E-mail inválido."),
  password: yup
    .string()
    .required("Informe uma senha.")
    .min(6, "A senha deve possuir pelo menos 6 dígitos."),
});

export function SignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false);
  const { signIn } = useAuth();
  const theme = useTheme();

  const navigation = useNavigation<AuthNavigatorRoutesProps>();

  const toast = useToast();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    resolver: yupResolver(signInSchema),
  });

  async function handleSignIn({ email, password }: FormDataProps) {
    try {
      setIsLoading(true);
      await signIn(email, password);
    } catch (error) {
      const isAppError = error instanceof AppError;

      const title = isAppError
        ? error.message
        : "Não foi possível autenticar, tente novamente mais tarde.";
      toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setIsLoading(false);
    }
  }

  function handleCreate(){
    navigation.navigate("signUp");
  }

  return (
    <ScrollView flexGrow={1} bg={"gray.600"} py={16} px={12}>
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
        <Button title="Entrar" variant={"blue"} onPress={handleSubmit(handleSignIn)} isLoading={isLoading}/>
      </VStack>

      <VStack flex={1} marginTop={12}>
        <Center>
          <Heading fontFamily={"body"} fontSize={"sm"} mb={4}>
            Ainda não tem acesso?
          </Heading>
        </Center>

        <Button title="Crie uma conta" variant={"gray"} onPress={handleCreate}/>
      </VStack>
    </ScrollView>
  );
}
