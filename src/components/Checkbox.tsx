import { Pressable, IPressableProps, Text, useTheme } from "native-base";
import { CheckSquare, Square } from "phosphor-react-native";

type CheckboxProps = IPressableProps &{
    title: string;
    isChecked: boolean;
}

export function Checkbox({title, isChecked, ...rest}: CheckboxProps){
    const theme = useTheme();
    const iconSize=24;
    return(
        <Pressable flexDirection={"row"}
        {...rest}>
            {isChecked ? <CheckSquare size={iconSize} color={theme.colors.blue[300] } weight="fill"/> : <Square  size={iconSize} color={theme.colors.gray[400]}/>}
            <Text color={"gray.200"} fontFamily={"body"} fontSize={"md"} ml={2}>{title}</Text>
        </Pressable>
    );
};