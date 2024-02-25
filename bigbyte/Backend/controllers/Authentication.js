
//const { initializeApp } = require('firebase-admin/app');

// admin.initializeApp({
//     credential: admin.credential.cert(),
//     // Replace 'path/to/serviceAccountKey.json' with the actual path to your service account key file
//     // Or directly pass the credentials object if it's stored as a variable
// });

var admin = require("firebase-admin");

var serviceAccount = require("../lbackend-7a432-firebase-adminsdk-33j4d-8f2d1af191.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://lbackend-7a432-default-rtdb.firebaseio.com"
});

  exports.SignUp = async (req,res,next) =>
{
    const {email,password } = req.body;
    const userRecord = await admin.auth().createUser({
        email: email,
        password: password
      });
      req.userRecord = userRecord; // Pass userRecord to the next middleware
      //res.status(200).json({ success: true, uid: userRecord.uid });
      next();

}

exports.CreateDetailsAboutUser = async (req,res) =>
{
    const db = admin.firestore();
    const userDetails = {
        FirstName: req.body.firstName,
        LastName: req.body.lastName,
        Major: req.body.major,
        Year: req.body.year,
        Bio: req.body.bio || null,
        Organizations: req.body.organizations || [],
        LinkedIn: req.body.linkedIn || null,
        Resume: req.body.resume || null,
        RefferalCount: 20,
        uid:req.body.uid
    };
    console.log(userDetails.uid);
    //const userRecord = req; //userRecord.uid

    try{
        
        // Add a new document in collection "USER" with ID Corresponding to UID
        await db.collection('User').doc(userDetails.uid).set(userDetails);
       
        res.status(200).json({ success: true, message: 'User data added correctly' });

    } catch (error) {
        console.error('Error signing up and creating user details:', error);
        res.status(500).json({ success: false, message: 'Error signing up and creating user details' });
    }
}

exports.Login = async (req,res,next) =>
{
   

}

exports.RedirectToStore =(req,res) =>
{
    const frontendRedirectUrl='store';
    res.json({ redirectUrl: frontendRedirectUrl});
}
