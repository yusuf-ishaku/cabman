import * as React from "react";
import {
  View,
  Text,
  Dimensions,
  Button,
  StatusBar,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ImageBackground
} from "react-native";
import { LogoComponent } from "./components/LogoComponent";
// import { useFonts } from 'expo-font';
// import PhoneInput from "react-native-phone-number-input";
import * as SplashScreen from "expo-splash-screen";
import { useDispatch } from "react-redux";
import { setScheme } from "../../data/slices/scheme";


const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const RiderDriverScreen = ({ navigation }) => {
  React.useEffect(() => {
    const onLayoutRootView = async () => {
      await SplashScreen.hideAsync();
    }
    onLayoutRootView();
  });
  const dispatch = useDispatch();
  return (
    <>
      <ScrollView >
        <StatusBar backgroundColor={"white"} barStyle={"dark-content"} />
        <ImageBackground  
        style={{...styles.container, backgroundFit: 'cover'}}
        source={require("../assets/appimages/bgImage.jpg")}
        
        >
          <LogoComponent style={{marginTop: height/4}}></LogoComponent>
          <View style={{width, justifyContent: "center", alignItems: "center"}}>
          <TouchableOpacity
            style={styles.submitButton}
            onPress={() => { dispatch(setScheme("rider")); navigation.navigate("SignUporSignInScreen");}}
          >
            <Text
              style={{
                color: "white",
                textAlign: "center",
                fontFamily: "Poppins_400Regular",
                fontSize: 20,
                fontWeight: 'semibold'
              }}
            >
              Rider
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{...styles.submitButton, backgroundColor: 'white', borderColor: 'blue', borderWidth: 1, color: 'blue'}}
            onPress={() => {dispatch(setScheme("driver")); navigation.navigate("SignUporSignInScreen");}}
          >
            <Text
              style={{
                color: "blue",
                textAlign: "center",
                fontFamily: "Poppins_400Regular",
                fontSize: 20,
                fontWeight: 'semibold'
              }}
            >
              Driver
            </Text>
          </TouchableOpacity>
          </View>
        </ImageBackground>
      </ScrollView>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    width,
    height,
    backgroundColor: "white",
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
  header: {
    width,
    height: 50,
    paddingTop: 10,
    paddingBottom: 10,
    alignItems: "center",
    fontFamily: "Poppins_500Medium",
    fontSize: 24,
    color: "blue",
    textAlign: "center",
  },
  submitButton: {
    color: "white",
    backgroundColor: "blue",
    marginHorizontal: 10,
    width: '90%',
    marginBottom: 20,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
});
export default RiderDriverScreen;
