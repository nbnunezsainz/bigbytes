import * as Constants from "../../databaseConstants.js"
import { getFirebaseConfig } from "../../firebaseConfiguration.js";
import { queryCollection, deleteDocument, getDocument } from "../generalDataFunctions.js";
const { initializeApp } = require("firebase/app");
const { getFirestore, collection, getDocs, getDoc, setDoc, addDoc, doc, deleteDoc, onSnapshot, query, where } = require("firebase/firestore");

//Initialize Firebase
const firebaseConfig = getFirebaseConfig();
initializeApp(firebaseConfig)

const db = getFirestore()

//add a Internship --> takes internshipData in json format (Title: Developer, Company: Google)
export async function addInternship(internshipData, mentorID) {
  try {
    //let internshipRef = doc(db, Constants.COLLECTION_INTERNSHIP, "PLACEHOLDER HERE");
    let internshipRef = collection(db, Constants.COLLECTION_INTERNSHIP);
    const data = {
      //input all data from userData json object
      Title: internshipData.title,
      Company: internshipData.company,
      Description: internshipData.description,
      Location: internshipData.location,
      Pay: internshipData.pay,
      Category: internshipData.category || [],
      Qualifications: internshipData.tags,
      URL: internshipData.url,
      RefferalLimit: internshipData.refferalLimit,

      //not provided by entered data
      MentorID: mentorID,
      ApplicationCounter: 0,
      Display: true,
      Status: Constants.INTERNSHIP_STATUS_OPEN,
    };

    addDoc(internshipRef, data);
    //await setDoc(internshipRef, data);

    console.log("Success- a new internship has been added!");
  } catch (error) {
    console.log("There was some error when adding internship");
    console.log(error);
  }
}

//query all Internships based on a specific field, filtering technique, and target value
export async function queryInternships(field, filter, target) {
  return queryCollection(Constants.COLLECTION_INTERNSHIP, field, filter, target);
}

//delete a Internship --> takes internship ID
export async function deleteInternship(internshipID) {
  deleteDocument(Constants.COLLECTION_INTERNSHIP, internshipID);
}

//find a Mentor --> takes mentor ID and returns mentor data in json format (FirstName: John, LastName: Smith)
export async function getInternship(internshipID) {
  try {
    const internshipData = await getDocument(Constants.COLLECTION_INTERNSHIP, internshipID);

    if (internshipData) {
      return internshipData;
    } else {
      console.log("INTERNSHIP NOT FOUND");
      return null;
    }
  } catch (error) {
    console.log("RAN INTO PROBLEM LOOKING FOR INTERNSHIP");
  }
}