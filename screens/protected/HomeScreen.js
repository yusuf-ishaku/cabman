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
import MapView, { Marker } from "react-native-maps";
import { PROVIDER_GOOGLE } from "react-native-maps/lib/ProviderConstants";
import * as Location from "expo-location";

const HomeScreen = () => {
  const [currentLocation, setCurrentLocation] = React.useState(null);
  const [initialRegion, setInitialRegion] = React.useState(null);
  React.useEffect(() => {
    const getLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setCurrentLocation(location.coords);

      setInitialRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      });
    };

    getLocation();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={"white"} />
      <View style={{ backgroundColor: "gray", height }}>
        <MapView
          initialRegion={initialRegion}
          style={{ width: "100%", height: "100%" }}
          provider={PROVIDER_GOOGLE}
        >
             <Marker
              coordinate={{
                latitude: currentLocation.latitude,
                longitude: currentLocation.longitude,
              }}
              title="Your Location"
            />
        </MapView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width,
    height,
    backgroundColor: "white",
  },
});
export default HomeScreen;
