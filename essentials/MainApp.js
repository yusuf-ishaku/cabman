import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/protected/HomeScreen";
import { View, Text } from "react-native";

const Tab = createBottomTabNavigator();

export default function Navigator({navigation}){
    return (
        <Tab.Navigator
        initialRouteName="MainApp"
        screenOptions={{
            tabBarActiveTintColor: "#fff",
            tabBarStyle: {
              backgroundColor: "white",
              borderWidth:0
            },
            tabBarIconStyle: {
              // marginTop: 5,
            },
            tabBarInactiveTintColor: "white", 
        }}
        >
            <Tab.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={{
                headerShown: false,
                tabBarLabel: "",
                tabBarIcon: ({color, focused}) => (
                    <View>
                        <Text style={{color: focused ? 'black' : 'gray', fontFamily: "Poppins_400Regular"}}>
                            Home
                        </Text>
                    </View>
                )
            }}
            >
            </Tab.Screen>
        </Tab.Navigator>
    )
}
