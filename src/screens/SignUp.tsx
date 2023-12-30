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
  useToast
} from "native-base";

import avatar_emptyPng from "@assets/avatar_empty.png";
import * as ImagePicker from "expo-image-picker";

import { Eye, EyeSlash, Password, PencilSimpleLine } from "phosphor-react-native";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { AuthNavigatorRoutesProps} from '@routes/auth.routes'

import { ProfileImage } from "@components/ProfileImage";
import { api } from "@services/api";
import { AppError } from "@utils/AppError";


type FormDataProps = {
  name: string;
  email: string;
  phone: string,
  password: string;
  password_confirm: string;
};

const signUpSchema = yup.object({
  name: yup.string().required("Informe o nome.").min(3, "Nome precisa de no mínimo 3 caracteres"),
  email: yup.string().required("Informe o e-mail.").email("E-mail inválido."),
  phone: yup.string().required("Informe o telefone"),
  password: yup
    .string()
    .required("Informe uma senha.")
    .min(6, "A senha deve possuir pelo menos 6 dígitos."),
  password_confirm: yup
    .string()
    .required("Confirme a senha.")
    .oneOf([yup.ref("password")], "A confirmação da senha não confere"),
});

export function SignUp() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [photoIsLoading, setPhotoIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);

  const [userPhotoSelected, setUserPhotoSelected] = useState<ImagePicker.ImagePickerAsset>();

  const toast = useToast();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    resolver: yupResolver(signUpSchema),
  });

  const theme = useTheme();

  const navigation = useNavigation<AuthNavigatorRoutesProps>();

  function handleSignInNavigation(){
    navigation.navigate('signIn');
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
        setUserPhotoSelected(photoSelected.assets[0]);
        console.log(userPhotoSelected);
      }
    } catch (error) {
      return error;
    } finally {
      setPhotoIsLoading(false);
    }
  }

  async function handleSignUp({name, email, phone, password}: FormDataProps){
    setIsSubmitting(true);
    try {
      if(userPhotoSelected){
        const fileExtension = userPhotoSelected.uri.split(".").pop();

        const photoFile = {
          name: `${name}.${fileExtension}`.toLowerCase().replace(" ", "_"),
          uri: userPhotoSelected.uri,
          type: `${userPhotoSelected.type}/${fileExtension}`,
        } as any;

        const newUser = new FormData();
        newUser.append('avatar', photoFile)
        newUser.append('name',name);
        newUser.append('email', email);
        newUser.append('tel', phone);
        newUser.append('password', password);



        await api.post('/users', newUser, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      };

    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível criar usuário. Tente novamente mais tarde";
      
      console.log(error);
      toast.show({
        title,
        placement: "top",
        bgColor: "red.300",
      });
    }finally{
      setIsSubmitting(false);
    }
    console.log("create");

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
              source={userPhotoSelected ? { uri: userPhotoSelected.uri } : avatar_emptyPng}
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
                errorMessage={errors.name?.message}
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
                keyboardType="default"
                autoCapitalize="none"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.phone?.message}
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
            name="password_confirm"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Confirme a Senha"
                onChangeText={onChange}
                value={value}
                onSubmitEditing={handleSubmit(handleSignUp)}
                returnKeyType="send"
                errorMessage={errors.password_confirm?.message}
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

          <Button title="Criar" variant={"black"} onPress={handleSubmit(handleSignUp)}/>
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
