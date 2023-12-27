import { HStack, Text } from "native-base";
import { Barcode, QrCode, Bank, Money, CreditCard } from "phosphor-react-native";
import { AcceptedPaymentsMode } from "src/@types/payments";



export function Payments({type}: AcceptedPaymentsMode){


    function switchIconByPaymentType(){
        switch (type){
            case "ticket":
                return <Barcode/>
            case "pix":
                return <QrCode/>
            case 'cash':
                return <Money/>
            case 'card':
                return <CreditCard/>
            case "deposit":
                return <Bank/>
        }
    }

    function switchTextByPaymentType(){
        switch (type){
            case "ticket":
                return "Boleto"
            case "pix":
                return "Pix"
            case 'cash':
                return "Dinheiro"
            case 'card':
                return "Cartão de crédito"
            case "deposit":
                return "Depósito Bancário"
        }
    }
    return(
        <HStack >
            {switchIconByPaymentType()}
            <Text>{switchTextByPaymentType()}</Text>
        </HStack>
    )
}