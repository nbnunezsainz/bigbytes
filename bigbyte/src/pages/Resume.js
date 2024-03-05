import React from 'react';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { Navigate } from 'react-router-dom';
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
            // You can handle submitting the file here
            console.log('Submitted:', resumeFile.name);
            // For example, you can send the file to a server using fetch or axios
        } 
    };

    return (
        <div className="resume_form">
            <center>
                <form>
                    <label htmlFor="file">Upload Your Resume (PDF only):</label>
                    <input type="file" id="file" accept=".pdf" onChange={handleFileChange} />
                </form>
                <Button onClick={handleSubmit} disabled={!resumeFile}>
                    Submit
                </Button>

            </center>
            {resumeFile && (
                <div>
                    <p>Uploaded File: {resumeFile.name}</p>
                </div>
            )}
        </div>
        
    );
}


// for those who are doing backend to the resume, 
// you need to create the endpoint 
// modify the react component i created so that when the yser clicks teh submit button, you receive it 

// i need to learn more about being able to change the UI when its finally uploaded 