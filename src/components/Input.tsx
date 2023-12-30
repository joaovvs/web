import { Input as InputNativeBase, IInputProps, FormControl } from "native-base";


type Props = IInputProps & {
    errorMessage?: string | null;
}

export function Input({errorMessage = null, isInvalid, ...rest}: Props){
    const invalid = !!errorMessage || isInvalid;
    return(
        <FormControl isInvalid={invalid} mb={4}>
            <InputNativeBase
                py={3}
                px={4}
                bgColor={'gray.700'}
                borderRadius={'lg'}
                borderWidth={0}
                placeholderTextColor={'gray.400'}
                fontSize={'sm'}
                _focus={{
                    borderColor: 'gray.300',
                    borderWidth: 1
                }}
                {...rest}
            />
            <FormControl.ErrorMessage _text={{color: 'red.300'}}>
                {errorMessage}
            </FormControl.ErrorMessage>
        </FormControl>
    )
}