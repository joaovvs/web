import { ProfileImage } from "@components/ProfileImage";
import { Tag } from "@components/Tag";
import { HStack, Image, ScrollView, VStack, Text} from "native-base";
import { ArrowLeft } from "phosphor-react-native";

export function Details(){
    return(
        <ScrollView>
            <VStack>
                <ArrowLeft/>
            </VStack>
            <VStack>
                <Image/>
                <HStack>
                    <ProfileImage/>
                    <Text>Makenna Batista</Text>
                </HStack>
                <Tag variant="gray" type="new"/>
            </VStack>
        </ScrollView>
    );
}