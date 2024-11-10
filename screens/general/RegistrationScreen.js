import * as React from "react";
import {
  View,
  Text,
  Dimensions,
  Platform,
  StatusBar,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import { useSelector } from "react-redux";
import Toast from 'react-native-toast-message';
import UploaderComponent from "./components/uploader/UploaderComponent";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
import { useUpdateUserMutation } from "../../data/apiSlice/user.slice";
import { updateUser as updateUserState } from "../../data/slices/user.slice";
import { useDispatch } from "react-redux";

const RegistrationScreen = ({ navigation }) => {
  const scheme = useSelector((state) => state.scheme.scheme);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  console.log(scheme);
  const paramOptions = {
    status: "Success",
    info: "You have successfully completed your registration. \n You can now book and enjoy your rides.",
    nextPage: scheme === "rider" ? "HomeScreenRider" : "HomeScreenDriver",
    action: "OK",
  };
  const [updateUser] = useUpdateUserMutation()
  const showToast = (type, text1, text2) => {
    Toast.show({
      type: type,
      text1: text1,
      text2: text2
    });
  }
  const [body, setBody] = React.useState({
    fullName: "",
    address: "",
    city: "",
    country: "",
    email: "",
    profilePicture: "",
    referralCode: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (field, value) => {
    setBody((prevBody) => ({
      ...prevBody,
      [field]: value,
    }));
  };

  const handleImageSrc = (data) => {
    console.log(data);
    setBody((prevBody) => ({
      ...prevBody,
      "profilePicture": data
    }))
  }

  const sendData = async (body) => {
    const validateBody = (body) => {
      const { fullName, address, city, country, email, password, confirmPassword, profilePicture} = body;
      if (!fullName || !address || !city || !country || !email || !password || !confirmPassword) {
        showToast('error', 'Error', 'Please fill all necessary fields');
        return false;
      }
      if(!profilePicture) {
        showToast('error', 'Error', 'Please select image');
        return false;
      }
      if (password !== confirmPassword) {
        showToast('error', 'Error', 'Passwords do not match');
        return false;
        // throw new Error("Passwords do not match");
      }
      return true
      // Add more validation rules as needed
    };

    try {
     if(validateBody(body)){
      const response = await updateUser({...body, phoneNumber: user.phoneNumber});
      if(response){
        console.log(response);
        if(response.data?.data){
          dispatch(updateUserState(response.data.data))
        navigation.navigate("SuccessScreen", paramOptions)

        } else {
          Alert.alert("Error", response.error.data.message)
        }
      }
     };
    } catch (error) {
      console.error(error.message);

      return;
    }
    // const data = await updateUser(body);
    // console.log(data);
  } 

  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <StatusBar backgroundColor={"white"} barStyle={"dark-content"} />
        <ScrollView style={styles.container}>
          <Text style={styles.header}>Personal Information</Text>
          <>
            <View style={styles.form}>
              <Text style={styles.label}>Full Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Username"
                onChangeText={(text) => handleInputChange("fullName", text)}
              ></TextInput>
              <Text style={styles.label}>Address</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter Address"
                onChangeText={(text) => handleInputChange("address", text)}
              ></TextInput>
              <Text style={styles.label}>City</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter City"
                onChangeText={(text) => handleInputChange("city", text)}
              ></TextInput>
              <Text style={styles.label}>Country</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter country"
                onChangeText={(text) => handleInputChange("country", text)}
              ></TextInput>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter Email"
                onChangeText={(text) => handleInputChange("email", text)}
              ></TextInput>
              <Text style={styles.label}>Profile Picture</Text>
              {/* <TextInput
                style={styles.input}
                placeholder="Add Profile Picture"
                onChangeText={(text) =>
                  handleInputChange("profilePicture", text)
                }
              ></TextInput> */}
              <UploaderComponent updateImageSrc={handleImageSrc} upload_preset={"event_app"} cloud_name={ "dv5v8l2lr"}></UploaderComponent>
              <Text style={styles.label}>Referral code</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter Referral Code (Optional)"
                onChangeText={(text) => handleInputChange("referralCode", text)}
              ></TextInput>
              <Text style={styles.label}>Password</Text>
              <View style={[{ flexDirection: 'row', alignItems: 'center' }, styles.input]}>
                <TextInput
                  style={[{ flex: 1 }]}
                  placeholder="Enter Password"
                  secureTextEntry={!showPassword}
                  onChangeText={(text) => handleInputChange("password", text)}
                ></TextInput>
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  <Text>{showPassword ? "Hide" : "Show"}</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.label}>Confirm Password</Text>
              <View style={[{ flexDirection: 'row', alignItems: 'center' }, styles.input]}>
                <TextInput
                  style={[{ flex: 1 }]}
                  placeholder="Confirm Password"
                  secureTextEntry={!showConfirmPassword}
                  onChangeText={(text) =>
                    handleInputChange("confirmPassword", text)
                  }
                ></TextInput>
                <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                  <Text>{showConfirmPassword ? "Hide" : "Show"}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
          <TouchableOpacity
            style={styles.submitButton}
            onPress={() => {
              sendData(body);
            }}
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
        </ScrollView>
      </KeyboardAvoidingView>
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
