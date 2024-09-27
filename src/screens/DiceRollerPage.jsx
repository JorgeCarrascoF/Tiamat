import { View, Text, StyleSheet, Pressable, Image } from "react-native"
import { COLORS } from "../utils/colors";
import { useState } from "react";

const dices = [
    {
        faces: 4,
        image: require("../assets/img/dices/d4.png")
    },
    {
        faces: 6,
        image: require("../assets/img/dices/d6.png")
    },
    {
        faces: 8,
        image: require("../assets/img/dices/d8.png")
    },
    {
        faces: 10,
        image: require("../assets/img/dices/d10.png")
    },
    {
        faces: 12,
        image: require("../assets/img/dices/d12.png")
    },
    {
        faces: 20,
        image: require("../assets/img/dices/d20.png")
    },
]

const DiceRollerPage = () => {

    const [result, setResult] = useState([]);


    const rollDice = (max) => {
        let roll = Math.floor(Math.random() * max) + 1;
        let newResult = [];
        newResult.push(roll);
        setResult(newResult)
    }

    const rollTwoDice = (max) => {
        let firstRoll = Math.floor(Math.random() * max) + 1;
        let secondRoll = Math.floor(Math.random() * max) + 1;

        let newResult = [];
        newResult.push(firstRoll)
        newResult.push(secondRoll)
        setResult(newResult)
    }



    return (
        <View style={styles.container}>
            <Text style={styles.title}>Dice roller</Text>
            <Text style={styles.note}>Press for one dice, long press for two dice</Text>
            <View style={styles.diceContainer}>

                {dices.map(dice => (
                    <Pressable onPress={() => {
                        rollDice(dice.faces)
                    }}
                        onLongPress={() => {
                            rollTwoDice(dice.faces)
                        }}
                        style={({ pressed }) => [
                            pressed ? styles.buttonPressed : null
                        ]}
                    >

                        <Image style={styles.diceImage} source={dice.image} />
                    </Pressable>
                ))}
            </View>
            <View style={styles.result}>
                <Text style={styles.resultText}>Dice rolled: [ {result[0]}{result.length > 1 && ` , ${result[1]}`} ]</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        width: "100%",
        alignItems: "center",
        alignSelf: "center",
        marginTop: 20,
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
    note: {
        fontStyle: 'italic',
        marginTop:20
    },  
    diceImage: {
        height: 150,
        width: 150
    },
    diceContainer: {
        marginTop: 20,
        width: '80%',
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    result: {
        marginTop: 50,
        borderWidth: 2,
        borderColor: COLORS.primary,
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 4,
    },
    resultText: {
        fontSize: 24
    },
    buttonPressed: {
        opacity: 0.6,
        transform: [{scale: 0.98}]
    }

})

export default DiceRollerPage;