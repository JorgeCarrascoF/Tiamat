import * as FileSystem from 'expo-file-system';
import * as DocumentPicker from 'expo-document-picker';

const importJSON = async () => {
    try {
        // Abre el selector de documentos para que el usuario elija un archivo JSON
        const result = await DocumentPicker.getDocumentAsync({
            type: 'application/json', // Solo muestra archivos JSON
        });

    
        if (result.canceled !== 'false') {
            // Leer el contenido del archivo seleccionado
            const fileUri = result.assets[0].uri;
            const fileContent = await FileSystem.readAsStringAsync(fileUri);

            // Convertir el contenido de JSON a objeto
            const jsonData = JSON.parse(fileContent);
            
            return jsonData;
            
        } else {
            console.log('No se seleccionó ningún archivo');
            return
        }
    } catch (error) {
        return
    }

}

export default importJSON