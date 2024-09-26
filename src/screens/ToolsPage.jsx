import { View, Text, StyleSheet, Image } from "react-native";
import { COLORS } from "../utils/colors";
import { Link } from "react-router-native";

const tools = [
  {
    title: "Teams",
    url: "/tools/teams",
    image: require("../assets/img/tools/team.png"),
  },
  {
    title: "Dice",
    url: "/tools/rolldice",
    image: require("../assets/img/tools/dice.png"),
  },
  {
    title: "First turn",
    url: "/tools/turns",
    image: require("../assets/img/tools/turn.png"),
  },
  {
    title: "Points",
    url: "/tools/points",
    image: require("../assets/img/tools/points.png"),
  },
];

const ToolsPage = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tools</Text>
      <View style={styles.toolsContainer}>
        {tools.map((tool) => (
          <Link style={styles.link} key={tool.title} underlayColor={"transparent"} to={tool.url}>
            <View style={styles.linkContainer}>
              <Image style={styles.linkImage} source={tool.image} />
              <Text style={styles.linkTitle}>{tool.title}</Text>
            </View>
          </Link>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    width: "100%",
    height: "100%",
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "left",
    paddingHorizontal: 10,
    marginHorizontal: 20,
    paddingVertical: 3,
    borderBottomColor: COLORS.primary,
    borderBottomWidth: 1,
    marginVertical: 15,
  },
  toolsContainer: {
    width: "100%",
    alignItems: "center",
    gap: 30,
    marginTop: 20,
  },
  linkContainer: {
    alignItems: "center",
  },
  linkImage: {
    width: 110,
    height: 110,
  },
  linkTitle: {
    fontSize: 18,
    marginTop: 3
  }
});

export default ToolsPage;
