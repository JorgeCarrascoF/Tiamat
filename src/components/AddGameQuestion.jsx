import { StyleSheet, Text, View, Pressable } from "react-native";
import { COLORS } from "../utils/colors";
import { useContext } from "react";
import { GamesContext } from "../navigation/Index";

const AddGameQuestion = ({ gameName, addGame, cancelAddition }) => {
  let { data } = useContext(GamesContext);

  return (
    <View style={styles.questionContainer}>
      <Text style={styles.questionText}>
        Add{" "}
        <Text
          style={[
            styles.highlightedText,
            { color: COLORS[data.palette].primary },
          ]}
        >
          {gameName}
        </Text>{" "}
        to your games?
      </Text>
      <View style={styles.row}>
        <Pressable
          onPress={addGame}
          style={[
            styles.button,
            { backgroundColor: COLORS[data.palette].primary },
          ]}
        >
          <Text style={styles.buttonText}>Yes</Text>
        </Pressable>
        <Pressable
          onPress={cancelAddition}
          style={[
            styles.button,
            { backgroundColor: COLORS[data.palette].primary },
          ]}
        >
          <Text style={styles.buttonText}>No</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  highlightedText: {
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
    marginTop: 10,
    justifyContent: "space-around",
  },
  button: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default AddGameQuestion;
