
const { getFirestore, } = require("firebase-admin/firestore");
const { getStorage, ref } = require("firebase/storage")
const admin = require("firebase-admin");
const serviceAccount = require("./FBAdmin.json");
//const { initializeApp, cert } = require('firebase-admin/app');

const firebaseApp = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://lbackend-7a432-default-rtdb.firebaseio.com",
  storageBucket: 'lbackend-7a432.appspot.com'
});

const db = getFirestore(firebaseApp);
const bucket = admin.storage().bucket();
const storage = getStorage();

module.exports = { db, admin, bucket, storage };

