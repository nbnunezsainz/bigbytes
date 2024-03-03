const { getFirestore, Timestamp, FieldValue, Filter } = require('firebase-admin/firestore');
const { db, admin } = require('../FireBaseSetUp.js');
const Constants = require('./databaseConstant.js');

//query all Collections based on a specific field, filtering technique, and target value --> returns dictionary of document ID to document data in json format (FirstName: John, LastName: Smith)
async function queryCollection(colRef, field, filter, target) {
    let q = await colRef.where(field, filter, target).get();

    const queryDict = {}
    if (!(q.empty)) {
        q.forEach(doc => {
            queryDict[doc.id] = doc.data();
        });
    }
    return queryDict;
}

//delete a document within a collection --> takes document ID
async function deleteDocument(colRef, docID) {

    const result = await colRef.doc(docID).delete();
    return result;
}

//find a document within a collection --> takes docuent ID and returns dictionary of document ID to document data in json format (FirstName: John, LastName: Smith)
async function getDocument(colRef, docID) {
    const docRef = await colRef.doc(docID).get();

    if (!docRef.exists) {
        return null;
    } else {
        return { [docRef.id]: docRef.data() };
    }
}

module.exports = {
    queryCollection, deleteDocument, getDocument
};