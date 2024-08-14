import { parseString } from "react-native-xml2js";

export const parseXML = async (xmlString) => {
  try {
    return new Promise((resolve, reject) => {
      parseString(xmlString, (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  } catch (err) {
    throw new Error("Error parsing XML: " + err.message);
  }
};
