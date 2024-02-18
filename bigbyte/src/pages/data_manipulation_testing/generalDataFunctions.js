import { getFirebaseConfig } from "./firebaseConfiguration.js";
const { initializeApp } = require("firebase/app");
const { getFirestore, collection, getDocs, getDoc, addDoc, doc, deleteDoc, onSnapshot, query, where } = require("firebase/firestore");

//Initialize Firebase
const firebaseConfig = getFirebaseConfig();
initializeApp(firebaseConfig)

const db = getFirestore()

//query all Collections based on a specific field, filtering technique, and target value
export async function queryCollection(collectionName, field, filter, target)
{
  let colRef = collection(db, collectionName);
  let q = query(colRef, where(field, filter, target));
  return q;
}

//delete a document within a collection --> takes document ID
export async function deleteDocument(collectionName, docID) {
  let docRef = doc(db, collectionName, docID);
  deleteDoc(docRef);
}

//find a document within a collection --> takes docuent ID and returns document data in json format (FirstName: John, LastName: Smith)
export async function getDocument(collectionName, docID) {
    let docRef = doc(db, collectionName, docID);
    const docData = await getDoc(docRef);
    return docData;
   
}


//allows to review User data in realtime
/*onSnapshot(userRef, (snapshot) => {
let users = [];
snapshot.docs.forEach((user) => {
users.push({...user.data(), id: doc.id});
});
console.log(users);
});*/


