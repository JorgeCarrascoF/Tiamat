import { useContext, useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet, Pressable, TextInput } from "react-native"
import { GamesContext } from "../navigation/Index";
import { COLORS } from "../utils/colors";
import PlayerSelector from "../components/PlayerSelector";
import PointTracker from "../components/PointTracker";
import saveData from "../services/saveData";

const PointTrackerPage = () => {

    const { data, setData } = useContext(GamesContext)


    let orderedPlayers = data.players.sort((a, b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
    });


    const [players, setPlayers] = useState([])
    const [textPlayers, setTextPlayers] = useState("")

    const [allPlayers, setAllPlayers] = useState([]);
    const [addingPlayers, setAddingPlayers] = useState(true)

    const [newPlayer, setNewPlayer] = useState('');

    const [startingNewGame, setStartingNewGame] = useState(false);

    useEffect(() => {
        if (data.tools.points.length > 0) {
            setAddingPlayers(false)
            setAllPlayers(data.tools.points)
        }
    }, [])

    const startGame = () => {
        let newAllPlayers = [];

        players.map((player) => {
            let playerName = data.players.find((p) => p.id == player).name;
            newAllPlayers.push(playerName);
        });
        if (textPlayers.length > 0) {
            textPlayers.split(",").map((player) => {
                newAllPlayers.push(player.trim());
            });
        }

        if (newAllPlayers.length > 0) {
            let playersObjects = newAllPlayers.map((player, index) => {
                return {
                    name: player,
                    id: player + index,
                    position: index,
                    points: 0
                }
            })
            setAllPlayers(playersObjects)
            setAddingPlayers(false);

            let newData = { ...data };
            newData.tools.points = playersObjects;
            setData(newData)
            saveData(newData)
        }

    }

    const updatePoints = (position, points) => {
        let newPlayers = [...allPlayers]
        newPlayers[position].points = points;
        setAllPlayers(newPlayers);

        let newData = { ...data };
        newData.tools.points = newPlayers;
        setData(newData);
        saveData(newData)
    }

    const addNewPlayer = () => {
        let newPlayers = [...allPlayers];
        let player = { id: newPlayer + allPlayers.length, position: allPlayers.length, name: newPlayer, points: 0 }
        newPlayers.push(player)

        setAllPlayers(newPlayers)
    }

    const deletePlayer = (id) => {
        let newPlayers = allPlayers.filter(p => p.id !== id);
        setAllPlayers(newPlayers)

        let newData = { ...data };
        newData.tools.points = newPlayers;
        setData(newData)
        saveData(newData)
    }

    const startNewGame = () => {
        let newPlayers = [...allPlayers];
        newPlayers = [];
        setAllPlayers(newPlayers);
        setAddingPlayers(true)

        let newData = { ...data }
        newData.tools.points = []
        setData(newData)
        saveData(newData)

        setPlayers([])
        setTextPlayers('')
        setNewPlayer('')
    }

    return (
        <View style={styles.container} >
            <Text style={styles.title}>Point Tracker</Text>
            {addingPlayers ? <View style={styles.playersContainer}>
                <PlayerSelector orderedPlayers={orderedPlayers} players={players} setPlayers={setPlayers} textPlayers={textPlayers} setTextPlayers={setTextPlayers} />
                <Pressable onPress={startGame} style={[styles.button, players.length == 0 && textPlayers == '' && { backgroundColor: 'grey' }]}
                >
                    <Text style={styles.buttonText}>Start game</Text>
                </Pressable>
            </View> : <>
                <ScrollView style={styles.pointTrackersContainer} contentContainerStyle={{ alignItems: 'center' }}>
                    {allPlayers.map(player => (
                        <PointTracker key={player.id} name={player.name} id={player.id} points={player.points} position={player.position} updatePoints={updatePoints} deletePlayer={deletePlayer} />
                    ))}
                    <View style={styles.newPlayer}>
                        <TextInput style={styles.newPlayerInput} onChangeText={(e) => {
                            setNewPlayer(e)
                        }} placeholder="Add player"></TextInput>
                        <Pressable style={styles.newPlayerButton} onPress={() => {
                            if (newPlayer != '') {
                                addNewPlayer();
                            }
                        }}>
                            <Text style={styles.newPlayerButtonText}>+</Text>
                        </Pressable>
                    </View>
                </ScrollView>

                <Pressable style={[styles.button, { bottom: 75, right: 20 }, startingNewGame && { backgroundColor: 'red' }]} onPress={() => {
                    if (!startingNewGame) {
                        setStartingNewGame(true)
                    } else {
                        setStartingNewGame(false)
                        startNewGame();
                    }
                }}>
                    <Text style={[styles.buttonText, { fontSize: 16 }]}>{startingNewGame ? 'Are you sure?' : 'New Game'}</Text>
                </Pressable>

            </>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        width: "100%",
        marginTop: 10,
    },
    row: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
        borderWidth: 1,
        position: 'absolute',
        bottom: 80
    },
    playersContainer: {
        height: '100%',
        width: '100%',
        alignItems: 'center',
        position: 'relative'
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
    button: {
        backgroundColor: COLORS.primary,
        paddingVertical: 10,
        paddingHorizontal: 18,
        borderRadius: 15,
        position: 'absolute',
        bottom: 150
    },
    buttonText: {
        color: "white",
        fontSize: 18,
    },
    pointTrackersContainer: {
        marginTop: 20,
        maxHeight: '75%',
    },
    newPlayer: {
        width: '80%',
        marginTop: 10,
        paddingHorizontal: 10,
        borderRadius: 10,
        paddingVertical: 4,
        flexDirection: 'row',
        borderWidth: 2,
        borderColor: COLORS.primary,
        justifyContent: 'space-between'
    },
    newPlayerInput: {
        width: '90%'
    },
    newPlayerButton: {
        backgroundColor: COLORS.primary,
        borderRadius: 50,
        width: 25,
        height: 25,
        alignItems: 'center',
        justifyContent: 'center'
    },
    newPlayerButtonText: {
        color: 'white'
    }
})

export default PointTrackerPage;