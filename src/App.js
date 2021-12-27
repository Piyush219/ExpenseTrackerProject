import React, { useEffect, useState } from "react";
import SignUp from "./Components/Pages/SignUp";
import {Routes, Route} from 'react-router-dom'
import WelcomePage from "./Components/Pages/WelcomePage";
import Login from "./Components/Pages/Login";
import Header from "./Components/Layout/Header";
import ProfilePage from "./Components/Pages/ProfilePage";
import PasswordReset from "./Components/Pages/PasswordReset";
import CreatingPassword from "./Components/Pages/CreatingPassword";
import EnterResetCode from "./Components/Pages/EnterResetCode";

function App() {

  const [displayName, setDisplayName] = useState('')
  const [photoUrl, setPhotoUrl] = useState('')
  const [islogin, setIslogin] = useState(false)


  useEffect(()=>{
    if(localStorage.getItem("TokenIDExpense")){
      setIslogin(true)
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
    }
    
  },[])

  return (
    <div>
      <Header login = {islogin} setLogin = {setIslogin} />
    
    <Routes>
      <Route exact path = "/" element = {<SignUp />}/>
      <Route exact path = "/welcome" element = {<WelcomePage/>}/>
      <Route exact path = "/login" element={<Login setLogin = {setIslogin}/> }/>
      <Route exact path = "/completeprofile" element={<ProfilePage inputName ={displayName} inputUrl = {photoUrl}/>}/>
      <Route exact path = "/resetpassword" element = {<PasswordReset/>}/>
      <Route exact path = "/enterresetcode" element = {<EnterResetCode/>}/>
      <Route exact path = '/createpassword' element = {<CreatingPassword/>}/>    </Routes>

    </div>
  );
}

export default App;
