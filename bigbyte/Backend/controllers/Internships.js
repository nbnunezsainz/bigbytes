const { getFirestore, Timestamp, FieldValue, Filter } = require('firebase-admin/firestore');
const { db, admin } = require('../FireBaseSetUp.js');
const Constants = require('./databaseConstant.js');
const { queryCollection, deleteDocument, getDocument } = require('./databaseFunctions.js');
const { get } = require('../routes/InternShipRoutes.js');

// create and initialize a database reference to the "Internship" collection
const InternshipRef = db.collection(Constants.COLLECTION_INTERNSHIP);

// add an internship taking in a request
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
    res.status(200).json({ success: true, message: 'Internship added successfully' });
  } catch (error) {
    console.log("There was some error when adding internship", error);
    res.status(500).json({ success: false, message: 'Error adding internship' });
  }
};

//query all Internships based on a specific field, filtering technique, and target value
exports.queryInternships = async (req, res) => {
  try {
    let field = req.body.field;
    let filter = req.body.filter;
    let target = req.body.target;

    queryDict = queryCollection(InternshipRef, field, filter, target);

    console.log("Success- internship has been found!");
    res.status(200).json({ success: true, message: 'Internship has been found' });
    return queryDict;

  } catch (error) {
    console.log("RAN INTO PROBLEM QUERYING INTERNSHIPS", error);
    res.status(500).json({ success: false, message: 'Error querying internships' });
  }
};

exports.deleteInternship = async (req, res) => {
  try {
    let internshipID = req.body.id;

    const result = deleteDocument(InternshipRef, internshipID);

    console.log("Success- internship deleted!");
    res.status(200).json({ success: true, message: 'Internship deleted successfully' });
  } catch (error) {
    console.log("There was some error when deleting internship", error);
    res.status(500).json({ success: false, message: 'Error deleting internship' });
  }
};

exports.getInternship = async (req, res) => {
  try {
    let internshipID = req.body.id;
    const internship = await getDocument(InternshipRef, internshipID);

    console.log("Success- internship deleted!");
    res.status(200).json({ success: true, message: 'Internship received successfully' });
    console.log(internship);
    return internship;

  } catch (error) {
    console.log("RAN INTO PROBLEM LOOKING FOR INTERNSHIP", error);
    res.status(500).json({ success: false, message: 'Error when getting internship' });
  }
};