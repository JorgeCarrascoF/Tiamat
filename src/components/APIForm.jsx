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

const APIForm = () => {
  const [gameName, setGameName] = useState("");
  const [gameID, setGameID] = useState("");

  const [chosenGame, setChosenGame] = useState(null);

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
      Keyboard.dismiss();
      setLoading(true);
      let data = await fetchGameList(gameForSearch);
      setSearchedGameList(data.searchedGames);
      setSearchedGameIDs(data.searchedIDs);
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          onChangeText={(e) => {
            setGameForSearch(e);
          }}
        ></TextInput>
        <Pressable
          style={[
            styles.searchButton,
            { backgroundColor: loading ? "grey" : COLORS.primary },
          ]}
          onPress={() => {
            searchGame();
          }}
        >
          <Image
            style={styles.searchIcon}
            source={require("../assets/img/search.png")}
          />
        </Pressable>
      </View>
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
          <View style={styles.questionContainer}>
            <Text style={styles.questionText}>
              Add <Text style={styles.highlightedText}>{chosenGame.name}</Text>{" "}
              to your games?
            </Text>
            <View style={styles.row}>
              <Pressable style={styles.button}>
                <Text>Yes</Text>
              </Pressable>
              <Pressable style={styles.button}>
                <Text>No</Text>
              </Pressable>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "95%",
    alignItems: "center",
  },
  inputRow: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  input: {
    width: "80%",
    borderRadius: 30,
    borderWidth: 2,
    borderColor: COLORS.primary,
    backgroundColor: COLORS.terciary,
    paddingHorizontal: 10,
  },
  searchButton: {
    paddingVertical: 7,
    paddingHorizontal: 15,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  searchIcon: {
    width: 20,
    height: 20,
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
  highlightedText: {
    color: COLORS.primary,
    fontWeight: "bold",
  },
  questionContainer: {
    marginTop: 5,
    padding: 10,
  },
  questionText: {
    fontSize: 16,
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    marginTop: 5,
    justifyContent: "space-around",
  },
  button: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: COLORS.primary,
  },
});

export default APIForm;
