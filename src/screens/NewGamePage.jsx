import { useContext, useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { COLORS } from "../utils/colors";
import APIForm from "../components/APIForm";
import { GamesContext } from "../navigation/Index";
import ManualForm from "../components/ManualForm";

const NewGamePage = () => {
  const [addingFromAPI, setAddingFromAPI] = useState(true);
  let { data } = useContext(GamesContext);

  return (
    <View style={styles.container}>
      <Text
        style={[
          styles.title,
          {
            color: COLORS[data.palette].primary,
            borderBottomColor: COLORS[data.palette].primary,
          },
        ]}
      >
        Add new game
      </Text>
      <Pressable
        onPress={() => {
          setAddingFromAPI(!addingFromAPI);
        }}
        style={[
          styles.toggleFormButton,
          { backgroundColor: COLORS[data.palette].primary },
        ]}
      >
        <Text style={styles.toggleFormButtonText}>
          {addingFromAPI ? "Add manually" : "Use API"}
        </Text>
      </Pressable>
      {addingFromAPI ? <APIForm></APIForm> : <ManualForm />}
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

    borderBottomWidth: 2,
  },
  toggleFormButton: {
    width: 110,

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
