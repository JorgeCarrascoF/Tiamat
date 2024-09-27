import { View, Text,  StyleSheet} from "react-native"
import { COLORS } from "../utils/colors"
import { Link } from "react-router-native"

const links = [
    {
        title: 'Manage data',
        url: '/settings/data'
    },
    {
        title: 'Change palette',
        url: '/settings/palette'
    },
    {
        title: 'About the app',
        url: '/settings/about'
    },


]

const SettingsPage = () => {

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Settings</Text>
            <View style={styles.linksContainer}>
                {links.map((link, index) => (
                    <Link to={link.url} style={styles.link} key={index}>
                        <Text style={styles.linkText}>{link.title}</Text>
                    </Link>
                ))}
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
        flexDirection:  'column'
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
    linksContainer: {
        marginTop: 10,
        height: '80%',
        flexDirection: 'column',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },  
    link: {
        backgroundColor: COLORS.primary,
        paddingHorizontal: 12,
        paddingVertical: 10,
        borderRadius: 10
    },
    linkText: {
        color: 'white',
        fontSize: 16
    }

})

export default SettingsPage;