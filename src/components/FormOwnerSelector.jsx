import { useContext, useEffect } from "react";
import { StyleSheet, View, Text, FlatList, Image } from "react-native";
import { GamesContext } from "../navigation/Index";
import OwnerCard from "./OwnerCard";
import { COLORS } from "../utils/colors";

const FormOwnerSelector = ({ selectedOwner, setOwner }) => {
  const { data } = useContext(GamesContext);

  let owners = data.players;

  return (
    <View style={[styles.container, {    backgroundColor: COLORS[data.palette].primary,}]}>
      <Text style={styles.title}>Select owner</Text>
      <FlatList
        data={owners}
        style={styles.ownerList}
        numColumns={3}
        renderItem={({ item }) => {
          return (
            <OwnerCard
              owner={item}
              selectedOwner={selectedOwner}
              setOwner={setOwner}
            />
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 10,
    marginTop: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: "bold",
    color: "white",
  },
  ownerList: {
    backgroundColor: "white",
    borderRadius: 10,
    width: "100%",
    padding: 5,
    maxHeight: 200,
  },
});

export default FormOwnerSelector;
