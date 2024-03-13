import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import AuthNavbar from './AuthenticatedNavBar';
import auth from "../fb.js";
import { Form, FormControl } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const JobDetail = () => {
  const [jobs, setJobs] = useState([]); // State to store internship data
  const [loading, setLoading] = useState(true); // State to manage loading status
  const [filteredJobs, setFilteredJobs] = useState([]); // State to store filtered internship data
  const [filterMajor, setFilterMajor] = useState('');
  const [filterPay, setFilterPay] = useState('');
  const [filterLocation, setFilterLocation] = useState('');
  const [filterCompany, setFilterCompany] = useState('');
  const [allCompany, setCompany] = useState('');
  const [allLocations, setAllLocations] = useState(new Set());
  const [allCategory, setCategory] = useState(new Set());


  const [selectedCategory, setSelectedCategory] = useState('');


  const applyFilters = async () => {
    setLoading(true); // Start loading

    try {
      const user = auth.currentUser;
      const token = user && (await user.getIdToken());

      // Construct query parameters from state
      let queryParams = new URLSearchParams({
        //possibly more filters based on demand --> have not yet added subcategories
        Company: filterCompany,
        Category: selectedCategory,
        Pay: filterPay,
        Location: filterLocation,

      }).toString();

      const payloadHeader = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await fetch(`http://localhost:3001/api/v1/internship/QueryInternships?${queryParams}`, payloadHeader);
      if (!response.ok) {
        throw new Error('Failed to fetch');
      }

      const data = await response.json();

      setJobs(data.internshipData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false); // Stop loading regardless of outcome
    }
  };

  const fetchData = async () => {

    try {
      // Fetching the auth token
      const user = auth.currentUser;
      const token = user && (await user.getIdToken());

      const payloadHeader = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      // Using the token to fetch internships
      const response = await fetch('http://localhost:3001/api/v1/internship/GetAllInternships', payloadHeader);
      if (!response.ok) {
        throw new Error('Failed to fetch');
      }

      const data = await response.json();
      console.log(data, 'data');
      setJobs(data.internshipData); // Assuming the response JSON structure matches our state
      console.log(data.internshipData, "hod");



      //get all internship locations
      let allInternshipLocations;
      let allLocations;

      //if data.internshipData exists, extract all locations
      if (data.internshipData) {
        allInternshipLocations = Object.values(data.internshipData);
        allLocations = [...new Set(allInternshipLocations.map(job => job.Location))];
        setAllLocations(allLocations)
      }
      else {
        allLocations = new Set();
        setAllLocations(allLocations)
      }

      //get all companies
      let allCompanies;
      //if data.internshipData exists, extract all locations
      if (data.internshipData) {
        allCompanies = Object.values(data.internshipData);
        allCompanies = [...new Set(allCompanies.map(job => job.Company))];
        setCompany(allCompanies)
      }
      else {
        allCompanies = new Set();
        setCompany(allCompanies)
      }

      //get all Categories
      //get all companies
      let allCategory;
      //if data.internshipData exists, extract all locations
      if (data.internshipData) {
        allCategory = Object.values(data.internshipData);
        allCategory = [...new Set(allCategory.map(job => job.Category))];
        setCategory(allCategory)
      }
      else {
        allCategory = new Set();
        setCategory(allCategory)
      }


      //iterate through all categories and subcategories. creating a hash map
      const hashMapforCategories = {};

      for (let i = 0; i < allCategory.length; i++) {
        const mainCategory = allCategory[i][1];
        const subCategory = allCategory[i][0];


        //if main category doesnt exist,
        if (!hashMapforCategories[mainCategory]) {
          hashMapforCategories[mainCategory] = new Set([subCategory]);
        } else {
          hashMapforCategories[mainCategory].add(subCategory);
        }
        setCategory(hashMapforCategories);


        // Perform operations with mainCategory and subCategory
        // console.log(`Main Category: ${mainCategory}, Sub Category: ${subCategory}`);
        // console.log(hashMapforCategories);
      }

      //console.log(allCategory)


    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false); // Ensure loading is set to false after the fetch operation completes
    }
  };


  const resetFilters = () => {
    fetchData();
  }



  const handleReferal = async (event) => {

    const user = auth.currentUser;
    const token = user && (await user.getIdToken());

    const payloadHeader = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const internshipID = event.target.value;
    try {
      const response = await fetch(`http://localhost:3001/api/v1/internship/RequestReferal?internshipID=${internshipID}`, payloadHeader);
      console.log(response, "response");
      if (!response.ok) {
        toast.error('Resume does not exist. Please create one before proceeding.');
      }

    } catch (error) {
      console.error('Error requesting referral:', error);
      // Handle error
    }
  };

  useEffect(() => {
    // Define the asynchronous function inside the useEffect hook


    // Call the fetchData function
    fetchData();
  }, []); // Empty dependency array means this effect runs once on mount


  if (loading) {
    return <div>Loading...</div>; // Render a loading page or spinner here
  }

  return (
    <>
      <AuthNavbar />
      <Container fluid style={{ marginTop: '70px' }}>
        <Row  className ="mx-2">
          <Col xs={12}  className="mb-5">
            {/* Filter Section */}
            <h5 s>Filters</h5>
            <Form>

              {/* company */}
              <Form.Group className="mb-3">
                <Form.Label>Company</Form.Label>
                <Form.Control
                  as="select"
                  value={filterCompany}
                  onChange={(e) => setFilterCompany(e.target.value)} >

                  <option value="">Select Company </option> {/*test*/}
                  {Array.from(allCompany).map((location) => (
                    <option key={location} value={location}>
                      {location}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  as="select"
                  value={selectedCategory}
                  onChange={(e) => {
                    setSelectedCategory(e.target.value);
                  }}
                >
                  {/* main category */}
                  <option value="">Select Category</option>
                  {Object.keys(allCategory).map((categoryKey) => (
                    <option key={categoryKey} value={categoryKey}>
                      {categoryKey}
                    </option>
                  ))}

                  console.log(setSelectedCategory)

                </Form.Control>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Major</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter major"
                  value={filterMajor}
                  onChange={(e) => setFilterMajor(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Minimum Pay</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter pay"
                  value={filterPay}
                  onChange={(e) => setFilterPay(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Location</Form.Label>
                <Form.Control
                  as="select"
                  value={filterLocation}
                  onChange={(e) => setFilterLocation(e.target.value)} >

                  <option value="">Select Location</option> {/*test*/}
                  {Array.from(allLocations).map((location) => (
                    <option key={location} value={location}>
                      {location}
                    </option>
                  ))}


                </Form.Control>

              </Form.Group>

              {<Button className="me-2" variant="primary" onClick={applyFilters}>Apply Filters</Button>}
              {<Button variant="secondary" onClick={resetFilters}> Reset Filters</Button>}
            </Form>
          </Col>
          <Col sm={12}>
            {/* Job Listing Section */}
            <Row sm={12}>
              {Object.entries(jobs).map(([internshipID, job]) => (
                <Col md={12} key={internshipID}>
                  <Card className="mb-3">
                    <Card.Body>
                      <Card.Title>{job.title}</Card.Title>
                      <Card.Text><strong>Company:</strong> {job.Company}</Card.Text>
        
                      <Card.Text>{job.Description}</Card.Text>
                      <Button variant="primary" value={internshipID} onClick={handleReferal}>Apply</Button>
                      <ToastContainer />
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};


export default JobDetail;
