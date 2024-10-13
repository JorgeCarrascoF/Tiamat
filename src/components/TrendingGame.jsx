import {
  Image,
  Linking,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { COLORS } from "../utils/colors";
import { useContext, useState, useEffect } from "react";
import { GamesContext } from "../navigation/Index";
import { fetchTrendingGames } from "../services/fetchTrendingGame";

const TrendingGame = () => {
  let { data } = useContext(GamesContext);

  const [trendingGame, setTrendingGame] = useState(null);

  useEffect(() => {
    const fetchTrending = async () => {
      let game = await fetchTrendingGames();
      setTrendingGame(game);
    };
    fetchTrending();
  }, []);

  const openBGGPage = () => {
    Linking.openURL(
      `https://boardgamegeek.com/boardgame/${trendingGame.id}`
    ).catch((err) => console.error("Failed to open URL:", err));
  };

  return (
    <Pressable
      onPress={openBGGPage}
      style={[
        styles.cardContainer,
        {
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
          Nº1 Game from BGG
        </Text>
        {trendingGame ? (
          <View style={styles.gameCard}>
            <Image
              style={[
                styles.gameCardImage,
                {
                  borderColor:
                    Object.keys(data).length > 0
                      ? COLORS[data.palette].primary
                      : COLORS[0].primary,
                },
              ]}
              source={{ uri: trendingGame.thumbnail }}
            />
            <View style={styles.gameCardInfo}>
              <Text style={styles.gameCardText}>{trendingGame.name}</Text>
              <Pressable
                style={[
                  styles.moreInfo,
                  {
                    backgroundColor:
                      Object.keys(data).length > 0
                        ? COLORS[data.palette].primary
                        : COLORS[0].primary,
                  },
                ]}
              >
                <Text style={{color: 'white'}}>Click to see in BGG!</Text>
              </Pressable>
            </View>
          </View>
        ) : (
          <Text>Loading...</Text>
        )}
      </>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    marginTop: 40,
    width: 300,
    borderWidth: 2,
    maxHeight: 160,
    borderRadius: 10,
    alignItems: "center",
  },
  title: {
    textAlign: "left",
    width: "101%",
    marginTop: -1,
    color: "white",
    fontStyle: "italic",
    fontWeight: "bold",
    height: 30,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  gameCard: {
    width: "100%",
    marginTop: 10,
    justifyContent: "space-between",
    paddingHorizontal: 10,
    flexDirection: "row",
  },
  gameCardImage: {
    width: 110,
    height: 110,
    borderWidth: 3,
    borderRadius: 5,
  },
  gameCardInfo: {
    width: "60%",
    justifyContent: "center",
  },
  moreInfo: {
    position: "absolute",
    bottom: -8,
    right: -10,
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  gameCardText: {
    paddingLeft: 10,
    paddingBottom: 15,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    textAlignVertical: "center",
  },
});

export default TrendingGame;
