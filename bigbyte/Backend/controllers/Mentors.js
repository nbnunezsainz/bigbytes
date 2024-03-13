const { getFirestore, Timestamp, FieldValue, Filter } = require('firebase-admin/firestore');
const { db, admin } = require('../FireBaseSetUp.js');
const Constants = require('./databaseConstant.js');
const { filterHelper, getDocument } = require('./databaseFunctions.js');
const { addInternship } = require('./Internships.js');

// create and initialize a database reference to the "Internship" collection
const MentorRef = db.collection(Constants.COLLECTION_MENTORS);
const MentorNotificationsRef = db.collection(Constants.COLLECTION_MENTORS_NOTIFICATIONS);


//add a Mentor --> takes mentorData in json format (FirstName: John, LastName: Smith)
exports.addMentor = async (data, res = null) => {
  try {
    /*const mentorData = req.body;
    const mentorID = req.body.id;

    const data = {
      // Retrieve data from req.body
      FirstName: mentorData.firstName,
      LastName: mentorData.lastName,
      Company: mentorData.company,
      Bio: mentorData.bio || null,
      LinkedIn: mentorData.linkedIn || null,
      Industry: mentorData.industry
    };
    */
    const mentorID = data.uid;
    await MentorRef.doc(mentorID).set(data);

    console.log("Success- a new mentor has been added!");
    //res.status(200).json({ success: true, message: 'Mentor added successfully' });
  } catch (error) {
    console.log("There was some error when adding mentor", error);
    //res.status(500).json({ success: false, message: 'Error adding mentor' });
  }
}

/*compound/complex querying of mentors based on a specific field(s), filtering technique(s), and target value(s) --> returns dictionary of mentor IDs to their data
ALL parameters of query should be passed (Company, Industry). Empty values will be disregarded.

Please refer to the project structure document for the field, filter, and target restrictions
*/
exports.queryMentors = async (req, res) => {
  try {
    let queryDict = {};
    let paramList = await cleanQuery(req.query);
    const keyNames = Object.keys(paramList);

    if (keyNames.length == 0) {
      console.log("no params rn")
      queryDict = await this.getAllMentors();
    } else {
      queryDict = await filterHelper(MentorRef, paramList);
    }

    res.status(200).json({ success: true, message: 'Mentors have been found', mentorData: queryDict });
    return queryDict;

  } catch (error) {
    console.log("RAN INTO PROBLEM QUERYING MENTORS", error);
    res.status(500).json({ success: false, message: 'Error querying mentors' });
  }
};

const cleanQuery = (query) => {
  let updatedQuery = query;
  const keyNames = Object.keys(updatedQuery);

  for (let i = 0; i < keyNames.length; i++) {
    let currKey = keyNames[i];
    let q = updatedQuery[currKey];
    if (q == '') {
      delete updatedQuery[currKey];
    }
  }

  Object.keys(updatedQuery).forEach((key) => {

    let tar = updatedQuery[key];
    let fil = "==";

    updatedQuery[key] = {
      field: key,
      filter: fil,
      target: tar,
    };
  });
  return updatedQuery;
}

exports.CheckReferals = async (req, res) => {
  try {
    console.log("here mate");
    
    const mentorID = req.user.uid;
    const mentorNotificationsSnapshot = await MentorNotificationsRef.where('mentorID', '==', mentorID).get();

    if (!mentorNotificationsSnapshot) {
      res.json({ message: "currently no request made" }).status(200);
    }


    // Array to store notifications
    const notifications = [];


    // Iterate over each notification document and add it to the notifications array
    mentorNotificationsSnapshot.forEach(doc => {
      const docId = doc.id;
      // Get document data using doc.data()
      const docData = doc.data();

      notifications.push({ id: docId, data: docData });
    });


    console.log(notifications, "notify");
    res.status(200).json({ success: true, notifications: notifications });
  }
  catch (error) {
    console.error('Error fetching mentor notifications:', error);
    res.status(500).json({ success: false, message: 'Error fetching mentor notifications' });
  }
};

exports.UpdateReferalStatus = async (req, res) => {
  try {
    //need the UID of referal Collection, passed in via req.params
    //then the status is from req.body, then update status!
    const referralId = Object.keys(req.query)[0];// Retrieve the referral ID from req.params
    const { status } = req.body; // Retrieve the updated status from req.body


    const referralDocRef = MentorNotificationsRef.doc(referralId); // Find the referral by ID
    const referralDoc = await referralDocRef.get();
    if (!referralDoc.exists) {
      return res.status(404).json({ message: 'Referral not found' });
    }

    await referralDocRef.update({ status });

    // Array to store notifications
    // const notifications = [];

    // // Iterate over each notification document and add it to the notifications array
    // mentorNotificationsSnapshot.forEach(doc => {
    //   notifications.push({
    //     ...doc.data() // All other fields of the notification document
    //   });
    // });


    res.status(200).json({ success: true, message: "updated referal status" });
  }
  catch (error) {
    console.error('Error fetching mentor notifications:', error);
    res.status(500).json({ success: false, message: 'Error fetching mentor notifications' });
  }
};


//deletes a mentor based on their ID
// THIS CODE IS ESSENTIALLY USELESS NOW! TO ENSURE OUR DATA IS SECURE, WE HAVE COMMENTED THE deleteDocument() FUNCTION
exports.deleteMentor = async (req, res) => {
  try {
    let mentorID = req.body.id;

    //const result = await deleteDocument(MentorRef, mentorID);
    console.log("Success- mentor deleted!");
    res.status(200).json({ success: true, message: 'Mentor deleted successfully' });
  } catch (error) {
    console.log("There was some error when deleting mentor", error);
    res.status(500).json({ success: false, message: 'Error deleting mentor' });
  }
};

exports.getMentorProfile = async (req, res) => {
  try {

    let mentorID = req.user.uid;
    let mentor = await getDocument(MentorRef, mentorID);
    res.status(200).json({ success: true, mentorData: mentor });

  } catch (error) {
    console.log("RAN INTO PROBLEM LOOKING FOR MENTOR", error);
    res.status(500).json({ success: false, message: 'Error when getting mentor' });
  }
}

// find and return an mentor dictionary that relates their ID to their data
exports.getMentor = async (req, res) => {
  try {

    let userID = req.user.uid;
    let user;
    const doc = await MentorRef.doc(userID).get();
    if (!doc.exists) {
      res.status(500).json({ success: false, message: 'Error when getting user' });
      return;
    } else {

      user = doc.data();
      delete user.uid; //removes the uid form data
    }

    // let mentorID = req.body.id;
    // const mentor = await getDocument(MentorRef, mentorID);

    res.status(200).json({ success: true, user: user });
    // return mentor;

  } catch (error) {
    console.log("RAN INTO PROBLEM LOOKING FOR MENTOR", error);
    res.status(500).json({ success: false, message: 'Error when getting mentor' });
  }
};

//update specific mentor with new data
exports.updateMentor = async (req, res) => {

  try {
    let mentorID = req.user.uid;

    const mentorUpdate = req.body;
    await MentorRef.doc(mentorID).update(mentorUpdate);
    let mentor = await getDocument(MentorRef, mentorID);

    res.json({ success: true, message: 'Mentor updated successfully', mentorData: mentor });

  } catch (error) {

    //console.log(error)
    res.json({ success: false, message: 'Mentor NOT updated (error)' });

  }
}
//get all Mentors
exports.getAllMentors = async (req = null, res = null) => {
  try {

    let mentors = [];
    mentors = await MentorRef.get();

    if (!mentors.empty) {
      // Create an array to hold the internship data
      let mentorData = [];

      // Iterate over each document in the QuerySnapshot
      mentors.forEach(doc => {
        // Add the document data to the array
        // Each document's data is accessed with the .data() method
        mentorData.push({ id: doc.id, ...doc.data() });
      });

      if (res != null) {
        res.status(200).json({ success: true, message: 'Mentorship has been found', mentorData: mentorData });
      }
      return mentorData;
    }

  } catch (error) {
    console.log("RAN INTO PROBLEM FINDING ALL MENTORS", error);
    if (res != null) {
      res.status(500).json({ success: false, message: 'Error finding mentor' });
    }
  }
}

// generates an internship posting --> MUST INCLUDE THE MENTOR'S ID WITHIN REQ.BODY
exports.generateInternship = async (req, res) => {
  try {
    //await addInternship(internshipData, mentorID);
    await addInternship(req, res);
    console.log("succesfully added a internship for this mentor in backend");
    res.status(200).json({ success: true, message: 'Internship successfully generated for mentor' });

  } catch (error) {
    console.log("Had an error with generating this internship in backend");
    console.log(error);
    res.status(500).json({ success: false, message: 'Error when generating an internship for the mentor' });
  }
};

/*
Below includes functions solely for testing. These will NOT be included 
*/
const mentorData = require('../TestDataGeneration/testMentorData.js');
exports.generateTestMentors = async (req, res) => {
  try {
    console.log("The length of the test data is: " + mentorData.mentors.length);

    const promises = mentorData.mentors.map((mentor) => {
      console.log("Mentor ID: " + mentor.body.id);
      //return this.addMentor(mentor, "");
    });

    //await Promise.all(promises);

    res.status(200).json({ success: true, message: 'Was able to do mentor testing correctly' });
  } catch (error) {
    console.log("oops something went wrong")
    res.status(500).json({ success: false, message: 'Something went wrong when testing mentor data' });
  }
}
