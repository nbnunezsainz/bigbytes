const admin = require("firebase-admin");
const { doc, setDoc } = require("firebase/firestore");

const db = admin.firestore();

exports.addInternship = async (req, res) => {
  try { //needs to be related to a mentor!
    const internshipData = req.body;
    const internshipRef = doc(db, "Internship");
    
    const data = {
      Title: internshipData.title,
      Company: internshipData.company,
      Description: internshipData.description,
      Location: internshipData.location,
      Pay: internshipData.pay,
      Category: internshipData.category,
      Qualifications: internshipData.tags,
      URL: internshipData.url,
      RefferalLimit: internshipData.refferalLimit,
      ApplicationCounter: 0,
      Display: true,
    };

    await setDoc(internshipRef, data);
    console.log("Success- a new internship has been added!");
    res.status(200).json({ success: true, message: 'Internship added successfully' });
  } catch (error) {
    console.log("There was some error when adding internship", error);
    res.status(500).json({ success: false, message: 'Error adding internship' });
  }
};

exports.queryInternships = async (req, res) => {
  const { field, filter, target } = req.body;
  try {
    // Implement queryCollection function logic here
    // Return the result using res.status().json()
  } catch (error) {
    console.log("RAN INTO PROBLEM QUERYING INTERNSHIPS", error);
    res.status(500).json({ success: false, message: 'Error querying internships' });
  }
};

exports.deleteInternship = async (req, res) => {
  try {
    const internshipID = req.params.internshipID;
    // Implement deleteDocument function logic here
    res.status(200).json({ success: true, message: 'Internship deleted successfully' });
  } catch (error) {
    console.log("There was some error when deleting internship", error);
    res.status(500).json({ success: false, message: 'Error deleting internship' });
  }
};

exports.getInternship = async (req, res) => {
  try {
    const internshipID = req.params.internshipID;
    // Implement getDocument function logic here
    // Return the result using res.status().json()
  } catch (error) {
    console.log("RAN INTO PROBLEM LOOKING FOR INTERNSHIP", error);
    res.status(500).json({ success: false, message: 'Error looking for internship' });
  }
};
