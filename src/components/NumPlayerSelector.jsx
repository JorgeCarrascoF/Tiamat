import { View, Pressable, Text, StyleSheet } from "react-native-web";
import { COLORS } from "../utils/colors";

const NumPlayerSelector = ({
  numPlayers,
  lowerLimit,
  upperLimit,
  setNumPlayers,
  text,
}) => {
  return (
    <View style={{ alignItems: "center" }}>
      <Text style={styles.numPlayerSelectorTitle}>{text}</Text>
      <View style={styles.numPlayerSelectorRow}>
        <Pressable
          style={styles.numPlayerSelectorButton}
          onPress={() => {
            let newPlayers = numPlayers - 1;
            if (newPlayers >= lowerLimit) {
              setNumPlayers(newPlayers);
            }
          }}
        >
          <Text style={styles.numPlayerSelectorButtonText}>-</Text>
        </Pressable>
        <Text style={styles.numPlayerSelectorPlayersText}>{numPlayers}</Text>
        <Pressable
          style={styles.numPlayerSelectorButton}
          onPress={() => {
            let newPlayers = numPlayers + 1;
            if (newPlayers <= upperLimit) {
              setNumPlayers(newPlayers);
            }
          }}
        >
          <Text style={styles.numPlayerSelectorButtonText}>+</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  numPlayerSelectorTitle: {
    textAlign: "center",
    fontSize: 18,
  },
  numPlayerSelectorRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 10,
    alignItems: "center",
  },
  numPlayerSelectorButton: {
    backgroundColor: COLORS.primary,
    color: "white",
    width: 25,
    borderRadius: 15,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 20,
  },
  numPlayerSelectorButtonText: {
    width: "100%",
    textAlign: "center",
    borderRadius: 15,
    color: "white",
    fontSize: 18,
    paddingBottom: 1,
  },
  numPlayerSelectorPlayersText: {
    textAlign: "center",
    fontSize: 20,
    marginHorizontal: 10,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 4,
    paddingVertical: 1,
  },
});

export default NumPlayerSelector;
