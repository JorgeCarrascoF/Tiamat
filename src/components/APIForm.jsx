import {
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  View,
  FlatList,
} from "react-native";
import { COLORS } from "../utils/colors";
import { useContext, useState } from "react";
import fetchGameList from "../services/fetchGameList";
import fetchGameData from "../services/fetchGameData";
import SearchedGameInfoCard from "./SearchedGameInfoCard";
import FormInput from "./FormInput";
import AddGameQuestion from "./AddGameQuestion";
import FormOwnerSelector from "./FormOwnerSelector";
import { GamesContext } from "../navigation/Index";
import saveData from "../services/saveData";
import { redirect } from "react-router-native";

const APIForm = () => {
  const { data, setData } = useContext(GamesContext);

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
  };

  const saveGameAndOwner = () => {
    let game = {
      id: gameID,
      name: gameName,
      description: chosenGame.description,
      minPlayers: chosenGame.minPlayers,
      maxPlayers: chosenGame.maxPlayers,
      owner: chosenOwner,
      image: chosenGame.image,
    };

    let newData = { ...data };
    newData.tabletopGames.push(game);
    setData(newData);
    saveData(newData);

    resetForm();
    redirect("/games");
  };

  const resetForm = () => {
    setGameName("");
    setGameID("");
    setChosenGame(null);
    setChosenOwner("");
    setChoosingOwner(false);
    setGameForSearch("");
    setSearchedGameList([]);
    setSearchedGameIDs([]);
    setLoading(false);
  };

  const cancelAddition = () => {
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
      {choosingOwner && (
        <FormOwnerSelector
          selectedOwner={chosenOwner}
          setOwner={setChosenOwner}
        />
      )}
      {chosenOwner !== "" && (
        <Pressable
          style={styles.saveGameButton}
          onPress={() => {
            saveGameAndOwner();
          }}
        >
          <Text style={styles.saveGameButtonText}>Add game</Text>
        </Pressable>
      )}
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
  saveGameButton: {
    backgroundColor: COLORS.primary,
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  saveGameButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default APIForm;
