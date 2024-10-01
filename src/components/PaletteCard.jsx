import { Pressable, StyleSheet, Text, View } from "react-native";

const PaletteCard = ({
  name,
  id,
  primary,
  secondary,
  terciary,
  setPalette,
  selected,
}) => {
  return (
    <Pressable onPress={()=>{
        setPalette(id)
    }} style={[styles.card, { borderColor: primary }]}>
      <View style={[styles.option, { borderColor: primary }]}>
        {selected && <View style={[styles.selected]}></View>}
      </View>
      <View style={styles.row}>
        <View style={[styles.color, { backgroundColor: primary }]}></View>
        <View style={[styles.color, { backgroundColor: secondary }]}></View>
        <View style={[styles.color, { backgroundColor: terciary }]}></View>
      </View>
      <View style={[styles.nameContainer, { borderColor: primary }]}>
        <Text style={styles.name}>{name}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "gray",
    paddingHorizontal: 30,
    paddingVertical: 25,
    marginTop: 30,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  option: {
    borderWidth: 2,
    position: "absolute",
    left: -10,
    top: -10,
    backgroundColor: "white",
    width: 20,
    height: 20,
    borderRadius: 100,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  selected: {
    width: 10,
    height: 10,
    borderRadius: 100,
    backgroundColor: "black",
  },
  color: {
    borderRadius: 100,
    width: 30,
    height: 30,
  },
  nameContainer: {
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 3,
    backgroundColor: "white",
    position: "absolute",
    right: -25,
    bottom: -15,
  },
  name: {
    fontSize: 16,
  },
});

export default PaletteCard;
