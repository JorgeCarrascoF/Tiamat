import { Image, StyleSheet, Text, View } from "react-native";
import { COLORS } from "../utils/colors";
import { useContext } from "react";
import { GamesContext } from "../navigation/Index";

const GameChip = ({ icon, title, stat }) => {
  let { data } = useContext(GamesContext);

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: COLORS[data.palette].primary,
        },
      ]}
    >
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
  },
});

export default GameChip;
