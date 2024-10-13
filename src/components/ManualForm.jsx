import { View, Text, StyleSheet, TextInput, Pressable } from "react-native";
import FormOwnerSelector from "./FormOwnerSelector";
import { useContext, useState } from "react";
import { COLORS } from "../utils/colors";
import { GamesContext } from "../navigation/Index";
import saveData from "../services/saveData";
import { useNavigate } from "react-router-native";
import { askAsync } from "expo-permissions";

const ManualForm = () => {
  let { data, setData } = useContext(GamesContext);

  const navigate = useNavigate();

  const [gameName, setGameName] = useState("");
  const [gameDescription, setGameDescription] = useState("");
  const [gameImage, setGameImage] = useState("");
  const [gameYear, setGameYear] = useState("");
  const [gameDuration, setGameDuration] = useState("");
  const [gameMinPlayers, setGameMinPlayers] = useState("");
  const [gameMaxPlayers, setGameMaxPlayers] = useState("");
  const [gameOwner, setGameOwner] = useState(null);

  const [validName, setValidName] = useState(true);
  const [validDescription, setValidDescription] = useState(true);
  const [validImage, setValidImage] = useState(true);
  const [validYear, setValidYear] = useState(true);
  const [validDuration, setValidDuration] = useState(true);
  const [validMinPlayers, setValidMinPlayers] = useState(true);
  const [validMaxPlayers, setValidMaxPlayers] = useState(true);
  const [validOwner, setValidOwner] = useState(true);
  const [validGame, setValidGame] = useState(true);

  const [checkingValidURL, setCheckingValidURL] = useState(false);

  const addGame = () => {
    let game = {
      id: data.tabletopGames.length,
      name: gameName,
      description: gameDescription,
      image: gameImage,
      year: gameYear,
      duration: gameDuration,
      minPlayers: gameMinPlayers,
      maxPlayers: gameMaxPlayers,
      owner: gameOwner,
      addedFromAPI: false,
    };
    saveGame(game);
  };

  const isValidGame = async (game) => {
    let valid = true;
    if (game.name === "") {
      valid = false;
      setValidName(false);
    } else {
      setValidName(true);
    }
    if (game.description === "") {
      valid = false;
      setValidDescription(false);
    } else {
      setValidDescription(true);
    }
    if (game.image === "") {
      valid = false;
      setValidImage(false);
    } else {
      let validURL = await isValidURL(game.image);
      if (!validURL) {
        valid = false;
        setValidImage(false);
      } else {
        setValidImage(true);
      }
    }
    if (game.year > new Date().getFullYear() || game.year < 1000) {
      valid = false;
      setValidYear(false);
    } else {
      setValidYear(true);
    }
    if (game.duration < 1) {
      valid = false;
      setValidDuration(false);
    } else {
      setValidDuration(true);
    }
    if (game.minPlayers < 1) {
      valid = false;
      setValidMinPlayers(false);
    } else {
      setValidMinPlayers(true);
    }
    if (game.maxPlayers < game.minPlayers || game.maxPlayers < 1) {
      valid = false;
      setValidMaxPlayers(false);
    } else {
      setValidMaxPlayers(true);
    }
    if (game.owner === null || game.owner === "") {
      valid = false;
      setValidOwner(false);
    } else {
      setValidOwner(true);
    }
    setValidGame(valid);
    return valid;
  };

  const isValidURL = async (url) => {
    try {
      const response = await fetch(url, { method: "HEAD" });
      return response.ok;
    } catch (error) {
      return false;
    }
  };

  const saveGame = async (game) => {
    const isValid = await isValidGame(game);
    if (isValid) {
      let newData = { ...data };
      newData.tabletopGames.push(game);
      setData(newData);
      saveData(newData);

      resetForm();
      navigate("/games");
    }
  };

  const resetForm = () => {
    setGameName("");
    setGameDescription("");
    setGameImage("");
    setGameYear("");
    setGameDuration("");
    setGameMinPlayers("");
    setGameMaxPlayers("");
    setGameOwner(null);
    setValidName(true);
    setValidDescription(true);
    setValidImage(true);
    setValidYear(true);
    setValidDuration(true);
    setValidMinPlayers(true);
    setValidMaxPlayers(true);
    setValidOwner(true);
    setValidGame(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text
          style={[
            styles.subtitle,
            {
              backgroundColor: validName ? COLORS[data.palette].primary : "red",
            },
          ]}
        >
          Name
        </Text>
        <TextInput
          onChangeText={(e) => {
            setGameName(e);
          }}
          style={[
            styles.textInput,
            { borderColor: validName ? COLORS[data.palette].primary : "red" },
          ]}
        />
      </View>
      <View style={styles.section}>
        <Text
          style={[
            styles.subtitle,
            {
              backgroundColor: validDescription
                ? COLORS[data.palette].primary
                : "red",
            },
          ]}
        >
          Description
        </Text>
        <TextInput
          onChangeText={(e) => {
            setGameDescription(e);
          }}
          style={[
            styles.textInput,
            {
              borderColor: validDescription
                ? COLORS[data.palette].primary
                : "red",
            },
          ]}
        />
      </View>
      <View style={styles.section}>
        <Text
          style={[
            styles.subtitle,
            {
              backgroundColor: validImage
                ? COLORS[data.palette].primary
                : "red",
            },
          ]}
        >
          Image URL
        </Text>
        <TextInput
          onChangeText={(e) => {
            setGameImage(e);
          }}
          style={[
            styles.textInput,
            { borderColor: validImage ? COLORS[data.palette].primary : "red" },
          ]}
        />
      </View>
      <View style={styles.row}>
        <View style={styles.smallSection}>
          <Text
            style={[
              styles.subtitleSmallSection,
              {
                backgroundColor: validYear
                  ? COLORS[data.palette].primary
                  : "red",
              },
            ]}
          >
            Year
          </Text>

          <TextInput
            onChangeText={(e) => {
              setGameYear(e);
            }}
            keyboardType="numeric"
            maxLength={4}
            style={[
              styles.textInput,
              {
                borderColor: validYear ? COLORS[data.palette].primary : "red",
                marginLeft: 3,
              },
            ]}
          />
        </View>
        <View style={styles.smallSection}>
          <Text
            style={[
              styles.subtitleSmallSection,
              {
                backgroundColor: validDuration
                  ? COLORS[data.palette].primary
                  : "red",
              },
            ]}
          >
            Duration
          </Text>
          <TextInput
            keyboardType="numeric"
            maxLength={3}
            onChangeText={(e) => {
              setGameDuration(e);
            }}
            style={[
              styles.textInput,
              {
                borderColor: validDuration
                  ? COLORS[data.palette].primary
                  : "red",
                marginLeft: 3,
              },
            ]}
          />
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.smallSection}>
          <Text
            style={[
              styles.subtitleSmallSection,
              {
                backgroundColor: validMinPlayers
                  ? COLORS[data.palette].primary
                  : "red",
              },
            ]}
          >
            Min players
          </Text>
          <TextInput
            onChangeText={(e) => {
              setGameMinPlayers(e);
            }}
            keyboardType="numeric"
            maxLength={2}
            style={[
              styles.textInput,
              {
                borderColor: validMinPlayers
                  ? COLORS[data.palette].primary
                  : "red",
                marginLeft: 3,
              },
            ]}
          />
        </View>
        <View style={styles.smallSection}>
          <Text
            style={[
              styles.subtitleSmallSection,
              {
                backgroundColor: validMaxPlayers
                  ? COLORS[data.palette].primary
                  : "red",
              },
            ]}
          >
            Max players
          </Text>
          <TextInput
            onChangeText={(e) => {
              setGameMaxPlayers(e);
            }}
            keyboardType="numeric"
            maxLength={2}
            style={[
              styles.textInput,
              {
                borderColor: validMaxPlayers
                  ? COLORS[data.palette].primary
                  : "red",
                marginLeft: 3,
              },
            ]}
          />
        </View>
      </View>
      <View style={[styles.section, { width: "90%" }]}>
        <Text
          style={[
            styles.subtitle,
            {
              backgroundColor: validOwner
                ? COLORS[data.palette].primary
                : "red",
              marginLeft: 0,
            },
          ]}
        >
          Owner
        </Text>
        <FormOwnerSelector
          selectedOwner={gameOwner}
          setOwner={setGameOwner}
          valid={validOwner}
        />
      </View>
      <Pressable
        onPress={addGame}
        style={[
          styles.button,
          {
            backgroundColor: COLORS[data.palette].primary,
          },
        ]}
      >
        <Text style={styles.buttonText}>Add game</Text>
      </Pressable>

      {!validGame && (
        <Text style={styles.invalid}>Some fields are invalid</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "110%",
    alignItems: "center",
  },
  subtitle: {
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "left",
    color: "white",
    alignSelf: "flex-start",
    marginHorizontal: 19,
    paddingLeft: 15,
    paddingRight: 20,
    paddingVertical: 3,
    marginTop: 10,
    borderRadius: 15,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  section: {
    width: "100%",
    marginTop: 5,
    alignItems: "center",
    justifyContent: "space-between",
  },
  smallSection: {
    width: "45%",
    marginTop: 5,
    alignItems: "center",
    justifyContent: "space-between",
  },
  subtitleSmallSection: {
    fontWeight: "bold",
    fontSize: 16,
    color: "white",
    textAlign: "left",
    alignSelf: "flex-start",
    paddingLeft: 15,
    paddingRight: 20,
    marginLeft: 10,
    paddingVertical: 3,
    marginTop: 10,
    borderRadius: 15,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  textInput: {
    fontSize: 16,
    width: "90%",
    textAlign: "justify",
    borderWidth: 2,
    borderRadius: 15,
    borderTopLeftRadius: 0,
    marginLeft: -1,
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
  invalid: {
    color: "red",
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 15,
  },
});

export default ManualForm;
