import { Image, Pressable, StyleSheet, Text, View } from "react-native"
import { COLORS } from "../utils/colors";
import { useState } from "react";


const PointTracker = ({ name, id, points, position, updatePoints, deletePlayer }) => {

    const [deleting, setDeleting] = useState(false);

    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {deleting ?
                    <Pressable style={styles.deleting} onPress={() => {
                        setDeleting(false);
                        deletePlayer(id)
                    }}>
                        <Text style={styles.deletingText}>Delete?</Text>
                    </Pressable>
                    :
                    <Pressable onPress={() => { setDeleting(true) }}>
                        <Image style={styles.deleteImage} source={require('../assets/img/delete.png')} />
                    </Pressable>}
                <Text style={styles.playerName}>{name}</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Pressable style={styles.button} onPress={() => {
                    updatePoints(position, points - 1)
                }}>
                    <Text style={styles.buttonText}>-</Text>
                </Pressable >
                <Text style={styles.points}>{points}</Text>
                <Pressable style={styles.button} onPress={() => {
                    updatePoints(position, points + 1)
                }}>
                    <Text style={styles.buttonText}>+</Text>
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 5,
        backgroundColor: 'lightgrey',
        width: '80%',
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderRadius: 10,
    },
    deleteImage: {
        height: 25,
        width: 25,
        marginRight: 10,
    },
    deleting: {
        backgroundColor: "#f24438",
        paddingHorizontal: 10,
        paddingVertical: 3,
        marginRight: 5,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
    },
    deletingText: {
        color: "white",
        fontSize: 14,
    },
    playerName: {
        fontSize: 16
    },
    button: {
        backgroundColor: COLORS.primary,
        borderRadius: 50,
        width: 25,
        height: 25,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        color: 'white'
    },
    points: {
        marginHorizontal: 10
    },

})

export default PointTracker;