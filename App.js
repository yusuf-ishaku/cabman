import "./gesture-handler";
import * as React from "react";
// import { StatusBar } from "expo-status-bar";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/general/LoginScreen";
import OtpRequestScreen from "./screens/general/OtpRequestScreen";
import HomeScreenRider from "./screens/rider/HomeScreen/HomeScreen";
import HomeScreenDriver from "./screens/driver/HomeScreen/HomeScreen";
import RegistrationScreen from "./screens/general/RegistrationScreen";
// import MainApp from "./essentials/MainApp";
import RiderDriverScreen from "./screens/general/RiderDriverScreen";
import SignUporSignInScreen from "./screens/general/SignUporSignIn";
import * as SplashScreen from "expo-splash-screen";
import * as Location from "expo-location";
import { Provider, useDispatch, useSelector } from "react-redux";
import { setLocation } from "./data/slices/user.slice";
import { store } from "./data/store";
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
import SuccessScreen from "./screens/general/SuccessScreen";
import MyDrawer from "./screens/general/utils/TabNavigator";

const Stack = createNativeStackNavigator();
SplashScreen.preventAutoHideAsync();

const toastConfig = {
  /*
    Overwrite 'success' type,
    by modifying the existing `BaseToast` component
  */
  success: (props) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: 'green' }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 15,
        fontWeight: '400'
      }}
    />
  ),
  /*
    Overwrite 'error' type,
    by modifying the existing `ErrorToast` component
  */
  error: (props) => (
    <ErrorToast
      {...props}
      style={{borderLeftColor: "red"}}
      text1Style={{
        fontSize: 17
      }}
      text2Style={{
        fontSize: 15
      }}
    />
  ),
  /*
    Or create a completely new type - `tomatoToast`,
    building the layout from scratch.

    I can consume any custom `props` I want.
    They will be passed when calling the `show` method (see below)
  */
  tomatoToast: ({ text1, props }) => (
    <Pressable onPress={()=> {console.log("toasted")}} style={{ height: 60, width: '100%', backgroundColor: 'tomato', position: 'absolute', zIndex: 9999}}>
      <Text>{text1}</Text>
      <Text>{props.uuid}</Text>
    </Pressable>
  )
};

function Unprotected() {
  return (
    // <MyDrawer/>
    <Stack.Navigator initialRouteName="RiderDriverScreen">
      <Stack.Screen
        name="Tabs"
        component={MyDrawer}
        options={{ title: "Drawer", headerShown: false }}
      ></Stack.Screen>
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
        name="HomeScreenRider"
        component={HomeScreenRider}
        options={{ title: "Home Screen Rider", headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen
        name="HomeScreenDriver"
        component={HomeScreenDriver}
        options={{ title: "Driver Home Screen", headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen
        name="Register"
        component={RegistrationScreen}
        options={{ title: "Register", headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen
        name="RiderDriverScreen"
        component={RiderDriverScreen}
        options={{ title: "Rider or Driver?", headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen
        name="SignUporSignInScreen"
        component={SignUporSignInScreen}
        options={{ title: "Sign Up or sign in screen", headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen
        name="SuccessScreen"
        component={SuccessScreen}
        options={{ title: "Success", headerShown: false }}
      ></Stack.Screen>
    </Stack.Navigator>
  );
}

function GetLocation() {
  const [currentLocation, setCurrentLocation] = React.useState(null);
  const [initialRegion, setInitialRegion] = React.useState(null);
  const dispatch = useDispatch();
  React.useEffect(() => {
    const getLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      dispatch(setLocation(location));
      setCurrentLocation(location.coords);
      setInitialRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      });
    };

    getLocation();
  }, []);
  return null;
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
    <>
      <SafeAreaProvider>
        <Provider store={store}>
          <GetLocation></GetLocation>
          <NavigationContainer>
            <Unprotected></Unprotected>
          </NavigationContainer>
        </Provider>
        <Toast/> 
      </SafeAreaProvider>
    </>
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
