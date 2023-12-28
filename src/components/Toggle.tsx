import { Pressable, IPressableProps, useTheme } from "native-base";
import { Circle } from "phosphor-react-native";



export function Toggle({isPressed,...rest}: IPressableProps){
    const theme = useTheme();
    return (
        <Pressable
            w={10}
            bgColor={isPressed ? "blue.300" : "gray.500"}
            rounded={"full"}
            {...rest}
            > 
            <Circle size={24} color={theme.colors.gray[700]} weight="fill" style={{ alignSelf: isPressed ? "flex-end": "flex-start"}}/>
        </Pressable>
    )
}