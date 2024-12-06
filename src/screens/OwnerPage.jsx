import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import PageBar from "../components/PageBar";
import { Link, useNavigate, useParams } from "react-router-native";
import { useContext } from "react";
import { GamesContext } from "../navigation/Index";
import saveData from "../services/saveData";
import { COLORS } from "../utils/colors";

const OwnerPage = () => {
  const id = useParams().id;
  const { data, setData } = useContext(GamesContext);

  const navigate = useNavigate();

  let owner = data.players.find((player) => player.id === id);

  let games = data.tabletopGames.filter((game) => game.owner === id);
  games = games.sort((a, b) => a.name.localeCompare(b.name));

  const deleteOwner = async (id) => {
    navigate("/owners");
    let newGames = data.tabletopGames.filter((game) => game.owner !== id);
    let newData = { ...data, tabletopGames: newGames };

    let newOwners = data.players.filter((player) => player.id !== id);
    newData = { ...newData, players: newOwners };

    await saveData(newData);
    setData(newData);
  };

  return (
    <View style={styles.container}>
      <PageBar
        deleteFunction={deleteOwner}
        id={owner.id}
        returnPage={"/owners"}
      />
      <View style={[styles.imageContainer, { borderColor: COLORS[data.palette].primary }]}>
        <Image style={styles.image} source={owner.image}></Image>
      </View>
      <Text style={[styles.ownerName, { backgroundColor: COLORS[data.palette].primary }]}>
        {owner.name}
      </Text>

      <Text style={[styles.text, { borderBottomColor: COLORS[data.palette].primary }]}>
        Games: {games.length}
      </Text>
      <ScrollView style={styles.gameList}>
        {games.map((game) => (
          <Link
            to={`/game/${game.id}`}
            underlayColor={"transparent"}
            style={[styles.gameItem, { backgroundColor: COLORS[data.palette].secondary }]}
            key={game.id}
          >
            <Text style={styles.gameItemText} numberOfLines={1}>
              {game.name}
            </Text>
          </Link>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    height: "100%",
    width: "100%",
    marginTop: 60,
    marginBottom: 50,
    marginHorizontal: 10,
  },
  imageContainer: {
    borderWidth: 5,
    borderRadius: 200,
    overflow: "hidden",
  },
  image: {
    width: 250,
    height: 250,
  },
  ownerName: {
    fontSize: 18,
    marginTop: -15,
    borderRadius: 15,
    paddingVertical: 2,
    paddingHorizontal: 15,

    fontWeight: "bold",
    color: "white",
  },
  text: {
    borderBottomWidth: 1,
    width: 300,
    textAlign: "left",
    paddingHorizontal: 10,
    paddingVertical: 3,
    marginTop: 20,
    marginBottom: 20,
  },
  gameList: {
    width: "90%",
    maxHeight: 350,
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  gameItem: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 15,
    marginVertical: 3,
  },
  gameItemText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default OwnerPage;
