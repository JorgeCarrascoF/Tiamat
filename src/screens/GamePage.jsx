import { useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Pressable,
  Linking,
} from "react-native";
import { useNavigate, useParams } from "react-router-native";
import { GamesContext } from "../navigation/Index";
import { COLORS } from "../utils/colors";
import PageBar from "../components/PageBar";
import GameStats from "../components/GameStats";
import GameOwnerLink from "../components/GameOwnerLink";
import saveData from "../services/saveData";

const GamePage = () => {
  const id = parseInt(useParams().id);
  const { data, setData } = useContext(GamesContext);
  const navigate = useNavigate();

  let game = data.tabletopGames.find((game) => game.id == id);
  let owner = data.players.find((player) => player.id == game.owner);

  const deleteGame = async (id) => {
    navigate("/games");
    let newGames = data.tabletopGames.filter((game) => game.id !== id);
    let newData = { ...data, tabletopGames: newGames };
    await saveData(newData);
    setData(newData);
  };

  const openBGGPage = () => {
    Linking.openURL(`https://boardgamegeek.com/boardgame/${game.id}`).catch(
      (err) => console.error("Failed to open URL:", err)
    );
  };

  return (
    <View style={styles.container}>
      <PageBar deleteFunction={deleteGame} id={game.id} returnPage={"/games"} />
      <Image source={{ uri: game.image }} style={styles.gameImage} />
      <Text
        numberOfLines={2}
        style={[styles.gameTitle, { color: COLORS[data.palette].primary }]}
      >
        {game.name}
      </Text>
      <GameStats
        minPlayers={game.minPlayers}
        maxPlayers={game.maxPlayers}
        duration={game.duration}
        year={game.year}
      />

      <ScrollView
        contentContainerStyle={{ alignItems: "center" }}
        style={styles.gameDescriptionContainer}
      >
        <Text style={styles.gameDescription}>{game.description}</Text>
      </ScrollView>
      {game.addedFromAPI && (
        <Pressable
          onPress={openBGGPage}
          style={[
            styles.button,
            { backgroundColor: COLORS[data.palette].primary },
          ]}
        >
          <Text style={styles.buttonText}>See game on BGG</Text>
        </Pressable>
      )}
      <GameOwnerLink owner={owner} />
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
  },
  gameDescriptionContainer: {
    maxHeight: 100,
    marginVertical: 5,
    width: "100%",
  },
  gameDescription: {
    width: "95%",
    textAlign: "center",
    paddingHorizontal: 20,
    paddingHorizontal: 10,
  },
  button: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 25,
    marginTop: 15,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default GamePage;
