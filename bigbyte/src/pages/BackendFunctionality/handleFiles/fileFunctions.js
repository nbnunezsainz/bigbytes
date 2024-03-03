import * as Constants from "../databaseConstants.js"
import { getFirebaseConfig } from "../firebaseConfiguration.js";
const { initializeApp } = require("firebase/app");
const { getFirestore } = require("firebase/firestore");
const {  getStorage, ref, uploadBytes, getDownloadURL} = require("firebase/storage");


//Initialize Firebase and storage
const firebaseConfig = getFirebaseConfig();
initializeApp(firebaseConfig)
const storage = getStorage();

//takes resumeFile as a file object from front end and uploads it to database and converts filename to userAuthID to associate user to their resume
export async function addResume(resumeFile, userAuthID)
{
    if (resumeFile == null)
    {
        console.log("NO RESUME ATTATCHED");
        return;
    }

    try
    {
        let pathName = Constants.STORAGE_RESUME + userAuthID;
        const resumeRef = ref(storage, pathName);
        uploadBytes(resumeRef, resumeFile);
        console.log("SUCCESFULLY UPLOADED FILE IN BACKEND");

    } catch(error)
    {
        console.log("ERROR WHEN PROCESSING FILE");
        console.log(error);
        throw error;
    }
}

export async function viewResume(userAuthID)
{
    try {
        let pathName = Constants.STORAGE_RESUME + userAuthID;
        const URL = getDownloadURL(ref(storage, pathName));
        console.log("SUCCESFULLY OPENED FILE IN BACKEND");
        return URL;
    } catch(error)
    {
        console.log("ERROR IN BACKEND TO FIND FILE");
        console.log(error);
        throw error;
    }
}