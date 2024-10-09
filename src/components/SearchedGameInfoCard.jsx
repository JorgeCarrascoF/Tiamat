import { StyleSheet, View, Image, Text } from "react-native";
import { COLORS } from "../utils/colors";
import { useContext } from "react";
import { GamesContext } from "../navigation/Index";

const SearchedGameInfoCard = ({ gameData }) => {
  let { data } = useContext(GamesContext);

  return (
    <View style={[styles.container, { borderColor: COLORS[data.palette].primary }]}>
      <View
        style={[
          styles.titleContainer,
          { borderColor: COLORS[data.palette].primary, backgroundColor: COLORS[data.palette].primary },
        ]}
      >
        <Text numberOfLines={1} style={styles.title}>
          {gameData.name}
        </Text>
      </View>
      <Image style={styles.image} source={{ uri: gameData.image }}></Image>
      {/* <Text>
        {gameData.minPlayers} - {gameData.maxPlayers} players
      </Text> */}
      <Text style={styles.description} numberOfLines={7}>
        {gameData.description}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    width: "95%",
    borderWidth: 2,

    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    paddingHorizontal: 15,
    color: "white",
    textAlign: "center",
  },
  titleContainer: {
    margin: -1,
    marginBottom: 5,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderWidth: 2,
  },
  image: {
    alignSelf: "center",
    width: 120,
    height: 120,
    marginTop: 5,
    borderRadius: 5,
  },
  description: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    textAlign: "justify",
  },
});

export default SearchedGameInfoCard;
