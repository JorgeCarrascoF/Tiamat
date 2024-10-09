import { StyleSheet } from "react-native";
import { Text, View } from "react-native";
import { COLORS } from "../utils/colors";
import PaletteCard from "../components/PaletteCard";
import { useContext } from "react";
import { GamesContext } from "../navigation/Index";
import saveData from "../services/saveData";

const PalettePage = () => {
  let { data, setData } = useContext(GamesContext);

  const setPalette = async (id) => {
    let newData = { ...data, palette: id };
    await saveData(newData);
    setData(newData);
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.title, {    borderBottomColor: COLORS[data.palette].primary,}]}>Change color palette</Text>
      <View style={styles.palettes}>
        {COLORS.map((palette, index) => (
          <PaletteCard
            name={palette.name}
            key={index}
            primary={palette.primary}
            secondary={palette.secondary}
            terciary={palette.terciary}
            id={index}
            setPalette={setPalette}
            selected={data.palette === index}
          />
        ))}
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

    borderBottomWidth: 1,
    marginTop: 10,
  },
  palettes: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-evenly",
    height: "80%",
  },
});

export default PalettePage;
