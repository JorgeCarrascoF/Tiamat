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
import { useNavigate } from "react-router-native";

const APIForm = () => {
  const { data, setData } = useContext(GamesContext);
  const navigate = useNavigate();

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
      duration: chosenGame.duration,
      year: chosenGame.year,
    };

    let newData = { ...data };
    newData.tabletopGames.push(game);
    setData(newData);
    saveData(newData);

    resetForm();
    navigate("/games");
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
              borderColor: COLORS[data.palette].primary,
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
                      gameName == item
                        ? COLORS[data.palette].primary
                        : COLORS[data.palette].terciary,
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
          <SearchedGameInfoCard gameData={chosenGame} />
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
        <>
          <Text
            style={[
              styles.ownerTitle,
              { backgroundColor: COLORS[data.palette].primary },
            ]}
          >
            Choose owner
          </Text>
          <FormOwnerSelector
            selectedOwner={chosenOwner}
            setOwner={setChosenOwner}
            valid={true}
          />
        </>
      )}
      {chosenOwner !== "" && (
        <Pressable
          style={[
            styles.saveGameButton,
            { backgroundColor: COLORS[data.palette].primary },
          ]}
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
  ownerTitle: {
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "left",
    color: "white",
    alignSelf: "flex-start",
    paddingLeft: 15,
    paddingRight: 20,
    paddingVertical: 3,
    marginTop: 10,
    borderRadius: 15,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  saveGameButton: {
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
