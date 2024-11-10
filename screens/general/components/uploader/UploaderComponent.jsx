import * as DocumentPicker from "expo-document-picker";
import React, { useState } from "react";
import { View, Text, Image, Button, Pressable } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { cloudinaryUpload } from "./cloudinaryService"; // Assume you have a service to handle Cloudinary upload

const UploaderComponent = (props) => {
  const [eventFlier, setEventFlier] = useState({ name: "", type: "", uri: "" });
  const [uploadState, setUploadState] = useState(false);
  const handleUpload = async () => {
    setUploadState(true);
    try {
      const response = await cloudinaryUpload(
        eventFlier,
        props.upload_preset,
        props.cloud_name
      );
      console.log("Upload successful:", response);
      if (response?.image) {
        props.updateImageSrc(response.image);
        setUploadState(false);
      }
    } catch (error) {
      console.log("Upload failed:", error);
    }
  };

  return (
    <View style={{ paddingHorizontal: 10 }}>
      {eventFlier.uri ? (
        <View style={{ marginTop: 10 }}>
          <Image
            source={{ uri: eventFlier.uri }}
            style={{ width: "auto", height: 200 }}
          />
          <Pressable
            style={{
              marginTop: 5,
              width: "auto",
              backgroundColor: "blue",
              borderRadius: 5,
              justifyContent: "center",
              alignItems: "center",
              paddingVertical: 5,
            }}
            title="Okay"
            onPress={async () => {
              try {
                const data = await DocumentPicker.getDocumentAsync({
                  type: "*/*",
                  copyToCacheDirectory: true,
                });
                console.log(data);
                if (data.canceled !== true && data.assets) {
                  setEventFlier({
                    name: data.assets[0].name,
                    type: data.assets[0].mimeType,
                    uri: data.assets[0].uri,
                  });
                  handleUpload();
                }
              } catch (error) {
                console.log(error);
              }
            }}
          >
            <Text style={{ color: "white" }}>Select another image</Text>
          </Pressable>
        </View>
      ) : (
        <Pressable
          onPress={async () => {
            try {
              const data = await DocumentPicker.getDocumentAsync({
                type: "*/*",
                copyToCacheDirectory: true,
              });
              console.log(data);
              if (data.canceled !== true && data.assets) {
                setEventFlier({
                  name: data.assets[0].name,
                  type: data.assets[0].mimeType,
                  uri: data.assets[0].uri,
                });
                handleUpload();
              }
            } catch (error) {
              console.log(error);
            }
          }}
          style={{
            paddingVertical: 10,
            borderWidth: 1,
            flexDirection: "row",
            paddingHorizontal: 10,
            borderRadius: 5,
          }}
        >
          {eventFlier.name ? (
            <>
              <Ionicons
                style={{ marginRight: 10 }}
                name="cloud-upload-outline"
                size={24}
                color="black"
              />
              <Text>{eventFlier.name}</Text>
            </>
          ) : (
            <>
              <Ionicons
                style={{ marginRight: 10 }}
                name="cloud-upload-outline"
                size={24}
                color="black"
              />
              <Text style={{ fontSize: 16 }}>Upload Picture</Text>
            </>
          )}
        </Pressable>
      )}
    </View>
  );
};

export default UploaderComponent;
