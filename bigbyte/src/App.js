import './App.css';
import Login from './pages/Login.js';
import Signup from './pages/Signup.js';
import Home from './pages/Home.js';

import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BackendTesting from './pages/BackendTesting';
import {SignUp2} from "./pages/signup-alternative"
import {LogIn2} from "./pages/login-alternative";




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
    <BrowserRouter>
    <Routes>
      
        <Route index element={<Home />} />
        {/* replaced LogIn with LogIn2 */}
        <Route path="Login" element= {<LogIn2 /> }/>
        {/* replaced SignUp with SignUp2 */}
        <Route path="SignUp" element= {<SignUp2 /> }/>



        //FOR TESTING
        //<Route path="BackendTesting" element= {<BackendTesting />}/>
        
     
    </Routes>
  </BrowserRouter>

    
    
  );
}

export default App;
