import { useState } from "react";
import { Box, useTheme } from "native-base";
import { useNavigation } from "@react-navigation/native";

import LogoSvg from "@assets/logo.svg";
import {
  Center,
  VStack,
  ScrollView,
  Heading,
  Text,
  Pressable,
  Skeleton,
  Button as NativeButton,
} from "native-base";

import avatar_emptyPng from "@assets/avatar_empty.png";
import * as ImagePicker from "expo-image-picker";

import { Eye, EyeSlash, PencilSimpleLine } from "phosphor-react-native";

import { useForm, Controller } from "react-hook-form";

import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { AuthNavigatorRoutesProps} from '@routes/auth.routes'

import { ProfileImage } from "@components/ProfileImage";

export function SignUp() {
  const [photoIsLoading, setPhotoIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);
  const [userPhoto, setUserPhoto] = useState("");


  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({});

  const theme = useTheme();

  const navigation = useNavigation<AuthNavigatorRoutesProps>();

  function handleSignInNavigation(){
    navigation.navigate('signIn');
  }

  function handleCreate() {
    console.log("create");
  }

  async function handleUserPhotoSelect() {
    setPhotoIsLoading(true);

    try {
      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true,
        allowsMultipleSelection: false,
      });

      if (photoSelected.canceled) {
        return;
      }

      if (photoSelected.assets[0].uri) {
        setUserPhoto(photoSelected.assets[0].uri);
      }
    } catch (error) {
      return error;
    } finally {
      setPhotoIsLoading(false);
    }
  }

  return (
    <VStack flex={1} px={12} pt={12} bg={"gray.600"}>
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
        <Box alignItems={"center"}>
          {photoIsLoading ? (
            <Skeleton w={24} h={24} rounded={"full"} bg={"gray.500"} />
          ) : (
            <ProfileImage
              source={userPhoto ? { uri: userPhoto } : avatar_emptyPng}
            />
          )}
          <NativeButton
            p={4}
            alignItems={"center"}
            bgColor={"blue.300"}
            rounded={"full"}
            position={"absolute"}
            bottom={0}
            right={16}
            onPress={handleUserPhotoSelect}
          >
            <PencilSimpleLine size={17} color={theme.colors.gray[600]} />
          </NativeButton>
        </Box>

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
                errorMessage={errors.root?.message}
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
                errorMessage={errors.root?.message}
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
                errorMessage={errors.root?.message}
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
                errorMessage={""}
                type={showPassword ? "text" : "password"}
                InputRightElement={
                  <Pressable mr={4} onPress={() => setShowPassword(!showPassword)}>
                    {showPassword ? (
                      <EyeSlash color={theme.colors.gray[300]} />
                      ) : (
                        <Eye color={theme.colors.gray[300]} />
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
                errorMessage={errors.root?.message}
                type={showPasswordConfirmation ? "text" : "password"}
                InputRightElement={
                  <Pressable mr={4} onPress={() => setShowPasswordConfirmation(!showPasswordConfirmation)}>
                    {showPasswordConfirmation ? (
                      <EyeSlash color={theme.colors.gray[300]} />
                      ) : (
                      <Eye color={theme.colors.gray[300]} />
                    )}
                  </Pressable>
                }
              />
            )}
          />

          <Button title="Criar" variant={"black"} />
        </VStack>

        <VStack mt={8} mb={16}>
          <Center>
            <Heading fontFamily={"body"} fontSize={"sm"} mb={4}>
              Já tem uma conta?
            </Heading>
          </Center>

          <Button title="Ir para o login" variant={"gray"} onPress={handleSignInNavigation}/>
        </VStack>
      </ScrollView>
    </VStack>
  );
}
