 const admin = require("firebase-admin");
// const { initializeApp } = require("firebase/app");
//  const { getDocs, getDoc, setDoc, doc, deleteDoc, onSnapshot, query, where } = require('firebase/firestore');
//  const { getFirebaseConfig } = require ("./firebaseConfigInfo.js");
//  const { collection, addDoc } = require('firebase/firestore');
//const { getFirestore } = require('firebase-admin/firestore')

//Initialize Firebase
//const app3 = initializeApp(getFirebaseConfig);
//const firebaseConfig = getFirebaseConfig();
//initializeApp(firebaseConfig);

const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue, Filter } = require('firebase-admin/firestore');

// const serviceAccount = require("../FBAdmin.json");
// initializeApp({
//   credential: cert(serviceAccount),
//   //databaseURL: "https://lbackend-7a432-default-rtdb.firebaseio.com"
// });

const db = getFirestore();
//const db = admin.firestore();

exports.addInternship = async (req, res) => {
  try { //needs to be related to a mentor!

    const internshipData = req.body;
    //const internshipRef = doc(db, "Internship");
    
    const data = {
      Title: internshipData.title,
      Company: internshipData.company,
      Description: internshipData.description,
      Location: internshipData.location,
      Pay: internshipData.pay,
      Category: internshipData.category,
      URL: internshipData.url,
      RefferalLimit: internshipData.refferalLimit,

      //NOT PROVIDED IN REQ
      ApplicationCounter: 0,
      Display: true,
    };
   // await db.collection('User').doc(User.uid).set(userDetails);
    //addDoc(internshipRef, data);
    await db.collection('Internship').doc("THIS IS A TEST new").set(data);

    console.log("Success- a new internship has been added!");
    res.status(200).json({ success: true, message: 'Internship added successfully' });
  } catch (error) {
    console.log("There was some error when adding internship", error);
    res.status(500).json({ success: false, message: 'Error adding internship' });
  }
};

/*
exports.queryInternships = async (req, res) => {
  const { field, filter, target } = req.body;
  try {
    // Implement queryCollection function logic here
    // Return the result using res.status().json()
  } catch (error) {
    console.log("RAN INTO PROBLEM QUERYING INTERNSHIPS", error);
    res.status(500).json({ success: false, message: 'Error querying internships' });
  }
};

exports.deleteInternship = async (req, res) => {
  try {
    const internshipID = req.params.internshipID;
    // Implement deleteDocument function logic here
    res.status(200).json({ success: true, message: 'Internship deleted successfully' });
  } catch (error) {
    console.log("There was some error when deleting internship", error);
    res.status(500).json({ success: false, message: 'Error deleting internship' });
  }
};

exports.getInternship = async (req, res) => {
  try {
    const internshipID = req.params.internshipID;
    // Implement getDocument function logic here
    // Return the result using res.status().json()
  } catch (error) {
    console.log("RAN INTO PROBLEM LOOKING FOR INTERNSHIP", error);
    res.status(500).json({ success: false, message: 'Error looking for internship' });
  }
};

*/