import React, { useState } from 'react';
import { addUser, deleteUser, getUser } from './dataManipulation/collectionFunctions/userFunctions.js'
import { addResume, viewResume } from './handleFiles/fileFunctions.js';
import { addMentor, generateInternship } from './dataManipulation/collectionFunctions/mentorFunctions.js';

function BackendTesting() {
    // State for user input fields
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [major, setMajor] = useState('');
    const [year, setYear] = useState('');
    const [bio, setBio] = useState('');
    const [organizations, setOrganizations] = useState('');
    const [linkedIn, setLinkedIn] = useState('');
    const [resume, setResume] = useState('');
    const [userIDToDelete, setUserIDToDelete] = useState('');
    const [userIDToGet, setUserIDToGet] = useState('');

    // State for resume fields
    const [imageUpload, setImageUpload] = useState(null);

    // States for relational database
    const [randomMentorID, setRandomMentorID] = useState('');
    const [randomUserID, setRandomUserID] = useState('');


    // Function to handle adding a user
    const handleAddUser = async () => {
        const userData = {
            firstName: firstName,
            lastName: lastName,
            major: major,
            year: year,
            organizations: organizations.split(',').map(org => org.trim()),
            linkedIn: linkedIn,
            resume: resume,
        };


        // Call the addUser function from your test.js
        await addUser(userData, "TEST_REPLACE WITH REAL USER_AUTH_ID");
        console.log('User added successfully!');
    };


    // Function to handle deleting a user
    const handleDeleteUser = async () => {
        // Call the deleteUser function from your test.js
        await deleteUser(userIDToDelete);
        console.log('User deleted successfully!');
    };


    // Function to handle getting a user
    const handleGetUser = async () => {
        // Call the getUser function from your test.js
        const userData = await getUser(userIDToGet);


        if (userData) {
            console.log('User data:', userData);
        } else {
            console.log('User not found.');
        }
    };


    // Function to handle resume uploads
    const handleUploadResume = async () => {
        addResume(imageUpload, "some dummy ID");
        console.log("Resume added succesfully in front-end");
    }

    const handleViewResume = async () => {
        try {
            const resumeURL = await viewResume(userIDToGet);
            window.open(resumeURL, '_blank');
            console.log("Succesfully opened tab to view resume");
        } catch (error) {
            console.log("ERROR WHEN VIEWING RESUME");
            console.log(error);
        }
    }

    //Funciton to generate a random mentor
    const handleRandomMentor = async () => {
        try {
            const mentorData = {
                firstName: "Shivum",
                lastName: "Kapoor",
                company: "American Red Cross",
                bio: "This is testing info",
                mentorStatus: true,
                linkedIn: "linkedIn",
            };

            //
            let mentorID = Math.floor(Math.random() * 100000 + 1).toString();
            setRandomMentorID(mentorID);

            await addMentor(mentorData, mentorID);
            console.log("created mentor with mentorID: " + mentorID);

        } catch (error) {
            console.log("Something messed up when creating mentor");
        }
    }

    //Function to generate random internship associated with the random mentor
    const handleRandomInternship = async () => {
        try {
            const internshipData = {
                title: "Software Engineer",
                company: "Apple",
                description: "You do stuff",
                location: "Remote",
                pay: "$35",
                category: "Tech",
                tags: "fun",
                url: "www.google.com",
                refferalLimit: "10",
            }

            await generateInternship(internshipData, randomMentorID);
            console.log("Random internship generated from front end!");
        } catch (error) {
            console.log("ERROR from front end!");
        }
    }


    //Display fields and buttons to receive/manipulate data
    return (
        <div>
            <h2>Backend Testing</h2>

            <h3>Add User:</h3>
            <label>First Name*:</label>
            <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            <br />
            <label>Last Name*:</label>
            <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
            <br />
            <label>Major*:</label>
            <input type="text" value={major} onChange={(e) => setMajor(e.target.value)} />
            <br />
            <label>Year*:</label>
            <input type="text" value={year} onChange={(e) => setYear(e.target.value)} />
            <br />
            <label>Bio:</label>
            <input type="text" value={bio} onChange={(e) => setBio(e.target.value)} />
            <br />
            <label>Organizations (comma-separated):</label>
            <input type="text" value={organizations} onChange={(e) => setOrganizations(e.target.value)} />
            <br />
            <label>LinkedIn:</label>
            <input type="text" value={linkedIn} onChange={(e) => setLinkedIn(e.target.value)} />
            <br />
            <label>Resume:</label>
            <input type="text" value={resume} onChange={(e) => setResume(e.target.value)} />
            <br />
            <button onClick={handleAddUser}>Add User</button>

            <h3>Get User:</h3>
            <label>User ID to Get:</label>
            <input type="text" value={userIDToGet} onChange={(e) => setUserIDToGet(e.target.value)} />
            <button onClick={handleGetUser}>Get User</button>

            <h3>Delete User:</h3>
            <label>User ID to Delete:</label>
            <input type="text" value={userIDToDelete} onChange={(e) => setUserIDToDelete(e.target.value)} />
            <button onClick={handleDeleteUser}>Delete User</button>



            <h2>Resume Testing</h2>

            <h3>Resume to Upload:</h3>
            <label>File Name to Uplaod</label>
            <input type="file" onChange={(event) => { setImageUpload(event.target.files[0]); }} />
            <button onClick={handleUploadResume}>Upload Resume</button>

            <h3>View Resume:</h3>
            <label>User ID to View Resume:</label>
            <input type="text" value={userIDToGet} onChange={(e) => setUserIDToGet(e.target.value)} />
            <button onClick={handleViewResume}>View Resume</button>


            <h2>Relational Database Testing!</h2>
            <button onClick={handleRandomMentor}>Generate random Mentor</button>
            <button onClick={handleRandomInternship}>Generate random Internship Associated with Mentor</button>

            <label>User ID to apply to internship:</label>
            <input type="text" value={randomUserID} onChange={(e) => setRandomUserID(e.target.value)} />
            <button onClick={handleViewResume}>Submit user ID</button>


        </div>
    );
}


export default BackendTesting;
