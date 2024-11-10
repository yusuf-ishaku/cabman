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
