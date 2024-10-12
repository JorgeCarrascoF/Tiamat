import { View, Text, StyleSheet } from "react-native";
import GameChip from "./GameChip";
import { Path } from "react-native-svg";

const GameStats = ({ minPlayers, maxPlayers, duration, year }) => {
  return (
    <View style={styles.container}>
      <GameChip
        icon={
          <Path d="M16 17v2H2v-2s0-4 7-4 7 4 7 4m-3.5-9.5A3.5 3.5 0 109 11a3.5 3.5 0 003.5-3.5m3.44 5.5A5.32 5.32 0 0118 17v2h4v-2s0-3.63-6.06-4M15 4a3.39 3.39 0 00-1.93.59 5 5 0 010 5.82A3.39 3.39 0 0015 11a3.5 3.5 0 000-7z" />
        }
        title={"Players"}
        stat={`${minPlayers} ${maxPlayers && "- " + maxPlayers}`}
      />
      <GameChip
        icon={
          <Path d="M12 20a8 8 0 01-8-8 8 8 0 018-8 8 8 0 018 8 8 8 0 01-8 8m0-18A10 10 0 002 12a10 10 0 0010 10 10 10 0 0010-10A10 10 0 0012 2m4.24 5.76A5.95 5.95 0 0012 6v6l-4.24 4.24a6 6 0 008.48 0 5.981 5.981 0 000-8.48z" />
        }
        title={"Duration"}
        stat={duration}
      />
      <GameChip
        icon={
          <Path d="M9 10v2H7v-2h2m4 0v2h-2v-2h2m4 0v2h-2v-2h2m2-7a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h1V1h2v2h8V1h2v2h1m0 16V8H5v11h14M9 14v2H7v-2h2m4 0v2h-2v-2h2m4 0v2h-2v-2h2z" />
        }
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
    justifyContent: "space-evenly",
    width: "100%",
    marginTop: 15,
    marginBottom: 20,
  },
});

export default GameStats;
