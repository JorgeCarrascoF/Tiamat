import { useContext, useEffect } from "react";
import { StyleSheet, View, Text, FlatList, Image } from "react-native";
import { GamesContext } from "../navigation/Index";
import OwnerCard from "./OwnerCard";
import { COLORS } from "../utils/colors";

const FormOwnerSelector = ({ selectedOwner, setOwner, valid }) => {
  const { data } = useContext(GamesContext);

  let owners = data.players;

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: valid ? COLORS[data.palette].primary : 'red' },
      ]}
    >
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
    padding: 3,
    borderRadius: 10,
    borderTopLeftRadius: 0,
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
