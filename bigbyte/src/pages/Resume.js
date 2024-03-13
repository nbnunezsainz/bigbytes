import React from 'react';
import { useState } from 'react';
import { Container, Form, Button, FormGroup, FormControl, FormLabel } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import AuthNavbar from '../AuthenticatedPages/AuthenticatedNavBar';
import '../Styling/Resume.css';
import auth from "../fb.js";
import Confetti from 'react-dom-confetti';

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
    const [showConfetti, setShowConfetti] = useState(false);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type === 'application/pdf') {
            setResumeFile(file);
        }


    };

    const handleSubmit = async() => {
        if (resumeFile) {
            // Create a FormData object and append the file
            const user = auth.currentUser;
        const token = user && (await user.getIdToken());
       
            const formData = new FormData();
            formData.append('resume', resumeFile); // 'resume' is the key that the server expects for the file
    
            // Make the fetch request to send the PDF to the server
            fetch('http://localhost:3001/api/v1/Resume/UploadResume', {
                method: 'POST',
                body: formData, 
                headers: {
                    Authorization: `Bearer ${token}`,
                  },
            })
            .then(response => response.json()) // Assuming the server responds with JSON
            .then(data => {
                console.log('Success:', data); // Handle success response
            })
            .catch(error => {
                console.error('Error:', error); // Handle error response
            });
    
            console.log('Submitted:', resumeFile.name);
            setShowConfetti(true);
        }
    };
    

    return (
        <>
        <AuthNavbar />
        {/*Title*/}
        <h1 className= "resume-title"> Share your resume today.</h1>
        <Container className="container-resume mt-5">
                <Form>
                    {/*Heading of the resume form*/}
                    <FormGroup controlId="formFile">
                        <FormLabel className = "label">Upload Your Resume (PDF only):</FormLabel>
                         {/* Divider */}
                         <div className="divider"></div>
                        {/* Image */}
                         <img src="https://cdn-icons-png.flaticon.com/512/8101/8101319.png" alt="Resume-Icon" className="upload-icon" />
                        {/*Title of submitted title */}
                            <div className = "uploaded-title">
                            {resumeFile && (
                             <div className="uploaded-file mt-3">
                                 <p>Uploaded File: {resumeFile.name}</p>
                             </div>
                             )}
                </div>
                        <FormControl
                            type="file"
                            accept=".pdf"
                            onChange={handleFileChange}
                        />
                    </FormGroup>
                    {/*Submit Button*/}
                    <Button className ="mt-3" variant="primary" onClick={handleSubmit} disabled={!resumeFile}>
                        Upload file
                        <Confetti active={showConfetti} />
                    </Button>
                </Form>
                {/*We wanted confetti to show up */}
                {showConfetti && (
                    <Confetti active={showConfetti} />
                )}
            </Container>
    </>
);
}

