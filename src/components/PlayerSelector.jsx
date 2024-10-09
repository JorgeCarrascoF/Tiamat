import {
  StyleSheet,
  View,
  FlatList,
  Pressable,
  Image,
  Text,
  TextInput,
} from "react-native";
import { COLORS } from "../utils/colors";
import { useContext } from "react";
import { GamesContext } from "../navigation/Index";

const PlayerSelector = ({
  orderedPlayers,
  setPlayers,
  players,
  textPlayers,
  setTextPlayers,
}) => {
  const { data } = useContext(GamesContext);

  return (
    <>
      <View style={styles.playerSelector}>
        <View style={[styles.selector, { borderColor: COLORS[data.palette].primary }]}>
          <FlatList
            data={orderedPlayers}
            horizontal={true}
            renderItem={({ item }) => {
              return (
                <Pressable
                  onPress={() => {
                    if (players.includes(item.id)) {
                      let newPlayers = players.filter((p) => p != item.id);
                      setPlayers(newPlayers);
                    } else {
                      let newPlayers = [...players, item.id];
                      setPlayers(newPlayers);
                    }
                  }}
                  style={styles.selectorItem}
                >
                  <Image
                    source={item.image}
                    style={[
                      styles.selectorItemImage,
                      {
                        borderColor: players.includes(item.id)
                          ? COLORS[data.palette].primary
                          : COLORS[data.palette].terciary,
                      },
                    ]}
                  />
                  <Text
                    style={[
                      styles.selectorItemText,
                      {
                        backgroundColor: players.includes(item.id)
                          ? COLORS[data.palette].primary
                          : COLORS[data.palette].terciary,
                      },
                    ]}
                  >
                    {item.name}
                  </Text>
                </Pressable>
              );
            }}
          />
        </View>
      </View>
      <Text style={[styles.subtitle, { marginLeft: -5, marginTop: 20 }]}>
        Occasional players
      </Text>
      <View style={styles.extraPlayers}>
        <Text style={{ fontStyle: "italic", marginLeft: 10 }}>
          Add occasional players sepparated by commas
        </Text>
        <TextInput
          onChangeText={(e) => {
            setTextPlayers(e);
          }}
          style={[
            styles.extraPlayersInput,
            { borderColor: COLORS[data.palette].primary, backgroundColor: COLORS[data.palette].terciary },
          ]}
          placeholder="Player1, Player2, Player3"
        />
      </View>
      <View style={styles.selected}>
        {players.map((player) => (
          <Pressable
            key={player}
            onPress={() => {
              let newPlayers = players.filter((p) => p != player);
              setPlayers(newPlayers);
            }}
            style={[styles.selectedItem, { backgroundColor: COLORS[data.palette].primary }]}
          >
            <Text
              style={[
                styles.removeButton,
                { backgroundColor: COLORS[data.palette].terciary },
              ]}
            >
              X
            </Text>
            <Text style={styles.selectedItemText}>
              {data.players.find((p) => p.id == player).name}
            </Text>
          </Pressable>
        ))}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  playerSelector: {
    marginTop: 20,
  },
  selector: {
    margin: "auto",
    borderWidth: 2,
    borderRadius: 15,

    maxHeight: 100,
    maxWidth: "80%",
    paddingVertical: 3,
  },
  selectorItem: {
    margin: 5,
  },
  selectorItemImage: {
    height: 70,
    width: 70,
    borderRadius: 100,
    borderWidth: 5,
  },
  selectorItemText: {
    fontSize: 14,
    textAlign: "center",
    marginTop: -15,
    borderRadius: 15,
    paddingVertical: 2,
    color: "white",
    fontWeight: "bold",
  },
  selected: {
    width: "90%",
    height: 250,
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 15,
  },
  selectedItem: {
    paddingVertical: 3,
    paddingHorizontal: 15,
    marginHorizontal: 5,
    marginBottom: 5,
    borderRadius: 15,
  },
  selectedItemText: {
    color: "white",
    fontSize: 16,
  },

  removeButton: {
    fontSize: 12,
    color: "white",
    fontWeight: "bold",
    position: "absolute",
    right: -8,
    top: -6,

    padding: 2,
    paddingHorizontal: 6,
    borderRadius: 50,
  },
  extraPlayers: {
    width: "90%",
  },
  extraPlayersInput: {
    marginTop: 5,
    borderRadius: 30,
    borderWidth: 2,

    paddingHorizontal: 10,
  },
});

export default PlayerSelector;
