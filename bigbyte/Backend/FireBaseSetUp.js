
const { getFirestore, } = require("firebase-admin/firestore");
const admin = require("firebase-admin");
const serviceAccount = require("./FBAdmin.json");
//const { initializeApp, cert } = require('firebase-admin/app');

const firebaseApp = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://lbackend-7a432-default-rtdb.firebaseio.com"
});

const db = getFirestore(firebaseApp);

module.exports = { db, admin };

