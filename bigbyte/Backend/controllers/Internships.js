const { getFirestore, Timestamp, FieldValue, Filter, collection, getDocs } = require('firebase-admin/firestore');
const { db, admin } = require('../FireBaseSetUp.js');
const Constants = require('./databaseConstant.js');
const { getDocument, filterHelper } = require('./databaseFunctions.js');
const { query } = require('express');

// create and initialize a database reference to the "Internship" collection
const InternshipRef = db.collection(Constants.COLLECTION_INTERNSHIP);
const MentorRef = db.collection(Constants.COLLECTION_MENTORS);
const MentorNotificationsRef = db.collection(Constants.COLLECTION_MENTORS_NOTIFICATIONS);
const UserRef = db.collection(Constants.COLLECTION_USERS);

// add an internship taking in a request --> SHOULD ONLY BE CALLED VIA generateInternship FROM MENTORS.JS
exports.addInternship = async (req, res) => {
  try {
    // initialize the body of response data to become the data
    const internshipData = req.body;
    const MentorID = req.user.uid;

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
      MentorID: MentorID, //how we link internships to a mentor

      //not provided by entered data
      ApplicationCounter: 0,
      Display: true,
      Status: Constants.INTERNSHIP_STATUS_OPEN,
    };

    // add the internship with a random ID
    const newInternshipRef = InternshipRef.doc();
    await newInternshipRef.set(data);

    return;

    // unneccesary as the only result needed is from generateInternship in Mentors.js (which this function is solely called from)
    //res.status(200).json({ success: true, message: 'Internship added successfully' });
  } catch (error) {

    res.status(500).json({ message: 'Internship was not created', success: false });
  }
};

exports.requestReferal = async (req, res) => {
  let student = req.student; //get usersname, and resume, and linkdln?

  const internshipID = req.query.internshipID;


  const internshipDoc = await InternshipRef.doc(internshipID).get();

  

  if (!internshipDoc) {
    return res.status(500).json({message:"create a profile", resume:false})
  }
  const mentorID = internshipDoc.data().MentorID;

  console.log(mentorID, "mentor");
  console.log(internshipDoc.data(), "doc")
  // Create a notification document for the mentor
  const notificationData = {
    mentorID: mentorID,
    studentID: student.userID,
    company: internshipDoc.data().Company || '',
    internshipURL: internshipDoc.data().URL || '',
    InternshipTitle: internshipDoc.data().Title || '',
    studentMajor: student.Major || '',
    GradYear: student.Year || '',
    studentOrganizations: student.Organizations || '',
    studentBio: student.Bio || '',
    Resume: student.Resume || '',
    message: `Referral request for your internship: ${internshipDoc.data().Title}`,
    status: "pending",
  };


  const newMentorNotificationsRef = MentorNotificationsRef.doc();
  await newMentorNotificationsRef.set(notificationData);

  updateInternshipData(internshipID,InternshipRef,internshipDoc.data());
  updateUserData(student.userID);


  //After this we want to update internship, and a users ReferalCount
  
  res.status(200).json({sucess:"sucess"})

}

//query ALL Internships based on a specific field, filtering technique, and target value --> returns dictionary of ALL internship IDs to their data
exports.getAllInternships = async (req = null, res = null) => {
  try {
    let data = await InternshipRef.get();

    let internshipData = {};

    console.log(res, "res2");
    data.forEach(internship => {
      internshipData[internship.id] = internship.data();
    });

    console.log(res, "res");
    if (res != null) {
      res.status(200).json({ success: true, message: 'Internship has been found', internshipData: internshipData });
    }
    return internshipData;

  } catch (error) {
    console.log("RAN INTO PROBLEM QUERYING INTERNSHIPS", error);
    if (res != null) {
      res.status(500).json({ success: false, message: 'Error querying internships' });
    }
  }
}

/*compound/complex querying of internships based on a specific field(s), filtering technique(s), and target value(s) --> returns dictionary of internship IDs to their data
ALL parameters of query should be passed (Company, Category, Pay, Location). Empty values will be disregarded.

Please refer to the project structure document for the field, filter, and target restrictions
*/
exports.queryInternships = async (req, res) => {
  try {
    let queryDict = {};
    let paramList = cleanQuery(req.query);
    const keyNames = Object.keys(paramList);

    if (keyNames.length == 0) {
      console.log("no params")
      queryDict = await this.getAllInternships();
    } else {
      queryDict = await filterHelper(InternshipRef, paramList);
    }

    res.status(200).json({ success: true, message: 'Internships have been found', internshipData: queryDict });
    return queryDict;

  } catch (error) {
    console.log("RAN INTO PROBLEM QUERYING INTERNSHIPS", error);
    res.status(500).json({ success: false, message: 'Error querying internships' });
  }
};

const cleanQuery = (query) => {
  let updatedQuery = query;
  const keyNames = Object.keys(updatedQuery);

  for (let i = 0; i < keyNames.length; i++) {
    let currKey = keyNames[i];
    let q = updatedQuery[currKey];
    if ((currKey == "Location" && q.length == 0) || (q == '')) {
      delete updatedQuery[currKey];
    }
  }

  Object.keys(updatedQuery).forEach((key) => {

    let tar = updatedQuery[key];
    let fil = "==";

    if (key == "Category") {
      fil = "array-contains"
    }
    if (key == "Pay") {
      fil = ">=";
      tar = parseInt(tar);
    }

    updatedQuery[key] = {
      field: key,
      filter: fil,
      target: tar,
    };
  });
  return updatedQuery;
}

// find and return an internship dictionary that relates their ID to thier data
exports.getInternship = async (req, res) => {
  try {
    //MentorID
    //Get all Intenrships that relate to Mentor
    const userID = req.user.uid;

    const MentorInternships = await InternshipRef.where('MentorID', '==', userID).get(); 
    const internships = [];

    // Iterate over the documents in the snapshot
    MentorInternships.forEach(doc => {
        const data = doc.data();
        // Construct the internship object with relevant data
        const internship = {
            id: doc.id, // Document ID
            data:data,// Other fields...
        };
        internships.push(internship); // Push the internship object to the array
    });

    res.status(200).json({message:"Resumes Found", internships:internships})

   
  } catch (error) {
    
    res.status(500).json({ success: false, message: 'Error when getting internship' });
  }
};


//deletes an internship based on their ID
// THIS CODE IS ESSENTIALLY USELESS NOW! TO ENSURE OUR DATA IS SECURE, WE HAVE COMMENTED THE deleteDocument() FUNCTION
exports.deleteInternship = async (req, res) => {
  try {
    let internshipID = req.user.id;
    const InternshipRef = db.collection(Constants.COLLECTION_INTERNSHIP);
    let internshipData = await getDocument(InternshipRef, internshipID);
    internshipData = internshipData[internshipID];

    updateInternshipData(internshipID,InternshipRef,internshipData);

    //const result = await deleteDocument(InternshipRef, internshipID);
    console.log("Success- internship deleted!");
    res.status(200).json({ success: true, message: 'Internship deleted successfully' });
  } catch (error) {
    console.log("There was some error when deleting internship", error);
    res.status(500).json({ success: false, message: 'Error deleting internship' });
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


/*
Below includes functions solely for testing. These will NOT be included 
*/
/*
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
*/
