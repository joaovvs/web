import {
  createBottomTabNavigator,
  BottomTabNavigationProp,
} from "@react-navigation/bottom-tabs";
import { Announcements } from "@screens/Announcements";
import { Create } from "@screens/Create";
import { Details } from "@screens/Details";
import { Edit } from "@screens/Edit";
import { Home } from "@screens/Home";
import { Preview } from "@screens/Preview";
import { House, SignOut, Tag } from "phosphor-react-native";
import { useTheme, Pressable } from "native-base";

import { Platform } from "react-native";
import { useAuth } from "@hooks/useAuth";

type AppRoutes = {
  home: undefined;
  announcements: undefined;
  details: {
    id: string;
  };
  create: undefined;
  preview: {
    id: string;
  };
  edit: {
    id: string;
  };
  exit: undefined;
};

export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutes>;

const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>();

export function AppRoutes() {
  const theme = useTheme();

  const { signOut } = useAuth();

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: theme.colors.gray[700],
          borderTopWidth: 0,
          height: Platform.OS === "android" ? "auto" : 96,
          paddingTop: theme.sizes[5],
          paddingBottom: theme.sizes[7],
          paddingHorizontal: theme.sizes[12],
          alignContent: "center",
          justifyContent: "center",
        },
      }}
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

      <Screen
        name="details"
        component={Details}
        options={{ tabBarButton: () => null }}
      />

      <Screen
        name="create"
        component={Create}
        options={{ tabBarButton: () => null, tabBarStyle: { display: "none" } }}
      />

      <Screen
        name="preview"
        component={Preview}
        options={{ tabBarButton: () => null, tabBarStyle: { display: "none" } }}
      />

      <Screen
        name="edit"
        component={Edit}
        options={{ tabBarButton: () => null, tabBarStyle: { display: "none" } }}
      />

      <Screen
        name="exit"
        component={Home}
        options={{
          tabBarButton: () => (
            <Pressable onPress={signOut}>
              <SignOut color={theme.colors.red[300]} />
            </Pressable>
          ),
        }}
      />
    </Navigator>
  );
}
