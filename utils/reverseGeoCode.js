import axios from "axios";
export const getPlaceDescription = async (latitude, longitude) => {
  const apiKey = "AIzaSyAuAN33w4g8FypFIyka-nkdr-PcvrY2T2Q";
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;
  
  try {
    const response = await axios.get(url);
    if (response.data.results.length > 0) {
      return response.data.results[0].formatted_address;
    } else {
      return "No description found for this location.";
    }
  } catch (error) {
    console.error("Error:", error);
    return "An error occurred.";
  }
};
