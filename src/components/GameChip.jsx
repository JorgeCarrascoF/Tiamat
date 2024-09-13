import { Image, StyleSheet, Text, View } from "react-native";
import { COLORS } from "../utils/colors";

const GameChip = ({ icon, title, stat }) => {
  return (
    <View style={styles.container}>
      <Image style={styles.icon} source={icon}></Image>
      <Text style={styles.text}>{title}: </Text>
      <Text style={styles.text}>{stat}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.primary,
    marginHorizontal: 5,
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRadius: 5,
  },
  text: {
    color: "white",
  },
  icon: {
    width: 18,
    height: 18,
    marginRight: 5,
  }
});

export default GameChip;
