import { Box,Image, Button,useTheme } from "native-base";
import { PencilSimpleLine } from 'phosphor-react-native';

import avatar_emptyPng from '@assets/avatar_empty.png';



export function ProfileEditor(){

    const theme= useTheme();
    return(
        <Box alignItems={"center"}>
            <Image 
                w={24} 
                h={24} 
                source={avatar_emptyPng} 
                alt="Imagem do perfil do usuário"
                borderWidth={3}
                borderColor={'blue.300'}
                rounded={'full'}
                />
            <Button p={4} alignItems={'center'} bgColor={'blue.300'} rounded={"full"} position={"absolute"} bottom={0} right={16}>
                <PencilSimpleLine size={17}color={theme.colors.gray[600]}/>
            </Button>
        </Box>
    );
}