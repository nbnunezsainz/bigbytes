//Needs to make a request

import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import AuthNavbar from './AuthenticatedNavBar';

const UserPage = () => {
    const [name, setName] = useState([]);   // State to store user's name
    const [loading, setLoading] = useState(true); // State to manage loading status
    
};

export default UserPage;