import React, { useState, useEffect } from 'react';
import PDFViewer from './PDFViewer.js'; // Adjust this if the file path is different
import AuthNavbar from './AuthenticatedNavBar';
import {Container, Row, Col, Card, Button} from 'react-bootstrap';

import '../Styling/ResumeReview.css';


const ResumeReviewer = () => {
    const [resumes, setResumes] = useState([]);
    const [submitted, setSubmitted] = useState(false);

    function handleDataFromChild (data) {
        setSubmitted(data);
    }

    useEffect(() => {
        console.log("mee2p");
        fetch('http://localhost:3001/api/v1/Resume/GetAllResumesWithComments')
            .then(response => response.json())
            .then(data => {
                if (data && data.resumesWithComments) {
                    setResumes(data.resumesWithComments);
                }
                else
                {
                    setResumes([]);
                }
            })
            .catch(error => console.error('Error fetching resumes:', error));
    }, []);

    useEffect(() => {
        if(submitted)
        {
            console.log("meep");
        fetch('http://localhost:3001/api/v1/Resume/GetAllResumesWithComments')
            .then(response => response.json())
            .then(data => {
                if (data && data.resumesWithComments) {
                    setResumes(data.resumesWithComments);
                }
                else
                {
                    setResumes([]);
                }
            })
            .catch(error => console.error('Error fetching resumes:', error));
        }
         
    }, [submitted]);

    console.log(resumes, "resume data is here");
    return (
        <>
            <AuthNavbar />
            <div style={{ paddingTop: "80px" }}>
            <div className="background-layer-rr"></div>
                <h1 className='h1-rr'>Resumes</h1>
                <p className='p-rr'> One could call this the bruinwalk of resumes. Reminder: Please be mindful of others when providing criticism and please leave out any sort of vile language. </p>
                <div>
                    {resumes.length > 0 ? (
                        resumes.map((resume, index) => (
                            <div key={index}>
                               <Container style= {{ marginBottom: '100px' }}>  
                                <PDFViewer sendDataToParent={handleDataFromChild} resumeUrl={resume.URL} resumeUID= {resume.userID} resumeComments = {resume.comments}/>
                               </Container>
                            </div>
                        ))
                    ) : (
                        <p>Loading resumes or no resumes available...</p>
                    )}
                </div>
            </div>
        </>
    );
};

export default ResumeReviewer;


