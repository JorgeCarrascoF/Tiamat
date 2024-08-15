import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { COLORS } from "../utils/colors";

const OwnerCard = ({ owner, selectedOwner, setOwner }) => {
  return (
    <Pressable
      style={styles.card}
      onPress={() => {
        if (selectedOwner === owner.id) {
          setOwner("");
        } else {
          setOwner(owner.id);
        }
      }}
    >
      <View
        style={[
          styles.imageContainer,
          {
            borderColor:
              selectedOwner === owner.id ? COLORS.primary : COLORS.terciary,
          },
        ]}
      >
        <Image source={owner.image} style={styles.image}></Image>
      </View>
      <Text
        style={[
          styles.text,
          {
            backgroundColor:
              selectedOwner === owner.id ? COLORS.primary : COLORS.terciary,
          },
        ]}
      >
        {owner.name}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    alignItems: "center",
  },
  imageContainer: {
    borderWidth: 5,
    borderRadius: 100,
    overflow: "hidden",
  },
  image: {
    height: 100,
    width: 100,
  },
  text: {
    fontSize: 18,
    marginTop: -15,
    borderRadius: 15,
    paddingVertical: 2,
    paddingHorizontal: 15,
    color: "white",
    fontWeight: "bold",
  },
});

export default OwnerCard;
