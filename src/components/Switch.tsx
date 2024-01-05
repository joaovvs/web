import { Switch as NativeSwitch, ISwitchProps, FormControl } from "native-base";


type Props = ISwitchProps & {
    errorMessage?: string | null;
    onChange: () => void;
}

export function Switch ({errorMessage, onChange,...rest}: Props){
    return(
        <FormControl>
            <NativeSwitch
            onTrackColor={"blue.300"}
            offTrackColor={"gray.500"}
            {...rest}/>

            <FormControl.ErrorMessage _text={{color: 'red.300'}}>
                {errorMessage}
            </FormControl.ErrorMessage> 
        </FormControl>

    );
}