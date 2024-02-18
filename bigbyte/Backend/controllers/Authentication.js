
const admin = require('firebase-admin');

// admin.initializeApp({
//     credential: admin.credential.cert(),
//     // Replace 'path/to/serviceAccountKey.json' with the actual path to your service account key file
//     // Or directly pass the credentials object if it's stored as a variable
// });

  exports.SignUp = async (req,res,next) =>
{
    console.log(req.body,"body");
    try {
        const { email, password } = req.body;

        // Create user using Firebase Admin SDK
        const userRecord = await admin.auth().createUser({
            email: email,
            password: password
        });

        console.log('Successfully created new user:', userRecord.uid);
        res.status(200).json({ message: 'User created successfully!' });
    } catch (error) {
        console.error('Error creating user:', error.message);
        res.status(500).json({ error: 'Error creating user' });
    }

}
exports.Login = async (req,res,next) =>
{
    try {
        console.log("hello");
        const { email, password } = req.body;

        // Create user using Firebase Admin SDK
        //const userCredential = await admin.auth().signInWithEmailAndPassword(email, password);
        //const token = await admin.auth().createCustomToken(userCredential.user.uid); 
        //need to handle token better



        // console.log('Successfully Login', userRecord.uid);
        console.log('Successfully Login');
        res.status(200).json({ message: 'User loginsuccessfully!' });
    } catch (error) {
        console.error('Error logging user:', error.message);
        res.status(500).json({ error: 'Error loggin in for user' });
    }

}
exports.RedirectToStore =(req,res) =>
{
    const frontendRedirectUrl='store';
    res.json({ redirectUrl: frontendRedirectUrl});
}