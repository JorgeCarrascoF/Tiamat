import { useContext, useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { GamesContext } from "../navigation/Index";
import { COLORS } from "../utils/colors";
import GameCard from "../components/GameCard";
import GameFilter from "../components/GameFilter";

const GameListPage = () => {
  const { data } = useContext(GamesContext);

  const [games, setGames] = useState([]);
  const [owners, setOwners] = useState([]);

  useEffect(() => {
    if (data.tabletopGames) {
      setGames(data.tabletopGames);
    }
    if (data.owners) {
      setOwners(data.owners);
    }
  }, [data]);

  return (
    <ScrollView style={styles.container}>
      <GameFilter games={games} allGames={data.tabletopGames} setGames={setGames}></GameFilter>
      <Text style={styles.gameListTitle}>Juegos: {games.length}</Text>
      <View style={styles.gameList}>
        {games.map((game) => (
          <GameCard game={game} key={game.id}></GameCard>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 40,
    width: '100%'
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
    width: '100%',
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
});

export default GameListPage;
