import { StyleSheet, View, Image, Text } from "react-native";
import { COLORS } from "../utils/colors";

const SearchedGameInfoCard = ({ data }) => {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text numberOfLines={1} style={styles.title}>{data.name}</Text>
      </View>
      <Image style={styles.image} source={{ uri: data.image }}></Image>
      {/* <Text>
        {data.minPlayers} - {data.maxPlayers} players
      </Text> */}
      <Text style={styles.description} numberOfLines={7}>
        {data.description}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    width: "95%",
    borderWidth: 2,
    borderColor: COLORS.primary,
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    paddingHorizontal: 15,
    color: "white",
    textAlign: "center",
  },
  titleContainer: {
    margin: -1,
    marginBottom: 5,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderWidth: 2,
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primary,
  },
  image: {
    alignSelf: "center",
    width: 120,
    height: 120,
    marginTop: 5,
    borderRadius: 5,
  },
  description: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    textAlign: "justify",
  },
});

export default SearchedGameInfoCard;
