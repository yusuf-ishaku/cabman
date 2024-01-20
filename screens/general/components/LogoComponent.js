import { Image } from "react-native";
export const LogoComponent = ({ style }) => {
  return (
    <Image
      source={require("../../../assets/appimages/regularLogo.png")}
      style={{
        width: 300,
        height: 80,
        objectFit: "contain",
        marginTop: 30,
        marginBottom: 50,
        ...style,
      }}
    ></Image>
  );
};
