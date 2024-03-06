import React, { useState, useEffect } from 'react';
import PDFViewer from './PDFViewer.js'; // Adjust this if the file path is different

const ResumeReviewer = () => {
    const [resumes, setResumes] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3001/api/v1/user/GetResumes')
            .then(response => response.json())
            .then(data => {
                setResumes(data);
            })
            .catch(error => console.error('Error fetching resumes:', error));
    }, []);

    return (
        <div>
            <h1>Resumes</h1>
            {resumes.length > 0 ? (
                resumes.map((resume, index) => (
                    <div key={index}>
                        <h2>User: {resume.userId}</h2>
                        <PDFViewer resumeUrl={resume.resumeUrl} />
                    </div>
                ))
            ) : (
                <p>Loading resumes or no resumes available...</p>
            )}
        </div>
    );
};

export default ResumeReviewer;


