import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';

import auth from "../fb.js";

function UserDetailsForm() {
    const [role, setRole] = useState('');
    const [userDetails, setUserDetails] = useState({
        firstName: '',
        lastName: '',
        major: '',
        year: '',
        bio: '',
        company: '',
        UserStatus: '',
        linkedIn: '',
        industry: ''
    });
    const [redirectToLanding, setRedirectToLanding] = useState(false);
    const [stateSet, setStateSet] = useState(new Set()); //all states to make sure submit works
    const [failedSignUp, setFailedSignUp] = useState(false);

    const handleButtonClick = (selectedRole) => {
        setRole(selectedRole);
        setUserDetails({
            ...userDetails,
            UserStatus: selectedRole
        });
        //setStateSet(prevStateSet => new Set(prevStateSet.add(selectedRole)));
    };

    //only submits
    const needAllFields = async () => {


        console.log(stateSet, "setStateSet: ")
        if(stateSet.size === 5){
            console.log("all fields exist")
            //change state to make sure it submits
        }
        console.log("Need all fields")
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserDetails(prevState => ({
            ...prevState,
            [name]: value
        }));
        //make sure all states there
        setStateSet(prevStateSet => new Set(prevStateSet.add(name)));
        setFailedSignUp(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(userDetails);
        // Send userDetails to backend for further processing

       //only executes if all 5 fields present
        //setFailedSignUp(false);
        if(stateSet.size === 5) {

            const user = auth.currentUser;
            const token = user && (await user.getIdToken());

            //don't execute any of this code is submit information isn't correct

            fetch('http://localhost:3001/api/v1/user/userDetails', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(userDetails)
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log('Response from server:', data);
                    // Check if signup success
                    if (data.success) {
                        // signup successful
                        setRedirectToLanding(true);
                    } else {
                        // Handle signup error
                        console.error('Signup failed: ', data.message);
                    }
                })
                .catch(error => {
                    console.error('There was a problem with your fetch operation: ', error);
                });

        }
        else{
            setFailedSignUp(true);
            console.error("All fields required")

        }
    };


    if (redirectToLanding) {
        return <Navigate to="/Internships" />;
    }

    return (
        <div >
            <h1>Select Your Role</h1>
            <Button onClick={() => handleButtonClick('student')} variant="primary">Student</Button>{' '}
            <Button onClick={() => handleButtonClick('mentor')} variant="success">Mentor</Button>{' '}

            {role &&
                <div>
                    <h2>User Details Form</h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="firstName">
                            <Form.Label>*First Name:</Form.Label>
                            <Form.Control type="text" name="firstName" value={userDetails.firstName} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group controlId="lastName">
                            <Form.Label>*Last Name:</Form.Label>
                            <Form.Control type="text" name="lastName" value={userDetails.lastName} onChange={handleChange} />
                        </Form.Group>
                        {role === 'student' &&
                            <>
                                <Form.Group controlId="major">
                                    <Form.Label>*Major:</Form.Label>
                                    <Form.Control type="text" name="major" value={userDetails.major} onChange={handleChange} />
                                </Form.Group>
                                <Form.Group controlId="bio">
                                    <Form.Label>*Bio:</Form.Label>
                                    <Form.Control as="textarea" rows={3} name="bio" value={userDetails.bio} onChange={handleChange} />
                                </Form.Group>
                                <Form.Group controlId="year">
                                    <Form.Label>*Year:</Form.Label>
                                    <Form.Control type="text" name="year" value={userDetails.year} onChange={handleChange} />
                                </Form.Group>
                            </>
                        }
                        {role === 'mentor' &&
                            <>
                                <Form.Group controlId="company">
                                    <Form.Label>Company:</Form.Label>
                                    <Form.Control type="text" name="company" value={userDetails.company} onChange={handleChange} />
                                </Form.Group>
                                <Form.Group controlId="industry">
                                    <Form.Label>Company:</Form.Label>
                                    <Form.Control type="text" name="industry" value={userDetails.industry} onChange={handleChange} />
                                </Form.Group>
                                <Form.Group controlId="bio">
                                    <Form.Label>Bio:</Form.Label>
                                    <Form.Control as="textarea" rows={3} name="bio" value={userDetails.bio} onChange={handleChange} />
                                </Form.Group>
                                <Form.Group controlId="linkedIn">
                                    <Form.Label>LinkedIn:</Form.Label>
                                    <Form.Control type="text" name="linkedIn" value={userDetails.linkedIn} onChange={handleChange} />
                                </Form.Group>
                            </>
                        }
                        {failedSignUp &&
                            <div className='mt-4'>
                                <p style={{color: "red"}}>All fields are required. Try again...</p>
                            </div>
                        }
                        <Button variant="primary" type="submit">Submit</Button>
                    </Form>
                </div>}
        </div>
    );
}

export default UserDetailsForm;
