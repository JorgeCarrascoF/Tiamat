import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { COLORS } from "../utils/colors";
import { useContext, useState } from "react";
import { GamesContext } from "../navigation/Index";
import Svg, { Path } from "react-native-svg";

const PointTracker = ({
  name,
  id,
  points,
  position,
  updatePoints,
  deletePlayer,
}) => {
  const [deleting, setDeleting] = useState(false);
  let { data } = useContext(GamesContext);

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {deleting ? (
          <Pressable
            style={styles.deleting}
            onPress={() => {
              setDeleting(false);
              deletePlayer(id);
            }}
          >
            <Text style={styles.deletingText}>Delete?</Text>
          </Pressable>
        ) : (
          <Pressable
            onPress={() => {
              setDeleting(true);
            }}
          >
            <Svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              style={styles.deleteImage}
              fill={COLORS[data.palette].primary}
            >
              <Path d="M19 4h-3.5l-1-1h-5l-1 1H5v2h14M6 19a2 2 0 002 2h8a2 2 0 002-2V7H6v12z" />
            </Svg>
          </Pressable>
        )}
        <Text style={styles.playerName}>{name}</Text>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Pressable
          style={styles.button}
          onPress={() => {
            updatePoints(position, points - 1);
          }}
        >
          <Text style={styles.buttonText}>-</Text>
        </Pressable>
        <Text style={styles.points}>{points}</Text>
        <Pressable
          style={[
            styles.button,
            { backgroundColor: COLORS[data.palette].primary },
          ]}
          onPress={() => {
            updatePoints(position, points + 1);
          }}
        >
          <Text style={styles.buttonText}>+</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 5,
    backgroundColor: "lightgrey",
    width: "80%",
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 10,
  },
  deleteImage: {
    height: 25,
    width: 25,
    marginRight: 10,
  },
  deleting: {
    backgroundColor: "#f24438",
    paddingHorizontal: 10,
    paddingVertical: 3,
    marginRight: 5,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  deletingText: {
    color: "white",
    fontSize: 14,
  },
  playerName: {
    fontSize: 16,
  },
  button: {
    borderRadius: 50,
    width: 25,
    height: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
  },
  points: {
    marginHorizontal: 10,
  },
});

export default PointTracker;
