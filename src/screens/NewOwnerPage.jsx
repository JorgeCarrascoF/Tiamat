import { View, Text, StyleSheet } from "react-native";
import { COLORS } from "../utils/colors";
import OwnerForm from "../components/OwnerForm";
import { useContext } from "react";
import { GamesContext } from "../navigation/Index";

const NewOwnerPage = () => {
  let { data } = useContext(GamesContext);
  return (
    <View style={styles.container}>
      <Text
        style={[
          styles.title,
          {
            color: COLORS[data.palette].primary,
            borderBottomColor: COLORS[data.palette].primary,
          },
        ]}
      >
        Add new owner
      </Text>
      <OwnerForm />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    padding: 20,
  },
  title: {
    alignSelf: "flex-start",
    width: "100%",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    paddingLeft: 5,

    borderBottomWidth: 2,
  },
});

export default NewOwnerPage;
