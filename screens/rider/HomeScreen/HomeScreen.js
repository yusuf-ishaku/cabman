import * as React from "react";
import {
  View,
  Text,
  Dimensions,
  StatusBar,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from "react-native";
import ReactNativeModal from "react-native-modal";
import MapViewDirections from "react-native-maps-directions";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
// import * as Linking from "expo-linking";
// import * as Browser from "expo-web-browser";
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
import MapView, { Marker } from "react-native-maps";
import { PROVIDER_GOOGLE } from "react-native-maps/lib/ProviderConstants";
import { ModalComponent } from "./components/ModalComponent";
import { ChooseRide } from "./components/ChooseRide";
navigator.geolocation = require("react-native-geolocation-service");
import useGetLocation from "../../../hooks/location";
import { ActivityIndicator } from "react-native";
import { useDispatch } from "react-redux";
import { updateRideLater } from "../../../data/slices/ride.slice";
import { showToast } from "../../general/utils/utils";

const HomeScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [destination, setDestination] = React.useState(null);
  const [origin, setOrigin] = React.useState(null);
  const [rideSet, setRideSet] = React.useState(false);
  const [dues, setDues] = React.useState({ dues: "", duration: "" });
  const { currentLocation, initialRegion, error } = useGetLocation();
  const dispatch = useDispatch();
  if (error) {
    return <Text>Error: {error}</Text>;
  }

  if (!currentLocation || !initialRegion) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading...</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={"white"} />
      <Pressable
        style={{
          marginTop: 10,
          position: "absolute",
          zIndex: 1000,
          backgroundColor: "blue",
          padding: 10,
          borderRadius: 10,
          right: 10,
          paddingInline: 15,
        }}
        onPress={() => navigation.openDrawer()}
      >
        <Text style={{ fontSize: 24, color: "white" }}>☰</Text>
      </Pressable>
      <View style={{ backgroundColor: "gray", height: height - 80 }}>
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
            key={"marker-1"}
            title="Your Location"
          />
          {destination && origin && (
            <>
              <Marker coordinate={origin} title="Starting point" />
              <Marker coordinate={destination} title="Drop point" />
              <MapViewDirections
                origin={origin}
                destination={destination}
                mode={"DRIVING"}
                strokeWidth={3}
                strokeColor="blue"
                onReady={(distance, duration) => {
                  setDues({
                    distance,
                    duration,
                  });
                }}
                apikey={"AIzaSyAuAN33w4g8FypFIyka-nkdr-PcvrY2T2Q"}
              />
            </>
          )}
        </MapView>
        <View
          style={{
            position: "absolute",
            justifyContent: "flex-start",
            left: 0,
            right: 0,
            top: 10,
            marginHorizontal: 5,
            // height: 100,
          }}
        >
          <GooglePlacesAutocomplete
            fetchDetails={true}
            placeholder="Your location"
            onPress={(data, details) => {
              setOrigin({
                description: data.description,
                latitude: details.geometry.location.lat,
                longitude: details.geometry.location.lng,
              });
            }}
            GooglePlacesDetailsQuery={{ fields: "geometry" }}
            query={{
              key: "AIzaSyAuAN33w4g8FypFIyka-nkdr-PcvrY2T2Q",
              language: "en",
              components: "country:ng",
            }}
            // currentLocation={true}
            // autoFillOnNotFound={true}
            styles={{ position: "absolute" }}
            predefinedPlaces={[
              {
                description: "Current Location",
                geometry: {
                  location: {
                    lat: currentLocation.latitude,
                    lng: currentLocation.longitude,
                  },
                },
              },
            ]}
          />
          <GooglePlacesAutocomplete
            fetchDetails={true}
            GooglePlacesDetailsQuery={{ fields: "geometry" }}
            placeholder="Destination"
            onPress={(data, details) => {
              setDestination({
                description: data.description,
                latitude: details.geometry.location.lat,
                longitude: details.geometry.location.lng,
              });
            }}
            query={{
              key: "AIzaSyAuAN33w4g8FypFIyka-nkdr-PcvrY2T2Q",
              language: "en",
              components: "country:ng",
            }}
            // autoFillOnNotFound={true}
          />
        </View>
      </View>
      <ReactNativeModal
        isVisible={modalVisible}
        animationInTiming={500}
        animationOutTiming={1000}
        backdropTransitionInTiming={800}
        backdropOpacity={0.5}
        backdropTransitionOutTiming={800}
        style={{
          justifyContent: "flex-end",
          padding: 0,
          margin: 0,
          fontFamily: "Poppins_400Regular",
        }}
      >
        <View style={{ backgroundColor: "white", width, height: 500 }}>
          <View
            style={{
              textAlign: "left",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingVertical: 10,
              paddingHorizontal: 10,
              borderBottomColor: "#d3d3d3",
              borderBottomWidth: 1,
              marginBottom: 0,
            }}
          >
            <Text style={{ fontFamily: "Poppins_400Regular", fontSize: 18 }}>
              Choose an option
            </Text>
            <Pressable onPress={() => setModalVisible(!modalVisible)}>
              <Text
                style={{
                  fontFamily: "Poppins_400Regular",
                  fontSize: 14,
                  color: "blue",
                }}
              >
                Close
              </Text>
            </Pressable>
          </View>
          {rideSet ? (
            <ChooseRide
              origin={origin}
              destination={destination}
              dues={dues}
            ></ChooseRide>
          ) : (
            <ModalComponent></ModalComponent>
          )}
        </View>
      </ReactNativeModal>
      <View
        style={{
          width,
          justifyContent: "center",
          height: 80,
          backgroundColor: "white",
        }}
      >
        {origin && destination ? (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                setModalVisible(true);
                setRideSet(true);
              }}
              style={{
                backgroundColor: "blue",
                padding: 10,
                borderRadius: 5,
                color: "white",
              }}
            >
              <Text style={{ color: "white" }}>Ride Now</Text>
            </TouchableOpacity>
            <TouchableOpacity
              // onPress={() => {setModalVisible(true); setRideSet(!rideSet)}}
              onPress={() => {
                dispatch(
                  updateRideLater({
                    origin,
                    destination,
                  })
                );
                showToast("success", "Success", "Ride added to ride later");
                setOrigin(null);
                setDestination(null);
              }}
              style={{
                backgroundColor: "white",
                borderColor: "blue",
                borderWidth: 1,
                padding: 10,
                borderRadius: 5,
                color: "blue",
              }}
            >
              <Text style={{ color: "blue" }}>Ride later</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            style={{ ...styles.submitButton }}
            onPress={() => {
              setModalVisible(true);
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
              Pay Bills and Utilities
            </Text>
          </TouchableOpacity>
        )}
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    backgroundColor: "transparent",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  safeAreaView: {
    flex: 1,
  },
  container: {
    flex: 1,
    flexDirection: "column",
  },
  showButton: {
    marginTop: 48,
    padding: 16,
    backgroundColor: "mediumspringgreen",
    alignSelf: "center",
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 20,
  },
  bottomSheetContent: {
    padding: 40,
    alignItems: "center",
  },
  bottomSheetText: {
    fontSize: 24,
    marginBottom: 80,
  },
  bottomSheetCloseButton: {
    padding: 16,
    backgroundColor: "deeppink",
    borderRadius: 8,
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
export default HomeScreen;
