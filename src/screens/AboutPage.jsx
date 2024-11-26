import { useContext } from "react";
import Constants from "expo-constants";
import { Linking, Pressable, StyleSheet, Text, View } from "react-native";
import { GamesContext } from "../navigation/Index";
import { COLORS } from "../utils/colors";

const AboutPage = () => {
  let { data } = useContext(GamesContext);

  const openGitHub = () => {
    Linking.openURL("https://github.com/JorgeCarrascoF").catch((err) =>
      console.error("Failed to open URL:", err)
    );
  };

  const openKofi = () => {
    Linking.openURL("https://ko-fi.com/jorgecarrascof").catch((err) =>
      console.error("Failed to open URL:", err)
    );
  };
  return (
    <View style={styles.container}>
      <Text
        style={[
          styles.title,
          { borderBottomColor: COLORS[data.palette].primary },
        ]}
      >
        About Tiamat
      </Text>
      <View style={styles.section}>
        <Text style={styles.text}>
          Tiamat is an app to help you manage your board games collection. You
          can add games and owners, as well as use some tools like dice rollers
          or team divisor to help you play and organize your games.
        </Text>
      </View>
      <View style={styles.section}>
        <Text
          style={[
            styles.subtitle,
            { borderBottomColor: COLORS[data.palette].primary },
          ]}
        >
          App functionalities
        </Text>
        <Text style={styles.text}>
          - Add games and owners to your collection
          {"\n"}- Keep track of scores
          {"\n"}- Roll dices
          {"\n"}- Divide players into teams
          {"\n"}- Determine first player
          {"\n"}- Keep track of scores
        </Text>
      </View>
      <View style={styles.section}>
        <Text
          style={[
            styles.subtitle,
            { borderBottomColor: COLORS[data.palette].primary },
          ]}
        >
          About the author
        </Text>
        <Text style={styles.text}>
          Hi! My name is Jorge and I'm a software developer. I created this app
          to help me manage my board games collection and to practice my React
          Native skills. If you have any feedback or suggestions, feel free to
          contact me via GitHub.
        </Text>
        <Pressable
          onPress={openGitHub}
          style={[
            styles.button,
            { backgroundColor: COLORS[data.palette].primary },
          ]}
        >
          <Text style={styles.buttonText}>Go to GitHub</Text>
        </Pressable>
      </View>
      <View style={styles.section}>
        <Text
          style={[
            styles.subtitle,
            { borderBottomColor: COLORS[data.palette].primary },
          ]}
        >
          Support the app
        </Text>
        <Text style={styles.text}>
          Enjoying the app? Find it useful? As a student, I'm always looking for
          ways to support my studies and projects. If you want to support me,
          you can buy me a coffee. Thank you!
        </Text>
        <Pressable
          style={[
            styles.button,
            { backgroundColor: COLORS[data.palette].primary },
          ]}
          onPress={openKofi}
        >
          <Text style={styles.buttonText}>Support me in Kofi</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    alignItems: "center",
    alignSelf: "center",
    // marginTop: Constants.statusBarHeight,
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
    marginTop: 15,
  },
  subtitle: {
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "left",
    width: "60%",
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    marginHorizontal: 20,
    paddingVertical: 3,

    borderBottomWidth: 1,
    marginTop: 10,
  },
  section: {
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
  },
  text: {
    marginTop: 10,
    fontSize: 16,
    width: "90%",
    textAlign: "justify",
  },
  button: {
    padding: 10,
    borderRadius: 5,
    marginTop: 15,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default AboutPage;
