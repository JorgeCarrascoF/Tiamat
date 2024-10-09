import { StyleSheet, View, Text, Image } from "react-native";
import { COLORS } from "../utils/colors";
import { Link } from "react-router-native";
import { useContext } from "react";
import { GamesContext } from "../navigation/Index";

const OwnerListCard = ({ owner }) => {
  let {data} = useContext(GamesContext)
  return (
    <View style={styles.container}>
      <Link
        style={styles.link}
        to={`/owner/${owner.id}`}
        underlayColor={"transparent"}
      >
        <View style={styles.linkContainer}>
          <View
            style={[styles.imageContainer, { borderColor: COLORS[data.palette].primary }]}
          >
            <Image style={styles.image} source={owner.image} />
          </View>
          <Text style={[styles.text, { backgroundColor: COLORS[data.palette].primary }]}>
            {owner.name}
          </Text>
        </View>
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { width: "33%", marginBottom: 15 },
  link: { borderRadius: 250 },
  linkContainer: {
    alignItems: "center",
  },
  imageContainer: {
    borderWidth: 5,

    borderRadius: 100,
    overflow: "hidden",
  },
  image: {
    width: 100,
    height: 100,
  },
  text: {
    fontSize: 18,
    marginTop: -15,
    borderRadius: 15,
    paddingVertical: 2,
    paddingHorizontal: 15,
    fontWeight: "bold",
    color: "white",
  },
});

export default OwnerListCard;
