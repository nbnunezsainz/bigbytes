import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import AuthNavbar from './AuthenticatedNavBar';
import auth from "../fb.js";
import { Form, FormControl } from 'react-bootstrap';


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
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [allSubcategories, setAllSubcategories] = useState('');


  const applyFilters = async () => {
    setLoading(true); // Start loading

    try {
      const user = auth.currentUser;
      const token = user && (await user.getIdToken());

      // Construct query parameters from state
      let queryParams = new URLSearchParams({
        company: filterCompany,
        category: selectedCategory,
        pay: filterPay,
        location: filterLocation,

      }).toString();

      const payloadHeader = {
        method: 'GET',
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

      console.log(data.internshipData)

      setJobs(data.internshipData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false); // Stop loading regardless of outcome
    }
  };





  useEffect(() => {
    // Define the asynchronous function inside the useEffect hook

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
        setJobs(data.internshipData); // Assuming the response JSON structure matches our state

        console.log(data.internshipData)


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
        console.log("hello")
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
          console.log(hashMapforCategories);
        }

        //console.log(allCategory)


      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Ensure loading is set to false after the fetch operation completes
      }
    };

    // Call the fetchData function
    fetchData();
  }, []); // Empty dependency array means this effect runs once on mount


  if (loading) {
    return <div>Loading...</div>; // Render a loading page or spinner here
  }

  return (
    <>
      <AuthNavbar />
      <Container fluid className="mt-5">
        <Row>
          <Col md={3}>
            {/* Filter Section */}
            <h5>Filters</h5>
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

              {selectedCategory && (
                <Form.Group className="mb-3">
                  <Form.Label>Subcategory</Form.Label>
                  <Form.Control
                    as="select"
                    value={selectedSubcategory}
                    onChange={(e) => setSelectedSubcategory(e.target.value)}

                  >
                    <option value="">Select Subcategory</option>


                    {/* need help here - thought inserting 'selectedCategory' should work*/}
                    {Object.values(allCategory).map((subcategory) => (
                      <option key={subcategory} value={subcategory}>
                        {subcategory}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              )}



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

              {<Button variant="primary" onClick={applyFilters}>Apply Filters</Button>}
            </Form>
          </Col>
          <Col md={9}>
            {/* Job Listing Section */}
            <Row>
              {Object.entries(jobs).map(([internshipID, job]) => (
                <Col md={12} key={internshipID}>
                  <Card className="mb-3">
                    <Card.Body>
                      <Card.Title>{job.title}</Card.Title>
                      <Card.Text><strong>Company:</strong> {job.Company}</Card.Text>
                      <Card.Text><strong>Date Posted:</strong> {job.datePosted}</Card.Text>
                      <Card.Text>{job.Description}</Card.Text>
                      <Button variant="primary">Apply</Button>
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
