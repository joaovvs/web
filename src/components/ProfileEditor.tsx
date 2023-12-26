import { Box,Image, Button,useTheme } from "native-base";
import { PencilSimpleLine } from 'phosphor-react-native';

import avatar_emptyPng from '@assets/avatar_empty.png';
import { ProfileImage } from "./ProfileImage";



export function ProfileEditor(){

    const theme= useTheme();
    return(
        <Box alignItems={"center"}>
            <ProfileImage source={avatar_emptyPng}/>
            <Button p={4} alignItems={'center'} bgColor={'blue.300'} rounded={"full"} position={"absolute"} bottom={0} right={16}>
                <PencilSimpleLine size={17}color={theme.colors.gray[600]}/>
            </Button>
        </Box>
    );
}