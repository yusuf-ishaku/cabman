import * as React from "react";
import {
  View,
  Text,
  Dimensions,
  Pressable,
  StatusBar,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Keyboard,
} from "react-native";
// import { useFonts } from 'expo-font';
import PhoneInput from "react-native-international-phone-number";
import { useSelector, useDispatch } from "react-redux";
import {
  useRecieveOtpMutation,
  useVerifyOtpMutation,
} from "../../data/apiSlice/user.slice";
import { formatPhoneNumber } from "./utils/utils";
import { updateUser as updateUserState } from "../../data/slices/user.slice";
// import PhoneInput from "react-native-phone-number-input";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const paramOptions = {
  status: "Verified",
  info: "You have successfully verified your phone number. You can use your phone number as your username. \n Continue to enter your personal information and complete the registration process",
  nextPage: "Register",
  action: "Continue",
};
const OtpRequestScreen = ({ navigation, route }) => {
  const [selectedCountry, setSelectedCountry] = React.useState(null);
  const [inputValue, setInputValue] = React.useState("");
  const [otpRequested, setOtpRequested] = React.useState(false);
  const [userPhone, setUserPhone] = React.useState();
  const [otp, setOtp] = React.useState();
  const [recieveOtp] = useRecieveOtpMutation();
  const [verifyOtp] = useVerifyOtpMutation();
  const dispatch = useDispatch();
  async function createUser(number) {
    console.log(number.length);
    if (number.length === 12) {
      const validPhone = formatPhoneNumber(number);
      setUserPhone(validPhone);
      try {
        const data = await recieveOtp({ phoneNumber: validPhone });
        console.log(data);
        if (data.data?.status === 200) {
          setOtpRequested(true);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
  async function verifyOtpFn(otp) {
    console.log(otp);
    try {
      const data = await verifyOtp({ phoneNumber: userPhone, otp: otp });
      console.log(data);
      if (data.data?.success) {
        dispatch(updateUserState({phoneNumber: userPhone}));
        navigation.navigate("SuccessScreen", paramOptions);
      }
    } catch (error) {
      console.log(error);
    }
  }
  function handleInputValue(phoneNumber) {
    setInputValue(phoneNumber);
  }
  function handleSelectedCountry(country) {
    setSelectedCountry(country);
  }
  // const scheme = useSelector((state) => state.scheme.scheme);

  return (
    <>
      <ScrollView>
        <StatusBar backgroundColor={"white"} barStyle={"dark-content"} />
        <View style={styles.container}>
          {/* <Text style={styles.header}>Cabman</Text> */}
          {otpRequested ? (
            <>
              <View style={{ marginTop: 14 }}>
                <Text
                  style={{
                    ...styles.header2,
                    textAlign: "center",
                    marginTop: 40,
                    marginBottom: 50,
                  }}
                >
                  Verify code
                </Text>
              </View>
              <View style={{ marginTop: 14 }}>
                <Text
                  style={{
                    textAlign: "center",
                    fontWeight: "normal",
                    fontFamily: "Poppins_400Regular",
                    fontSize: 16,
                    marginHorizontal: 10,
                  }}
                >
                  Please enter the verification code received via Voice OTP on
                  your phone: {userPhone}
                </Text>
              </View>
              <View style={styles.form}>
                <Text style={styles.label}>Verify</Text>
                <TextInput
                  onChangeText={(newText) => {
                    setOtp(newText);
                    if (newText.length > 3) {
                      Keyboard.dismiss();
                    }
                  }}
                  keyboardType="numeric"
                  style={{ textAlign: "center", ...styles.input }}
                  placeholder="----"
                ></TextInput>
                <Text
                  style={{
                    color: "black",
                    textAlign: "center",
                    fontFamily: "Poppins_400Regular",
                    fontSize: 16,
                    marginVertical: 16,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  Didn't get a code?
                  <Pressable onPress={() => setOtpRequested(false)}>
                    <Text style={{ color: "blue", fontSize: 16 }}>
                      Try again
                    </Text>
                  </Pressable>
                </Text>
                <TouchableOpacity
                  style={styles.submitButton}
                  onPress={() => verifyOtpFn(otp)}
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
          ) : (
            <>
              <View
                style={{ marginTop: 14, marginBottom: 50, textAlign: "center" }}
              >
                <Text style={{ textAlign: "center", ...styles.header2 }}>
                  Phone Verification
                </Text>
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
                  onPress={() => createUser(inputValue)}
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
                    paddingHorizontal: 14,
                    fontFamily: "Poppins_400Regular",
                    textAlign: "left",
                    // width: (width * 4) / 5,
                    alignSelf: "center",
                    fontSize: 16,
                  }}
                >
                  You will receive a voice OTP (Verification code). Please turn
                  off do not disturb mode to receive the call.
                </Text>
              </View>
              <View style={{ alignItems: "center", marginTop: 30 }}>
                <Text
                  style={{
                    fontSize: 16,
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
                <TouchableOpacity
                  onPress={() => navigation.navigate(`Register`)}
                >
                  <Text
                    style={{
                      color: "black",
                      textAlign: "center",
                      fontFamily: "Poppins_400Regular",
                      fontSize: 16,
                      textTransform: "uppercase",
                      
                    }}
                  >
                    Go to registration
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
    marginTop: 30,
  },
});
export default OtpRequestScreen;
