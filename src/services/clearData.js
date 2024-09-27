import AsyncStorage from "@react-native-async-storage/async-storage";

const clearData = async () => {
    AsyncStorage.removeItem('data')
}

export default clearData