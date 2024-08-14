import { useContext } from "react";
import { StyleSheet, View, Text, FlatList, Image } from "react-native";
import { GamesContext } from "../navigation/Index";
import OwnerCard from "./OwnerCard";

const FormOwnerSelector = ({ setOwner }) => {
  const { data } = useContext(GamesContext);

  let owners = data.players;

  return (
    <View style={styles.container}>
      <Text>Select owner</Text>
      <FlatList
        data={owners}
        style={styles.ownerList}
        renderItem={({ item }) => {
          return <OwnerCard owner={item} />;
        }}
      ></FlatList>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "95%",
    borderWidth: 2,
    padding: 10,
    marginTop: 10,
    alignItems: "center",
  },
  ownerList: {
    width: "100%",
    flexDirection: "row",
    paddingVertical: 5,
  },
});

export default FormOwnerSelector;
