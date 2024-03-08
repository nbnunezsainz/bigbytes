
const { uploadBytes, ref, deleteObject, getDownloadURL, listAll } = require('firebase/storage');
const { db, admin, bucket, storage } = require('../FireBaseSetUp.js');
const Constants = require('./databaseConstant.js');
const { queryCollection, deleteDocument, getDocument } = require('./databaseFunctions.js');

exports.getAllResumes = async (req, res) => {  
    try {
        const resumeRef = await ref(storage, Constants.STORAGE_RESUME);
        const allResumes = await listAll(resumeRef);
        let resumes = [];
  

        for (const doc of allResumes.items) {
            let url = await getDownloadURL(doc);
            resumes.push({ userID: doc.name, URL: url });
        }
        

        res.status(200).json({ success: true, message: 'Succes when returning all resumes', resumes: resumes });
        //                                                 return resumes;

    } catch (error) {
        
        console.log(error);
        res.status(500).json({ success: false, message: 'Error when getting all resumes' });
    }
}

/* 
function to retrive ONE resume --> returns the URL to view their resume
req must contain the following:
- userID of the user whose resume is to be returned
*/
exports.getResume = async (req, res) => {
    try {
        let pathName = Constants.STORAGE_RESUME + req.body.userID;
        console.log(pathName)
        const resumeRef = ref(storage, pathName);
        const URL = await getDownloadURL(resumeRef);

        res.status(200).json({ success: true, message: 'Succes when getting resume' });
        return URL;

    } catch (error) {
        console.log("an error happened:");
        console.log(error);
        res.status(500).json({ success: false, message: 'Error getting resume' });
    }
}

exports.deleteResume = async (req, res) => {
    try {
        let pathName = Constants.STORAGE_RESUME + req.body.userID;
        const resumeRef = ref(storage, pathName);

        await deleteObject(resumeRef);

        res.status(200).json({ success: true, message: 'Succes when deleting resume' });
    } catch (error) {
        console.log("an error happened:");
        console.log(error);
        res.status(500).json({ success: false, message: 'Error deleting resume' });
    }
}

/* 
function for a user to upload a resume
req must contain the following:
- resume file that is stored in req.files.Resume.data (file must be renamed to "Resume")
- userID that contains the user's unique ID which will serve as the resume's internal file name
*/
exports.uploadResume = async (req, res) => {
    try {
        let pathName = Constants.STORAGE_RESUME + req.body.userID;
        const resumeRef = ref(storage, pathName);
        const metadata = {
            contentType: "application/pdf"
        };
        await uploadBytes(resumeRef, req.files.Resume.data, metadata);
        res.status(200).json({ success: true, message: 'Succes when getting resume' });
    } catch (error) {
        console.log("an error happened:");
        console.log(error);
        res.status(500).json({ success: false, message: 'Error posting resume' });

    }
}

//CHANGE THIS FUNCTION
// exports.getAllResumesAndCorrespondingComments = async (req, res) => {
//     try {
//         let pathName = Constants.STORAGE_RESUME + req.body.userID;
//         const resumeRef = ref(storage, pathName);
//         const URL = await getDownloadURL(resumeRef);
//
//         res.status(200).json({ success: true, message: 'Success when getting resume' });
//         return URL;
//
//     } catch (error) {
//         console.log("an error happened:");
//         console.log(error);
//         res.status(500).json({ success: false, message: 'Error getting resume' });
//     }
// }

//getAllResumes and comments
//everytime a comment is collected

exports.getAllResumesWithComments = async () => {
   // try {
        // Get all resumes
        const resumesSnapshot = await db.collection('User').get();

      //  console.log("testing");
        console.log(resumesSnapshot);

        // Array to store resumes with comments
    //     const resumesWithComments = [];
    //
    //     // Iterate through each resume document
    //     for (const resumeDoc of resumesSnapshot.docs) {
    //         const resumeData = resumeDoc.data();
    //         const resumeId = resumeDoc.id;
    //
    //         console.log(resumeId)
    //
    //         // Get comments for the current resume
    //         const commentsSnapshot = await db
    //             .collection('resume_comments')
    //             .where('resumeId', '==', resumeId)
    //             .get();
    //
    //         // Array to store comments for the current resume
    //         const comments = [];
    //
    //         // Iterate through each comment document
    //         commentsSnapshot.forEach((commentDoc) => {
    //             const commentData = commentDoc.data();
    //             comments.push({
    //                 id: commentDoc.id,
    //                 ...commentData,
    //             });
    //         });
    //
    //         // Add resume with comments to the array
    //         resumesWithComments.push({
    //             id: resumeId,
    //             ...resumeData,
    //             comments: comments,
    //         });
    //     }
    //
    //     // Return the array of resumes with comments
    //     return resumesWithComments;
    //  } //catch (error) {
    //     console.error('Error retrieving resumes with comments:', error);
    //     return [];
    // }


};

//alter this too then
//needs to take in a RESUME URl - still need to make work

//DON'T CURRENTLY KNOW IF POST REQUEST SHOULD ONLY CONTAIN body or body + exactly which resume
exports.commentOnAResume= async (req, res) => {
    try {
        //receives resumeURL from frontend. (where we get req.body.userID).   [ path: resume/[frontend] ]
        //TO DO: once front end connected - uncomment 2 lines below
        let pathName = Constants.STORAGE_RESUME + req.body.userID;
       // const CommentsRef = ref(storage, pathName);
        //const URL = await getDownloadURL(CommentsRef);
        const {resumeComment} = req.body;

        if (!resumeComment){
            res.status(500).json({success:false, message: "No comment provided"});
        }


        //data to add to collection
        //TO DO:  should add resume uid or whatever to collection
        const newData = {
            comment: resumeComment,
            resume: "[would like to resume -- waiting for frontend uid]"
        };

        db.collection("Comments").add(newData);

        res.status(200).json({success:true, message:"Success adding comment"})

        //not needed: return URL

    } catch (error) {
        console.log("An Error Occurred:");
        console.log(error);
        res.status(500).json({ success: false, message: 'Error adding comment' });
    }
}