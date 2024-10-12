import { useState, useContext, useEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { GamesContext } from "../navigation/Index";
import { COLORS } from "../utils/colors";
import { Link } from "react-router-native";

const RandomGame = () => {
  let { data } = useContext(GamesContext);

  const [randGame, setRandGame] = useState(null);
  const [randGameUrl, setRandGameUrl] = useState("/games");

  useEffect(() => {
    if (Object.keys(data).length > 0) {
      const randomNumber = getRandomNumberByDay(
        0,
        data.tabletopGames.length - 1
      );
      setRandGame(randomNumber);
      setRandGameUrl(`/game/${data.tabletopGames[randomNumber].id}`);
    }
  }, [data]);

  const getRandomNumberByDay = (min, max) => {
    const date = new Date();
    const seed =
      date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDate();

    const random = Math.sin(seed) * 10000;

    return Math.floor((random - Math.floor(random)) * (max - min + 1)) + min;
  };

  return (
    <Link
      to={randGameUrl}
      underlayColor={
        Object.keys(data).length > 0
          ? COLORS[data.palette].primary
          : COLORS[0].primary
      }
      style={[
        styles.cardContainer,
        {
          borderColor:
            Object.keys(data).length > 0
              ? COLORS[data.palette].primary
              : COLORS[0].primary,
          backgroundColor:
            Object.keys(data).length > 0
              ? COLORS[data.palette].primary
              : COLORS[0].primary,
        },
      ]}
    >
      <View>
        <Text
          style={[
            styles.title,
            {
              backgroundColor:
                Object.keys(data).length > 0
                  ? COLORS[data.palette].primary
                  : COLORS[0].primary,
            },
          ]}
        >
          Random game of the day
        </Text>
        <View style={styles.game}>
          {randGame === null ? (
            <Text>Can't connect to games, waiting...</Text>
          ) : (
            <Text
              style={[
                styles.gameName,
                {
                  backgroundColor:
                    Object.keys(data).length > 0
                      ? COLORS[data.palette].primary
                      : COLORS[0].primary,
                },
              ]}
              numberOfLines={1}
              ellipsisMode="tail"
            >
              {data.tabletopGames[randGame].name}
            </Text>
          )}
          {randGame !== null && (
            <Image
              source={{ uri: data.tabletopGames[randGame].image }}
              style={styles.gameImage}
            />
          )}
        </View>
      </View>
    </Link>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    marginTop: 40,
    width: 300,
    maxHeight: 150,
    borderRadius: 10,
    alignItems: "center",
  },
  title: {
    textAlign: "left",
    width: "100%",
    color: "white",
    fontStyle: "italic",
    fontWeight: "bold",
    height: 30,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  game: {
    overflow: "hidden",
  },
  gameName: {
    position: "absolute",
    right: 5,
    bottom: 5,
    color: "white",
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 8,
    zIndex: 1,
  },
  gameImage: {
    width: 295,
    height: 117,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
});

export default RandomGame;
