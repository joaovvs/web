import { HStack, Text, Input, VStack, Divider, useTheme } from "native-base";
import { MagnifyingGlass, Sliders } from 'phosphor-react-native';
import { TouchableOpacity } from "react-native";


export function Search() {
    const theme = useTheme();
  return (
    <VStack>
      <Text color={"gray.300"} fontSize={"sm"} fontFamily={"body"} mb={3} >
        Compre Produtos variados
      </Text>

    <HStack px={4} py={1} bgColor={"gray.700"} borderRadius={"lg"}>

      <Input  
        flex={1} 
        borderWidth={0}
        placeholder="Buscar anúncio" 
        placeholderTextColor={"gray.400"}
        fontSize={"md"}
        _focus={{
            bg: 'gray.700'
        }}
      />

        <HStack alignItems={'center'} >
        
        <TouchableOpacity>
            <MagnifyingGlass size={20} color={theme.colors.gray[200]}/>
        </TouchableOpacity>

        <Divider mx={2} h={5} orientation="vertical" bg={'gray.400'} />
        
        <TouchableOpacity>
            <Sliders size={20} color={theme.colors.gray[200]}/>
        </TouchableOpacity>

        </HStack>

    </HStack>
    </VStack>
  );
}
