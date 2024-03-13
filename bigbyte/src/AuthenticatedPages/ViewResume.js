import React, { useState, useEffect } from 'react';
import PDFViewer from './PDFViewer.js'; // Adjust this if the file path is different
import AuthNavbar from './AuthenticatedNavBar';
import {Container, Row, Col, Card, Button} from 'react-bootstrap';

const ViewResume = () => {
    const [resume, setResume] = useState([]);
    
    useEffect(() => {
        fetch('http://localhost:3001/api/v1/Resume/GetResume')
            .then(response => response.json())
            .then(data => {
                if (data) {
                    console.log(data);
                }
                else
                {
                    setResume([]);
                }
            })
            .catch(error => console.error('Error fetching resumes:', error));
    }, []);

    // console.log(resumes, "resume data is here");
    return (
        <>
            <AuthNavbar />
            <div style={{ paddingTop: "80px" }}>
                {/* <h1>Resumes</h1>
                <div>
                    {resumes.length > 0 ? (
                        resumes.map((resume, index) => (
                            <div key={index}>
                                <h2>User: {resume.userID}</h2>
                                <PDFViewer sendDataToParent={handleDataFromChild} resumeUrl={resume.URL} resumeUID= {resume.userID} resumeComments = {resume.comments}/>
                            </div>
                        ))
                    ) : (
                        <p>Loading resumes or no resumes available...</p>
                    )}
                </div> */}
            </div>
        </>
    );
};

export default ViewResume;