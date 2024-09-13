import { View, Text, StyleSheet } from "react-native";
import { COLORS } from "../utils/colors";
import GameChip from "./GameChip";

const GameStats = ({ minPlayers, maxPlayers, duration, year }) => {
  return (
    <View style={styles.container}>
      <GameChip
        icon={require("../assets/img/players.png")}
        title={"Players"}
        stat={`${minPlayers} ${maxPlayers && "- " + maxPlayers}`}
        />
      <GameChip
        icon={require("../assets/img/duration.png")}
        title={"Duration"}
        stat={duration}
        />
      <GameChip
        icon={require("../assets/img/year.png")}
        title={"Year"}
        stat={year}
        />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'space-evenly',
    width: "100%",
    marginTop: 15,
    marginBottom: 20,
  },
  textContainer: {
    backgroundColor: COLORS.primary,
    color: "white",
    fontWeight: "bold",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
});

export default GameStats;
