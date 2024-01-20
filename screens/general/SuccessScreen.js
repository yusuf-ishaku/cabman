import Ionicons from "@expo/vector-icons/Ionicons";
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
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const SuccessScreen = ({ route, navigation }) => {
  const params = route.params;
  return (
    <>
      <View style={styles.container}>
        <Ionicons
          name="ios-checkmark-circle-outline"
          size={120}
          color="green"
        />
        <Text style={{ fontSize: 40, ...styles.header }}>{params.status}!</Text>
        <Text
          style={{
            fontFamily: "Poppins_400Regular",
            fontSize: 16,
            textAlign: "center",
            marginVertical: 10,
            paddingHorizontal: 20,
          }}
        >
          {params.info}
        </Text>
        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => navigation.navigate(`${params.nextPage}`)}
        >
          <Text
            style={{
              color: "white",
              textAlign: "center",
              fontFamily: "Poppins_400Regular",
              fontSize: 16,
              textTransform: "uppercase",
            }}
          >
            {params.action}
          </Text>
        </TouchableOpacity>
      </View>
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
    paddingTop: 100,
    alignItems: "center",
  },
  header: {
    width,
    height: "auto",
    paddingTop: 10,
    paddingBottom: 10,
    alignItems: "center",
    fontFamily: "Poppins_500Medium",
    fontSize: 40,
    color: "blue",
    textAlign: "center",
  },
  submitButton: {
    color: "white",
    backgroundColor: "blue",
    marginHorizontal: 10,
    width: "90%",
    marginBottom: 20,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginTop: 28,
  },
});

export default SuccessScreen;