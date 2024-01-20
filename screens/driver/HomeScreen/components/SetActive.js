import { View, Text } from "react-native";

export const SetActive = ({ styles }) => {
  return (
    <View
      style={{
        backgroundColor: "white",
        borderRadius: 9999,
        width: 150,
        ...styles,
      }}
    >
      <Text>This is the set active button not styled yet</Text>
    </View>
  );
};
