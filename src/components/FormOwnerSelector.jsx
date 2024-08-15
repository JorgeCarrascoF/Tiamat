import { useContext, useEffect } from "react";
import { StyleSheet, View, Text, FlatList, Image } from "react-native";
import { GamesContext } from "../navigation/Index";
import OwnerCard from "./OwnerCard";
import { COLORS } from "../utils/colors";

const FormOwnerSelector = ({ selectedOwner, setOwner }) => {
  const { data } = useContext(GamesContext);

  let owners = data.players;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select owner</Text>
      <FlatList
        data={owners}
        style={styles.ownerList}
        renderItem={({ item }) => {
          return (
            <OwnerCard
              owner={item}
              selectedOwner={selectedOwner}
              setOwner={setOwner}
            />
          );
        }}
      ></FlatList>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.primary,
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
    flexDirection: "row",
    padding: 5,
  },
});

export default FormOwnerSelector;
