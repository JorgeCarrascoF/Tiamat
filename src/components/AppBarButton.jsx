import { View, Image, Text, StyleSheet } from "react-native";
import { Link, useLocation } from "react-router-native";
import { COLORS } from "../utils/colors";
import { useContext } from "react";
import { GamesContext } from "../navigation/Index";

const AppBarButton = ({ path, name, icon }) => {
    let currentPath = useLocation().pathname;
    let {data} = useContext(GamesContext)

    const containerStyle = {
        backgroundColor: currentPath === path ? Object.values(data).length > 0 ? COLORS[data.palette].secondary : COLORS[0].secondary : "transparent",
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
