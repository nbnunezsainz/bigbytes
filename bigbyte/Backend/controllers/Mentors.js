const {db,admin} =require('../FireBaseSetUp.js');

//add a Mentr --> takes mentorData in json format (FirstName: John, LastName: Smith)
exports.addMentor = async (req,res, UserUID) =>{
  try 
  {

    const MentorData = {
        // Retrieve data from req.body
        FirstName: req.body.firstName,
        LastName: req.body.lastName,
        Company: req.body.company,
        Bio: req.body.bio || null,
        MentorStatus: req.body.mentorStatus || false,
        LinkedIn: req.body.linkedIn || null,
    };

    await db.collection('Mentor').doc(userDetails.uid).set(MentorData);

    console.log("Success- a new mentor has been added!");
  } catch (error) 
  {
    console.log("There was some error when adding mentor");
    console.log(error);
  }
}

//query all Mentors based on a specific field, filtering technique, and target value
exports.queryMentors = async(field, filter, target) =>
{
  return queryCollection("Mentor", field, filter, target);
}

//delete a Mentor --> takes user ID
exports.deleteMentor = async(mentorID)  =>{
  deleteDocument("Mentor", mentorID);
}

//find a Mentor --> takes mentor ID and returns mentor data in json format (FirstName: John, LastName: Smith)
exports.getMentor = async(req, resp) => {
    try {
      const mentorID = req.params.mentorID;
  
      const mentorRef = db.collection("Mentor").doc(mentorID);
      const mentorSnapshot = await mentorRef.get();
  
      if (mentorSnapshot.exists) {
        const mentorData = mentorSnapshot.data();
        return resp.status(200).json({ success: true, mentorData });
      } else {
        console.log("MENTOR NOT FOUND");
        return resp.status(404).json({ success: false, message: "Mentor not found" });
      }
    } catch (error) {
      console.log("RAN INTO PROBLEM LOOKING FOR MENTOR", error);
      return resp.status(500).json({ success: false, message: "Error looking for mentor" });
    }
  }
