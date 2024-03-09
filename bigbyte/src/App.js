import './App.css';
import Login from './pages/Login.js';
import Signup from './pages/Signup.js';
import Home from './pages/Home.js';

import Internships from './AuthenticatedPages/InternShips.js';
import Resume from './pages/Resume.js';
import UserDetailsForm from './pages/UserDataSignup.js';
import ResumesViewer from './AuthenticatedPages/ResumeReview.js';
import  UserProfile from './AuthenticatedPages/UserProfile';
import ReactDOM from "react-dom/client";
import MentorSearch from './AuthenticatedPages/MentorSearch.js';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./AuthContext.js"; 





function App() {
  return (

    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code> Hello this is my edit</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
    // 
    <AuthProvider>
    <BrowserRouter>
   
      <Routes>
        <Route index element={<Home />} />
        <Route path="Home" element={<Home />} />

        <Route path="Login" element={<Login />} />
        <Route path="SignUp" element={<Signup />} />

        <Route path="/UserData" element={<UserDetailsForm />} />
        <Route path="/InternShips" element={<Internships />} />
        <Route path="/Resume" element={<Resume />} />
        <Route path="/ResumeReviwer" element={<ResumesViewer />} />
        
         <Route path="/MentorSearch" element={<MentorSearch />} /> 
         <Route path="/UserProfile" element={<UserProfile />} /> 
      </Routes>
     
    </BrowserRouter>
    </AuthProvider>
     



  );
}

export default App;
