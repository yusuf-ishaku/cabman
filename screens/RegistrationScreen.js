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
const paramOptions = {
  status: "Success",
  info: "You have successfully completed your registration. You can now book and enjoy your rides.",
  nextPage: "MainApp",
  action: "OK"
};
const RegistrationScreen = ({ navigation }) => {
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
      <View style={{width, height, backgroundColor: "black"}}>
        <StatusBar backgroundColor={"white"} barStyle={"dark-content"} />
        <ScrollView style={styles.container}>
          <Text style={styles.header}>Cabman</Text>
          <>
            <View style={{ marginTop: 14 }}>
              <Text style={styles.header2}>Create your account</Text>
            </View>
            <View style={styles.form}>
              <Text style={styles.label}>Username</Text>
              <TextInput
                style={styles.input}
                placeholder="Username"
              ></TextInput>
              <Text style={styles.label}>Address</Text>
              <TextInput style={styles.input} placeholder="Enter Address"></TextInput>
              <Text style={styles.label}>City</Text>
              <TextInput style={styles.input} placeholder="Enter City"></TextInput>
              <Text style={styles.label}>Country</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter country"
              ></TextInput>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter Email"
              ></TextInput>
              <Text style={styles.label}>Profile Picture</Text>
              <TextInput
                style={styles.input}
                placeholder="Add Profile Picture"
              ></TextInput>
               <Text style={styles.label}>Referral code</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter Referral Code (Optional)"
              ></TextInput>
              <Text style={styles.label}>Password</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter Password"
              ></TextInput>
              <Text style={styles.label}>Confirm Password</Text>
              <TextInput
                style={styles.input}
                placeholder="Confirm Password"
              ></TextInput>
              <TouchableOpacity
                style={styles.submitButton}
                onPress={() => navigation.navigate("SuccessScreen", paramOptions)}
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
              <Text
            style={{
              color: "white",
              textAlign: "center",
              fontFamily: "Poppins_400Regular",
              fontSize: 16,
              textTransform: "uppercase",
            }}
          >
           By signing up, you agree to our terms of use and privacy policy.
          </Text>
            </View>
          </>
        </ScrollView>
      </View>
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
export default RegistrationScreen;
