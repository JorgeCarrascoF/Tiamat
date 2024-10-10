import { useState, useContext } from "react";
import { StyleSheet, View, Image, Pressable, Text } from "react-native";
import { Link } from "react-router-native";
import Svg, { Path } from "react-native-svg";
import { COLORS } from "../utils/colors";
import { GamesContext } from "../navigation/Index";

const PageBar = ({ deleteFunction, id, returnPage }) => {
  let { data } = useContext(GamesContext);
  const [deleting, setDeleting] = useState(false);

  return (
    <View style={styles.row}>
      <Link to={returnPage} underlayColor={"transparent"} style={styles.link}>
        <Svg
          xmlns="http://www.w3.org/2000/svg"
          style={styles.icon}
          fill={COLORS[data.palette].primary}
          viewBox="0 0 24 24"
        >
          <Path d="M20 9v6h-8v4.84L4.16 12 12 4.16V9h8z" />
        </Svg>
      </Link>

      {deleting ? (
        <Pressable
          style={styles.deleting}
          onPress={() => {
            setDeleting(false);
            deleteFunction(id);
          }}
        >
          <Text style={styles.deletingText}>Delete?</Text>
        </Pressable>
      ) : (
        <Pressable
          onPress={() => {
            setDeleting(true);
          }}
        >
          <Svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            style={styles.icon}
            fill={COLORS[data.palette].primary}
          >
            <Path d="M19 4h-3.5l-1-1h-5l-1 1H5v2h14M6 19a2 2 0 002 2h8a2 2 0 002-2V7H6v12z" />
          </Svg>
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    width: "100%",
    paddingHorizontal: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  icon: {
    width: 35,
    height: 35,
  },
  deleting: {
    backgroundColor: "#f24438",
    paddingHorizontal: 12,
    paddingVertical: 5,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  deletingText: {
    color: "white",
    fontSize: 14,
  },
});

export default PageBar;
