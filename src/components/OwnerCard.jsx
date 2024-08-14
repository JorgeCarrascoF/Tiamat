import { Image, StyleSheet, Text, View } from "react-native";
import { COLORS } from "../utils/colors";

const OwnerCard = ({ owner }) => {
  return (
    <View style={styles.card}>
      <Image source={owner.image} style={styles.image}></Image>
      <Text style={styles.text}>{owner.name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    alignItems: "center",
  },
  image: {
    borderWidth: 5,
    borderColor: COLORS.primary,
    height: 100,
    width: 100,
    borderRadius: 50,
  },
  text: {
    backgroundColor: COLORS.primary,
    fontSize: 18,
    marginTop: -10,
    borderRadius: 15,
    paddingVertical: 2,
    paddingHorizontal: 15,
    color: "white",
    fontWeight: "bold",
  },
});

export default OwnerCard;
