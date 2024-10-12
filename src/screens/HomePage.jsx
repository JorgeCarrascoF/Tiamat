import { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { COLORS } from "../utils/colors";
import { GamesContext } from "../navigation/Index";
import RandomGame from "../components/RandomGame";
import GameInProgressCard from "../components/GameInProgressCard";
import TrendingGame from "../components/TrendingGame";
import ToolCard from "../components/ToolCard";
import { Path } from "react-native-svg";

const HomePage = () => {
  let { data } = useContext(GamesContext);

  return (
    <View style={styles.container}>
      <Text
        style={[
          styles.title,
          {
            borderBottomColor:
              Object.keys(data).length > 0
                ? COLORS[data.palette].primary
                : COLORS[0].primary,
          },
        ]}
      >
        Welcome to Tiamat!
      </Text>
      <RandomGame />
      <TrendingGame />
      <GameInProgressCard />
      <View style={styles.row}>
        <ToolCard
          name={"First turn"}
          url={"/tools/turns"}
          image={
            <Path d="M6.2 2.44l11.9 11.9 2.12-2.12 1.41 1.41-2.47 2.47 3.18 3.18c.39.39.39 1.02 0 1.41l-.71.71a.996.996 0 01-1.41 0L17 18.23l-2.44 2.47-1.41-1.41 2.12-2.12-11.9-11.9V2.44H6.2M15.89 10l4.74-4.74V2.44H17.8l-4.74 4.74L15.89 10m-4.95 5l-2.83-2.87-2.21 2.21-2.12-2.12-1.41 1.41 2.47 2.47-3.18 3.19a.996.996 0 000 1.41l.71.71c.39.39 1.02.39 1.41 0L7 18.23l2.44 2.47 1.41-1.41-2.12-2.12L10.94 15z" />
          }
        />
        <ToolCard
          name={"Team divisor"}
          url={"/tools/teams"}
          image={
            <Path d="M5 1c0 2.7 1.56 5.16 4 6.32V22h2v-7h2v7h2V7.31C17.44 6.16 19 3.7 19 1h-2a5 5 0 01-5 5 5 5 0 01-5-5m5 0c-1.11 0-2 .89-2 2 0 1.11.89 2 2 2 1.11 0 2-.89 2-2 0-1.11-.89-2-2-2z" />
          }
        />
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
    marginTop: 20,
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
  row: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    marginTop: 40,
  },
});

export default HomePage;
