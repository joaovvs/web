import { useState } from "react";
import { useTheme } from "native-base";

import LogoSvg from "@assets/logo.svg";
import {
  Center,
  VStack,
  ScrollView,
  Heading,
  Text,
  Pressable
} from "native-base";

import { Eye, EyeSlash } from "phosphor-react-native";

import { useForm, Controller } from "react-hook-form";

import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { ProfileEditor } from "@components/ProfileEditor";

export function SignUp() {
  const [show, setShow] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({});

  const theme = useTheme();

  function handleCreate() {
    console.log("create");
  }

  return (
    <VStack flex={1} px={12} pt={16} bg={"gray.600"}>
      <VStack mb={8}>
        <Center>
          <LogoSvg height={40} />

          <Heading
            color={"gray.100"}
            fontFamily={"heading"}
            fontSize={"lg"}
            mb={2}
          >
            Boas Vindas!
          </Heading>
          <Text
            color={"gray.200"}
            fontFamily={"body"}
            fontSize={"sm"}
            lineHeight={"sm"}
            textAlign={"center"}
            numberOfLines={2}
          >
            Crie sua conta para comprar itens variados e vender seus produtos
          </Text>
        </Center>
      </VStack>

      <ScrollView showsVerticalScrollIndicator={false}>

        <ProfileEditor />
        <VStack mt={4}>

          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Nome"
                keyboardType="default"
                autoCapitalize="none"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.email?.message}
              />
            )}
          />

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
            name="phone"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Telefone"
                keyboardType="phone-pad"
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

          <Controller
            control={control}
            name="confirm_password"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Confirme a Senha"
                onChangeText={onChange}
                value={value}
                onSubmitEditing={handleSubmit(handleCreate)}
                returnKeyType="send"
                errorMessage={errors.password?.message}
                type={show ? "text" : "password"}
                InputRightElement={
                  <Pressable mr={4} onPress={() => setShowConfirmation(!show)}>
                    {showConfirmation ? (
                      <Eye color={theme.colors.gray[300]} />
                    ) : (
                      <EyeSlash color={theme.colors.gray[300]} />
                    )}
                  </Pressable>
                }
              />
            )}
          />

          <Button title="Criar" variant={"black"} />
        </VStack>

        <VStack mt={12} mb={16}>
          <Center>
            <Heading fontFamily={"body"} fontSize={"sm"} mb={4}>
              Já tem uma conta?
            </Heading>
          </Center>

          <Button title="Ir para o login" variant={"gray"} />
        </VStack>
      </ScrollView>
    </VStack>
  );
}
