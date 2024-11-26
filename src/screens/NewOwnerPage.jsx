import { View, Text, StyleSheet } from "react-native";
import { COLORS } from "../utils/colors";
import OwnerForm from "../components/OwnerForm";
import { useContext } from "react";
import { GamesContext } from "../navigation/Index";
import Constants from "expo-constants";

const NewOwnerPage = () => {
  let { data } = useContext(GamesContext);
  return (
    <View style={styles.container}>
      <Text
        style={[
          styles.title,
          {
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
    // marginTop: Constants.statusBarHeight,
    alignItems: "center",
    alignSelf: "center",
    paddingHorizontal: 20,
  },
  title: {
    alignSelf: "flex-start",
    width: "80%",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "left",
    paddingHorizontal: 10,
    marginHorizontal: 20,
    paddingVertical: 3,
    borderBottomWidth: 1,
    marginTop: 15,
    marginBottom: 15,
  },
});

export default NewOwnerPage;
