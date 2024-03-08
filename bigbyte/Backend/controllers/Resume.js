
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

exports.getAllResumesAndCorrespondingComments = async (req, res) => {
    try {
        let pathName = Constants.STORAGE_RESUME + req.body.userID;
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
//needs to take in a RESUME URl
exports.CreateCommentsforAResume= async (req, res) => {
    try {
        let pathName = Constants.STORAGE_COMMENTS + req.body.userID;
        const CommentsRef = ref(storage, pathName);
        const URL = await getDownloadURL(resumeRef);

        res.status(200).json({ success: true, message: 'Succes when getting resume' });
        return URL;

    } catch (error) {
        console.log("an error happened:");
        console.log(error);
        res.status(500).json({ success: false, message: 'Error getting resume' });
    }
}