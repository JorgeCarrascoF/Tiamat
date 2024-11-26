import { useContext, useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import Constants from "expo-constants";
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
    width: "100%",
    height: "100%",
    // marginTop: Constants.statusBarHeight,
    alignItems: "center",
    padding: 20,
  },
  title: {
    alignSelf: "flex-start",
    width: "60%",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "left",
    paddingHorizontal: 10,
    marginHorizontal: 20,
    paddingVertical: 3,
    borderBottomWidth: 1,
    marginTop: 15,
    marginBottom: 15,
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
