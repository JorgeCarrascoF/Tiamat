import { View, Text, Pressable } from "react-native";
import PlayerSelector from "../components/PlayerSelector";
import { useContext, useState } from "react";
import { GamesContext } from "../navigation/Index";
import { StyleSheet } from "react-native";
import { COLORS } from "../utils/colors";
import Constants from "expo-constants";

const TurnSelectorPage = () => {
  const { data } = useContext(GamesContext);

  let orderedPlayers = data.players.sort((a, b) => {
    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;
    return 0;
  });

  const [players, setPlayers] = useState([]);
  const [textPlayers, setTextPlayers] = useState("");
  const [firstTurn, setFirstTurn] = useState("");

  const chooseFirstTurn = () => {
    let allPlayers = [];

    players.map((player) => {
      let playerName = data.players.find((p) => p.id == player).name;
      allPlayers.push(playerName);
    });
    if (textPlayers.length > 0) {
      textPlayers.split(",").map((player) => {
        allPlayers.push(player.trim());
      });
    }

    if (allPlayers.length > 0) {
      let randNum = Math.floor(Math.random() * allPlayers.length);
      let firsPlayer = allPlayers[randNum];
      setFirstTurn(firsPlayer);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={[styles.title, { borderBottomColor: COLORS[data.palette].primary }]}>
        First Turn Selector
      </Text>
      <PlayerSelector
        orderedPlayers={orderedPlayers}
        setPlayers={setPlayers}
        players={players}
        textPlayers={textPlayers}
        setTextPlayers={setTextPlayers}
      />
      <Pressable
        onPress={chooseFirstTurn}
        style={[
          styles.button,
          { backgroundColor: COLORS[data.palette].primary },
          players.length == 0 &&
            textPlayers == "" && { backgroundColor: "grey" },
        ]}
      >
        <Text style={styles.buttonText}>Choose first turn!</Text>
      </Pressable>
      {firstTurn != "" && (
        <Text style={styles.firstTurn}>First turn goes to {firstTurn}!</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    alignItems: "center",
    alignSelf: "center",
    // marginTop: Constants.statusBarHeight,
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
  button: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 15,
    position: "absolute",
    bottom: 100,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
  },
  firstTurn: {
    fontSize: 18,
    backgroundColor: "white",
    paddingVertical: 5,
    paddingHorizontal: 14,
    borderRadius: 10,
    position: "absolute",
    bottom: 180,
  },
});

export default TurnSelectorPage;
