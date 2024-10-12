import { StyleSheet, Text, View } from "react-native";
import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-native";
import { GamesContext } from "../navigation/Index";
import { COLORS } from "../utils/colors";

const GameInProgressCard = () => {
  let { data } = useContext(GamesContext);

  const [ongoingGame, setOngoingGame] = useState(false);

  useEffect(() => {
    if (Object.keys(data).length > 0) {
      if (data.tools.points.length > 0) {
        setOngoingGame(true);
      }
    }
  }, [data]);

  return (
    <Link
      to={"/tools/points"}
      underlayColor={"transparent"}
      style={[
        styles.container,
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
          Resume game
        </Text>
        {ongoingGame ? (
          <View style={styles.playersContainer}>
            <Text numberOfLines={1} ellipsisMode="tail">
              {data.tools.points.map((player) => player.name).join(", ")}
            </Text>
          </View>
        ) : (
          <Text style={styles.playersContainer}>
            No game in progress. Start one!
          </Text>
        )}
      </>
    </Link>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
    width: 300,
    maxHeight: 75,
    borderWidth: 2,
    borderRadius: 10,
    alignItems: "center",
    backgroundColor: "white",
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
  playersContainer: {
    width: "100%",
    paddingHorizontal: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
  },
  player: {
    textAlign: "left",
  },
});

export default GameInProgressCard;
