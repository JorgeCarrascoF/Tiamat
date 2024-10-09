import { Image, StyleSheet, View, Text } from "react-native";
import { COLORS } from "../utils/colors";
import { Link } from "react-router-native";
import { useContext } from "react";
import { GamesContext } from "../navigation/Index";

const GameOwnerLink = ({ owner }) => {
  let { data } = useContext(GamesContext);

  return (
    <Link
      to={`/owner/${owner.id}`}
      underlayColor={"transparent"}
      style={styles.container}
    >
      <View>
        <View
          style={[
            styles.imageContainer,
            {
              borderColor: COLORS[data.palette].primary,
            },
          ]}
        >
          <Image source={owner.image} style={styles.image}></Image>
        </View>
        <Text
          style={[
            styles.text,
            { backgroundColor: COLORS[data.palette].primary },
          ]}
        >
          {owner.name}
        </Text>
      </View>
    </Link>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    position: "absolute",
    bottom: 80,
  },
  imageContainer: {
    borderWidth: 5,
    borderRadius: 100,
    overflow: "hidden",
  },
  image: {
    height: 80,
    width: 80,
  },
  text: {
    fontSize: 16,
    textAlign: "center",
    marginTop: -15,
    borderRadius: 15,
    paddingVertical: 2,
    paddingHorizontal: 15,
    color: "white",
    fontWeight: "bold",
  },
});

export default GameOwnerLink;
