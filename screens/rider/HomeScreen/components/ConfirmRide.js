import React from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import useSocket from "../../../../hooks/socket";
import { useSelector } from "react-redux";
import { showToast } from "../../../general/utils/utils";
export const ConfirmRide = ({ ride, dues, origin, destination }) => {
  const user = useSelector((state) => state.user);
  const [home, setHome] = React.useState(true);
  const [paymentMethod, setPaymentMethod] = React.useState("cash");
  const [wishes, setWishes] = React.useState("");
  const [message, setMessage] = React.useState("🚗 Find Driver");
  const { distance, duration } = dues;
  const [rideInfo, setRideInfo] = React.useState(null);
  const { emitEvent, subscribeToEvent } = useSocket();
  const calculateFare = (distance, duration, ride) => {
    if (ride === "classic") {
      const distanceCharges = 83;
      const basicFare = 500;
      const rideTimeCharges = 20;
      const bookingValue = 0.02;
      const developmentLevy = 10;

      const A =
        basicFare + distance * distanceCharges + duration * rideTimeCharges;
      const B = bookingValue * A + developmentLevy;
      return A + B;
    }
    if (ride === "executive") {
      const distanceCharges = 100;
      const basicFare = 600;
      const rideTimeCharges = 30;
      const bookingValue = 0.3;
      const developmentLevy = 20;

      const A =
        basicFare + distance * distanceCharges + duration * rideTimeCharges;
      const B = bookingValue * A + developmentLevy;
      return A + B;
    }
  };
  const updateHome = (data) => {
    setHome(data);
  }
  return (
    <>
      {home ? (
        <View style={{ padding: 10, marginBottom: 20 }}>
          <Text style={{ textTransform: "capitalize", marginVertical: 20 }}>
            {ride} : N {calculateFare(distance, duration, ride)} / {distance} /{" "}
            {duration}
          </Text>
          <Text style={{ marginVertical: 5 }}>
            NOTE: This is an approximate estimate. Actual cost may vary
            according to the traffic.
          </Text>
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
              marginHorizontal: 0,
              marginVertical: 5,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                width: "auto",
                justifyContent: "space-between",
              }}
            >
              <Text style={{ fontSize: 18 }}>Wishes</Text>
            </View>
            <TextInput
              multiline={true}
              numberOfLines={5}
              onChangeText={(text) => setWishes(text)}
              style={{
                borderWidth: 1,
                marginTop: 10,
                padding: 5,
                borderRadius: 5,
                borderColor: "blue",
              }}
              placeholder="Your wishes"
            ></TextInput>
            <Text style={{ fontSize: 18, marginTop: 10 }}>Payment Method</Text>
            <View style={{ marginTop: 10, flexDirection: "row" }}>
              <TouchableOpacity
                style={{
                  backgroundColor: paymentMethod === "cash" ? "blue" : "white",
                  borderWidth: 1,
                  borderColor: "blue",
                  color: "blue",
                  padding: 10,
                  borderRadius: 5,
                  marginVertical: 5,
                  marginRight: 10,
                  width: 100,
                }}
                onPress={() =>
                  setPaymentMethod((state) =>
                    state === "cash" ? "wallet" : "cash"
                  )
                }
              >
                <Text
                  style={{
                    color: paymentMethod === "cash" ? "white" : "blue",
                    marginRight: 5,
                  }}
                >
                  💵
                </Text>
                <Text
                  style={{ color: paymentMethod === "cash" ? "white" : "blue" }}
                >
                  Cash
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor:
                    paymentMethod === "wallet" ? "blue" : "white",
                  borderWidth: 1,
                  borderColor: "blue",
                  color: "blue",
                  padding: 10,
                  borderRadius: 5,
                  marginVertical: 5,
                  width: 100,
                }}
                onPress={() =>
                  setPaymentMethod((state) =>
                    state === "wallet" ? "cash" : "wallet"
                  )
                }
              >
                <Text
                  style={{
                    color: paymentMethod === "wallet" ? "white" : "blue",
                    marginRight: 5,
                  }}
                >
                  💳
                </Text>
                <Text
                  style={{
                    color: paymentMethod === "wallet" ? "white" : "blue",
                  }}
                >
                  Wallet
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={{
                backgroundColor: "blue",
                borderWidth: 1,
                borderColor: "green",
                color: "white",
                padding: 10,
                borderRadius: 5,
                marginVertical: 5,
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "center",
              }}
              onPress={() => {
                // Add your logic to find a rider here
                // console.log(origin, destination, paymentMethod, wishes);
                emitEvent("findDrivers", {
                  id: user.phoneNumber,
                  origin,
                  destination,
                  paymentMethod,
                  wishes,
                  fare: calculateFare(distance, duration, ride),
                });
                setMessage("🔍 Finding Drivers");
                subscribeToEvent("driverFound", (data) => {
                  if (data.found) {
                    setMessage("Driver found");
                    setHome(false);
                    setRideInfo(data.data);
                  } else {
                    setMessage("Find Driver");
                  }
                });
              }}
            >
              <>
                <Text style={{ color: "white", marginRight: 5 }}></Text>
                <Text style={{ color: "white", textAlign: "center" }}>
                  {message}
                </Text>
              </>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View>
          <Text></Text>
        </View>
      )}
    </>
  );
};
