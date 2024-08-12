import { View, StyleSheet } from "react-native";
import { Link } from "react-router-native";
import { COLORS } from "../utils/colors";

const GameCard = ({ game }) => {
  return (
    <View key={game.id} styles={style.card}>
      <Link to={`/game/${game.id}`}>
        <Image source={{ uri: game.image }} styles={style.cardImage}></Image>
        <Text numberOfLines={1} ellipsisMode="tail" styles={style.cardText}>
          {game.name}
        </Text>
      </Link>
    </View>
  );
};

const style = StyleSheet.create({
  card: {
    width: "31%",
    margin: 4,
    borderWidth: 3,
    borderColor: COLORS.primary,
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
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    position: "absolute",
    bottom: -1,
    left: -2,
    textAlign: "center",
    padding: 2,
    paddingLeft: 8,
    color: "white",
    backgroundColor: COLORS.primary,
  },
});

export default GameCard;
