import { useTheme, Checkbox , FormControl, ICheckboxGroupProps } from "native-base";

type CheckboxGroupProps = ICheckboxGroupProps &{
    errorMessage?: string | null;
    onChange: ()=> void;
};

export function PaymentsSelector({errorMessage,onChange,...rest}: CheckboxGroupProps){
    const theme = useTheme();
    const iconSize=24;
    return(
        <FormControl>
            <Checkbox.Group accessibilityLabel="choose numbers" onChange={onChange} {...rest}>
            <Checkbox value="boleto">
                Boleto
            </Checkbox>
            <Checkbox value="pix">
                Pix
            </Checkbox>

            <Checkbox value="cash">
                Dinheiro
            </Checkbox>
            <Checkbox value="card">
                Cartão
            </Checkbox>
            <Checkbox value="deposit">
                Depósito
            </Checkbox>
            </Checkbox.Group>
            <FormControl.ErrorMessage _text={{color: 'red.300'}}>
                {errorMessage}
            </FormControl.ErrorMessage>
        </FormControl>
    );
};