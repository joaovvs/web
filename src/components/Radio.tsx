import { Radio as NativeRadio, IRadioGroupProps, FormControl } from "native-base";

type RadioProps = IRadioGroupProps & {
  errorMessage?: string | null;
};

export function Radio({ errorMessage, name, ...rest}: RadioProps) {
  return (
    <FormControl >
    <NativeRadio.Group 
    name={name} 
    accessibilityLabel="product is new?" 
    flexDirection={"row"}
    {...rest}>
      <NativeRadio value={"true"} >
        Produto Novo
      </NativeRadio>
      <NativeRadio value={"false"} ml={4} >
        Produto Usado
      </NativeRadio>
    </NativeRadio.Group>
    <FormControl.ErrorMessage>
      {errorMessage}
    </FormControl.ErrorMessage>
  </FormControl>
);
}