import { getFirebaseConfig } from "../firebaseConfiguration.js";
const { initializeApp } = require("firebase/app");
const { getFirestore, collection, getDocs, getDoc, addDoc, doc, deleteDoc, onSnapshot, query, where } = require("firebase/firestore");

//Initialize Firebase
const firebaseConfig = getFirebaseConfig();
initializeApp(firebaseConfig)

const db = getFirestore()

//add a Internship --> takes internshipData in json format (Title: Developer, Company: Google)
export async function addInternship(internshipData) {
  try 
  {
    let internshipRef = doc(db, "Internship" /*add ID here if needed*/);
    data = {
      //input all data from userData json object
      Title: internshipData.title,
      Company: internshipData.company,
      Description: internshipData.description,
      Location: internshipData.location,
      Pay: internshipData.pay,
      Category: internshipData.category,
      Qualifications: internshipData.tags,
      URL: internshipData.url,
      RefferalLimit: internshipData.refferalLimit,

      //not provided by entered data
      ApplicationCounter: 0,
      Display: true,
    };

    await setDoc(internshipRef, data);

    console.log("Success- a new internship has been added!");
  } catch (error) 
  {
    console.log("There was some error when adding internship");
  }
}

//query all Internships based on a specific field, filtering technique, and target value
export async function queryInternships(field, filter, target)
{
  return queryCollection("Internship", field, filter, target);
}

//delete a Internship --> takes internship ID
export async function deleteInternship(internshipID) {
  deleteDocument("Internship", internshipID);
}

//find a Mentor --> takes mentor ID and returns mentor data in json format (FirstName: John, LastName: Smith)
export async function getInternship(internshipID) {
  try {
    const internshipData = await getDocument("Internship", internshipID);

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
