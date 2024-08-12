import { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { COLORS } from "../utils/colors";
import NumPlayerSelector from "./NumPlayerSelector";

const GameFilter = ({ games, allGames, setGames }) => {
  const [filtering, setFiltering] = useState(false);
  const [seeOwners, setSeeOwners] = useState(true);
  const [ownersFiltered, setOwnersFiltered] = useState([]);
  const [minPlayers, setMinPlayers] = useState(2);
  const [maxPlayers, setMaxPlayers] = useState(5);

  const filterGames = () => {
    let newGames = allGames.filter(
      (game) =>
        minPlayers >= game.minPlayers &&
        maxPlayers <= game.maxPlayers &&
        (ownersFiltered.length === 0 || ownersFiltered.includes(game.owner))
    );
    setGames(newGames);
  };

  useEffect(() => {
    if (filtering) {
      filterGames();
    }
  }, [minPlayers, maxPlayers, ownersFiltered]);

  return (
    <View>
      <Text
        style={styles.showFilterButton}
        onPress={() => {
          setFiltering(!filtering);
          setGames(allGames);
        }}
      >
        {filtering ? "╳" : "Filter"}
      </Text>

      {filtering && (
        <View style={styles.filterContainer}>
          <NumPlayerSelector
            numPlayers={minPlayers}
            lowerLimit={1}
            upperLimit={maxPlayers}
            setNumPlayers={setMinPlayers}
            text={"Min players"}
          />
          <NumPlayerSelector
            numPlayers={maxPlayers}
            lowerLimit={minPlayers}
            upperLimit={Infinity}
            setNumPlayers={setMaxPlayers}
            text={"Max players"}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  showFilterButton: {
    backgroundColor: COLORS.primary,
    color: "white",
    fontWeight: "bold",
    alignSelf: "flex-end",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 50,
    position: "absolute",
    zIndex: 1,
    top: 20,
    right: 20,
  },
  filterContainer: {
    justifyContent: "center",
    padding: 5,
    marginTop: 30,
    alignItems: "center",
  },
  filterRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 10,
    alignItems: "center",
  },
  filterButton: {
    backgroundColor: COLORS.primary,
    color: "white",
    width: 25,
    borderRadius: 15,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 20,
  },
  filterButtonText: {
    width: "100%",
    textAlign: "center",
    borderRadius: 15,
    color: "white",
    fontSize: 18,
    paddingBottom: 1,
  },
  filterPlayersText: {
    textAlign: "center",
    fontSize: 20,
    marginHorizontal: 5,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 4,
    paddingVertical: 1,
  },
});

export default GameFilter;
