import { StyleSheet } from "react-native";
import { Text, View } from "react-native";
import { COLORS } from "../utils/colors";
import PaletteCard from "../components/PaletteCard";

const PalettePage = () => {

    const setPalette = (id) => {
        console.log('palette chosen ', id)

    }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Change color palette</Text>
      <View style={styles.palettes}>
        <PaletteCard
          name={"Waving Blue"}
          id={0}
          primary={COLORS.primary}
          secondary={COLORS.secondary}
          terciary={COLORS.terciary}
          setPalette={setPalette}
          selected={true}
        />
        <PaletteCard
          name={"Red String"}
          primary={"#e25858"}
          secondary={"#ed8080"}
          terciary={"#e8aeae"}
          id={1}
          setPalette={setPalette}
          selected={false}
        />
        <PaletteCard
          name={"Green Leaf"}
          primary={"#58e276"}
          secondary={"#80ed9c"}
          terciary={"#aee8c3"}
          id={2}
          setPalette={setPalette}
          selected={false}
        />
        <PaletteCard
          name={"Bewitched"}
          primary={"#8a58e2"}
          secondary={"#a680ed"}
          terciary={"#c0aee8"}
          id={3}
          setPalette={setPalette}
          selected={false}
        />
        <PaletteCard
          name={"Coral Riff"}
          primary={"#e258a9"}
          secondary={"#ed80c3"}
          terciary={"#e8aed3"}
          id={4}
          setPalette={setPalette}
          selected={false}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    marginTop: 20,
    flexDirection: "column",
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "left",
    width: "90%",
    paddingHorizontal: 10,
    marginHorizontal: 20,
    paddingVertical: 3,
    borderBottomColor: COLORS.primary,
    borderBottomWidth: 1,
    marginTop: 10,
  },
  palettes: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: 'space-evenly',
    height: '80%'
  },
});

export default PalettePage;
