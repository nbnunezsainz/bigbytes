const { getFirestore, Timestamp, FieldValue, Filter } = require('firebase-admin/firestore');
const { db, admin } = require('../FireBaseSetUp.js');
const Constants = require('./databaseConstant.js');
const { queryCollection, deleteDocument, getDocument } = require('./databaseFunctions.js');

// create and initialize a database reference to the "Internship" collection
const UserRef = db.collection(Constants.COLLECTION_USERS);

//add a User --> takes userData in json format (FirstName: John, LastName: Smith)
exports.addUser = async (req, res) => {
    try {
        const userData = req.body;
        const userID = req.body.id;

        console.log(userData);

        const data = {
            FirstName: userData.firstName,
            LastName: userData.lastName,
            Major: userData.major,
            Year: userData.year,
            Bio: userData.bio || null,
            Organizations: userData.organizations || [],
            LinkedIn: userData.linkedIn || null,
            Resume: userData.resume || null,

            //not provided by entered data
            MonthlyRefferalCount: 20,
            TotalRefferalCount: 0,
        };

        await UserRef.doc(userID).set(data);

        console.log("Success- a new user has been added!");
        res.status(200).json({ success: true, message: 'User added successfully' });
    } catch (error) {
        console.log("There was some error when adding user", error);
        res.status(500).json({ success: false, message: 'Error adding user' });
    }
}


//query all users based on a specific field, filtering technique, and target value --> returns dictionary of mentor ID to their data
exports.queryUsers = async (req, res) => {
    try {

        queryDict = await queryCollection(UserRef, req.body);

        console.log(queryDict);
        console.log("Success- users have been found!");
        res.status(200).json({ success: true, message: 'Users have been found' });
        return queryDict;

    } catch (error) {
        console.log("RAN INTO PROBLEM QUERYING USERS", error);
        res.status(500).json({ success: false, message: 'Error querying users' });
    }
};

//deletes a user based on their ID
exports.deleteUser = async (req, res) => {
    try {
        let userID = req.body.id;

        const result = await deleteDocument(UserRef, userID);
        console.log(result)
        console.log("Success- user deleted!");
        res.status(200).json({ success: true, message: 'User deleted successfully' });
    } catch (error) {
        console.log("There was some error when deleting user", error);
        res.status(500).json({ success: false, message: 'Error deleting user' });
    }
};


// find and return an user dictionary that relates their ID to their data
exports.getUser = async (req, res) => {
    try {
        let userID = req.body.id;
        const user = await getDocument(UserRef, userID);
        console.log(user)

        console.log("Success- user received!");
        res.status(200).json({ success: true, message: 'Internship user successfully' });
        return user;

    } catch (error) {
        console.log("RAN INTO PROBLEM LOOKING FOR USER", error);
        res.status(500).json({ success: false, message: 'Error when getting user' });
    }
};
