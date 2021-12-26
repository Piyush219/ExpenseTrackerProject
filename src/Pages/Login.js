import React, { useRef } from "react";
import styles from './Login.module.css'
import { useNavigate } from "react-router-dom";
const Login = ()=>{

    const inputLoginEmailRef = useRef();
    const inputLoginPassRef = useRef();
    let navigate = useNavigate();
    const loginSubmitHandler = (event) =>{
        event.preventDefault();

        const enteredLoginEmail = inputLoginEmailRef.current.value;
        const enteredLoginPass = inputLoginPassRef.current.value;

        fetch("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA5nYjPCDidltvXYlAkGXzCUR0CIOQBAOo",{
            method:'POST',
            body:JSON.stringify({
                email: enteredLoginEmail,
                password: enteredLoginPass,
                returnSecureToken: true,
            })
        }).then(res =>{
            if(res.ok){
                console.log("Login Success")
                alert("Login Success")
                return res.json();
            }
            else{
                return res.json().then(data =>{
                    alert("Something went wrong")
                })
            }
        }).then((data)=>{
            localStorage.setItem('TokenIDExpense', data.idToken)
            navigate('/welcome')
        })        
    }

    return (
        <div className={styles.loginBody}>
            <form className={styles.loginForm} onSubmit={loginSubmitHandler}>
            <label htmlFor="loginEmail">Email: </label>
                <input id="loginEmail" type="email" required ref={inputLoginEmailRef}></input>
                <label htmlFor="loginPass">Password: </label>
                <input id="loginPass" type="password" required ref= {inputLoginPassRef}></input>
                <button className={styles.loginBtn} type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login;