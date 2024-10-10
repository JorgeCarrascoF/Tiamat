import { View, StyleSheet } from "react-native";
import AppBarButton from "./AppBarButton";
import { COLORS } from "../utils/colors";
import { useContext } from "react";
import { GamesContext } from "../navigation/Index";

const links = [
  { path: "/", name: "Home", icon: require("../assets/img/appbar/home.png") },
  {
    path: "/games",
    name: "Games",
    icon: require("../assets/img/appbar/games.png"),
  },
  {
    path: "/owners",
    name: "Owners",
    icon: require("../assets/img/appbar/account.png"),
  },
  {
    path: "/tools",
    name: "Tools",
    icon: require("../assets/img/appbar/tool.png"),
  },
  {
    path: "/settings",
    name: "Settings",
    icon: require("../assets/img/appbar/settings.png"),
  },
];

const AppBar = () => {
  const { data } = useContext(GamesContext);
  console.log(data);

  return (
    <View
      style={[
        styles.appbar,
        {
          backgroundColor:
            Object.keys(data).length > 0
              ? COLORS[data.palette].primary
              : COLORS[0].primary,
        },
      ]}
    >
      {links.map((link) => (
        <AppBarButton
          key={link.path}
          path={link.path}
          name={link.name}
          icon={link.icon}
        ></AppBarButton>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  appbar: {
    width: "100%",
    height: 50,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    zIndex: 10,
  },
});

export default AppBar;
