import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc, doc, deleteDoc} from "firebase/firestore";

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


const userRef = collection(db, 'User')

getDocs(userRef)
  .then((snapshot) =>
  {
    let names = []
    snapshot.docs.forEach((name) => {
      names.push({...name.data(), id: name.id})
    })
    console.log(names)
  })

function addUser(colName, name, age, title)
{
  let colRef = collection(db, colName)
  addDoc(colRef, {
    name: name,
    age: age,
    title: title,
  })
}

const docRef = doc(db, "Mentor", "ZpdnpXaFGk8jf5FG1NqS")
deleteDoc(docRef);

//addUser("Mentor", "new person", 21, "Doctor");
// Call the asynchronous function
console.log("working")