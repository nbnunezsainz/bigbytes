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
      Pay: internshipData.pay || null,
      Category: internshipData.category || [],
      URL: internshipData.url,
      ReferalLimit: internshipData.referralLimit,
      MentorID: internshipData.mentorID,

      //not provided by entered data
      ApplicationCounter: 0,
      Display: true,
      Status: Constants.INTERNSHIP_STATUS_OPEN,
    };

    // add the internship with a random ID
    await InternshipRef.add(data);

    console.log("Success- a new internship has been added!");

    // unneccesary as the only result needed is from generateInternship in Mentors.js (which this function is solely called from)
    //res.status(200).json({ success: true, message: 'Internship added successfully' });
  } catch (error) {
    console.log("There was some error when adding internship", error);
  }
};

//query ALL Internships based on a specific field, filtering technique, and target value --> returns dictionary of ALL internship IDs to their data
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
        // Add the document data to the array only if it's display flag is set to true
        let data = doc.data();
        if (data.Display) {
          internshipData.push({ id: doc.id, ...data });
        }
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
// THIS CODE IS ESSENTIALLY USELESS NOW! TO ENSURE OUR DATA IS SECURE, WE HAVE COMMENTED THE deleteDocument() FUNCTION
exports.deleteInternship = async (req, res) => {
  try {
    let internshipID = req.body.id;

    //const result = await deleteDocument(InternshipRef, internshipID);
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



/*
Below includes functions solely for testing. These will NOT be included 
*/
const internshipData = require('../TestDataGeneration/testInternshipData.js');
exports.generateTestInternsip = async (req, res) => {
  try {
    console.log("The length of the test data is: " + internshipData.internships.length);

    internshipData.internships.forEach((internship) => {
      this.addInternship(internship, "");
    })

    res.status(200).json({ success: true, message: 'Was able to do user testing correctly' });
  } catch (error) {
    console.log("oops something went wrong")
    res.status(500).json({ success: false, message: 'Something went wrong when testing user data' });
  }
}