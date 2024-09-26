import { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Pressable,
  TextInput,
} from "react-native";
import { GamesContext } from "../navigation/Index";
import { COLORS } from "../utils/colors";
import NumPlayerSelector from "../components/NumPlayerSelector";

const TeamDivisorPage = () => {
  const { data } = useContext(GamesContext);

  let orderedPlayers = data.players.sort((a, b) => {
    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;
    return 0;
  });

  const [players, setPlayers] = useState([]);
  const [textPlayers, setTextPlayers] = useState("");
  const [teams, setTeams] = useState(2);

  const [teamsCreated, setTeamsCreated] = useState(false);
  const [teamsList, setTeamsList] = useState([]);

  const createTeams = () => {
    setTeamsList([]);

    let allPlayers = [];

    players.map((player) => {
      let playerName = data.players.find((p) => p.id == player).name;
      allPlayers.push(playerName);
    });

    if (textPlayers.length > 0) {
      textPlayers.split(",").map((player) => {
        allPlayers.push(player.trim());
      });
    }

    let numberOfTeams = teams;

    if (allPlayers.length < numberOfTeams) {
      numberOfTeams = allPlayers.length;
    }

    let newTeamList = [];
    for (let i = 0; i < numberOfTeams; i++) {
      newTeamList.push([]);
    }
    let teamIndex = 0;

    while (allPlayers.length > 0) {
      let randomIndex = Math.floor(Math.random() * allPlayers.length);
      newTeamList[teamIndex].push(allPlayers[randomIndex]);
      teamIndex = (teamIndex + 1) % numberOfTeams;
      allPlayers.splice(randomIndex, 1);
    }

    setTeamsList(newTeamList);
    setTeamsCreated(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Team divisor</Text>
      {teamsCreated ? (
        <View style={styles.teamsCreatedView}>
          <View style={styles.teamsContainer}>
            <Text style={[styles.subtitle, { marginBottom: 10 }]}>Teams</Text>
            {teamsList.map((team, index) => (
              <View key={index} style={styles.team}>
                <Text style={styles.teamName}>Equipo {index + 1}</Text>
                {team.map((player, index) => {
                  return (
                    <Text key={index} style={styles.teamPlayer}>
                      {player}
                    </Text>
                  );
                })}
              </View>
            ))}
          </View>
          <View style={styles.buttonContainer}>
            <Pressable
              onPress={createTeams}
              style={[styles.button, { marginTop: 10 }]}
            >
              <Text style={styles.teamsButtonText}>Team again!</Text>
            </Pressable>
            <Pressable
              style={[
                styles.button,
                { marginTop: 10, backgroundColor: "#BEBEBE" },
              ]}
            >
              <Text
                onPress={() => {
                  setTeamsCreated(false);
                }}
                style={[styles.teamsButtonText]}
              >
                Back
              </Text>
            </Pressable>
          </View>
        </View>
      ) : (
        <>
          <Text style={styles.subtitle}>Players to add</Text>
          <View style={styles.playerSelector}>
            <View style={styles.selector}>
              <FlatList
                data={orderedPlayers}
                horizontal={true}
                renderItem={({ item }) => {
                  return (
                    <Pressable
                      onPress={() => {
                        if (players.includes(item.id)) {
                          let newPlayers = players.filter((p) => p != item.id);
                          setPlayers(newPlayers);
                        } else {
                          let newPlayers = [...players, item.id];
                          setPlayers(newPlayers);
                        }
                      }}
                      style={styles.selectorItem}
                    >
                      <Image
                        source={item.image}
                        style={[
                          styles.selectorItemImage,
                          {
                            borderColor: players.includes(item.id)
                              ? COLORS.primary
                              : COLORS.terciary,
                          },
                        ]}
                      />
                      <Text
                        style={[
                          styles.selectorItemText,
                          {
                            backgroundColor: players.includes(item.id)
                              ? COLORS.primary
                              : COLORS.terciary,
                          },
                        ]}
                      >
                        {item.name}
                      </Text>
                    </Pressable>
                  );
                }}
              />
            </View>
          </View>
          <Text style={[styles.subtitle, { marginLeft: -5, marginTop: 20 }]}>
            Occasional players
          </Text>
          <View style={styles.extraPlayers}>
            <Text style={{ fontStyle: "italic", marginLeft: 10 }}>
              Add occasional players sepparated by commas
            </Text>
            <TextInput
              onChangeText={(e) => {
                setTextPlayers(e);
              }}
              style={styles.extraPlayersInput}
              placeholder="Player1, Player2, Player3"
            />
          </View>
          <View style={styles.selected}>
            {players.map((player) => (
              <Pressable
                key={player}
                onPress={() => {
                  let newPlayers = players.filter((p) => p != player);
                  setPlayers(newPlayers);
                }}
                style={styles.selectedItem}
              >
                <Text style={styles.removeButton}>X</Text>
                <Text style={styles.selectedItemText}>
                  {data.players.find((p) => p.id == player).name}
                </Text>
              </Pressable>
            ))}
          </View>
          <View style={styles.teams}>
            <NumPlayerSelector
              numPlayers={teams}
              lowerLimit={2}
              upperLimit={8}
              setNumPlayers={setTeams}
              text={"Number of teams"}
            />
          </View>
          <Pressable
            onPress={createTeams}
            style={[styles.button, { marginTop: 30 }]}
          >
            <Text style={styles.teamsButtonText}>Team up!</Text>
          </Pressable>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    alignItems: "center",
    alignSelf: "center",
    marginTop: 20,
  },
  teamsCreatedView: {
    alignItems: "center",
    alignSelf: "center",
    marginTop: 20,
    height: "80%",
    position: "relative",
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "left",
    width: "90%",
    paddingHorizontal: 10,
    marginHorizontal: 20,
    paddingVertical: 3,
    borderBottomColor: COLORS.primary,
    borderBottomWidth: 1,
    marginTop: 15,
  },
  subtitle: {
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 10,
    textAlign: "left",
    width: "90%",
    paddingHorizontal: 25,
    marginHorizontal: 20,
    paddingVertical: 3,
  },
  selector: {
    margin: "auto",
    borderWidth: 2,
    borderRadius: 15,
    borderColor: COLORS.primary,
    maxHeight: 100,
    maxWidth: "80%",
    paddingVertical: 3,
  },
  selectorItem: {
    margin: 5,
  },
  selectorItemImage: {
    height: 70,
    width: 70,
    borderRadius: 100,
    borderWidth: 5,
  },
  selectorItemText: {
    fontSize: 14,
    textAlign: "center",
    marginTop: -15,
    borderRadius: 15,
    paddingVertical: 2,
    color: "white",
    fontWeight: "bold",
  },
  selected: {
    width: "90%",
    height: 250,
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 15,
  },
  selectedItem: {
    backgroundColor: COLORS.primary,
    paddingVertical: 3,
    paddingHorizontal: 15,
    marginHorizontal: 5,
    marginBottom: 5,
    borderRadius: 15,
  },
  selectedItemText: {
    color: "white",
    fontSize: 16,
  },
  removeButton: {
    fontSize: 12,
    color: "white",
    fontWeight: "bold",
    position: "absolute",
    right: -8,
    top: -6,
    backgroundColor: COLORS.terciary,
    padding: 2,
    paddingHorizontal: 6,
    borderRadius: 50,
  },
  extraPlayers: {
    width: "90%",
  },
  extraPlayersInput: {
    marginTop: 5,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: COLORS.primary,
    backgroundColor: COLORS.terciary,
    paddingHorizontal: 10,
  },
  teams: {
    marginTop: 10,
  },
  teamsButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 15,
    marginTop: 40,
  },
  teamsButtonText: {
    color: "white",
    fontSize: 18,
  },
  teamsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: "90%",
    gap: 10,
  },
  team: {
    width: "45%",
    borderWidth: 1,
    borderRadius: 15,
    borderColor: COLORS.primary,
    padding: 10,
  },
  teamName: {
    width: 100,
    paddingLeft: 10,
    fontSize: 16,
    fontWeight: "bold",
    borderBottomWidth: 1,
    color: COLORS.primary,
    borderColor: COLORS.primary,
    marginBottom: 10,
  },
  buttonContainer: {
    position: "absolute",
    width: "85%",
    bottom: -10,
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "center",
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 15,
  },
});

export default TeamDivisorPage;
