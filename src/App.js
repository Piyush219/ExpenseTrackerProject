import React, { useEffect, useState } from "react";
import SignUp from "./Pages/SignUp";
import {Routes, Route} from 'react-router-dom'
import WelcomePage from "./Pages/WelcomePage";
import Login from "./Pages/Login";
import Header from "./Layout/Header";
import ProfilePage from "./Pages/ProfilePage";

function App() {

  const [displayName, setDisplayName] = useState('')
  const [photoUrl, setPhotoUrl] = useState('')

  useEffect(()=>{
    fetch("https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyA5nYjPCDidltvXYlAkGXzCUR0CIOQBAOo",{
      method: 'POST',
      body: JSON.stringify({
        idToken: localStorage.getItem("TokenIDExpense")
      }),
      headers:{
        'Content-Type': 'application/json'
      }
    }).then(res=>{
      if(res.ok){
        return res.json();
      }
      else{
        return res.json((data)=>{
          throw new Error(data.error.message)
        })
      }
    }).then((data)=>{
      setDisplayName(data.displayName);
      setPhotoUrl(data.photoUrl)
    }).catch((err)=>{
      alert(err)
    })
  },[])

  return (
    <div>
      <Header/>
    
    <Routes>
      <Route exact path = "/" element = {<SignUp />}/>
      <Route exact path = "/welcome" element = {<WelcomePage/>}/>
      <Route exact path = "/login" element={<Login/>}/>
      <Route exact path = "/completeprofile" element={<ProfilePage inputName ={displayName} inputUrl = {photoUrl}/>}/>
    </Routes>

    </div>
  );
}

export default App;
