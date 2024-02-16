import './App.css';
import Login from './pages/Login.js';
import Signup from './pages/Signup.js';
import Home from './pages/Home.js';
import BackendTesting from './pages/BackendTesting.js'
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

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
        <Route path="BackendTesting" element= {<BackendTesting /> }/>
        <Route path="Login" element= {<Login /> }/>
        <Route path="SignUp" element= {<Signup /> }/>
        
     
    </Routes>
  </BrowserRouter>

    
    
  );
}

export default App;
