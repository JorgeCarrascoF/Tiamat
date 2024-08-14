import { useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { COLORS } from "../utils/colors";
import APIForm from "../components/APIForm";

const NewGamePage = () => {
  const [addingFromAPI, setAddingFromAPI] = useState(true);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Añadir juego nuevo</Text>
      <Pressable
        onPress={() => {
          setAddingFromAPI(!addingFromAPI);
        }}
        style={styles.toggleFormButton}
      >
        <Text style={styles.toggleFormButtonText}>
          {addingFromAPI ? "Add manually" : "Use API"}
        </Text>
      </Pressable>
      <APIForm></APIForm>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    padding: 20,
    alignItems: "center",
  },
  title: {
    alignSelf: "flex-start",
    width: "60%",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    paddingLeft: 5,
    color: COLORS.primary,
    borderBottomWidth: 2,
    borderBottomColor: COLORS.primary,
  },
  toggleFormButton: {
    width: 110,
    backgroundColor: COLORS.primary,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 25,
    position: "absolute",
    top: 20,
    right: 15,
  },
  toggleFormButtonText: {
    color: "white",
    textAlign: "center",
  },
});

export default NewGamePage;
