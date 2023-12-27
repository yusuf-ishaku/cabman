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
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const HomeScreen = () => {
    return(
        <View style={styles.container}>
            <StatusBar backgroundColor={"white"}/>
            <View style={{backgroundColor: "gray", height: height * 92/100}}>
                <Text 
                style={{color: "white"}}
                >
                    This is where the map will go.
                </Text>
            </View>
            <View
            style={{backgroundColor: "white", height: height * 8/100}}
            >
                <Text>This is where the tabs will go</Text>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        width,
        height,
        backgroundColor: 'white'
    }
});
export default HomeScreen