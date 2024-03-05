

const { signInWithEmailAndPassword , Auth} = require('firebase/auth');

const { Clientauth } = require('../fb.js');

const { db, admin } = require('../FireBaseSetUp.js');



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
    // Get the ID token from the request headers or query parameters

    console.log(req.header, "header");
    const idToken = req.header('Authorization'); //.replace('Bearer', '').trim();

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

exports.CreateDetailsAboutUser = async (req, res) => {
  //const db = admin.firestore();
  User = req.user; // got this from verifytoken function

  //need to get the token to verify who a user is first too.
  if (req.body.UserStatus == "Student") {
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
      uid: req.body.uid,
      UserStatus: req.body.UserStatus, //tells us if user or student
      // student:req.body.student, //bool
      // mentor:req.body.mentor, //bool


    };
    try {


      const UsersRef = db.collection('User'); //this did not give deprecation error
      UsersRef.doc(req.body.uid).set(userDetails);

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
      //uid:req.body.uid,
      UserStatus: req.body.UserStatus, //tells us if user or student
      // student:req.body.student, //bool
      // mentor:req.body.mentor, //bool

    };
    try {

      // Add a new document in collection "USER" with ID Corresponding to UID, 
      await db.collection('User').doc(User.uid).set(userDetails);

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

    console.log(user);



    const customToken = await admin.auth().createCustomToken(user.uid);

    console.log(user);

    // If login is successful, return user data
    res.json({ token: customToken , success:true});
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