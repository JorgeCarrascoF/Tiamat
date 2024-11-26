import { View, Text, StyleSheet, Image } from "react-native";
import { COLORS } from "../utils/colors";
import { Link } from "react-router-native";
import { useContext } from "react";
import { GamesContext } from "../navigation/Index";
import Svg, { Path } from "react-native-svg";
import Constants from "expo-constants";

const tools = [
  {
    title: "Teams",
    url: "/tools/teams",
    image: (
      <Path d="M6.2 2.44l11.9 11.9 2.12-2.12 1.41 1.41-2.47 2.47 3.18 3.18c.39.39.39 1.02 0 1.41l-.71.71a.996.996 0 01-1.41 0L17 18.23l-2.44 2.47-1.41-1.41 2.12-2.12-11.9-11.9V2.44H6.2M15.89 10l4.74-4.74V2.44H17.8l-4.74 4.74L15.89 10m-4.95 5l-2.83-2.87-2.21 2.21-2.12-2.12-1.41 1.41 2.47 2.47-3.18 3.19a.996.996 0 000 1.41l.71.71c.39.39 1.02.39 1.41 0L7 18.23l2.44 2.47 1.41-1.41-2.12-2.12L10.94 15z" />
    ),
  },
  {
    title: "Dice",
    url: "/tools/rolldice",
    image: (
      <Path d="M20.47 6.62l-7.9-4.44C12.41 2.06 12.21 2 12 2s-.41.06-.57.18l-7.9 4.44c-.32.17-.53.5-.53.88v9c0 .38.21.71.53.88l7.9 4.44c.16.12.36.18.57.18s.41-.06.57-.18l7.9-4.44c.32-.17.53-.5.53-.88v-9c0-.38-.21-.71-.53-.88m-9.02 9.34l-5.14-.03v-1.02s3.43-3.33 3.44-4.34c0-1.24-1.02-1.11-1.02-1.11s-.98.04-1.09 1.25l-1.5.05s.04-2.5 2.69-2.5c2.37 0 2.4 1.78 2.4 2.24 0 1.68-3.08 4.27-3.08 4.27l3.3-.01v1.2m6.05-2.46c0 1.4-1.15 2.55-2.57 2.55-1.43 0-2.57-1.15-2.57-2.55v-2.66c0-1.42 1.14-2.57 2.57-2.57s2.57 1.15 2.57 2.57v2.66M16 10.77v2.76c0 .59-.5 1.07-1.08 1.07-.58 0-1.06-.48-1.06-1.07v-2.76c0-.59.48-1.06 1.06-1.06.58 0 1.08.47 1.08 1.06z" />
    ),
  },
  {
    title: "First turn",
    url: "/tools/turns",
    image: (
      <Path d="M5 1c0 2.7 1.56 5.16 4 6.32V22h2v-7h2v7h2V7.31C17.44 6.16 19 3.7 19 1h-2a5 5 0 01-5 5 5 5 0 01-5-5m5 0c-1.11 0-2 .89-2 2 0 1.11.89 2 2 2 1.11 0 2-.89 2-2 0-1.11-.89-2-2-2z" />
    ),
  },
  {
    title: "Points",
    url: "/tools/points",
    image: (
      <Path d="M18 2c-.9 0-2 1-2 2H8c0-1-1.1-2-2-2H2v9c0 1 1 2 2 2h2.2c.4 2 1.7 3.7 4.8 4v2.08C8 19.54 8 22 8 22h8s0-2.46-3-2.92V17c3.1-.3 4.4-2 4.8-4H20c1 0 2-1 2-2V2h-4M6 11H4V4h2v7m14 0h-2V4h2v7z" />
    ),
  },
];

const ToolsPage = () => {
  let { data } = useContext(GamesContext);
  return (
    <View style={styles.container}>
      <Text
        style={[
          styles.title,
          { borderBottomColor: COLORS[data.palette].primary },
        ]}
      >
        Tools
      </Text>
      <View style={styles.toolsContainer}>
        {tools.map((tool) => (
          <Link
            style={styles.link}
            key={tool.title}
            underlayColor={"transparent"}
            to={tool.url}
          >
            <View style={styles.linkContainer}>
              <Svg
                xmlns="http://www.w3.org/2000/svg"
                style={styles.linkImage}
                fill={COLORS[data.palette].primary}
                viewBox="0 0 24 24"
              >
                {tool.image}
              </Svg>
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
    // marginTop: Constants.statusBarHeight,
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
    marginTop: 3,
  },
});

export default ToolsPage;
