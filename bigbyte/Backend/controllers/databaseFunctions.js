const { getFirestore, Timestamp, FieldValue, Filter } = require('firebase-admin/firestore');
const { db, admin } = require('../FireBaseSetUp.js');
const Constants = require('./databaseConstant.js');

/*
All functions within this file are used internally by Internships, Mentors, and Users.js as helper functions
*/


//query all Collections based on a specific field, filtering technique, and target value --> returns dictionary of document ID to document data in json format (FirstName: John, LastName: Smith)
async function queryCollection(colRef, reqBody) {
    let field = reqBody.field;
    let filter = reqBody.filter;
    let target = reqBody.target;

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
    const doc = await colRef.doc(docID).get();

    if (!doc.exists) {
        return null;
    } else {
        
        return { [doc.id]: doc.data() };
    }
}

module.exports = {
    queryCollection, deleteDocument, getDocument
};

/*

const user = UserRef.doc(userID);
        let userData = (await user.get()).data();
        console.log(userData)
        await user.update(
            {
                MonthlyRefferalCount: userData.MonthlyRefferalCount - 1,
                TotalRefferalCount: userData.TotalRefferalCount + 1
            }
        );

*/