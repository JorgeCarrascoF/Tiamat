import { useContext, useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet, Image } from "react-native";
import { GamesContext } from "../navigation/Index";
import { COLORS } from "../utils/colors";
import GameCard from "../components/GameCard";
import GameFilter from "../components/GameFilter";
import { Link } from "react-router-native";
import Svg, { Path } from "react-native-svg";

const GameListPage = () => {
  const { data } = useContext(GamesContext);
  const [games, setGames] = useState([]);

  useEffect(() => {
    if (data.tabletopGames) {
      setGames(data.tabletopGames);
    }
  }, [data]);

  return (
    <View>
      <ScrollView contentContainerStyle={styles.container}>
        <GameFilter
          games={games}
          allGames={data.tabletopGames}
          setGames={setGames}
        ></GameFilter>
        <Text
          style={[
            styles.gameListTitle,
            { borderBottomColor: COLORS[data.palette].primary },
          ]}
        >
          Games: {games.length}
        </Text>
        <View style={styles.gameList}>
          {games.map((game) => (
            <GameCard game={game} key={game.id}></GameCard>
          ))}
        </View>
      </ScrollView>
      <Link
        to={"/newgame"}
        style={[styles.link, { backgroundColor: COLORS[data.palette].primary }]}
      >
        <Svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          style={styles.linkImage}
          fill={"#FFFFFF"}
        >
          <Path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
        </Svg>
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 50,
    minWidth: "100%",
    minHeight: "94%",
    paddingBottom: 40,
    alignItems: "center",
    position: "relative",
  },
  gameListTitle: {
    fontWeight: "bold",
    fontSize: 15,
    width: 180,
    alignSelf: "flex-start",
    textAlign: "left",
    paddingHorizontal: 10,
    paddingVertical: 3,

    borderBottomWidth: 1,
    marginTop: 20,
    marginLeft: 20,
    marginBottom: 10,
  },
  gameList: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  link: {
    position: "absolute",
    borderRadius: 50,
    right: 10,
    bottom: 60,

    borderColor: "white",
    borderWidth: 2,
  },
  linkImage: {
    width: 50,
    height: 50,
  },
});

export default GameListPage;
