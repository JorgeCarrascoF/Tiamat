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
import Constants from "expo-constants";
import { GamesContext } from "../navigation/Index";
import { COLORS } from "../utils/colors";
import NumPlayerSelector from "../components/NumPlayerSelector";
import PlayerSelector from "../components/PlayerSelector";

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
      <Text style={[styles.title, { borderBottomColor: COLORS[data.palette].primary }]}>
        Team Divisor
      </Text>
      {teamsCreated ? (
        <View style={styles.teamsCreatedView}>
          <View style={styles.teamsContainer}>
            <Text style={[styles.subtitle, { marginBottom: 10 }]}>Teams</Text>
            {teamsList.map((team, index) => (
              <View
                key={index}
                style={[styles.team, { borderColor: COLORS[data.palette].primary }]}
              >
                <Text
                  style={[
                    styles.teamName,
                    { color: COLORS[data.palette].primary, borderColor: COLORS[data.palette].primary },
                  ]}
                >
                  Equipo {index + 1}
                </Text>
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
              style={[
                styles.button,
                { marginTop: 10, backgroundColor: COLORS[data.palette].primary },
              ]}
            >
              <Text style={styles.teamsButtonText}>Team again!</Text>
            </Pressable>
            <Pressable
              style={[
                styles.button,
                { marginTop: 10, backgroundColor: COLORS[data.palette].primary },
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
          <PlayerSelector
            orderedPlayers={orderedPlayers}
            setPlayers={setPlayers}
            players={players}
            textPlayers={textPlayers}
            setTextPlayers={setTextPlayers}
          />

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
            style={[
              styles.button,
              { marginTop: 30, backgroundColor: COLORS[data.palette].primary },
            ]}
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
    // marginTop: Constants.statusBarHeight,
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
  teams: {
    marginTop: 10,
  },
  teamsButton: {
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

    padding: 10,
  },
  teamName: {
    width: 100,
    paddingLeft: 10,
    fontSize: 16,
    fontWeight: "bold",
    borderBottomWidth: 1,

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
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 15,
  },
});

export default TeamDivisorPage;
