import { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { COLORS } from "../utils/colors";
import { GamesContext } from "../navigation/Index";

import NumPlayerSelector from "./NumPlayerSelector";
import OwnerSelector from "./OwnerSelector";

const GameFilter = ({ games, allGames, setGames }) => {
  const [filtering, setFiltering] = useState(false);
  const [owners, setOwners] = useState([]);
  const [filteredOwners, setFilteredOwners] = useState([]);
  const [minPlayers, setMinPlayers] = useState(2);
  const [maxPlayers, setMaxPlayers] = useState(5);

  const { data } = useContext(GamesContext);

  useEffect(() => {
    if (filtering) {
      filterGames();
    }
  }, [minPlayers, maxPlayers, filteredOwners]);

  const filterGames = () => {
    let newGames = allGames.filter(
      (game) =>
        minPlayers >= game.minPlayers &&
        maxPlayers <= game.maxPlayers &&
        (filteredOwners.length === 0 || filteredOwners.includes(game.owner))
    );
    setGames(newGames);
  };

  useEffect(() => {
    getUniqueOwners();
  }, []);

  const getUniqueOwners = () => {
    let owners = allGames.map((game) => {
      let ownerID = game.owner;
      let owner = data.players.find((player) => player.id === ownerID);
      return owner;
    });
    let uniqueOwners = [...new Set(owners)];
    setOwners(uniqueOwners);
  };

  return (
    <View style={styles.container}>
      <Text
        style={[styles.showFilterButton, {    backgroundColor: COLORS[data.palette].primary,}]}
        onPress={() => {
          setFiltering(!filtering);
          setGames(allGames);
        }}
      >
        {filtering ? "╳" : "Filter"}
      </Text>

      {filtering && (
        <View style={styles.filterContainer}>
          <View style={styles.filterRow}>
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
          <OwnerSelector
            owners={owners}
            filteredOwners={filteredOwners}
            setFilteredOwners={setFilteredOwners}
          ></OwnerSelector>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container:{
    width: '100%',
  },
  showFilterButton: {
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
});

export default GameFilter;
