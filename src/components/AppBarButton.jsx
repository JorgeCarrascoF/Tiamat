import { View, Image, Text, StyleSheet } from "react-native";
import { Link, useLocation } from "react-router-native";
import { COLORS } from "../utils/colors";

const AppBarButton = ({ path, name, icon }) => {
    let currentPath = useLocation().pathname;

    const containerStyle = {
        backgroundColor: currentPath === path ? COLORS.secondary : "transparent",
    };
  return (
    <Link to={path} underlayColor={'transparent'} style={styles.link}>
      <View style={[styles.container, containerStyle]}>
        <Image source={icon} style={styles.image} />
        <Text style={styles.text}>{name}</Text>
      </View>
    </Link>
  );
};

const styles = StyleSheet.create({
  link: {
    width: '20%',
    height: '100%'
  }, 
  container: {
    alignItems: "center",
    width: '100%',
    height: '100%',
    justifyContent: "center",
  },
  image: {
    width: 25,
    height: 25,
  },
  text: {
    color: "#FFFFFF",
    fontSize: 12
  },
});

export default AppBarButton;
