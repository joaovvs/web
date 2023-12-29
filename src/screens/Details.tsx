import { useState } from "react";
import { ProfileImage } from "@components/ProfileImage";
import { Tag } from "@components/Tag";
import { Dimensions, SafeAreaView, View } from "react-native";
import {
  HStack,
  Image,
  ScrollView,
  VStack,
  Text,
  useTheme,
  Heading,
  Pressable,
  Box,
} from "native-base";
import productImg from "@assets/product.png";

import { ArrowLeft, PencilSimpleLine } from "phosphor-react-native";
import { Payments } from "@components/Payments";
import { AcceptedPaymentsType } from "src/@types/payments";
import { Button } from "@components/Button";

import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

import { useNavigation, useRoute } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";

import Carousel from "react-native-reanimated-carousel";


type RouteParamsProps = {
  id: string;
};

export function Details() {
  const [acceptedPaymentsType, setAcceptedPaymentsType] = useState<
    AcceptedPaymentsType []
  >([
    "ticket",
    "pix",
    "cash",
    "card",
    "deposit"
  ]);

  const route = useRoute();

  const { id } = route.params as RouteParamsProps;

  const navigation = useNavigation<AppNavigatorRoutesProps>();

  const isActive = true;

  const [images, setImages] = useState([
    productImg,
    productImg,
    productImg,
    productImg,
  ]);
  const theme = useTheme();

  const progressValue = useSharedValue<number>(0);
  const width = Dimensions.get("window").width;

  type PaginationProps = {
    index: number;
    backgroundColor: string;
    length: number;
    animValue: Animated.SharedValue<number>;
    isRotate?: boolean;
  };

  const PaginationItem: React.FC<{
    index: number;
    length: number;
    animValue: Animated.SharedValue<number>;
    isRotate?: boolean;
  }> = (props) => {
    const { animValue, index, length, isRotate } = props;

    const animStyle = useAnimatedStyle(() => {
      let inputRange = [index - 1, index, index + 1];
      let outputRange = [-width, 0, width];

      if (index === 0 && animValue?.value > length - 1) {
        inputRange = [length - 1, length, length + 1];
        outputRange = [-width, 0, width];
      }

      return {
        transform: [
          {
            translateX: interpolate(
              animValue?.value,
              inputRange,
              outputRange,
              Extrapolate.CLAMP
            ),
          },
        ],
      };
    }, [animValue, index, length]);
    return (
      <View
        style={{
          backgroundColor: theme.colors.gray[700],
          flex: 1,
          height: 3,
          opacity: 0.5,
          marginLeft: 2,
          marginRight: 2,
          borderRadius: 2,
          overflow: "hidden",
          transform: [
            {
              rotateZ: isRotate ? "90deg" : "0deg",
            },
          ],
        }}
      >
        <Animated.View
          style={[
            {
              borderRadius: 2,
              backgroundColor: theme.colors.gray[700],
              opacity: 0.75,
              flex: 1,
            },
            animStyle,
          ]}
        />
      </View>
    );
  };

  function checkUserIsOwner() {
    return true;
  }

  function handleGoBack(){
    navigation.goBack();
  }

  function handleEdit(){
    navigation.navigate('edit', {id})
  }

  return (
      <SafeAreaView style={{flex: 1, paddingTop: 24}}>

      {/* Header*/}
      <HStack px={5} pt={5} mb={3} justifyContent={"space-between"}>

        <Pressable alignItems={"center"} background={"transparent"} p={0} onPress={handleGoBack}>
          <ArrowLeft  color={theme.colors.gray[100]} size={24}/>
        </Pressable>

        {checkUserIsOwner() && (
          <Pressable alignItems={"center"} background={"transparent"} p={0} onPress={handleEdit}>
            <PencilSimpleLine color={theme.colors.gray[100]} size={24} />
          </Pressable>
        )}
      </HStack>

      {/*Content  */}
      <VStack flex={1}>
        {/*Image Carousel*/}
        <Box
          position={"relative"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Carousel
            loop
            width={width}
            height={280}
            autoPlay={false}
            data={images}
            pagingEnabled={true}
            onProgressChange={(_, absoluteProgress) =>
              (progressValue.value = absoluteProgress)
            }
            scrollAnimationDuration={1000}
            onSnapToItem={(index) => console.log("current index:", index)}
            renderItem={({ item, index }) => (
              <Image source={item} alt="Foto do item" resizeMode="cover"/>
            )}
          />

          {/*Overflow image if is not active*/}
          {!isActive && (
            <Box
              bg={"gray.100"}
              opacity={0.6}
              position={"absolute"}
              top={0}
              right={0}
              bottom={0}
              left={0}
            />
          )}
          {!isActive && (
            <Text
              position={"absolute"}
              textTransform={"uppercase"}
              fontFamily={"heading"}
              fontSize={"sm"}
              color={"gray.700"}
            >
              Anúncio desativado
            </Text>
          )}
        </Box>
        <HStack justifyContent={"center"} mt={-2} mb={2}>
          {images.map((item, index) => {
            return (
              <PaginationItem
                animValue={progressValue}
                index={index}
                isRotate={false}
                key={index}
                length={images.length}
              />
            );
          })}
        </HStack>

        <ScrollView px={5}>
          {/* Authors */}
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
            <Heading
              flex={1}
              fontFamily={"heading"}
              lineHeight={"xl"}
              fontSize={"lg"}
              color={"gray.100"}
            >
              Bicicleta
            </Heading>
            <Text fontSize={"lg"} color={"blue.300"} fontFamily={"heading"}>
              <Text fontSize={"sm"}>{"R$ "}</Text>
              120,00
            </Text>
          </HStack>

          <Text
            fontFamily={"body"}
            fontSize={"sm"}
            color={"gray.200"}
            textAlign={"justify"}
          >
            Cras congue cursus in tortor sagittis placerat nunc, tellus arcu.
            Vitae ante leo eget maecenas urna mattis cursus. Mauris metus amet
            nibh mauris mauris accumsan, euismod. Aenean leo nunc, purus iaculis
            in aliquam.
          </Text>

          <HStack mt={7} mb={4}>
            <Text fontSize={"sm"} fontFamily={"heading"} color={"gray.200"}>
              Aceita troca?
            </Text>
            <Text fontSize={"sm"} fontFamily={"body"} color={"gray.200"} ml={2}>
              Sim
            </Text>
          </HStack>

          <VStack mb={5}>
            <Heading
              fontSize={"sm"}
              fontFamily={"heading"}
              color={"gray.200"}
              mb={2}
            >
              Meios de pagamento:
            </Heading>
            {acceptedPaymentsType &&
              acceptedPaymentsType.map((item, index) => (
                <Payments key={index} type={item}/>
              ))}
          </VStack>
        </ScrollView>
      </VStack>
      {/* Footer Menu */}

      {!checkUserIsOwner() ? (
        <HStack
          bgColor={"gray.700"}
          px={7}
          py={5}
          alignItems={"center"}
          justifyContent={"space-between"}
          alignSelf={"baseline"}
        >
          <Text
            flex={1}
            fontSize={"xl"}
            color={"blue.500"}
            fontFamily={"heading"}
          >
            <Text fontSize={"sm"}>R$</Text>120,00
          </Text>
          <Button title="Entrar em contato" type="contact" variant={"blue"} />
        </HStack>
      ) : (
        <VStack h={140} bgColor={"gray.700"} px={7} py={5}>
          {isActive ? (
            <Button
              title="Desativar anúncio"
              variant={"black"}
              type="power"
              mb={2}
            />
          ) : (
            <Button
              title="Reativar anúncio"
              variant={"blue"}
              type="power"
              mb={2}
            />
          )}
          <Button title="Excluir anúncio" variant={"gray"} type="trash" />
        </VStack>
      )}

    </SafeAreaView>
  );
}
