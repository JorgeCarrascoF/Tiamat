import { useContext, useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet, Image } from "react-native";
import { GamesContext } from "../navigation/Index";
import { COLORS } from "../utils/colors";
import GameCard from "../components/GameCard";
import GameFilter from "../components/GameFilter";
import { Link } from "react-router-native";

const GameListPage = () => {
  const { data } = useContext(GamesContext);
  const [games, setGames] = useState([]);

  useEffect(() => {
    if (data.tabletopGames) {
      setGames(data.tabletopGames);
    }
  }, [data]);

  return (
    <ScrollView style={styles.container}>
      <GameFilter
        games={games}
        allGames={data.tabletopGames}
        setGames={setGames}
      ></GameFilter>
      <Text style={styles.gameListTitle}>Juegos: {games.length}</Text>
      <View style={styles.gameList}>
        {games.map((game) => (
          <GameCard game={game} key={game.id}></GameCard>
        ))}
      </View>
      <Link to={"/newgame"} style={styles.link}>
        <Image
          source={require("../assets/img/plus.png")}
          style={styles.linkImage}
        />
      </Link>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 40,
    width: "100%",
    position: "relative",
  },
  gameListTitle: {
    alingSelf: "flex-start",
    fontWeight: "bold",
    fontSize: 15,
    width: 180,
    textAlign: "left",
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderBottomColor: COLORS.primary,
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
    backgroundColor: COLORS.primary,
    borderRadius: 100,
    position: "fixed",
    bottom: 25,
    right: 15,
  },
  linkImage: {
    width: 50,
    height: 50,
  },
});

export default GameListPage;
