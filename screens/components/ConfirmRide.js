import React from "react";
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
} from "react-native";

export const ConfirmRide = ({ride, dues}) => {
    const [home, setHome] = React.useState(true);
    const [pay, setPay] = React.useState(false);
    const [wishes, setWishes] = React.useState(false);
    const {distance, duration} = dues
    const calculateFare = (distance, duration, ride) => {
        if(ride === "classic") {
           const distanceCharges = 83;
           const basicFare = 500;
           const rideTimeCharges = 20;
           const bookingValue = 0.02;
           const developmentLevy = 10;

           const A = basicFare + (distance * distanceCharges) + (duration * rideTimeCharges);
           const B = (bookingValue * A) + developmentLevy;
           return A + B
        }
        if(ride === "executive"){
            const distanceCharges = 100;
            const basicFare = 600;
            const rideTimeCharges = 30;
            const bookingValue = 0.3;
            const developmentLevy = 20;
 
            const A = basicFare + (distance * distanceCharges) + (duration * rideTimeCharges);
            const B = (bookingValue * A) + developmentLevy;
            return A + B
        }
    }

    return (
        <>
        {
            home && (
                <View>
                <Text style={{textTransform: "capitalize", marginVertical: 20}}>
                    {ride} : {calculateFare(distance, duration, ride)} / {distance} / {duration}
                </Text>
                <Text
                style={{marginVertical: 5}}
                >
                    NOTE: This is an approximate estimate. Actual cost may vary according to the traffic.
                </Text>
                <View
                style={{
                    display: "flex",
                    flexDirection: 'row',
                    justifyContent: "space-around",
                    marginHorizontal: 10,
                    marginVertical: 10
                }}
                >
                    <TouchableOpacity
                    onPress={() => {setWishes(true); setHome(false);}}
                    >
                        <Text>Wishes</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                    onPress={() => {setPay(true); setHome(false)}}
                    >
                        <Text>Cash</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                style={{
                    backgroundColor: "yellow",
                    height: 40,
                    justifyContent: "center",
                    alignItems: "center"
                }}
                >
                    <Text>Confirm</Text>
                </TouchableOpacity>
            </View>
            )
            ||
            wishes && (
                <View>
                    <Text>Wishes</Text>
                    <Text onPress={() => {setWishes(false); setHome(true)}}>Back</Text>
                    <TextInput>

                    </TextInput>
                </View>
            )
            ||
            pay && (
                <View>
                    <Text>Pay</Text>
                    <Text onPress={() => {setWishes(false); setHome(true)}}>Back</Text>
                </View>
            )
        }
           
        </>
    )
}