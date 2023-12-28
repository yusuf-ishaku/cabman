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
import MapView from "react-native-maps";

const HomeScreen = () => {
    return(
        <View style={styles.container}>
            <StatusBar backgroundColor={"white"}/>
            <View style={{backgroundColor: "gray", height}}>
                <MapView
                initialRegion={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                  }}
                style={{width: '100%', height: '100%'}}
                />
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