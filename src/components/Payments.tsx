import { HStack, Text } from "native-base";
import { Barcode, QrCode, Bank, Money, CreditCard } from "phosphor-react-native";
import { AcceptedPaymentsType } from "src/@types/payments";

type PaymentsProps = {
    type: AcceptedPaymentsType
}

export function Payments( {type} : PaymentsProps){


    function switchIconByPaymentType(){
        const iconSize = 18
        switch (type){
            case "ticket":
                return <Barcode size={iconSize}/>
            case "pix":
                return <QrCode size={iconSize}/>
            case 'cash':
                return <Money size={iconSize}/>
            case 'card':
                return <CreditCard size={iconSize}/>
            case "deposit":
                return <Bank size={iconSize}/>
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
            <Text fontSize={"sm"} fontFamily={"body"} color={"gray.200"} ml={2} mb={1}>{switchTextByPaymentType()}</Text>
        </HStack>
    )
}