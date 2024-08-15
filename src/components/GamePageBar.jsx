import { StyleSheet, View, Image, Pressable } from "react-native";
import { Link } from "react-router-native";

const GamePageBar = ({ deleteGame }) => {
  return (
    <View style={styles.row}>
      <Link to={"/games"} underlayColor={"transparent"} style={styles.link}>
        <Image
          style={styles.icon}
          source={require("../assets/img/arrow-left.png")}
        />
      </Link>
      <Pressable onPress={deleteGame}>
        <Image
          style={styles.icon}
          source={require("../assets/img/delete.png")}
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    width: "100%",
    paddingHorizontal: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  icon: {
    width: 35,
    height: 35,
  },
});

export default GamePageBar;
