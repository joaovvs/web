import { Image, IImageProps } from 'native-base'

type Props = IImageProps

export function ProfileImage({...rest}: Props){
    return(
        <Image 
        w={24} 
        h={24} 
        alt="Imagem do perfil do usuário"
        borderWidth={3}
        borderColor={'blue.300'}
        rounded={'full'}
        {...rest}
        />
    );
}