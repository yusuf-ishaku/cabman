import { Alert } from "react-native";

/**
 * Uploads a photo to Cloudinary.
 *
 * @param {File} photo - The photo file to be uploaded.
 * @param {string} upload_preset - The upload preset for Cloudinary.
 * @param {string} cloud_name - The Cloudinary cloud name.
 * @returns {Promise<{image: string, message: string}>} - A promise that resolves to an object containing the secure URL of the uploaded image and a message.
 * @throws Will throw an error if the upload fails.
 */
export const cloudinaryUpload = async (eventFlier, upload_preset, cloud_name) => {
  const data = new FormData();
  data.append("file", eventFlier);
  data.append("upload_preset", upload_preset);
  data.append("cloud_name", cloud_name);
  try {
    let res = await fetch(
      `https://api.cloudinary.com/v1_1/${cloud_name}/auto/upload`,
      {
        method: "POST",
        body: data,
      }
    );
    let responseData = await res.json();
    console.log(responseData);
    return {
      image: responseData.secure_url,
      message: "OK",
    };
  } catch (err) {
    console.log(err);
    Alert.alert("An Error Occured While Uploading");
    // Alert.alert(err.error);
  }
};
