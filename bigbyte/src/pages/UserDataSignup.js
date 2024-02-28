import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

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
        linkedIn: ''
    });

    const handleButtonClick = (selectedRole) => {
        setRole(selectedRole);
        setUserDetails({
            ...userDetails,
            UserStatus: selectedRole
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserDetails(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(userDetails);
        // Send userDetails to backend for further processing
    };

    return (
        <div>
            <h1>Select Your Role</h1>
            <Button onClick={() => handleButtonClick('student')} variant="primary">Student</Button>{' '}
            <Button onClick={() => handleButtonClick('mentor')} variant="success">Mentor</Button>{' '}
            
            {role && 
            <div>
                <h2>User Details Form</h2>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="firstName">
                        <Form.Label>First Name:</Form.Label>
                        <Form.Control type="text" name="firstName" value={userDetails.firstName} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group controlId="lastName">
                        <Form.Label>Last Name:</Form.Label>
                        <Form.Control type="text" name="lastName" value={userDetails.lastName} onChange={handleChange} />
                    </Form.Group>
                    {role === 'student' &&
                        <>
                            <Form.Group controlId="major">
                                <Form.Label>Major:</Form.Label>
                                <Form.Control type="text" name="major" value={userDetails.major} onChange={handleChange} />
                            </Form.Group>
                            <Form.Group controlId="bio">
                                <Form.Label>Bio:</Form.Label>
                                <Form.Control as="textarea" rows={3} name="bio" value={userDetails.bio} onChange={handleChange} />
                            </Form.Group>
                            <Form.Group controlId="year">
                                <Form.Label>Year:</Form.Label>
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
                    <Button variant="primary" type="submit">Submit</Button>
                </Form>
            </div>}
        </div>
    );
}

export default UserDetailsForm;