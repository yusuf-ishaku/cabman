import * as React from "react";
import {
  View,
  Text,
  Dimensions,
  StatusBar,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import ReactNativeModal from "react-native-modal";
import MapViewDirections from "react-native-maps-directions";
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
import MapView, { Marker } from "react-native-maps";
import { PROVIDER_GOOGLE } from "react-native-maps/lib/ProviderConstants";
import { ModalComponent } from "./components/ModalComponent";
import { SetActive } from "./components/SetActive";
import useGetLocation from "../../../hooks/location";
import RideRequest from "./components/RideRequest";

const HomeScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [rideRequestData, setRideRequestData] = React.useState(null);
  const [destination, setDestination] = React.useState(null);
  const [origin, setOrigin] = React.useState(null);
  const [rideSet, setRideSet] = React.useState(false);
  const [dues, setDues] = React.useState(null);
  const { currentLocation, initialRegion, error } = useGetLocation();
  if (error) {
    return <Text>Error: {error}</Text>;
  }
  const handleRideRequest = (data) => {
    setModalVisible(true);
    setRideRequestData(data);
  };
  const handleRideCancel = (data) => {
    setModalVisible(false);
    setRideRequestData(null);
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
          backgroundColor: "white",
          padding: 10,
          borderRadius: 10,
          right: 10,
          paddingInline: 15,
        }}
        onPress={() => navigation.openDrawer()}
      >
        <Text style={{ fontSize: 24 }}>☰</Text>
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
                strokeColor="red"
                onReady={(distance, duration) =>
                  setDues({
                    distance,
                    duration,
                  })
                }
                apikey={"AIzaSyAuAN33w4g8FypFIyka-nkdr-PcvrY2T2Q"}
              />
            </>
          )}
        </MapView>
        <SetActive
          styles={{ position: "absolute", top: 10, left: 10 }}
          handleRideRequest={handleRideRequest}
        ></SetActive>
      </View>
      <ReactNativeModal
        isVisible={modalVisible}
        animationInTiming={500}
        animationOutTiming={1000}
        backdropTransitionInTiming={800}
        backdropOpacity={0.1}
        backdropTransitionOutTiming={800}
        style={{
          justifyContent: "flex-end",
          padding: 0,
          margin: 0,
          fontFamily: "Poppins_400Regular",
        }}
      >
        {!rideRequestData ? (
          <View style={{ backgroundColor: "white", width, height: 300 }}>
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
            <ModalComponent></ModalComponent>
          </View>
        ) : (
          <RideRequest width={width} handleRideCancel={handleRideCancel} rideRequestData={rideRequestData} />
        )}
      </ReactNativeModal>
      <View
        style={{
          width,
          justifyContent: "center",
          height: 80,
          backgroundColor: "white",
        }}
      >
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
