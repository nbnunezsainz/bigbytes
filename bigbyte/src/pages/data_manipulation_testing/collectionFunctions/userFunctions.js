import { getFirebaseConfig } from "../firebaseConfiguration.js";
import { queryCollection, deleteDocument, getDocument } from "../generalDataFunctions.js";
const { initializeApp } = require("firebase/app");
const { getFirestore, collection, getDocs, getDoc, addDoc, doc, deleteDoc, onSnapshot, query, where } = require("firebase/firestore");

//Initialize Firebase
const firebaseConfig = getFirebaseConfig();
initializeApp(firebaseConfig)

const db = getFirestore()

//add a User --> takes userData in json format (FirstName: John, LastName: Smith)
export async function addUser(userData) {
  try {
    let userRef = collection(db, "User");
    addDoc(userRef, {
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
      RefferalCount: 20,
    });
    console.log("Success- a new user has been added!");
  } catch (error) {
    console.log("There was some error when adding user");
  }
}

//query all Users based on a specific field, filtering technique, and target value
export async function queryUsers(field, filter, target)
{
  return queryCollection("User", field, filter, target);
}

//delete a User --> takes user ID
export async function deleteUser(userID) {
  deleteDocument("User", userID);
}

//find a user --> takes user ID and returns user data in json format (FirstName: John, LastName: Smith)
export async function getUser(userID) {
  try {
    const userData = await getDocument("User", userID);

    if (userData.exists()) {
      return userData.data();
    } else {
      console.log("USER NOT FOUND");
      return null;
    }
  } catch (error) {
    console.log("RAN INTO PROBLEM LOOKING FOR USER");
  }
}


//allows to review User data in realtime
/*onSnapshot(userRef, (snapshot) => {
let users = [];
snapshot.docs.forEach((user) => {
users.push({...user.data(), id: doc.id});
});
console.log(users);
});*/


