import React from 'react';
import '../Home.css';
import { Outlet, Link } from "react-router-dom";

function Home () 
{
    return (
        <div>
            <Navbar/>
            <MainContent/>

        </div>
    )
}export default Home;

function Navbar() {
    return (
        <nav>
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
                <Link to="/BackendTesting">Backend Testing</Link>
                <Link to="/Login">Login</Link>
                <Link to="/SignUp">Sign Up</Link>
                </li>
                   
            </ul>
        </nav>
    );

}
// function MainContent() {
//     return (
//         <div className="container">
//             <div className="content">
//              <h1>Welcome to My Awesome Homepage</h1>
//                 <p>This is a dynamic homepage designed using CSS flexbox. Feel free to explore!</p>
//             </div>
//         </div>
//     );
// }
function MainContent() {
    return (
      <section className="h-100 gradient-form" style={{ backgroundColor: "#eee" }}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-xl-10">
              <div className="card rounded-3 text-black">
                <div className="row g-0">
                  <div className="col-lg-6">
                    <div className="card-body p-md-5 mx-md-4">
                      <div className="text-center">
                        <img
                          src="https://1000logos.net/wp-content/uploads/2017/11/UCLA-Logo.png"
                          style={{ width: "185px" }}
                          alt="logo"
                        />
                        <h4 className="mt-1 mb-5 pb-1"> Refer a Bruin </h4>
                      </div>
                      <form>
                        <p>Please login to your account</p>
                        <div className="form-outline mb-4">
                          <input
                            type="email"
                            id="form2Example11"
                            className="form-control"
                            placeholder="Place your email address"
                          />
                          <label className="form-label" htmlFor="form2Example11">
                            Username
                          </label>
                        </div>
                        <div className="form-outline mb-4">
                          <input
                            type="password"
                            id="form2Example22"
                            className="form-control"
                            placeholder="Place your strong password"
                          />
                          <label className="form-label" htmlFor="form2Example22">
                            Password
                          </label>
                        </div>
                        <div className="text-center pt-1 mb-5 pb-1">
                          <button
                            className="btn btn-primary btn-block fa-lg  mb-3"
                            type="button"
                          >
                         Log in
                          </button>
                          <a className="text-muted" href="#!">
                            Forgot password?
                          </a>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="col-lg-6 d-flex align-items-center gradient-custom-2">
                    <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                      <h4 className="mb-4">#ReferBruins</h4>
                      <p className="small mb-0">
                        Here at Refer a Bruin, we want to show our blue and gold pride, even beyond our university years. 
                        Get referred to dream companies, by those who have the best interest for you. Get advice from career 
                        professionals who have spent their years harvesting and perfecting their crafts. 
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
  


