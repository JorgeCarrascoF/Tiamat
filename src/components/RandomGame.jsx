import { useState, useContext, useEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { GamesContext } from "../navigation/Index";
import { COLORS } from "../utils/colors";
import { Link } from "react-router-native";

const RandomGame = () => {
  let { data } = useContext(GamesContext);

  const [randGame, setRandGame] = useState(null);
  const [randGameUrl, setRandGameUrl] = useState("/games");

  const [noGames, setNoGames] = useState(false);

  useEffect(() => {
    if (Object.keys(data).length > 0) {
      if (data.tabletopGames.length > 0) {
        const randomNumber = getRandomNumberByDay(
          0,
          data.tabletopGames.length - 1
        );
        setRandGame(randomNumber);
        setRandGameUrl(`/game/${data.tabletopGames[randomNumber].id}`);
      } else {
        setNoGames(true);
      }
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
    <>
      {noGames ? (
        <Link
          to="/newgame"
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
              borderColor:
                Object.keys(data).length > 0
                  ? COLORS[data.palette].primary
                  : COLORS[0].primary,
            },
          ]}
        >
          <>
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
            <Text style={[styles.gameCard]}>
              You don't have any games yet. Add one!
            </Text>
          </>
        </Link>
      ) : (
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
      )}
    </>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    marginTop: 40,
    width: 300,
    maxHeight: 150,
    borderRadius: 10,
    borderWidth: 2,
    alignItems: "center",
  },
  title: {
    textAlign: "left",
    width: "101%",
    color: "white",
    fontStyle: "italic",
    fontWeight: "bold",
    height: 30,
    marginTop: -1,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  game: {
    overflow: "hidden",
  },
  gameCard: {
    width: "100%",
    marginTop: 10,
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    flexDirection: "row",
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
