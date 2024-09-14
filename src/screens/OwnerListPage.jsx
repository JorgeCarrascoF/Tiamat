import { useContext, useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet, Image } from "react-native";
import { GamesContext } from "../navigation/Index";

import OwnerListCard from "../components/OwnerListCard";
import { COLORS } from "../utils/colors";
import { Link } from "react-router-native";

const OwnerListPage = () => {
  const { data } = useContext(GamesContext);

  const [owners, setOwners] = useState([]);

  useEffect(() => {
    if (data.players) {
      setOwners(data.players);
    }
  }, [data]);

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Owners</Text>
        <View style={styles.ownerList}>
          {owners.map((own) => (
            <OwnerListCard owner={own} key={own.id}></OwnerListCard>
          ))}
        </View>
      </ScrollView>
      <Link to={"/newowner"} style={styles.link}>
        <Image
          source={require("../assets/img/plus.png")}
          style={styles.linkImage}
        />
      </Link>
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
  ownerList: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  link: {
    position: "absolute",
    borderRadius: 50,
    right: 10,
    bottom: 70,
    backgroundColor: COLORS.primary,
    borderColor: "white",
    borderWidth: 2,
  },
  linkImage: {
    width: 50,
    height: 50,
  },
});

export default OwnerListPage;
