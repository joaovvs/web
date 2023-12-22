import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider} from 'native-base';
import { useFonts, Karla_700Bold, Karla_400Regular } from '@expo-google-fonts/karla';

import { THEME } from './src/theme';
import { Loading } from '@components/Loading';
import { isLoaded } from 'expo-font';

import { SignIn } from '@screens/SignIn';
import { SignUp } from '@screens/SignUp';

export default function App() {
  const [fontsLoaded] = useFonts({Karla_700Bold, Karla_400Regular});
  
  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar 
        backgroundColor='transparent'
        style='dark'
        translucent
      />
        {!isLoaded ? <Loading/> :
        <SignUp/>}
    </NativeBaseProvider>
  );
}

