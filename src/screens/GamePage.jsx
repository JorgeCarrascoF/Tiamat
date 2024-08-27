import { useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Pressable,
} from "react-native";
import { Link, useParams } from "react-router-native";
import { GamesContext } from "../navigation/Index";
import { COLORS } from "../utils/colors";
import GamePageBar from "../components/GamePageBar";
import GameNumPlayersCard from "../components/GameNumPlayersCard";

const GamePage = () => {
  const [deleting, setDeleting] = useState(false);

  const id = parseInt(useParams().id);
  const { data, setData } = useContext(GamesContext);

  let game = data.tabletopGames.find((game) => game.id == id);
  let owner = data.players.find((player) => player.id == game.owner);

  const deleteGame = () => {
    console.log("Deleting game " + game.name);
  };

  return (
    <View style={styles.container}>
      <GamePageBar deleteGame={deleteGame} />
      <Image source={{ uri: game.image }} style={styles.gameImage} />
      <Text style={styles.gameTitle}>{game.name}</Text>
      <ScrollView
        contentContainerStyle={{ alignItems: "center" }}
        style={styles.gameDescriptionContainer}
      >
        <Text style={styles.gameDescription}>{game.description}</Text>
      </ScrollView>
      <View style={styles.row}>
        <GameNumPlayersCard
          minPlayers={game.minPlayers}
          maxPLayers={game.maxPlayers}
        ></GameNumPlayersCard>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    padding: 10,
    alignItems: "center",
    marginTop: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 30,
  },
  gameImage: {
    width: 280,
    height: 280,
    margin: 15,
    borderRadius: 10,
  },
  gameTitle: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    color: COLORS.primary,
  },
  gameDescriptionContainer: {
    maxHeight: 200,
    marginTop: 20,
    width: "100%",
  },
  gameDescription: {
    width: "95%",
    textAlign: "center",
    paddingHorizontal: 20,
    paddingHorizontal: 10,
  },
});

export default GamePage;
