import { View, Text, Switch } from "react-native";
import React from "react";
import useSocket from "../../../../hooks/socket";
import useGetLocation from "../../../../hooks/location";
import { connect, useSelector } from "react-redux";
export const SetActive = ({ styles, handleRideRequest}) => {
  const user = useSelector(state => state.user);
  const [isEnabled, setIsEnabled] = React.useState(false);
  const {emitEvent, subscribeToEvent} = useSocket();
  const {currentLocation} = useGetLocation();
  const toggleSwitch = () => {
    setIsEnabled(!isEnabled);
    if(!isEnabled){
      console.log("connect");
      emitEvent('connectToServer', {
        id: user.phoneNumber,
        lat: currentLocation.latitude,
        lng: currentLocation.longitude,
      });
      subscribeToEvent('ride-request', (data) => {
        handleRideRequest(data);
      });
    } else {
      emitEvent('disconnectFromServer', {
        id: user.phoneNumber,
        type: 'driver',
      });
    }
  }

  return (
    <Switch
      trackColor={{ false: "#767577", true: "#81b0ff" }}
      thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
      ios_backgroundColor="#3e3e3e"
      onValueChange={toggleSwitch}
      value={isEnabled}
      style={{...styles}}
    />
  );
};
