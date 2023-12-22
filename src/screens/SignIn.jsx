import LogoSvg from '@assets/logo.svg';
import MarketspaceSVg from '@assets/marketspace.svg'

import { ScrollView, VStack, Center } from 'native-base';

export function SignIn() {
    return (
        <ScrollView flex={1} bg={'gray.600'}>
            <VStack>
                <Center>
                    <LogoSvg />
                    <MarketspaceSVg />
                </Center>
            </VStack>
        </ScrollView>
    )
}