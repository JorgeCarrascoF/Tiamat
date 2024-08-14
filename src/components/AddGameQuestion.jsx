import { StyleSheet, Text, View, Pressable } from "react-native";
import { COLORS } from "../utils/colors";

const AddGameQuestion = ({ gameName, addGame, cancelAddition }) => {
  return (
    <View style={styles.questionContainer}>
      <Text style={styles.questionText}>
        Add <Text style={styles.highlightedText}>{gameName}</Text> to your
        games?
      </Text>
      <View style={styles.row}>
        <Pressable onPress={addGame} style={styles.button}>
          <Text style={styles.buttonText}>Yes</Text>
        </Pressable>
        <Pressable onPress={cancelAddition} style={styles.button}>
          <Text style={styles.buttonText}>No</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
    marginTop: 10,
    justifyContent: "space-around",
  },
  button: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: COLORS.primary,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  }
});

export default AddGameQuestion;
