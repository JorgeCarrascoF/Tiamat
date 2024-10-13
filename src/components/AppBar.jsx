import { View, StyleSheet } from "react-native";
import AppBarButton from "./AppBarButton";
import { COLORS } from "../utils/colors";
import { useContext } from "react";
import { GamesContext } from "../navigation/Index";
import { Path } from "react-native-svg";

const links = [
  {
    path: "/",
    name: "Home",
    icon: <Path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8h5z" />,
  },
  {
    path: "/games",
    name: "Games",
    icon: (
      <Path d="M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2m2 2a2 2 0 00-2 2 2 2 0 002 2 2 2 0 002-2 2 2 0 00-2-2m10 10a2 2 0 00-2 2 2 2 0 002 2 2 2 0 002-2 2 2 0 00-2-2m0-10a2 2 0 00-2 2 2 2 0 002 2 2 2 0 002-2 2 2 0 00-2-2m-5 5a2 2 0 00-2 2 2 2 0 002 2 2 2 0 002-2 2 2 0 00-2-2m-5 5a2 2 0 00-2 2 2 2 0 002 2 2 2 0 002-2 2 2 0 00-2-2z" />
    ),
  },
  {
    path: "/owners",
    name: "Owners",
    icon: (
      <Path d="M12 4a4 4 0 014 4 4 4 0 01-4 4 4 4 0 01-4-4 4 4 0 014-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4z" />
    ),
  },
  {
    path: "/tools",
    name: "Tools",
    icon: (
      <Path d="M17 2H7c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2m-5 15l-3-5 3-5 3 5-3 5z" />
    ),
  },
  {
    path: "/settings",
    name: "Settings",
    icon: (
      <Path d="M12 15.5A3.5 3.5 0 018.5 12 3.5 3.5 0 0112 8.5a3.5 3.5 0 013.5 3.5 3.5 3.5 0 01-3.5 3.5m7.43-2.53c.04-.32.07-.64.07-.97 0-.33-.03-.66-.07-1l2.11-1.63c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.31-.61-.22l-2.49 1c-.52-.39-1.06-.73-1.69-.98l-.37-2.65A.506.506 0 0014 2h-4c-.25 0-.46.18-.5.42l-.37 2.65c-.63.25-1.17.59-1.69.98l-2.49-1c-.22-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64L4.57 11c-.04.34-.07.67-.07 1 0 .33.03.65.07.97l-2.11 1.66c-.19.15-.25.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1.01c.52.4 1.06.74 1.69.99l.37 2.65c.04.24.25.42.5.42h4c.25 0 .46-.18.5-.42l.37-2.65c.63-.26 1.17-.59 1.69-.99l2.49 1.01c.22.08.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.66z" />
    ),
  },
];

const AppBar = () => {
  const { data } = useContext(GamesContext);

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
