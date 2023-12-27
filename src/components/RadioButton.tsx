import { Pressable, IPressableProps, Text, useTheme } from "native-base";
import { Circle, RadioButton as RadioIcon } from "phosphor-react-native";

type Props = IPressableProps &{
    title: string;
    isChecked: boolean;
}

export function RadioButton({ title,isChecked, ...rest }: Props){
    const theme = useTheme();
    return(
        <Pressable flexDirection={"row"}  mr={3} {...rest}
        >
            {isChecked ? <RadioIcon size={24} color={theme.colors.blue[300]} weight="fill"/>: <Circle size={24} color={theme.colors.gray[400]}/>}
            <Text 
            fontFamily={"body"} 
            fontSize={"md"}
            color={"gray.200"}
            ml={2}
            >
                {title}</Text>
        </Pressable>
    );
};