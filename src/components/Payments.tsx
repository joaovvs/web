import { HStack, Text } from "native-base";
import { Barcode, QrCode, Bank, Money, CreditCard } from "phosphor-react-native";
import { AcceptedPaymentsType } from "src/@types/payments";

type PaymentsProps = {
    type: AcceptedPaymentsType;
    name: string;
}

export function Payments( {type, name} : PaymentsProps){


    function switchIconByPaymentType(){
        const iconSize = 20
        switch (type){
            case "boleto":
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

    return(
        <HStack alignItems={"center"} paddingY={2}>
            {switchIconByPaymentType()}
            <Text fontSize={"sm"} fontFamily={"body"} color={"gray.200"} ml={2} mb={1}>{name}</Text>
        </HStack>
    )
}