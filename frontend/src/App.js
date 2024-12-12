import { Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import './App.css';
import RefrshHandler from "./RefrshHandler";

function App() {
  const [isAuthenticated,setIsAuthenticated]=useState(false);
  const PrivateRoute=({element})=>{
    return isAuthenticated?element:<navigate to ="/login" />

  }
  return (
    <div className="App">
      <RefrshHandler setIsAuthenticated={setIsAuthenticated}/>
      {/* <ChildComponent myFunction={handleClick} />
Here, handleClick is a function defined in the parent component, and it is passed to ChildComponent as a prop named myFunction. */}


      <Routes>
          <Route path="/" element ={<Navigate to ="/Login" />}/> 
          <Route path="/login" element={<Login/>}/>
          <Route path="/Signup" element={<Signup/>}/>
          <Route path="/Home" element={<PrivateRoute element ={<Home/>}/>}/>    
      </Routes>
      
    </div>
  );
}

export default App;

// Step-by-Step Execution
// Browser Navigation:
// The user navigates to /Home.

// React Router Path Match:
// React Router matches /Home and determines that it should render <PrivateRoute />.

// PrivateRoute Execution:

// Inside PrivateRoute, it checks the value of isAuthenticated:
// If isAuthenticated is true:
// The element prop (<Home />) is rendered.
// If isAuthenticated is false:
// The user is redirected to /login using <Navigate to="/login" />.