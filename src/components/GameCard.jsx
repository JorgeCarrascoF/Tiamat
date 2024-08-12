import { View, StyleSheet, Image, Text } from "react-native";
import { Link } from "react-router-native";
import { COLORS } from "../utils/colors";

const GameCard = ({ game }) => {
  console.log("game", game);
  return (
    <View key={game.id} style={styles.cardContainer}>
      <Link to={`/game/${game.id}`}>
        <Image source={{ uri: game.image }} style={styles.cardImage}></Image>
      </Link>
      <Text numberOfLines={1} ellipsisMode="tail" style={styles.cardText}>
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
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primary,
    borderRadius: 8,
  },
  cardImage: {
    width: "100%",
    aspectRatio: "1/1",
    borderRadius: 4,
    marginBottom: 20,
  },
  cardText: {
    width: "103%",
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    position: "absolute",
    textAlign: "center",
    bottom: -2,
    padding: 2,
    paddingLeft: 8,
    color: "white",
    backgroundColor: COLORS.primary,
  },
});

export default GameCard;
