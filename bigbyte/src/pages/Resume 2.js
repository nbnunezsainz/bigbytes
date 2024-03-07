import React from 'react';
import { useState } from 'react';
import { Container, Form, Button, FormGroup, FormControl, FormLabel } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import AuthNavbar from '../AuthenticatedPages/AuthenticatedNavBar';
import '../Login.css';

// export default function Resume() {
//     return (
//         <div className="resume_form">
//             <center>
//                 <form>
//                     <label htmlFor="file">Upload Your Resume:</label>
//                     <input type="file" id="file" />
//                 </form>
//             </center>
//         </div>
//     );
// }
export default function Resume() {
    const [resumeFile, setResumeFile] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type === 'application/pdf') {
            setResumeFile(file);
        } 

    };

    const handleSubmit = () => {
        if (resumeFile) {
            // Create a FormData object and append the file
            const formData = new FormData();
            formData.append('resume', resumeFile); // 'resume' is the key that the server expects for the file
    
            // Make the fetch request to send the PDF to the server
            fetch('http://localhost:3001/api/v1/user/UploadResume', { 
                method: 'POST',
                body: formData, // Pass in the formData as the request body
                // Note: Don't set 'Content-Type' header when using FormData,
                // the browser will set it automatically including the boundary parameter
            })
            .then(response => response.json()) // Assuming the server responds with JSON
            .then(data => {
                console.log('Success:', data); // Handle success response
            })
            .catch(error => {
                console.error('Error:', error); // Handle error response
            });
    
            console.log('Submitted:', resumeFile.name);
        }
    };
    

    return (
        <>
        <AuthNavbar />
        <Container className="mt-5">
            <Form>
                <FormGroup className="mb-3" controlId="formFile">
                    <FormLabel>Upload Your Resume (PDF only):</FormLabel>
                    <FormControl
                        type="file"
                        accept=".pdf"
                        onChange={handleFileChange}
                    />
                </FormGroup>
                <Button variant="primary" onClick={handleSubmit} disabled={!resumeFile}>
                    Submit
                </Button>
            </Form>
            {resumeFile && (
                <div className="mt-3">
                    <p>Uploaded File: {resumeFile.name}</p>
                </div>
            )}
        </Container>
    </>
);
}


// for those who are doing backend to the resume, 
// you need to create the endpoint 
// modify the react component i created so that when the yser clicks teh submit button, you receive it 

// i need to learn more about being able to change the UI when its finally uploaded 