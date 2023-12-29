import { createBottomTabNavigator, BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { Announcements } from "@screens/Announcements";
import { Create } from "@screens/Create";
import { Details } from "@screens/Details";
import { Edit } from "@screens/Edit";
import { Home } from "@screens/Home";
import { Preview } from "@screens/Preview";
import { House, SignOut, Tag } from "phosphor-react-native";
import { useTheme } from "native-base";

import { Platform } from 'react-native';
import { AnnouncementObject } from "src/@types/announcement";



type AppRoutes = {
    home: undefined;
    announcements: undefined;
    details: {
      id: string;
    };
    create: undefined;
    preview: {
      announcement: AnnouncementObject;
    };
    edit: {
      announcement: AnnouncementObject;
    };
    exit: undefined
} 

export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutes>

const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>();


export function AppRoutes() {
  const theme = useTheme();


  const iconSize = theme.sizes[6];

  function HandleSignOut(){
    console.log('handlesignout');
  }

  return (
    <Navigator screenOptions={{
      headerShown: false,
      tabBarShowLabel: false,
      tabBarStyle: {
        backgroundColor: theme.colors.gray[700],
        borderTopWidth: 0,
        height: Platform.OS === 'android' ? 'auto' : 96,
        paddingTop: theme.sizes[5],
        paddingBottom: theme.sizes[7],
        paddingHorizontal: theme.sizes[12]
      }}}
      >
      <Screen 
        name="home" 
        component={Home} 
        options={{
          tabBarIcon: House,
          tabBarActiveTintColor: theme.colors.gray[100],
          tabBarInactiveTintColor: theme.colors.gray[400],
        }}
      />

      <Screen 
      name="announcements" 
      component={Announcements} 
      options={{
        tabBarIcon: Tag,
        tabBarActiveTintColor: theme.colors.gray[100],
        tabBarInactiveTintColor: theme.colors.gray[400],
      }}
      />
      
      <Screen name="details" component={Details} options={{tabBarButton: () => null}}/>


      <Screen 
      name="create" 
      component={Create} 
      options={{tabBarButton: () => null,
      tabBarStyle: { display: 'none' }
      }}
      
      />

      <Screen 
      name="preview" 
      component={Preview} 
      options={{tabBarButton: () => null,
      tabBarStyle: { display: 'none' }
      }}/>

      <Screen 
      name="edit" 
      component={Edit} 
      options={{tabBarButton: () => null,
      tabBarStyle: { display: 'none' }  
      }}/>

      <Screen name="exit" component={Edit}
              options={{
                tabBarIcon: SignOut,
                tabBarActiveTintColor: theme.colors.red[300],
                tabBarInactiveTintColor: theme.colors.gray[300],
                tabBarStyle: { display: 'none' }  }}
      />

    </Navigator>
  );
}
