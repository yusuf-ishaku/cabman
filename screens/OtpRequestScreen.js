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
// import PhoneInput from "react-native-phone-number-input";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const OtpRequestScreen = ({ navigation }) => {
  const [selectedCountry, setSelectedCountry] = React.useState(null);
  const [inputValue, setInputValue] = React.useState("");
  const [otpRequested, setOtpRequested] = React.useState(false);
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
          <Text style={styles.header}>Cabman</Text>
          {otpRequested ? (
            <>
              <View style={{ marginTop: 14 }}>
                <Text style={styles.header2}>Create your account</Text>
              </View>
              <View style={styles.form}>
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
                  <Text
                    style={{
                      marginVertical: 14,
                      fontFamily: "Poppins_400Regular",
                    }}
                  >
                    You will receive a voice OTP (Verification code). Message
                    and data rates may apply.
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.submitButton}
                  onPress={() => setOtpRequested(true)}
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
                    Request OTP
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={{ alignItems: "center" }}>
                <Text
                  style={{
                    fontSize: 15,
                    marginTop: 10,
                    fontFamily: "Poppins_400Regular",
                  }}
                >
                  Already have an account?{" "}
                  <Text
                    onPress={() => navigation.navigate("Login")}
                    style={{ color: "blue" }}
                  >
                    Sign In
                  </Text>
                </Text>
              </View>
            </>
          ) : (
            <>
              <View style={{ marginTop: 14 }}>
                <Text style={styles.header2}>Input OTP</Text>
              </View>
              <View style={styles.form}>
                <Text style={styles.label}>OTP</Text>
                <TextInput style={styles.input} placeholder="OTP"></TextInput>
                <TouchableOpacity
                  style={styles.submitButton}
                  onPress={() => navigation.navigate("Register")}
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
                    Verify
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          )}
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
    marginTop: 16,
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
export default OtpRequestScreen;
