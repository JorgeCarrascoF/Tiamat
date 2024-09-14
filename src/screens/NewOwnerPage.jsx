import { View, Text, StyleSheet } from "react-native";
import { COLORS } from "../utils/colors";
import OwnerForm from "../components/OwnerForm";

const NewOwnerPage = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add new owner</Text>
      <OwnerForm/>
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
    color: COLORS.primary,
    borderBottomWidth: 2,
    borderBottomColor: COLORS.primary,
  },

});

export default NewOwnerPage;
