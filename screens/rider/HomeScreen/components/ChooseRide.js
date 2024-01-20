import {
    View, 
    Text,
    TouchableOpacity,
    StyleSheet,
} from "react-native";
import React from "react";
import { ConfirmRide } from "./ConfirmRide";

export const ChooseRide = ({dues}) => {
    const [classicTrue, setClassicTrue] = React.useState(true);
    const [execTrue, setExecTrue] = React.useState(false);
    // console.log(dues)
    const { distance, duration } = dues.distance;
    return (
        <>
           <View
        style={styles.header}
        >
            <TouchableOpacity
            style={{borderBottomWidth: classicTrue ? 1 : 0}}
            onPress={() => {
                if (classicTrue) {
                    setClassicTrue(false);
                    setExecTrue(true)
                }
                else {
                    setExecTrue(false);
                    setClassicTrue(true)
                }
            }}
            >
                <Text>
                    Classic
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
            style={{borderBottomWidth: execTrue ? 1 : 0}}
            onPress={() => {
                if (execTrue) {
                    setClassicTrue(true);
                    setExecTrue(false)
                }
                else {
                    setExecTrue(true);
                    setClassicTrue(false);
                }
            }}
            >
                <Text>
                    Executive
                </Text>
            </TouchableOpacity>
        </View>
        <View>
          <ConfirmRide dues={{distance, duration}} ride={classicTrue ? "classic" : "executive"}></ConfirmRide>
        </View>
        </>   
    )
}

const styles = StyleSheet.create({
    header: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: 15
    }
})