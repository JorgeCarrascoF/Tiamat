import { View, Image, StyleSheet, Text } from "react-native";
import { useContext } from "react";
import { Link } from "react-router-native";
import Svg from "react-native-svg";
import { COLORS } from "../utils/colors";
import { GamesContext } from "../navigation/Index";

const ToolCard = ({ name, image, url }) => {
  let { data } = useContext(GamesContext);

  return (
    <Link
      to={url}
      style={[
        styles.cardContainer,
        {
          borderColor:
            Object.keys(data).length > 0
              ? COLORS[data.palette].primary
              : COLORS[0].primary,
        },
      ]}
      underlayColor={'transparent'}
    >
      <>
        <Text
          style={[
            styles.cardText,
            {
              backgroundColor:
                Object.keys(data).length > 0
                  ? COLORS[data.palette].primary
                  : COLORS[0].primary,
            },
          ]}
        >
          {name}
        </Text>
        <Svg
          xmlns="http://www.w3.org/2000/svg"
          style={styles.cardImage}
          fill={
            Object.keys(data).length > 0
              ? COLORS[data.palette].primary
              : COLORS[0].primary
          }
          viewBox="0 0 24 24"
        >
          {image}
        </Svg>
      </>
    </Link>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: "34%",
    height: 80,
    margin: 10,
    borderWidth: 2,
    borderRadius: 8,
    alignItems: "center",
  },
  cardImage: {
    width: "30%",
    aspectRatio: "1/1",
    borderRadius: 4,
  },
  cardText: {
    width: "101%",
    marginTop: -1,
    textAlign: "center",
    padding: 2,
    marginBottom: 7,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    color: "white",
    fontStyle: "italic",
    fontWeight: "bold",
  },
});

export default ToolCard;
