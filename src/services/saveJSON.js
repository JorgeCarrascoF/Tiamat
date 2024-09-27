import * as FileSystem from 'expo-file-system'
import { StorageAccessFramework } from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library'
import * as Sharing from 'expo-sharing'
import * as Permissions from 'expo-permissions';


const saveJSON = async (jsonData) => {

    // const fileUri = `${FileSystem.documentDirectory}data.json`; // Ruta donde se guardará el archivo
    // try {
    //   await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(data), {
    //     encoding: FileSystem.EncodingType.UTF8,
    //   });
    //   console.log('Archivo guardado en:', fileUri);
    // } catch (error) {
    //   console.error('Error guardando el archivo:', error);
    // }

    // shareJSON()


    const jsonString = JSON.stringify(jsonData)

    // Solicita permisos para acceder al almacenamiento
    const permissions = await StorageAccessFramework.requestDirectoryPermissionsAsync();
    if (!permissions.granted) {
        return;
    }

    try {
        const fileURI = await StorageAccessFramework.createFileAsync(permissions.directoryUri, 'data.json', 'application/json')

        await FileSystem.writeAsStringAsync(fileURI, jsonString, {
            encoding: FileSystem.EncodingType.UTF8
        })
    } catch (e) {
        console.log(e);
    }
}


const shareJSON = async () => {
    const fileUri = `${FileSystem.documentDirectory}data.json`; // Ruta del archivo que guardaste

    try {
        await Sharing.shareAsync(fileUri);
    } catch (error) {
        console.error('Error compartiendo el archivo:', error);
    }
}



export default saveJSON