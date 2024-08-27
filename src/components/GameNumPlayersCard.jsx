import { StyleSheet, Text, View } from "react-native";
import { COLORS } from "../utils/colors";

const GameNumPlayersCard = ({ maxPLayers, minPlayers }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Players</Text>
      <Text style={styles.text}>
        {minPlayers} - {maxPLayers}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: COLORS.primary,
    alignItems: "center",
    borderRadius: 4,
    width: 100,
  },
  title: {
    fontWeight: "bold",
    backgroundColor: "#5899e2",
    textAlign: "center",
    marginTop: -1,
    marginLeft: -1,
    paddingHorizontal: 5,
    paddingVertical: 3,
    color: "white",
    width: "101%",
  },
  text: {
    marginVertical: 5,
  },
});

export default GameNumPlayersCard;
