import { Box, Center, IBoxProps, Text } from "native-base";

type TagStyleVariantProp = IBoxProps &{
    type: 'new' | 'used'
    variant: 'black' | 'gray' | 'blue'
}

export function Tag({type, variant, ...rest}:TagStyleVariantProp ){
    return(
        <Box bgColor={variant==='blue' ? 'blue.500' : variant==='gray'? 'gray.500': 'gray.200'} 
        alignItems={"center"}
        rounded={'xl'}
        px={2}
        {...rest}> 
            <Text 
                color={variant==='gray' ? "gray.200" : "white"} 
                textTransform={"uppercase"} 
                fontFamily={"heading"}
            > {type==='new' ? 'novo' : 'usado'}</Text>
        </Box>
    )
}