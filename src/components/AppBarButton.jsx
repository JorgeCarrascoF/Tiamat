import { View, Image, Text, StyleSheet } from "react-native";
import { Link } from "react-router-native";

const AppBarButton = ({ path, name, icon }) => {
  return (
    <Link to={path}>
      <View>
        <Image source={icon} style={styles.image} />
        <Text style={styles.text}>{name}</Text>
      </View>
    </Link>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 50,
    height: 50,
  },
  text: {
    color: "#FFFFFF",
  }
});

export default AppBarButton;
