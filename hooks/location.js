import { useState, useEffect } from "react";
import * as Location from "expo-location";
// import { useDispatch } from "react-redux";
// import { setLocation } from "your-redux-slice-path"; // Update with the correct path to your Redux slice

const useGetLocation = () => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [initialRegion, setInitialRegion] = useState(null);
  const [error, setError] = useState(null);
//   const dispatch = useDispatch();

  useEffect(() => {
    const getLocation = async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setError("Permission to access location was denied");
          console.log("Permission to access location was denied");
          return;
        }

        let location = await Location.getCurrentPositionAsync({});
        console.log(location);
        // dispatch(setLocation(location));
        setCurrentLocation(location.coords);
        setInitialRegion({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        });
      } catch (err) {
        setError(err.message);
        console.error("Error fetching location:", err);
      }
    };

    getLocation();
  }, []);

  return { currentLocation, initialRegion, error };
};

export default useGetLocation;
