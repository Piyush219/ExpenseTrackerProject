import React from "react";
import SignUp from "./Pages/SignUp";
import {Routes, Route} from 'react-router-dom'
import WelcomePage from "./Pages/WelcomePage";
import Login from "./Pages/Login";
import Header from "./Layout/Header";
import ProfilePage from "./Pages/ProfilePage";

function App() {
  return (
    <div>
      <Header/>
    
    <Routes>
      <Route exact path = "/" element = {<SignUp />}/>
      <Route exact path = "/welcome" element = {<WelcomePage/>}/>
      <Route exact path = "/login" element={<Login/>}/>
      <Route exact path = "/completeprofile" element={<ProfilePage/>}/>
    </Routes>

    </div>
  );
}

export default App;
