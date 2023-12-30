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
} from "react-native";
// import { useFonts } from 'expo-font';
// import PhoneInput from "react-native-phone-number-input";
import * as SplashScreen from "expo-splash-screen";


const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const SignUporSignInScreen = ({ navigation }) => {
  React.useEffect(() => {
    const onLayoutRootView = async () => {
      await SplashScreen.hideAsync();
    }
    onLayoutRootView();
  })
  return (
    <>
      <ScrollView >
        <StatusBar backgroundColor={"white"} barStyle={"dark-content"} />
        <View  style={styles.container}>
          <Text style={styles.header}>Cabman</Text>
          <Text
          style={{fontFamily: "Poppins_400Regular", textAlign: 'center', marginHorizontal: 10, marginBottom: 20}}
          >
            Make your day more efficient and rewarding with any of our options. Classic or Executive rides.
            Just relax and let Cabman take you there in safety and comfort!
          </Text>
          <Text
           style={{fontFamily: "Poppins_400Regular", textAlign: 'center', marginHorizontal: 10}}
          >
            Already have an account?
          </Text>
          <TouchableOpacity
            style={styles.submitButton}
            onPress={() => navigation.navigate("Login")}
          >
            <Text
              style={{
                color: "white",
                textAlign: "center",
                fontFamily: "Poppins_400Regular",
                fontSize: 16,
                textTransform: 'uppercase'
              }}
            >
              Sign In to Account
            </Text>
          </TouchableOpacity>
          <Text
           style={{fontFamily: "Poppins_400Regular", textAlign: 'center', marginHorizontal: 10}}
          >
              Don't have an account?
          </Text>
          <TouchableOpacity
            style={{...styles.submitButton, backgroundColor: 'white', borderColor: 'blue', borderWidth: 1, color: 'blue'}}
            onPress={() => navigation.navigate("SignUp")}
          >
            <Text
              style={{
                color: "blue",
                textAlign: "center",
                fontFamily: "Poppins_400Regular",
                fontSize: 16,
                textTransform: 'uppercase'
              }}
            >
              Sign Up new Account
            </Text>
          </TouchableOpacity>
        </View>
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
    // justifyContent: "center",
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
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
});
export default SignUporSignInScreen;
