import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "../../driver/HomeScreen/HomeScreen";
import HomeScreenRider from "../../rider/HomeScreen/HomeScreen";
import ProfileScreen from "../../driver/ProfileScreen/ProfileScreen";
import RideLaterScreen from "../../rider/RideLaterScreen/RideLaterScreen";
import { Ionicons } from "@expo/vector-icons";
import Logout from "../../driver/Logout";
import { useSelector } from "react-redux";

const Drawer = createDrawerNavigator();

function MyDrawer() {
  const data = useSelector((state) => state.scheme);
  //   console.log(data.scheme);
  return data.scheme === "rider" ? (
    <Drawer.Navigator>
      <Drawer.Screen
        name="Home"
        component={HomeScreenRider}
        options={{
          headerShown: false,
          drawerIcon: ({ focused, size }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={size}
              color={focused ? "#7cc" : "#ccc"}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Saved Rides"
        component={RideLaterScreen}
        options={{
          headerShown: true,
          drawerIcon: ({ focused, size }) => (
          <Ionicons
            name={focused ? "bookmark" : "bookmark-outline"}
            size={size}
            color={focused ? "#7cc" : "#ccc"}
          />
          ),
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: true,
          drawerIcon: ({ focused, size }) => (
            <Ionicons
              name={focused ? "person" : "person-outline"}
              size={size}
              color={focused ? "#7cc" : "#ccc"}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Wallet"
        component={ProfileScreen}
        options={{
          headerShown: true,
          drawerIcon: ({ focused, size }) => (
            <Ionicons
              name={focused ? "wallet" : "wallet-outline"}
              size={size}
              color={focused ? "#7cc" : "#ccc"}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Ride History"
        component={ProfileScreen}
        options={{
          headerShown: true,
          drawerIcon: ({ focused, size }) => (
            <Ionicons
              name={focused ? "time" : "time-outline"}
              size={size}
              color={focused ? "#7cc" : "#ccc"}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Notifications"
        component={ProfileScreen}
        options={{
          headerShown: true,
          drawerIcon: ({ focused, size }) => (
            <Ionicons
              name={focused ? "notifications" : "notifications-outline"}
              size={size}
              color={focused ? "#7cc" : "#ccc"}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Contact Support"
        component={ProfileScreen}
        options={{
          headerShown: true,
          drawerIcon: ({ focused, size }) => (
            <Ionicons
              name={focused ? "call" : "call-outline"}
              size={size}
              color={focused ? "#7cc" : "#ccc"}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="LogOut"
        component={Logout}
        options={{
          headerShown: true,
          drawerIcon: ({ focused, size }) => (
            <Ionicons
              name={focused ? "log-out" : "log-out-outline"}
              size={size}
              color={focused ? "#7cc" : "#ccc"}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  ) : (
    <Drawer.Navigator>
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          drawerIcon: ({ focused, size }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={size}
              color={focused ? "#7cc" : "#ccc"}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: true,
          drawerIcon: ({ focused, size }) => (
            <Ionicons
              name={focused ? "person" : "person-outline"}
              size={size}
              color={focused ? "#7cc" : "#ccc"}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Wallet"
        component={ProfileScreen}
        options={{
          headerShown: true,
          drawerIcon: ({ focused, size }) => (
            <Ionicons
              name={focused ? "wallet" : "wallet-outline"}
              size={size}
              color={focused ? "#7cc" : "#ccc"}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Ride History"
        component={ProfileScreen}
        options={{
          headerShown: true,
          drawerIcon: ({ focused, size }) => (
            <Ionicons
              name={focused ? "time" : "time-outline"}
              size={size}
              color={focused ? "#7cc" : "#ccc"}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Notifications"
        component={ProfileScreen}
        options={{
          headerShown: true,
          drawerIcon: ({ focused, size }) => (
            <Ionicons
              name={focused ? "notifications" : "notifications-outline"}
              size={size}
              color={focused ? "#7cc" : "#ccc"}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Contact Support"
        component={ProfileScreen}
        options={{
          headerShown: true,
          drawerIcon: ({ focused, size }) => (
            <Ionicons
              name={focused ? "call" : "call-outline"}
              size={size}
              color={focused ? "#7cc" : "#ccc"}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="LogOut"
        component={Logout}
        options={{
          headerShown: true,
          drawerIcon: ({ focused, size }) => (
            <Ionicons
              name={focused ? "log-out" : "log-out-outline"}
              size={size}
              color={focused ? "#7cc" : "#ccc"}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

export default MyDrawer;
