const { uploadBytes, ref, deleteObject, getDownloadURL, listAll } = require('firebase/storage');
const { db, admin, bucket, storage } = require('../FireBaseSetUp.js');
const Constants = require('./databaseConstant.js');
const { queryCollection, deleteDocument, getDocument } = require('./databaseFunctions.js');

// create and initialize a database reference to the "Internship" collection
const UserRef = db.collection(Constants.COLLECTION_USERS);

//add a User --> takes userData in json format (FirstName: John, LastName: Smith)
exports.addUser = async (req, res) => {
    try {
        const userData = req.body;
        const userID = userData.id;

        const data = {
            FirstName: userData.firstName,
            LastName: userData.lastName,
            Major: userData.major,
            GradYear: userData.gradYear,
            Bio: userData.bio || null,
            Organizations: userData.organizations || [],
            LinkedIn: userData.linkedIn || null,

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

        console.log("Success- users have been found!");
        res.status(200).json({ success: true, message: 'Users have been found' });
        return queryDict;

    } catch (error) {
        console.log("RAN INTO PROBLEM QUERYING USERS", error);
        res.status(500).json({ success: false, message: 'Error querying users' });
    }
};

//deletes a user based on their ID
// THIS CODE IS ESSENTIALLY USELESS NOW! TO ENSURE OUR DATA IS SECURE, WE HAVE COMMENTED THE deleteDocument() FUNCTION
exports.deleteUser = async (req, res) => {
    try {
        let userID = req.body.id;

        //const result = await deleteDocument(UserRef, userID);
        console.log("Success- user deleted!");
        res.status(200).json({ success: true, message: 'User deleted successfully' });
    } catch (error) {
        console.log("There was some error when deleting user", error);
        res.status(500).json({ success: false, message: 'Error deleting user' });
    }
};

// find and return an user dictionary that relates their ID to their data --> used by front end
exports.getUser = async (req, res) => {

    let userID = req.user.uid;

    //const user = await getDocument(UserRef, userID); cant use this because dont want to send USer UID back, secuirty hazard
    let user;
    const doc = await UserRef.doc(userID).get();

    if (!doc.exists) {
        res.status(500).json({ success: false, message: 'Error when getting user' });
        return;
    } else {

        user = doc.data();
        delete user.uid; //removes the uid form data
    }
    res.status(200).json({ success: true, user: user });

};

/*
apply to an internship --> relates user ID to internship ID, mentor ID, and internship company
creates a new document in the User->InternshipApp(UID->IID,MID,Company) collection
when displaying this application, including the internship status may be useful --> can be done by dynamically searching for the internship and pulling its status

req.body only contains userID and internshipID
*/
exports.applyForInternship = async (req, res) => {
    try {
        // gather user information
        const appRef = db.collection(Constants.COLLECTION_RELATIONAL_APPLICATIONS);
        let userID = req.body.userID;

        // gather internship information
        let internshipID = req.body.internshipID;
        const InternshipRef = db.collection(Constants.COLLECTION_INTERNSHIP);
        let internshipData = await getDocument(InternshipRef, internshipID);
        internshipData = internshipData[internshipID];

        // create and post application data
        const appData = {
            UserID: userID,
            InternshipID: internshipID,
            MentorID: internshipData.MentorID,
            InternshipCompany: internshipData.Company
        }
        await appRef.add(appData);

        // update user and internship data post application
        updateUserData(userID);
        updateInternshipData(internshipID, InternshipRef, internshipData);

        console.log("Success- user has applied to the internship");
        res.status(200).json({ success: true, message: 'User has applied successfully' });
    } catch (error) {
        console.log("There was some error when applying to the internship", error);
        res.status(500).json({ success: false, message: 'Error applying to internship' });
    }
};

// these are  internal funcitons to update User and Internship data
const updateUserData = async (userID) => {
    try {
        // gather and update user information
        const user = UserRef.doc(userID);
        let userData = (await user.get()).data();
        await user.update(
            {
                MonthlyRefferalCount: userData.MonthlyRefferalCount - 1,
                TotalRefferalCount: userData.TotalRefferalCount + 1
            }
        );
        console.log("User data is updated after application was submitted");
    } catch (error) {
        console.log("There was some error when updating user data", error);
    }
};
const updateInternshipData = async (internshipID, InternshipRef, internshipData) => {
    try {
        // gather and update internship information
        const internship = InternshipRef.doc(internshipID);
        let appCount = internshipData.ApplicationCounter + 1;
        let newStatus = internshipData.Status;
        let newDisplay = internshipData.Display;
        if (appCount >= internshipData.RefferalLimit) {
            newStatus = Constants.INTERNSHIP_STATUS_REVIEW;
            newDisplay = false;
        }
        await internship.update(
            {
                ApplicationCounter: appCount,
                Status: newStatus,
                Display: newDisplay
            }
        );
        console.log("Internship data is updated after application was submitted");
    } catch (error) {
        console.log("There was some error when updating internship data", error);
    }
};


/*
below are functions for users to upload, delete, and view their resumes 
*/

/* 
function for a user to upload a resume
req must contain the following:
- resume file that is stored in req.files.Resume.data (file must be renamed to "Resume")
- userID that contains the user's unique ID which will serve as the resume's internal file name
*/
exports.uploadResume = async (req, res) => {
    try {
        let pathName = Constants.STORAGE_RESUME + req.body.userID;
        const resumeRef = ref(storage, pathName);
        const metadata = {
            contentType: "application/pdf"
        };
        await uploadBytes(resumeRef, req.files.Resume.data, metadata);
        res.status(200).json({ success: true, message: 'Succes when getting resume' });
    } catch (error) {
        console.log("an error happened:");
        console.log(error);
        res.status(500).json({ success: false, message: 'Error posting resume' });

    }
}

/* 
function for a user to delete their resume
req must contain the following:
- userID that contains the user's unique ID
*/
exports.deleteResume = async (req, res) => {
    try {
        let pathName = Constants.STORAGE_RESUME + req.body.userID;
        const resumeRef = ref(storage, pathName);

        await deleteObject(resumeRef);

        res.status(200).json({ success: true, message: 'Succes when deleting resume' });
    } catch (error) {
        console.log("an error happened:");
        console.log(error);
        res.status(500).json({ success: false, message: 'Error deleting resume' });
    }
}

/*
function to retrive ONE resume --> returns the URL to view their resume
req must contain the following:
- userID of the user whose resume is to be returned
*/
// exports.getResume = async (req, res) => {
//     try {
//         let pathName = Constants.STORAGE_RESUME + req.body.userID;
//         const resumeRef = ref(storage, pathName);
//         const URL = await getDownloadURL(resumeRef);

//         res.status(200).json({ success: true, message: 'Succes when getting resume' });
//         return URL;

//     } catch (error) {
//         console.log("an error happened:");
//         console.log(error);
//         res.status(500).json({ success: false, message: 'Error getting resume' });
//     }
// }

/*
function to retrive ALL resumes in system --> returns list of key-value pairs (relates userID to the URL to view their resume)
req is empty (will not be read)
*/
// exports.getAllResumes = async (req, res) => {
//     try {
//         const resumeRef = await ref(storage, Constants.STORAGE_RESUME);
//         const allResumes = await listAll(resumeRef);
//         let resumes = [];

//         for (const doc of allResumes.items) {
//             let url = await getDownloadURL(doc);
//             resumes.push({ userID: doc.name, URL: url });
//         }

//         res.status(200).json({ success: true, message: 'Succes when returning all resumes', resumes: resumes });
//         //                                                 return resumes;

//     } catch (error) {
//         console.log("an error happened:");
//         console.log(error);
//         res.status(500).json({ success: false, message: 'Error when getting all resumes' });
//     }
// }



/*
Below includes functions solely for testing. These will NOT be included 
*/
/*
const userData = require('../TestDataGeneration/testUserData.js');
exports.generateTestUsers = async (req, res) => {
    try {
        console.log("The length of the test data is: " + userData.users.length);

        userData.users.forEach((user) => {
            console.log("I am attempting to create a user");
            this.addUser(user, "");
        })

        res.status(200).json({ success: true, message: 'Was able to do user testing correctly' });
    } catch (error) {
        console.log("oops something went wrong")
        res.status(500).json({ success: false, message: 'Something went wrong when testing user data' });
    }
}
*/