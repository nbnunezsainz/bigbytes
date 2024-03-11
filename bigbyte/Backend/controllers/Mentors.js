const { getFirestore, Timestamp, FieldValue, Filter } = require('firebase-admin/firestore');
const { db, admin } = require('../FireBaseSetUp.js');
const Constants = require('./databaseConstant.js');
const { queryCollection, deleteDocument, getDocument } = require('./databaseFunctions.js');
const { addInternship } = require('./Internships.js');

// create and initialize a database reference to the "Internship" collection
const MentorRef = db.collection(Constants.COLLECTION_MENTORS);

//add a Mentor --> takes mentorData in json format (FirstName: John, LastName: Smith)
exports.addMentor = async (req, res) => {
  try {
    const mentorData = req.body;
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

    await MentorRef.doc(mentorID).set(data);

    console.log("Success- a new mentor has been added!");
    res.status(200).json({ success: true, message: 'Mentor added successfully' });
  } catch (error) {
    console.log("There was some error when adding mentor", error);
    res.status(500).json({ success: false, message: 'Error adding mentor' });
  }
}

//query all mentors based on a specific field, filtering technique, and target value --> returns dictionary of mentor ID to their data
exports.queryMentors = async (req, res) => {
  try {

    queryDict = await queryCollection(MentorRef, req.body);

    console.log("Success- mentors have been found!");
    res.status(200).json({ success: true, message: 'Mentors have been found' });
    return queryDict;

  } catch (error) {
    console.log("RAN INTO PROBLEM QUERYING MENTORS", error);
    res.status(500).json({ success: false, message: 'Error querying mentors' });
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

//get all Mentors

exports.getAllMentors = async (req, res) => {
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

      res.status(200).json({ success: true, message: 'Mentorship has been found', mentorData: mentorData });
      return mentorData;
    }

  } catch (error) {
    console.log("RAN INTO PROBLEM QUERYING INTERNSHIPS", error);
    res.status(500).json({ success: false, message: 'Error querying internships' });
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
