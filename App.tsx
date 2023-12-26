import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider, VStack} from 'native-base';
import { SafeAreaView } from 'react-native';
import { useFonts, Karla_700Bold, Karla_400Regular } from '@expo-google-fonts/karla';

import { THEME } from './src/theme';
import { Loading } from '@components/Loading';
import { isLoaded } from 'expo-font';

import { SignIn } from '@screens/SignIn';
import { SignUp } from '@screens/SignUp';
import { Home } from '@screens/Home';

export default function App() {
  const [fontsLoaded] = useFonts({Karla_700Bold, Karla_400Regular});
  
  return (
      <NativeBaseProvider theme={THEME}>
        <VStack flex={1} bg={"gray.600"}>
        <StatusBar 
          backgroundColor='transparent'
          style='dark'
          translucent
        />
          {!isLoaded ? <Loading/> :
            <Home/>}
            </VStack>
      </NativeBaseProvider>

  );
}

