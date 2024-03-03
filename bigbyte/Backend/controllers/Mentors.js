const { getFirestore, Timestamp, FieldValue, Filter } = require('firebase-admin/firestore');
const { db, admin } = require('../FireBaseSetUp.js');
const Constants = require('./databaseConstant.js');
const { queryCollection, deleteDocument, getDocument } = require('./databaseFunctions.js');

// create and initialize a database reference to the "Internship" collection
const MentorRef = db.collection(Constants.COLLECTION_MENTORS);

//add a Mentor --> takes mentorData in json format (FirstName: John, LastName: Smith)
exports.addMentor = async (req, res) => {
  try {
    const mentorData = req.body;
    const mentorID = req.body.id;

    console.log(mentorData);

    const data = {
      // Retrieve data from req.body
      FirstName: mentorData.firstName,
      LastName: mentorData.lastName,
      Company: mentorData.company,
      Bio: mentorData.bio || null,
      MentorStatus: mentorData.mentorStatus || false,
      LinkedIn: mentorData.linkedIn || null,
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

    console.log(queryDict);
    console.log("Success- mentors have been found!");
    res.status(200).json({ success: true, message: 'Mentors have been found' });
    return queryDict;

  } catch (error) {
    console.log("RAN INTO PROBLEM QUERYING MENTORS", error);
    res.status(500).json({ success: false, message: 'Error querying mentors' });
  }
};

//deletes a mentor based on their ID
exports.deleteMentor = async (req, res) => {
  try {
    let mentorID = req.body.id;

    const result = await deleteDocument(MentorRef, mentorID);
    console.log(result)
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
    let mentorID = req.body.id;
    const mentor = await getDocument(MentorRef, mentorID);
    console.log(mentor)

    console.log("Success- mentor received!");
    res.status(200).json({ success: true, message: 'Internship mentor successfully' });
    return mentor;

  } catch (error) {
    console.log("RAN INTO PROBLEM LOOKING FOR MENTOR", error);
    res.status(500).json({ success: false, message: 'Error when getting mentor' });
  }
};
