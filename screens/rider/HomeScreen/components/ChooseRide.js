import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { ConfirmRide } from "./ConfirmRide";

export const ChooseRide = ({ dues, origin, destination }) => {
  const [classicTrue, setClassicTrue] = React.useState(true);
  const [execTrue, setExecTrue] = React.useState(false);
  const { distance, duration } = dues.distance;
  return (
    <>
      <View style={styles.header}>
        <TouchableOpacity
          style={{ borderBottomWidth: classicTrue ? 2 : 0, padding: 5, borderColor: "blue"}}
          onPress={() => {
            if (classicTrue) {
              setClassicTrue(false);
              setExecTrue(true);
            } else {
              setExecTrue(false);
              setClassicTrue(true);
            }
          }}
        >
          <Text
          style={{ color: classicTrue ? "blue" : "black" }}
          >Classic</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ borderBottomWidth: execTrue ? 2 : 0,  padding: 5, borderColor: "blue",  }}
          onPress={() => {
            if (execTrue) {
              setClassicTrue(true);
              setExecTrue(false);
            } else {
              setExecTrue(true);
              setClassicTrue(false);
            }
          }}
        >
          <Text
          style={{color: execTrue ? "blue" : "black"}}
          >Executive</Text>
        </TouchableOpacity>
      </View>
      <View style={{padding: 10}}>
        <ConfirmRide
          dues={{ distance, duration }}
          ride={classicTrue ? "classic" : "executive"}
          origin={origin}
          destination={destination}
        ></ConfirmRide>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 15,
  },
});
