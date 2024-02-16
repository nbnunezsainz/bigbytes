import React, { useState } from 'react';
import { addUser, deleteUser, getUser } from '../Backend/userFunctions.js';


function BackendTesting() {
    // State for input fields
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [major, setMajor] = useState('');
    const [year, setYear] = useState('');
    const [organizations, setOrganizations] = useState('');
    const [linkedIn, setLinkedIn] = useState('');
    const [resume, setResume] = useState('');
    const [userIDToDelete, setUserIDToDelete] = useState('');
    const [userIDToGet, setUserIDToGet] = useState('');


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
        await addUser(userData);
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
        </div>
    );
}


export default BackendTesting;