import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider, VStack} from 'native-base';
import { useFonts, Karla_700Bold, Karla_400Regular } from '@expo-google-fonts/karla';

import { THEME } from './src/theme';
import { Loading } from '@components/Loading';

import { AuthContextProvider } from '@contexts/AuthContext';

import { Routes } from './src/routes';
import { SignUp } from '@screens/SignUp';
import { Home } from '@screens/Home';
import { Details } from '@screens/Details';
import { Announcements } from '@screens/Announcements';
import { Create } from '@screens/Create';
import { Preview } from '@screens/Preview';
import { Edit } from '@screens/Edit';

export default function App() {
  const [fontsLoaded] = useFonts({Karla_700Bold, Karla_400Regular});
  
  return (
      <NativeBaseProvider theme={THEME}>
        <StatusBar 
          backgroundColor='transparent'
          style='dark'
          translucent
          />
            
          <AuthContextProvider>
          {fontsLoaded ? <Routes/> : <Loading/>}
        </AuthContextProvider>
      </NativeBaseProvider>

  );
}

