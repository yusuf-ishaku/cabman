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
import PhoneInput from "react-native-international-phone-number";
import { LogoComponent } from "./components/LogoComponent";
// import PhoneInput from "react-native-phone-number-input";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const LoginScreen = ({ navigation }) => {
  const [selectedCountry, setSelectedCountry] = React.useState(null);
  const [inputValue, setInputValue] = React.useState("");
  function handleInputValue(phoneNumber) {
    setInputValue(phoneNumber);
  }

  function handleSelectedCountry(country) {
    setSelectedCountry(country);
  }
  return (
    <>
      <ScrollView>
        <StatusBar backgroundColor={"white"} barStyle={"dark-content"} />
        <View style={styles.container}>
          <LogoComponent style={{alignSelf: 'center', marginTop: 40}}></LogoComponent>
          <View style={{marginTop: 50,...styles.form}}>
            <Text style={styles.label}>Phone Number</Text>
            <View
              style={{
                marginHorizontal: 10,
                marginBottom: 10,
                fontFamily: styles.input.fontFamily,
              }}
            >
              <PhoneInput
                defaultValue="+234"
                value={inputValue}
                placeholder="Phone number"
                onChangePhoneNumber={handleInputValue}
                selectedCountry={selectedCountry}
                onChangeSelectedCountry={handleSelectedCountry}
              />
            </View>
            <Text style={styles.label}>Password</Text>
            <TextInput style={styles.input} placeholder="Enter Password"></TextInput>
            <Text
              style={{
                textAlign: "right",
                marginBottom: 30,
                marginTop: 10,
                marginHorizontal: 10,
                fontFamily: "Poppins_400Regular",
                color: "blue",
              }}
            >
              Forgot password?
            </Text>
            <TouchableOpacity
              style={styles.submitButton}
              onPress={() => navigation.navigate("MainApp")}
            >
              <Text
                style={{
                  color: "white",
                  textAlign: "center",
                  fontFamily: "Poppins_400Regular",
                  fontSize: 16,
                  textAlignVertical: "center",
                }}
              >
                Submit
              </Text>
            </TouchableOpacity>
          </View>
          {/* <View style={{ flexDirection: "row", alignItems: "center", marginHorizontal: 10, marginTop: 10}}>
              <View style={{ flex: 1, height: 2, backgroundColor: '#D3D3D3'}} />
              <View>
                <Text style={{ width: 50, textAlign: "center", color: 'black', fontFamily: 'Poppins_400Regular' }}>Or</Text>
              </View>
              <View style={{ flex: 1, height: 2, backgroundColor: '#D3D3D3' }} />
            </View> */}
          <View style={{ alignItems: "center" }}>
            <Text
              style={{
                fontSize: 15,
                marginTop: 10,
                fontFamily: "Poppins_400Regular",
              }}
            >
              Don't have an account?{" "}
              <Text
                onPress={() => navigation.navigate("SignUp")}
                style={{ color: "blue" }}
              >
               Sign Up
              </Text>
            </Text>
          </View>
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
  header2: {
    width,
    height: 50,
    paddingTop: 10,
    paddingHorizontal: 6,
    fontSize: 24,
    fontFamily: "Poppins_500Medium",
  },
  header3: {
    width,
    height: 40,
    paddingHorizontal: 6,
    paddingTop: -4,
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
  },
  form: {
    width: "auto",
    height: "auto",
  },
  label: {
    width: "auto",
    marginHorizontal: 10,
    marginBottom: 4,
    fontFamily: "Poppins_500Medium",
    fontSize: 16,
  },
  input: {
    width: "auto",
    marginHorizontal: 10,
    marginBottom: 10,
    borderWidth: 1,
    paddingHorizontal: 10,
    color: "black",
    height: 50,
    borderColor: "#D3D3D3",
    borderRadius: 6,
    fontFamily: "Poppins_400Regular",
    fontSize: 16,
  },
  submitButton: {
    color: "white",
    backgroundColor: "blue",
    marginHorizontal: 10,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
});
export default LoginScreen;
