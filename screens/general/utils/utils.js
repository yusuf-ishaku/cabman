import Toast from "react-native-toast-message";
export const formatPhoneNumber = (phoneNumber) => {
  // Remove all spaces
  let formattedNumber = phoneNumber.replace(/\s+/g, "");
  // Ensure it starts with +234
  if (!formattedNumber.startsWith("+234")) {
    if (formattedNumber.startsWith("0")) {
      formattedNumber = "+234" + formattedNumber.slice(1);
    } else {
      formattedNumber = "+234" + formattedNumber;
    }
  }
  return formattedNumber;
};
export const showToast = (type, text1, text2) => {
  Toast.show({
    type: type,
    text1: text1,
    text2: text2,
  });
};
