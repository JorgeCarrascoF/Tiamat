import {
  Image,
  Keyboard,
  Pressable,
  StyleSheet,
  TextInput,
  Text,
  View,
  ScrollView,
  FlatList,
} from "react-native";
import { COLORS } from "../utils/colors";
import { useEffect, useState } from "react";
import fetchGameList from "../services/fetchGameList";
import fetchGameData from "../services/fetchGameData";
import SearchedGameInfoCard from "./SearchedGameInfoCard";
import FormInput from "./formInput";
import AddGameQuestion from "./AddGameQuestion";
import FormOwnerSelector from "./FormOwnerSelector";

const APIForm = () => {
  const [gameName, setGameName] = useState("");
  const [gameID, setGameID] = useState("");

  const [chosenGame, setChosenGame] = useState(null);
  const [chosenOwner, setChosenOwner] = useState("");

  const [choosingOwner, setChoosingOwner] = useState(false);

  const [gameForSearch, setGameForSearch] = useState("");
  const [searchedGameList, setSearchedGameList] = useState([]);
  const [searchedGameIDs, setSearchedGameIDs] = useState([]);
  const [loading, setLoading] = useState(false);

  const selectGame = async (game) => {
    setGameName(game);
    let id = searchedGameIDs[searchedGameList.indexOf(game)];
    setGameID(id);

    let data = await fetchGameData(id);
    setChosenGame(data);
  };

  const searchGame = async () => {
    if (!loading) {
      setChoosingOwner(false);
      setChosenGame(null);
      Keyboard.dismiss();
      setLoading(true);
      let data = await fetchGameList(gameForSearch);
      setSearchedGameList(data.searchedGames);
      setSearchedGameIDs(data.searchedIDs);
      setLoading(false);
    }
  };

  const addGame = () => {
    setSearchedGameList([]);
    setChoosingOwner(true);
    console.log("---ADDING GAME---");
    console.log("Name: " + gameName);
    console.log("ID: " + gameID);
    console.log("description: " + chosenGame.description);
    console.log("image: " + chosenGame.image);
    console.log(
      "players: " + chosenGame.minPlayers + " - " + chosenGame.maxPlayers
    );
    console.log("---GAME ADDED---");
  };

  const cancelAddition = () => {
    console.log("Game addition cancelled");
    setChosenGame(null);
  };

  return (
    <View style={styles.container}>
      <FormInput
        setField={setGameForSearch}
        triggerAction={searchGame}
        loading={loading}
      />
      {searchedGameList.length > 0 && (
        <View
          style={[
            styles.gameListContainer,
            {
              maxHeight: chosenGame == null ? 400 : 200,
            },
          ]}
        >
          <FlatList
            data={searchedGameList}
            renderItem={({ item }) => (
              <Pressable
                style={[
                  styles.gameListItem,
                  {
                    backgroundColor:
                      gameName == item ? COLORS.primary : COLORS.terciary,
                  },
                ]}
                onPress={() => {
                  selectGame(item);
                }}
              > 
                
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={{
                    color: gameName == item ? "white" : "black",
                  }}
                >
                  {item}
                </Text>
              </Pressable>
            )}
          />
        </View>
      )}
      {chosenGame != null && (
        <View style={styles.gameInfoContainer}>
          <SearchedGameInfoCard data={chosenGame} />
          {!choosingOwner && (
            <AddGameQuestion
              gameName={chosenGame.name}
              addGame={addGame}
              cancelAddition={cancelAddition}
            />
          )}
        </View>
      )}
      {choosingOwner && <FormOwnerSelector setOwner={setChosenOwner} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "95%",
    alignItems: "center",
  },
  gameListContainer: {
    marginTop: 10,
    paddingVertical: 5,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: COLORS.primary,
  },
  gameListItem: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginVertical: 3,
    marginHorizontal: 4,
    borderRadius: 5,
  },
  gameInfoContainer: {
    marginTop: 10,
    width: "95%",
    alignItems: "center",
  },
});

export default APIForm;
