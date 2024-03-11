import React from 'react';
import '../Home.css';
import { Outlet, Link } from "react-router-dom";
import NavBar from './VisitNavBar';

function Home() {
  return (
    <>
      <NavBar />
      <MainContent />
    </>
  )
} export default Home;

function MainContent() {
  return (
    <div>
      {/* Creating the header which will contain title of the name and the information of the app*/}
      <div className="container">
        <div className="background-layer"></div>
        <div className="content">
          <div className="left-side">
            <h1 className="text-in-container">Refer a Bruin</h1>
            <p className="text-in-container">An app that provides opportunities to all Bruins in search of internships.</p>
          </div>
          <div className="right-side">
            <Link to="/SignUp">
              {/* Allows users to create an account from interacting with the main page */}
              <button className="custom-button text-in-container">Create an account</button>
            </Link>
          </div>
        </div>
      </div>
      <div className="boxes">
        {/* Wanted to give the three features */}
        <div className="box">
          {/* The first feature */}
          <img className = "image" src="https://icons.veryicon.com/png/o/miscellaneous/general-icon-library/resume-7.png" alt="Resume Icon" />
          <h2>Resume Builder </h2>
          <p> Finding it hard to make a first impression? Let other mentors and peers help build the resume of your dreams. </p>
        </div>
        <div className="box">
          {/* Second Feature*/}
          <img className = "image" src="https://cdn3.iconfinder.com/data/icons/feather-5/24/search-512.png" alt="Search Icon" />
          <h2>Internship Search</h2>
          <p> With our great mentors joining Refer a Bruin, there is numerous of opportunities presented for all bruins to recieve professional development. 
            With our internship search, users are able to find an opportunitiy crafted to their own career development. </p>
        </div>
        <div className="box">
          {/* Third Feature */}
          <img className = "image" src="https://cdn-icons-png.freepik.com/512/3938/3938405.png" alt="Mentor Icon" />
          <h2>Mentor Matching</h2>
          <p> Users are able to find mentors through our app development, with finding similar career interests. By having mentors presented, they are able to provide users referrals if they find suitable. </p>
        </div>
      </div>
    </div>
  );
}