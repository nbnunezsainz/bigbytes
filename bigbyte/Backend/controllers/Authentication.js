

const { signInWithEmailAndPassword , getIdToken,onAuthStateChanged} = require('firebase/auth');

const { Clientauth } = require('../fb.js');

const { db, admin } = require('../FireBaseSetUp.js');
const Constants = require('./databaseConstant.js');
const UserRef = db.collection(Constants.COLLECTION_USERS);


// create and initialize a database reference to the "Internship" collection
const MentorRef = db.collection(Constants.COLLECTION_MENTORS);



exports.SignUp = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(500).json({ message: "Entor a valid email or password" });
  }
  const userRecord = await admin.auth().createUser({
    email: email,
    password: password
  });

  console.log(req.body, "info");
  console.log(userRecord, "userRecord");
  const frontendRedirectUrl = '/UserData';
  if (userRecord) {
    const customToken = await admin.auth().createCustomToken(userRecord.uid);

    const cookieOptions = {
      httpOnly: true, // The cookie is not accessible to client-side scripts
      secure: true,   // The cookie will be sent only over HTTPS
      maxAge: 3600000 // The cookie will expire after 1 hour
    };

    // Set the cookie
    res.cookie('jwtToken', token, cookieOptions);
    res.status(200).json({ success: true, customToken, redirectUrl: frontendRedirectUrl });
    next();
  }
  else
    res.status(500).json({ success: false, message: "error in signup, provide correct credintals" });


}

exports.createCustomToken = async (req, res, next) => { //send token on signup/login
  try {
    // Create custom token with additional claims
    const customToken = await admin.auth().createCustomToken(req.userRecord.uid);
    res.status(200).json({ success: true, customToken });
    next();
  } catch (error) {
    console.error('Error creating custom token:', error);
    res.status(500).json({ success: false, message: 'Error creating custom token' });

  }
};

exports.verifyToken = async (req, res, next) => {
  try {
    // Check if the Authorization header is present
    if (!req.headers.authorization) {
      return res.status(401).json({ success: false, message: 'No authorization token provided' });
    }

    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({ success: false, message: 'Unauthorized: No token provided' });
    }

    // Verify the token
    const decodeValue = await admin.auth().verifyIdToken(token);
    if (decodeValue) {
      req.user = decodeValue;
      next(); // Proceed to the next middleware/function
    } else {
      // Token is invalid
      res.status(401).json({ success: false, message: "Unauthorized: Invalid token" });
    }
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(401).json({ success: false, message: 'Unauthorized: Authentication failed', error: error.message });
  }
};



  exports.DetermineuserType = async (req, res, next) => {
    let userID = req.user.uid;
  
  
    let doc = await UserRef.doc(userID).get();
    if (!doc.exists) { //not a user collection check mentor
      let doc2 = await MentorRef.doc(userID).get();
   
       if(!doc2.exists) //not a mentor either
       {
        return res.status(500).json({message:"error user does not exist in system"})
       }
       res.status(200).json({user:"mentor"});
       return;

    }
    console.log("here");
    res.status(200).json({user:"studet"});
  }

   

exports.CreateDetailsAboutUser = async (req, res) => {
  User = req.user.uid; // got this from verifytoken function

  //need to get the token to verify who a user is first too.
  console.log(req.body.UserStatus, "statuss");
  if (req.body.UserStatus == "student") {
    let userDetails = {
      FirstName: req.body.firstName,
      LastName: req.body.lastName,
      Major: req.body.major,
      Year: req.body.year,
      Bio: req.body.bio || null,
      Organizations: req.body.organizations || [],
      LinkedIn: req.body.linkedIn || null,
      Resume: req.body.resume || null,
      //RefferalCount: 20, This is for internships
      uid: User,
      UserStatus: req.body.UserStatus, //tells us if user or student
      // student:req.body.student, //bool
      // mentor:req.body.mentor, //bool


    };
    try {


      const UsersRef = db.collection('User'); //this did not give deprecation error
      UsersRef.doc(User).set(userDetails);

      //await db.collection('User').doc(req.body.uid).set(userDetails);

      res.status(200).json({ success: true, message: 'User data added correctly' });

    } catch (error) {
      console.error('Error signing up and creating user details:', error);
      res.status(500).json({ success: false, message: 'Error signing up and creating user details' });
    }


  }
  else {
    let userDetails = {
      FirstName: req.body.firstName,
      LastName: req.body.lastName,
      Major: req.body.major,
      Year: req.body.year,
      Bio: req.body.bio || null,
      Organizations: req.body.organizations || [],
      LinkedIn: req.body.linkedIn || null,
      Resume: req.body.resume || null,
      //RefferalCount: 20, This is for internships
      uid:User,
      UserStatus: req.body.UserStatus, //tells us if user or student
      // student:req.body.student, //bool
      // mentor:req.body.mentor, //bool

    };
    try {

      // Add a new document in collection "USER" with ID Corresponding to UID, 

      await db.collection('Mentor').doc(User).set(userDetails);

      res.status(200).json({ success: true, message: 'User data added correctly' });

    } catch (error) {
      console.error('Error signing up and creating user details:', error);
      res.status(500).json({ success: false, message: 'Error signing up and creating user details' });
    }
  }
  // next(); Ideally redirect us to the next page


}

exports.Login = async (req, res, next) => {
  const { email, password } = req.body;

  console.log(req.body);

  try {
    // Sign in the user with Firebase Authentication
    const userCredential = await signInWithEmailAndPassword(Clientauth, email, password);
    console.log("here");
    const user = userCredential.user;

   


    //const customToken = await admin.auth().createCustomToken(user.uid);


    // If login is successful, return user data
    // res.json({ token: customToken , success:true});
    res.json({ success:true});
    next();

  } catch (error) {
    // If there's an error, return an error message
    console.log(error);
    res.status(401).json({ sucess:false, message: 'Authentication failed. Please check your credentials.' });
  }

}
//signout functionality....... test this more. see how to use in postman
//build in login rout

exports.SignOut = async (req, res) => {
  try {
    if (req.user) {
      await admin.auth().revokeRefreshTokens(req.user.uid);
      res.json(
          {message: 'User successfully signed out'}
      );
    } else {
      res.status(401).json(
          { message: 'user not authenticated'});
    }
  } catch (e) {
    res.status(500).json(
        {
          message: 'error: user wont sign out',
        });

  }

};
exports.RedirectToStore = (req, res) => {
  const frontendRedirectUrl = '/store';
  res.json({ data: "SingUp successful", redirectUrl: frontendRedirectUrl });
}
exports.RedirectToInternships = (req, res) => {
  //const frontendRedirectUrl = '/store';
  res.json({success: false, redirectUrl: frontendRedirectUrl });
}