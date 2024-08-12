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
      <Text>{text}</Text>
      <View style={styles.filterRow}>
        <Pressable
          style={styles.filterButton}
          onPress={() => {
            let newPlayers = numPlayers - 1;
            if (newPlayers >= lowerLimit) {
              setNumPlayers(newPlayers);
            }
          }}
        >
          <Text style={styles.filterButtonText}>-</Text>
        </Pressable>
        <Text style={styles.filterPlayersText}>{numPlayers}</Text>
        <Pressable
          style={styles.filterButton}
          onPress={() => {
            let newPlayers = numPlayers + 1;
            if (newPlayers <= upperLimit) {
              setNumPlayers(newPlayers);
            }
          }}
        >
          <Text style={styles.filterButtonText}>+</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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

export default NumPlayerSelector;
