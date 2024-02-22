import { getFirebaseConfig } from "../firebaseConfiguration.js";
const { initializeApp } = require("firebase/app");
const { getFirestore, collection, getDocs, getDoc, addDoc, doc, deleteDoc, onSnapshot, query, where } = require("firebase/firestore");

//Initialize Firebase
const firebaseConfig = getFirebaseConfig();
initializeApp(firebaseConfig)

const db = getFirestore()

//add a Mentr --> takes mentorData in json format (FirstName: John, LastName: Smith)
export async function addMentor(mentorData, authMentorID) {
  try 
  {
    let mentorRef = doc(db, "Mentor", authMentorID);
    const data = {
      //input all data from userData json object
      FirstName: mentorData.firstName,
      LastName: mentorData.lastName,
      Company: mentorData.company,
      Bio: mentorData.bio || null,
      MentorStatus: mentorData.mentorStatus || false,
      LinkedIn: mentorData.linkedIn || null,
    };

    await setDoc(mentorRef, data);

    console.log("Success- a new mentor has been added!");
  } catch (error) 
  {
    console.log("There was some error when adding mentor");
    console.log(error);
  }
}

//query all Mentors based on a specific field, filtering technique, and target value
export async function queryMentors(field, filter, target)
{
  return queryCollection("Mentor", field, filter, target);
}

//delete a Mentor --> takes user ID
export async function deleteMentor(mentorID) {
  deleteDocument("Mentor", mentorID);
}

//find a Mentor --> takes mentor ID and returns mentor data in json format (FirstName: John, LastName: Smith)
export async function getMentor(mentorID) {
  try {
    const mentorData = await getDocument("Mentor", mentorID);

    if (mentorData) {
      return mentorData;
    } else {
      console.log("MENTOR NOT FOUND");
      return null;
    }
  } catch (error) {
    console.log("RAN INTO PROBLEM LOOKING FOR MENTOR");
  }
}
