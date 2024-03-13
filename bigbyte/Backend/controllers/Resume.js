
const { uploadBytes, ref, deleteObject, getDownloadURL, listAll } = require('firebase/storage');
const { db, admin, bucket, storage } = require('../FireBaseSetUp.js');
const Constants = require('./databaseConstant.js');
const { queryCollection, deleteDocument, getDocument } = require('./databaseFunctions.js');
//import React, { useState } from 'react';

const ResumeRef = db.collection(Constants.Collection_RESUME );
const CommentRef = db.collection(Constants.Collection_COMMENTS);
const Resume_CommentsRef = db.collection(Constants.Collection_RESUME_COMMENTS);
const UserRef = db.collection(Constants.COLLECTION_USERS);

exports.getAllResumes = async (req, res) => {  
    try {
        const resumeRef = ref(storage, Constants.STORAGE_RESUME); 
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
        userData =req.userData;
        console.log(req.user.uid, "his")
        if (userData.Resume ===false)
        {
            return res.status(200).json({ success: true, user: userData });
        }

        let pathName = Constants.STORAGE_RESUME + req.user.uid;
        const resumeRef = ref(storage, pathName);
        const URL = await getDownloadURL(resumeRef);
       
            return res.status(200).json({ URL: URL, success: true, user: userData });
  
    } catch (error) {

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
        let pathName = Constants.STORAGE_RESUME + req.user.uid;
        const resumeStorageRef = ref(storage, pathName);
        const metadata = {
            contentType: "application/pdf"
        };
        const UploadResult =await uploadBytes(resumeStorageRef, req.files.resume.data, metadata); //add to storage 
        
        const DownloadUrl = await getDownloadURL(UploadResult.ref);
        const resumeData = {
            uid: req.user.uid,
            storagePath: pathName,
            DownloadUrl: DownloadUrl, // Reference to the file in the storage
            
            // Add other relevant metadata here
        };
        await ResumeRef.doc(req.user.uid).set(resumeData);

        //Update Resume to be true for userProfile
           
        const  UserData= {
            Resume:true
            // Construct resume data here based on user data if needed
            // Example: resumeName: userData.name, resumeEmail: userData.email, etc.
        };
        await UserRef.doc(req.user.uid).set(UserData, { merge: true });

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


//link 1 resume to list of all comments associated with it
exports.getAllResumesWithComments = async (req,res) => {
    try {
        
            // Get all resumes
            const resumeRef = ref(storage, Constants.STORAGE_RESUME); 
            const allResumes = await listAll(resumeRef);
            let resumePromises = allResumes.items.map(async (itemRef) => {
                let url = await getDownloadURL(itemRef);
                const resumeID = itemRef.name; // Adjust according to your ID mapping
                return { userID: resumeID, URL: url };
            });
            let resumes = await Promise.all(resumePromises);

            // Fetch comments for all resumes in parallel
            let resumeCommentsPromises = resumes.map(async (resume) => {
                const commentsRef = Resume_CommentsRef.doc(resume.userID);
                const commentsSnapshot = await commentsRef.get();
                const comments = [];
    
                if (commentsSnapshot.exists) {
                    const commentIDs = commentsSnapshot.data().commentIDs || [];
                    const commentFetchPromises = commentIDs.map(async (commentID) => {
                        const commentDoc = await CommentRef.doc(commentID).get();
                        return commentDoc.exists ? commentDoc.data() : null;
                    });
                    const fetchedComments = await Promise.all(commentFetchPromises);
                    return { ...resume, comments: fetchedComments.filter(comment => comment !== null) };
                } else {
                    return resume; // No comments
                }
            });
            let resumesWithComments = await Promise.all(resumeCommentsPromises);
            console.log(resumesWithComments, "resumewithcommentss");
            res.status(200).json({ success: true, resumesWithComments:resumesWithComments });


        // // Get all resumes
        // const resumeRef = ref(storage, Constants.STORAGE_RESUME); 
        // const allResumes = await listAll(resumeRef);
        // let resumes = [];
        // for (const itemRef of allResumes.items) {
        //     let url = await getDownloadURL(itemRef);
        //     // Assuming doc.name or a portion of it can act as resumeID
        //     const resumeID = itemRef.name; // or however you map this to your Firestore doc IDs
        //     resumes.push({ userID: resumeID, URL: url }); // Store basic resume data first
        // }
        // let resumesWithComments = [];
        // for (let resume of resumes) {
        //     const commentsRef = Resume_CommentsRef.doc(resume.userID);
        //     const commentsSnapshot = await commentsRef.get();
            
        //     if (commentsSnapshot.exists) {
        //         const commentIDs = commentsSnapshot.data().commentIDs || [];
        //         const comments = [];

        //         // Fetch each comment using its ID
        //         for (let commentID of commentIDs) {
        //             const commentDoc = await CommentRef.doc(commentID).get();
        //             if (commentDoc.exists) {
        //                 comments.push(commentDoc.data()); // Add full comment data
        //             }
        //         }

        //         resumesWithComments.push({ ...resume, comments });
        //     } else {
        //         // If there are no comments, just add the resume info
        //         resumesWithComments.push(resume);
        //     }
        // }

        //console.log(resumesWithComments, "resumewithcommentss");

        // Send back the data
        //res.status(200).json({ success: true, resumesWithComments:resumesWithComments });
    } catch (error) {
        console.log("Error fetching resumes with comments:", error);
        res.status(500).json({ success: false, message: 'Error fetching resumes with comments', error: error.toString() });
    }



        //const resumesSnapshot = await db.collection('ResumeWithComments').get();

      //  console.log("testing");
       /// console.log(resumesSnapshot);

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

//connect resume to all comments
// exports.connectResumeToAllComments= async (req,res) => {
//     try{
//         //iterate through Comments collection
//         // new resumes never seen before added to 'ResumeWithComments' collections
//         // every time you see the same resume, keep adding to 'message' which is a list of all messages for
//         // that specific resume
//
//         const newData = {
//             comment: resumeComment,
//             resume: "[would like to resume -- waiting for frontend uid]"
//         };
//         const resumeRef = db.collection('ResumeWithComments').doc();
//
//
//
//
//     } catch (error) {
//
//     }
// }
//


//const {dict, alreadyAdded} = true;

//connect individual resume to allComments associated with it and publish on firebase
//issues: can still add same data multiple times
exports.connectResumeToAllComments = async (req,res) => {

       try {

           const {whichResume} = req.body;
           const myDictionary = {};
           const comments = await db.collection("Comments").get();

           //const [count, setCount] = useState(0);


           myDictionary[whichResume] = [];
           comments.forEach((doc) => {
               const commentData = doc.data();
               if (whichResume === commentData.resume) {
                   myDictionary[whichResume].push(commentData.comment);
               }

           });

           //add to collection
           const newData = {
               resume: whichResume,
               comment: myDictionary[whichResume]
           };

           //if(dict){
           db.collection("ResumeWithComments").add(newData);
           //alreadyAdded(false);
          // }


           res.json({message: "success", mapping: myDictionary});


       } catch (error) {
           console.error('Error updating ResumeWithComments:', error);

       }


};


exports.commentOnAResume= async (req, res) => {
    try {

        const resumeComment = req.body.comment; 
        const resumeUID = req.body.resumeUID;

        if (!resumeComment || !resumeUID){
            res.status(500).json({success:false, message: "No comment or Resume provided"});
            return;
        }

        const newCommentData = {
            comment: resumeComment,
            resumeUID: resumeUID, // Link comment to specific resume by UID
            
        };

       // await ResumeRef.doc(req.user.uid).set(resumeData);

        const commentDocRef = await CommentRef.add(newCommentData);

        const resumeCommentRef =  Resume_CommentsRef.doc(resumeUID);


        await resumeCommentRef.set({
            commentIDs: admin.firestore.FieldValue.arrayUnion(commentDocRef.id) // Add the new comment ID to the list
        }, { merge: true });
        res.status(200).json({ success: true, message: "Success adding comment" });
        return;
       





        //data to add to collection
        // //TO DO:  should add resume uid or whatever to collection
        // const newData = {
        //     comment: resumeComment,
        //     resume: "[would like to resume -- waiting for frontend uid]"
        // };

        // db.collection("Comments").add(newData);

        // res.status(200).json({success:true, message:"Success adding comment"})

        //not needed: return URL

    } catch (error) {
        console.log("An Error Occurred:");
        console.log(error);
        res.status(500).json({ success: false, message: 'Error adding comment' });
    }
}