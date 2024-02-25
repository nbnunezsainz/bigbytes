
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
exports.createCustomToken = async (req, res) => { //send token on signup/login
    try {
      // Create custom token with additional claims
      const customToken = await admin.auth().createCustomToken(req.userRecord.uid);
      res.status(200).json({ success: true, customToken });
    } catch (error) {
      console.error('Error creating custom token:', error);
      res.status(500).json({ success: false, message: 'Error creating custom token' });
    }
  };

  exports.verifyToken = async (req, res, next) => {
    try {
      // Get the ID token from the request headers or query parameters
      const idToken = req.headers.authorization;
  
      if (!idToken) {
        return res.status(403).json({ success: false, message: 'No token provided' });
      }
  
      // Verify the ID token
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      req.user = decodedToken; //this now holds data about user we can query/find out 
  
      // Optionally, you can access custom claims from the decoded token
     // const { premiumAccount } = decodedToken;
  
      // If the verification is successful, proceed to the next middleware
      //req.user = decodedToken;
      next();
    } catch (error) {
      console.error('Error verifying token:', error);
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }
  };
  
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
        uid:req.body.uid,
        student:req.body.student, //bool
        menntor:req.body.mentor, //bool
        
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
