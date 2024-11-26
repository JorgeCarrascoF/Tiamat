import { View, Text, StyleSheet } from "react-native";
import { COLORS } from "../utils/colors";
import { Link } from "react-router-native";
import { useContext } from "react";
import { GamesContext } from "../navigation/Index";
import Constants from "expo-constants";

const links = [
  {
    title: "Manage data",
    url: "/settings/data",
  },
  {
    title: "Change palette",
    url: "/settings/palette",
  },
  {
    title: "About the app",
    url: "/settings/about",
  },
];

const SettingsPage = () => {
  let { data } = useContext(GamesContext);
  return (
    <View style={styles.container}>
      <Text
        style={[
          styles.title,
          { borderBottomColor: COLORS[data.palette].primary },
        ]}
      >
        Settings
      </Text>
      <View style={styles.linksContainer}>
        {links.map((link, index) => (
          <Link
            to={link.url}
            style={[
              styles.link,
              { backgroundColor: COLORS[data.palette].primary },
            ]}
            key={index}
          >
            <Text style={styles.linkText}>{link.title}</Text>
          </Link>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    alignItems: "center",
    alignSelf: "center",
    // marginTop: Constants.statusBarHeight,
    flexDirection: "column",
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "left",
    width: "90%",
    paddingHorizontal: 10,
    marginHorizontal: 20,
    paddingVertical: 3,

    borderBottomWidth: 1,
    marginTop: 15,
  },
  linksContainer: {
    marginTop: 10,
    height: "80%",
    flexDirection: "column",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  link: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 10,
  },
  linkText: {
    color: "white",
    fontSize: 16,
  },
});

export default SettingsPage;
