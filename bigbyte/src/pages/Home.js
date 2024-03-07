import React from 'react';
import '../Home.css';
import { Outlet, Link } from "react-router-dom";

function Home() {
  return (
    <>
      <Navbar />
      <MainContent />
    </>
  )
} export default Home;

function Navbar() {
  return (
    <nav className='fixed-top'>
      <ul>
        <img
          src="https://1000logos.net/wp-content/uploads/2017/11/UCLA-Logo.png"
          style={{ width: "100px" }}
          alt="logo"
        />

        <li><a href="#">Home</a></li>
        <li><a href="#">About</a></li>
        <li><a href="#">Contact</a></li>
        <li>
          {/* <Link to="/InternShips">Internship Search</Link>
          <Link to="/Resume">Resume Tools</Link>
          <Link to="BackendTesting">Backend Testing</Link> */}
          <Link to="/Login">Login</Link>
          <Link to="/SignUp">Sign Up</Link>
          
        </li>

      </ul>
    </nav>
  );

}
function MainContent() {
    return (
<div className="container">
            <div className="content">
                <div className="left-side">
                    <h1>Refer a Bruin</h1>
                    <p>An app that provides opportunities to all Bruins in search of internships.</p>
                </div>
                <div className="right-side">
                    <Link to="/SignUp">
                        <button>Create An Account Now</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}


