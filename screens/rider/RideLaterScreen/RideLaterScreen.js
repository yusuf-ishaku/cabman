import React from "react";
import { View, Text, FlatList, StyleSheet, Pressable } from "react-native";
import { useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { clearState } from "../../../data/slices/ride.slice";
import { useDispatch } from "react-redux";

const RideLaterScreen = () => {
  const rides = useSelector((state) => state.rides);
  const dispatch = useDispatch();
  const savedRides = rides.rideLater;

  const renderItem = ({ item }) => (
    <Pressable style={styles.item}>
      <View
      style={{width: 25, marginRight: 5}}
      >
        <Ionicons
          style={{ width: 25 }}
          name="ellipse-outline"
          size={24}
          color="yellow"
        />
        <Ionicons name="ellipsis-vertical" size={24} color="gray" />

        <Ionicons
          style={{ width: 25 }}
          name="location-outline"
          size={24}
          color="green"
        />
      </View>
      <View>
        <View style={styles.itemSection}>
          <Text style={styles.destination}>{item.origin.description}</Text>
        </View>
        <View style={styles.itemSection}>
          <Text style={styles.destination}>{item.destination.description}</Text>
        </View>
      </View>
    </Pressable>
  );
  if(savedRides.length === 0) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>No saved rides</Text>
        </View>
    );
  }
  return (
    <View style={styles.container}>
        {/* <Pressable style={{height: 100, backgroundColor: 'blue'}} onPress={() => dispatch(clearState())}>
            <Text>
                Clear State
            </Text>
        </Pressable> */}
      <FlatList
        data={savedRides}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  item: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    flexDirection: 'row',
    marginBlock: 3
  },
  itemSection: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginBlock: 2,
    fontFamily: "Poppins_400Regular",
  },
  destination: {
    fontSize: 16,
    fontFamily: "Poppins_400Regular",
  },
  time: {
    fontSize: 16,
    color: "#666",
  },
});

export default RideLaterScreen;
