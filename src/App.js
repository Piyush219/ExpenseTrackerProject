import React, { useEffect, useState } from "react";
import SignUp from "./Components/Pages/SignUp";
import { Routes, Route } from "react-router-dom";
import WelcomePage from "./Components/Layout/WelcomePage";
import Login from "./Components/Pages/Login";
import Header from "./Components/Layout/Header";
import ProfilePage from "./Components/Pages/ProfilePage";
import PasswordReset from "./Components/Pages/PasswordReset";
import CreatingPassword from "./Components/Pages/CreatingPassword";
import EnterResetCode from "./Components/Pages/EnterResetCode";
import EditExpense from "./Components/Layout/Expenses/EditExpense";
import { useDispatch } from "react-redux";
import { authActions } from "./store/authReducer";
import styled from "styled-components";
import DarkThemeProvider from "./Components/Layout/DarkThemeProvider";
import theme from "styled-theming";


export const backgroundColor = theme("theme", {
  light: "#fff",
  dark: "#2d2d2d",
});

export const textColor = theme("theme", {
  light: "#000",
  dark: "#fff",
});

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  align-items: center;
  justify-content: center;
  font-family: sans-serif;
  background-color: ${backgroundColor};
  color: ${textColor};
`;

function App() {
  const [displayName, setDisplayName] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("TokenIDExpense")) {
      dispatch(authActions.login());
      fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyA5nYjPCDidltvXYlAkGXzCUR0CIOQBAOo",
        {
          method: "POST",
          body: JSON.stringify({
            idToken: localStorage.getItem("TokenIDExpense"),
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            return res.json((data) => {
              throw new Error(data.error.message);
            });
          }
        })
        .then((data) => {
          setDisplayName(data.displayName);
          setPhotoUrl(data.photoUrl);
        })
        .catch((err) => {
          alert(err);
        });
    }
  }, [dispatch]);

  return (
    <DarkThemeProvider>
      <Container>
        <Header />

        <Routes>
          <Route exact path="/" element={<SignUp />} />
          <Route exact path="/welcome" element={<WelcomePage />} />
          <Route exact path="/login" element={<Login />} />
          <Route
            exact
            path="/completeprofile"
            element={
              <ProfilePage inputName={displayName} inputUrl={photoUrl} />
            }
          />
          <Route exact path="/resetpassword" element={<PasswordReset />} />
          <Route exact path="/enterresetcode" element={<EnterResetCode />} />
          <Route exact path="/createpassword" element={<CreatingPassword />} />
          <Route exact path="/editexpense/:id" element={<EditExpense />} />
        </Routes>
      </Container>
    </DarkThemeProvider>
  );
}

export default App;
