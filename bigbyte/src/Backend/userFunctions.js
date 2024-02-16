const { initializeApp } = require("firebase/app");
const { getFirestore, collection, getDocs, getDoc, addDoc, doc, deleteDoc, onSnapshot, query, where} = require("firebase/firestore");

const firebaseConfig = {
  apiKey: "AIzaSyCcrfzBruA31ybVPHoqb_n8DnSiyS08tM0",
  authDomain: "lbackend-7a432.firebaseapp.com",
  databaseURL: "https://lbackend-7a432-default-rtdb.firebaseio.com",
  projectId: "lbackend-7a432",
  storageBucket: "lbackend-7a432.appspot.com",
  messagingSenderId: "46064267649",
  appId: "1:46064267649:web:c6dfc9c6287669806ff880",
  measurementId: "G-WRYZ44FDPG"
};

//Initialize Firebase
initializeApp(firebaseConfig)
const db = getFirestore()

//Initialize a query
//const userRef = collection(db, 'User')
//const q = query(userRef, where("Organizations", "array-contains", "Swimming"));

//add a User --> takes userData in json format (FirstName: John, LastName: Smith)
export async function addUser(userData)
{
  try 
  {
    let colRef = collection(db, "User");
    addDoc(colRef, {
      //input all data from userData json object
      FirstName: userData.firstName,
      LastName: userData.lastName,
      Major: userData.major,
      Year: userData.year,
      Organizations: userData.organizations || [],
      LinkedIn: userData.linkedIn || null,
      Resume: userData.resume,
    });
    console.log("Success- a new user has been added!");
  } catch (error)
  {
    console.log("There was some error when adding user");
  }
}

//delete a User --> takes user ID
export async function deleteUser(userID)
{
  let docRef = doc(db, "User", userID);
  deleteDoc(docRef);
}

//find a user --> takes user ID and returns user data in json format (FirstName: John, LastName: Smith)
export async function getUser(userID)
{
  try 
  {
    let docRef = doc(db, "User", userID);
    const userData = await getDoc(docRef);

    if (userData.exists())
    {
      return userData.data();
    } else
    {
      console.log("USER NOT FOUND");
      return null
    }
  } catch (error)
  {
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

/*
const firstData = {
  firstName: "userData.firstName",
  lastName: "userData.lastName",
  major: "userData.major",
  year: "userData.year",
  organizations: ["Swimming", "Dancing", "Painting"],
  linkedIn: "userData.linkedIn",
  resume: "userData.resume",
};
const secondData = {
  firstName: "sdfg",
  lastName: "sfg",
  major: "sdfg",
  year: "sdfg",
  organizations: ["Dancing", "Bowling", "Painting"],
  linkedIn: "asdf",
  resume: "sdfg",
};
const thirdData = {
  firstName: "sdfg",
  lastName: "sfg",
  major: "sdfg",
  year: "sdfg",
  organizations: ["Running", "Jumpimg", "Swimming"],
  linkedIn: "asdf",
  resume: "sdfg",
};
*/
/*addUser(firstData);
addUser(secondData);
addUser(thirdData);*/

/*getUser("OotjJekV07Py47ZTlnz")
  .then((userData)=>
  {
    console.log(userData);
  });
*/

//console.log("working")
