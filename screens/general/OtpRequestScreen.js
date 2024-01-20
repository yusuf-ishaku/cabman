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
  Keyboard
} from "react-native";
// import { useFonts } from 'expo-font';
import PhoneInput from "react-native-international-phone-number";
// import PhoneInput from "react-native-phone-number-input";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const paramOptions = {
  status: "Verified",
  info: "You have successfully verified your phone number. You can use your phone number as your username. \n Continue to enter your personal information and complete the registration process",
  nextPage: "Register",
  action: "Continue"
};
const OtpRequestScreen = ({ navigation, route }) => {
  const [selectedCountry, setSelectedCountry] = React.useState(null);
  const [inputValue, setInputValue] = React.useState("");
  const [otpRequested, setOtpRequested] = React.useState(false);
  function handleInputValue(phoneNumber) {
    setInputValue(phoneNumber);
  }
  function handleSelectedCountry(country) {
    setSelectedCountry(country);
  };
  const scheme = route.params.scheme;
  return (
    <>
      <ScrollView>
        <StatusBar backgroundColor={"white"} barStyle={"dark-content"} />
        <View style={styles.container}>
          {/* <Text style={styles.header}>Cabman</Text> */}
          {otpRequested ?  (
            <>
              <View style={{ marginTop: 14 }}>
                <Text style={{...styles.header2, textAlign: 'center', marginTop: 40, marginBottom: 50}}>Verify code</Text>
              </View>
              <View style={{ marginTop: 14 }}>
                <Text style={{textAlign: 'center', fontWeight: 'normal', fontFamily: 'Poppins_400Regular', fontSize: 16, marginHorizontal: 10}}>Please enter the verification code received via Voice OTP on your phone: 89899998989</Text>
              </View>
              <View style={styles.form}>
                <Text style={styles.label}>Verify</Text>
            <TextInput onChangeText={newText => {
              if(newText.length > 3){
                Keyboard.dismiss();
              }
            }} keyboardType="numeric" style={{textAlign: 'center', ...styles.input}} placeholder="----" ></TextInput>
                <Text 
                 style={{
                  color: "black",
                  textAlign: "center",
                  fontFamily: "Poppins_400Regular",
                  fontSize: 16,
                  marginVertical: 16
                }}
                >
                  Didn't get a code? <Text style={{color: "blue"}}>Try again</Text>
                </Text>
                <TouchableOpacity
                  style={styles.submitButton}
                  onPress={() => navigation.navigate("SuccessScreen", {scheme, ...paramOptions})}
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
          )
                    :(
                      <>
                        <View style={{ marginTop: 14, marginBottom: 50, textAlign: 'center' }}>
                          <Text style={{textAlign: 'center',...styles.header2}}>Phone Verification</Text>
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
                              Continue
                            </Text>
                          </TouchableOpacity>
                          <Text
                              style={{
                                marginTop: 20,
                                marginVertical: 14,
                                fontFamily: "Poppins_400Regular",
                                textAlign: 'center',
                                width: width * 4/5,
                                alignSelf: 'center'
                              }}
                            >
                              You will receive a voice OTP (Verification code). Message
                              and data rates may apply.
                            </Text>
                        </View>
                        <View style={{ alignItems: "center", marginTop: 30 }}>
                          <Text
                            style={{
                              fontSize: 15,
                              marginTop: 10,
                              fontFamily: "Poppins_400Regular",
                            }}
                          >
                            Already have an account?{" "}
                            <Text
                              onPress={() => navigation.navigate("Login", {scheme})}
                              style={{ color: "blue" }}
                            >
                              Sign In
                            </Text>
                          </Text>
                        </View>
                      </>
                    ) 
        }
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
    marginTop: 30
  },
});
export default OtpRequestScreen;
