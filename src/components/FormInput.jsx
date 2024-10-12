import { View, TextInput, Pressable, Image, StyleSheet } from "react-native";
import { COLORS } from "../utils/colors";
import { useContext } from "react";
import { GamesContext } from "../navigation/Index";
import Svg, { Path } from "react-native-svg";

const FormInput = ({ setField, triggerAction, loading }) => {
  let { data } = useContext(GamesContext);

  return (
    <View style={styles.inputRow}>
      <TextInput
        style={[
          styles.input,
          {
            borderColor: COLORS[data.palette].primary,
            backgroundColor: COLORS[data.palette].terciary,
          },
        ]}
        onChangeText={(e) => {
          setField(e);
        }}
        onSubmitEditing={triggerAction}
      ></TextInput>
      <Pressable
        style={[
          styles.searchButton,
          { backgroundColor: loading ? "grey" : COLORS[data.palette].primary },
        ]}
        onPress={() => {
          triggerAction();
        }}
      >
        <Svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 22 22"
          style={styles.searchIcon}
          fill={'#FFFFFF'}
        >
          <Path d="M9.5 3A6.5 6.5 0 0116 9.5c0 1.61-.59 3.09-1.56 4.23l.27.27h.79l5 5-1.5 1.5-5-5v-.79l-.27-.27A6.516 6.516 0 019.5 16 6.5 6.5 0 013 9.5 6.5 6.5 0 019.5 3m0 2C7 5 5 7 5 9.5S7 14 9.5 14 14 12 14 9.5 12 5 9.5 5z" />
        </Svg>
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
