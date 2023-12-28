import * as React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/LoginScreen";
import OtpRequestScreen from "./screens/OtpRequestScreen";
import HomeScreen from "./screens/protected/HomeScreen";
import RegistrationScreen from "./screens/RegistrationScreen";
import * as SplashScreen from "expo-splash-screen";
import {
  useFonts,
  Poppins_100Thin,
  Poppins_100Thin_Italic,
  Poppins_200ExtraLight,
  Poppins_200ExtraLight_Italic,
  Poppins_300Light,
  Poppins_300Light_Italic,
  Poppins_400Regular,
  Poppins_400Regular_Italic,
  Poppins_500Medium,
  Poppins_500Medium_Italic,
  Poppins_600SemiBold,
  Poppins_600SemiBold_Italic,
  Poppins_700Bold,
  Poppins_700Bold_Italic,
  Poppins_800ExtraBold,
  Poppins_800ExtraBold_Italic,
  Poppins_900Black,
  Poppins_900Black_Italic,
} from "@expo-google-fonts/poppins";

const Stack = createNativeStackNavigator();
// SplashScreen.preventAutoHideAsync();

function Unprotected() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ title: "Log In", headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen
        name="SignUp"
        component={OtpRequestScreen}
        options={{ title: "Request OTP", headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ title: "Home Screen", headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen
        name="Register"
        component={RegistrationScreen}
        options={{ title: "Register", headerShown: false }}
      ></Stack.Screen>
    </Stack.Navigator>
  );
}

export default function App() {
  let [fontsLoaded, fontError] = useFonts({
    Poppins_100Thin,
    Poppins_100Thin_Italic,
    Poppins_200ExtraLight,
    Poppins_200ExtraLight_Italic,
    Poppins_300Light,
    Poppins_300Light_Italic,
    Poppins_400Regular,
    Poppins_400Regular_Italic,
    Poppins_500Medium,
    Poppins_500Medium_Italic,
    Poppins_600SemiBold,
    Poppins_600SemiBold_Italic,
    Poppins_700Bold,
    Poppins_700Bold_Italic,
    Poppins_800ExtraBold,
    Poppins_800ExtraBold_Italic,
    Poppins_900Black,
    Poppins_900Black_Italic,
  });
  const onLayoutRootView = React.useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontError, fontsLoaded]);
  if (!fontsLoaded && !fontError) {
    return <Text>Issue encountered</Text>;
  }
  return (
    <NavigationContainer>
      <Unprotected></Unprotected>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
