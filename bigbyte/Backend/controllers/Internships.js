const { getFirestore, Timestamp, FieldValue, Filter, collection, getDocs } = require('firebase-admin/firestore');
const { db, admin } = require('../FireBaseSetUp.js');
const Constants = require('./databaseConstant.js');
const { queryCollection, deleteDocument, getDocument } = require('./databaseFunctions.js');

// create and initialize a database reference to the "Internship" collection
const InternshipRef = db.collection(Constants.COLLECTION_INTERNSHIP);

// add an internship taking in a request --> SHOULD ONLY BE CALLED VIA generateInternship FROM MENTORS.JS
exports.addInternship = async (req, res) => {
  try {
    // initialize the body of response data to become the data
    const internshipData = req.body;
    const data = {
      //input all data from req.body json object
      Title: internshipData.title,
      Company: internshipData.company,
      Description: internshipData.description,
      Location: internshipData.location,
      Pay: internshipData.pay,
      Category: internshipData.category || [],
      Qualifications: internshipData.tags,
      URL: internshipData.url,
      RefferalLimit: internshipData.refferalLimit,
      MentorID: internshipData.mentorID,

      //not provided by entered data
      ApplicationCounter: 0,
      Display: true,
      Status: Constants.INTERNSHIP_STATUS_OPEN,
    };

    // add the internship with a random ID
    await InternshipRef.add(data);

    console.log("Success- a new internship has been added!");

    // unneccesary as the only result needed is from generateInternship (which this function is solely called from)
    //res.status(200).json({ success: true, message: 'Internship added successfully' });
  } catch (error) {
    console.log("There was some error when adding internship", error);
  }
};

//query ALL Internships based on a specific field, filtering technique, and target value --> returns dictionary of internship ID to their data
exports.getAllInternships = async (req, res) => {
  try {

    console.log(req.user, "user");

    let internships = [];
    internships = await InternshipRef.get();

    console.log(internships, "intenrships");
    if (!internships.empty) {
      // Create an array to hold the internship data
      let internshipData = [];

      // Iterate over each document in the QuerySnapshot
      internships.forEach(doc => {
        // Add the document data to the array
        // Each document's data is accessed with the .data() method
        internshipData.push({ id: doc.id, ...doc.data() });
      });

      // console.log(internshipData, "Success- internship has been found!");
      res.status(200).json({ success: true, message: 'Internship has been found', internshipData: internshipData });
    }

  } catch (error) {
    console.log("RAN INTO PROBLEM QUERYING INTERNSHIPS", error);
    res.status(500).json({ success: false, message: 'Error querying internships' });
  }
}

//query internships based on a specific field, filtering technique, and target value --> returns dictionary of internship ID to their data
exports.queryInternships = async (req, res) => {
  try {

    queryDict = await queryCollection(InternshipRef, req.body);

    console.log(queryDict);
    console.log("Success- internships have been found!");
    res.status(200).json({ success: true, message: 'Internships have been found' });
    return queryDict;

  } catch (error) {
    console.log("RAN INTO PROBLEM QUERYING INTERNSHIPS", error);
    res.status(500).json({ success: false, message: 'Error querying internships' });
  }
};

//deletes an internship based on their ID
exports.deleteInternship = async (req, res) => {
  try {
    let internshipID = req.body.id;

    const result = await deleteDocument(InternshipRef, internshipID);
    console.log(result)
    console.log("Success- internship deleted!");
    res.status(200).json({ success: true, message: 'Internship deleted successfully' });
  } catch (error) {
    console.log("There was some error when deleting internship", error);
    res.status(500).json({ success: false, message: 'Error deleting internship' });
  }
};

// find and return an internship dictionary that relates their ID to thier data
exports.getInternship = async (req, res) => {
  try {
    let internshipID = req.body.id;
    const internship = await getDocument(InternshipRef, internshipID);
    console.log(internship)

    console.log("Success- internship received!");
    res.status(200).json({ success: true, message: 'Internship received successfully' });
    return internship;

  } catch (error) {
    console.log("RAN INTO PROBLEM LOOKING FOR INTERNSHIP", error);
    res.status(500).json({ success: false, message: 'Error when getting internship' });
  }
};