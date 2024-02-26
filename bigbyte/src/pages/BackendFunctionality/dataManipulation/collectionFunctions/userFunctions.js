import * as Constants from "../../databaseConstants.js"
import { getFirebaseConfig } from "../../firebaseConfiguration.js";
import { queryCollection, deleteDocument, getDocument } from "../generalDataFunctions.js";
import { getInternship } from "./internshipFunctions.js";
const { initializeApp } = require("firebase/app");
const { getFirestore, collection, getDocs, setDoc, getDoc, addDoc, updateDoc, doc, deleteDoc, onSnapshot, query, where } = require("firebase/firestore");

//Initialize Firebase
const firebaseConfig = getFirebaseConfig();
initializeApp(firebaseConfig)

const db = getFirestore()

//add a User --> takes userData in json format (FirstName: John, LastName: Smith)
export async function addUser(userData, userAuthID) {
  try 
  {
    let userRef = doc(db, Constants.COLLECTION_USERS, userAuthID);
    const data = {
      //input all data from userData json object
      FirstName: userData.firstName,
      LastName: userData.lastName,
      Major: userData.major,
      Year: userData.year,
      Bio: userData.bio || null,
      Organizations: userData.organizations || [],
      LinkedIn: userData.linkedIn || null,
      Resume: userData.resume || null,

      //not provided by entered data
      MonthlyRefferalCount: 20,
      TotalRefferalCount: 0,
    }
    //addDoc(userRef, data, "TESTING");
    await setDoc(userRef, data);
    console.log("Success- a new user has been added!");
  } catch (error) 
  {
    console.log("There was some error when adding user");
    console.log(error);
  }
}

//query all Users based on a specific field, filtering technique, and target value
export async function queryUsers(field, filter, target)
{
  return queryCollection(Constants.COLLECTION_USERS, field, filter, target);
}

//delete a User --> takes user ID
export async function deleteUser(userID) {
  deleteDocument(Constants.COLLECTION_USERS, userID);
}

//find a user --> takes user ID and returns user data in json format (FirstName: John, LastName: Smith)
export async function getUser(userID) {
  try {
    const userData = await getDocument(Constants.COLLECTION_USERS, userID);

    if (userData) {
      return userData;
    } else {
      console.log("USER NOT FOUND");
      return null;
    }
  } catch (error) {
    console.log("RAN INTO PROBLEM LOOKING FOR USER");
  }
}

/*apply for an internship --> takes a userID and internship ID and creates a new document in the User->Internship(UID->IID,MID,Status) collection;
relates user ID with internship ID, mentor ID, and internship status
*/

export async function applyForInternship(userID, internshipID) {
  try
  {
    let applicationRef = doc(db, Constants.COLLECTION_RELATIONAL_APPLICATIONS, userID);
    let internshipData = getInternship(internshipID);
    const data = {
      InternshipID: internshipID,
      MentorID: internshipData.MentorID,
      Status: internshipData.Status,
    }
    await setDoc(applicationRef, data);
    console.log("Success- internship applied to!");
    postInternshipApplicationUpdates(userID, internshipID);
    console.log("Sucess updating internship and user info post internship application")
  } catch(error)
  {
    console.log("There was some error when adding document to relationalDatabse");
    console.log(error);
  }
}

function postInternshipApplicationUpdates(userID, internshipID) {
  try {
    //gathering and updating the user's data
    const user = doc(db, Constants.COLLECTION_USERS, userID);
    let userData = getDoc(user);
    let refferalCount = userData.MonthlyRefferalCount - 1;
    let refferalsSubmitted = userData.TotalRefferalCount + 1;
    updateDoc(user, {
      MonthlyRefferalCount: refferalCount,
      TotalRefferalCount: refferalsSubmitted,
    });

    //gathering and updating the internship's data
    const internship = doc(db, Constants.COLLECTION_INTERNSHIP, internshipID);
    let internshipData = getDoc(internship);
    let appCount = internshipData.ApplicationCounter + 1;
    let newStatus = internshipData.Status;
    let newDisplay = internshipData.Display;
    if (appCount >= internshipData.RefferalLimit)
    {
      newStatus = Constants.INTERNSHIP_STATUS_REVIEW;
      newDisplay = false;
    }
    updateDoc(internship, {
      ApplicationCounter: appCount,
      Status: newStatus,
      Display: newDisplay,
    });

    console.log("User and internship data are updated after application was submitted");

  } catch(error)
  {

  }
}