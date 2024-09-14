import { useState } from "react";
import { StyleSheet, View, Image, Pressable, Text } from "react-native";
import { Link } from "react-router-native";

const PageBar = ({ deleteFunction, id, returnPage }) => {
  const [deleting, setDeleting] = useState(false);

  return (
    <View style={styles.row}>
      <Link to={returnPage} underlayColor={"transparent"} style={styles.link}>
        <Image
          style={styles.icon}
          source={require("../assets/img/arrow-left.png")}
        />
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
          <Image
            style={styles.icon}
            source={require("../assets/img/delete.png")}
          />
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
