import { View, StyleSheet, Image, Text } from "react-native";
import { Link } from "react-router-native";
import { COLORS } from "../utils/colors";
import { useContext } from "react";
import { GamesContext } from "../navigation/Index";

const GameCard = ({ game }) => {
  let { data } = useContext(GamesContext);
  return (
    <View
      key={game.id}
      style={[
        styles.cardContainer,
        {
          borderColor: COLORS[data.palette].primary,
          backgroundColor: COLORS[data.palette].primary,
        },
      ]}
    >
      <Link to={`/game/${game.id}`}>
        <Image source={{ uri: game.image }} style={styles.cardImage}></Image>
      </Link>
      <Text
        numberOfLines={1}
        ellipsisMode="tail"
        style={[styles.cardText, { backgroundColor: COLORS[data.palette].primary }]}
      >
        {game.name}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: "31%",
    margin: 4,
    borderWidth: 4,

    borderRadius: 8,
  },
  cardImage: {
    width: "100%",
    aspectRatio: "1/1",
    borderRadius: 4,
    marginBottom: 20,
  },
  cardText: {
    width: "100%",
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    position: "absolute",
    textAlign: "center",
    bottom: -2,
    padding: 2,
    paddingLeft: 8,
    color: "white",
  },
});

export default GameCard;
