import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { getPlaceDescription } from "../../../../utils/reverseGeoCode";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useSocket from "../../../../hooks/socket";
const RideRequest = ({ rideRequestData, styles, width, handleRideCancel }) => {
  const [placeDescription, setPlaceDescription] = useState("");
  const { emitEvent } = useSocket();
  const user = useSelector((state) => state.user);
  useEffect(() => {
    const fetchPlaceDescription = async () => {
      if (rideRequestData.origin.longitude && rideRequestData.origin.latitude) {
        const description = await getPlaceDescription(
          rideRequestData.origin.latitude,
          rideRequestData.origin.longitude
        );
        setPlaceDescription(description);
      }
    };

    fetchPlaceDescription();
  }, [rideRequestData.originCoords]);
  return (
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
          New Ride Request
        </Text>
      </View>
      <View style={{ padding: 10 }}>
        <Text style={{ fontFamily: "Poppins_400Regular", fontSize: 16 }}>
          Rider: {rideRequestData.id}
        </Text>
        <Text style={{ fontFamily: "Poppins_400Regular", fontSize: 16 }}>
          <Ionicons
            style={{ width: 25 }}
            name="ellipse-outline"
            size={24}
            color="yellow"
          />
          {placeDescription}
        </Text>
        <Text style={{ fontFamily: "Poppins_400Regular", fontSize: 16 }}>
          <Ionicons
            style={{ width: 25 }}
            name="location-outline"
            size={24}
            color="green"
          />{" "}
          {rideRequestData.destination.description}
        </Text>
        <Text style={{ fontFamily: "Poppins_400Regular", fontSize: 16 }}>
          Wishes: {rideRequestData.wishes}
        </Text>

        <Text
          style={{
            fontFamily: "Poppins_400Regular",
            fontSize: 16,
            textTransform: "capitalize",
          }}
        >
          <Text
            style={{
              marginRight: 10,
            }}
          >
            💵
          </Text>
          {rideRequestData.paymentMethod}
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            marginTop: 20,
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: "blue",
              flexDirection: "row",
              padding: 4,
              alignItems: "center",
            }}
            onPress={() => {
              emitEvent("accept-ride", {
                passenger: {
                  id: rideRequestData.id,
                  socketId: rideRequestData.socketId,
                  origin: rideRequestData.origin,
                  destination: rideRequestData.destination,
                },
                driver: {
                  id: user.phoneNumber,
                  location: {
                    longitude: user.location.coords.longitude,
                    latitude: user.location.coords.latitude,
                  },
                },
              });
            }}
          >
            <Text style={{ marginRight: 10 }}>✅</Text>
            <Text
              style={{
                color: "white",
                fontFamily: "Poppins_400Regular",
                fontSize: 16,
              }}
            >
              Accept
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: "white",
              borderColor: "red",
              borderWidth: 1,
              paddingInline: 6,
              flexDirection: "row",
              alignItems: "center",
            }}
            // onPress={() => setModalVisible(false)}
            onPress={handleRideCancel}
          >
            <Text style={{ marginRight: 10 }}>❌</Text>
            <Text
              style={{
                color: "red",
                fontFamily: "Poppins_400Regular",
                fontSize: 16,
              }}
            >
              Cancel
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default RideRequest;
