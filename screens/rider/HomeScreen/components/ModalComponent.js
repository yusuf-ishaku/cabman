import React from "react";
import { View, Text, Pressable } from "react-native";
import * as Browser from "expo-web-browser";

export const ModalComponent = () => {
  const [modalVisible, setModalVisible] = React.useState(false);
  return (
    <View
      style={{
        flexDirection: "column",
        borderColor: "#d3d3d3",
        borderWidth: 1,
        borderRadius: 4,
        marginHorizontal: 20,
        marginVertical: 20,
      }}
    >
      <Pressable
        onPress={() =>
          Browser.openBrowserAsync(
            "https://cabman.net/app2/customer/airtime.php"
          )
        }
        style={{
          padding: 8,
          borderBottomWidth: 1,
          borderBottomColor: "#d3d3d3",
        }}
      >
        <Text style={{ fontFamily: "Poppins_400Regular" }}>
          Airtime Recharge
        </Text>
      </Pressable>
      <Pressable
        onPress={() =>
          Browser.openBrowserAsync("https://cabman.net/app2/customer/data.php")
        }
        style={{
          padding: 8,
          borderBottomWidth: 1,
          borderBottomColor: "#d3d3d3",
        }}
      >
        <Text style={{ fontFamily: "Poppins_400Regular" }}>
          Data Subscription
        </Text>
      </Pressable>
      <Pressable
        onPress={() =>
          Browser.openBrowserAsync(
            "https://cabman.net/app2/customer/cabletv.php"
          )
        }
        style={{
          padding: 8,
          borderBottomWidth: 1,
          borderBottomColor: "#d3d3d3",
        }}
      >
        <Text style={{ fontFamily: "Poppins_400Regular" }}>
          Cable TV Recharge
        </Text>
      </Pressable>
      <Pressable
        onPress={() =>
          Browser.openBrowserAsync(
            "https://cabman.net/app2/customer/electricity.php"
          )
        }
        style={{
          padding: 8,
        }}
      >
        <Text style={{ fontFamily: "Poppins_400Regular" }}>
          Pay electricity Bill
        </Text>
      </Pressable>
    </View>
  );
};
