import { View, TextInput, Pressable, Image, StyleSheet } from "react-native";
import { COLORS } from "../utils/colors";

const FormInput = ({setField, triggerAction, loading}) => {
  return (
    <View style={styles.inputRow}>
      <TextInput
        style={styles.input}
        onChangeText={(e) => {
          setField(e);
        }}
      ></TextInput>
      <Pressable
        style={[
          styles.searchButton,
          { backgroundColor: loading ? "grey" : COLORS.primary },
        ]}
        onPress={() => {
          triggerAction();
        }}
      >
        <Image
          style={styles.searchIcon}
          source={require("../assets/img/search.png")}
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  inputRow: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  input: {
    width: "80%",
    borderRadius: 30,
    borderWidth: 2,
    borderColor: COLORS.primary,
    backgroundColor: COLORS.terciary,
    paddingHorizontal: 10,
  },
  searchButton: {
    paddingVertical: 7,
    paddingHorizontal: 15,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  searchIcon: {
    width: 20,
    height: 20,
  },
});

export default FormInput;
