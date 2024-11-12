import * as React from "react";
import {
  View,
  Text,
  Dimensions,
  StatusBar,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert
} from "react-native";
import PhoneInput from "react-native-international-phone-number";
import { LogoComponent } from "./components/LogoComponent";
import { useSelector } from "react-redux";
import { useLoginMutation } from "../../data/apiSlice/user.slice";
import { formatPhoneNumber } from "./utils/utils";
import Toast from "react-native-toast-message";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const LoginScreen = ({ navigation, route }) => {
  const [selectedCountry, setSelectedCountry] = React.useState(null);
  const [inputValue, setInputValue] = React.useState("");
  const scheme = useSelector((state) => state.scheme.scheme);
  const [login] = useLoginMutation();
  const [body, setBody] = React.useState({
    phoneNumber: "",
    password: "",
  });

  const handleInputChange = (field, value) => {
    setBody((prevBody) => ({
      ...prevBody,
      [field]: value,
    }));
  };

  const showToast = (type, text1, text2) => {
    Toast.show({
      type: type,
      text1: text1,
      text2: text2,
    });
  };

  const sendData = async (body) => {
    const validPhone = formatPhoneNumber(body.phoneNumber);
      // setUserPhone(validPhone);
    console.log(validPhone);
    const formattedBody = {...body, phoneNumber: validPhone};
    const validateBody = (body) => {
      const { phoneNumber, password } = body;
      
      if (!phoneNumber || !password) {
        showToast('error', 'Error', 'Please fill all necessary fields');
        return false;
      }
      return true;
    };
    // validateBody(body);
    try {
      if (validateBody(formattedBody)) {
        console.log(formattedBody)
        const response = await login(formattedBody);
        if (response) {
          console.log(response);
          if (response.data?.data) {
            showToast('success', 'Success', 'Login successful');
            navigation.navigate(scheme === "rider" ? "HomeScreenRider" : "HomeScreenDriver");
          } else {
            Alert.alert("Error", response.error.data.message);
          }
        }
      }
    } catch (error) {
      console.error(error.message);
      return;
    }
  };
  console.log(scheme);
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
          <LogoComponent
            style={{ alignSelf: "center", marginTop: 40 }}
          ></LogoComponent>
          <View style={{ marginTop: 50, ...styles.form }}>
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
            <TextInput
              style={styles.input}
              placeholder="Enter Password"
              onChangeText={(text) => handleInputChange("password", text)}
            ></TextInput>
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
              onPress={() =>{
                sendData({...body, phoneNumber: inputValue});
              
              }
              }
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
