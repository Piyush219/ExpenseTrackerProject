import React, { useRef } from "react";
import styles from './Login.module.css'
import { useNavigate, Link } from "react-router-dom";

const Login = (props)=>{

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
                    alert(data.error.message)
                    throw new Error(data.error.message)
                })
            }
        }).then((data)=>{
            localStorage.setItem('TokenIDExpense', data.idToken)
            props.setLogin(true)
            navigate('/welcome')
        }).catch((err)=>{
            console.log("Something Went Wrong")
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
            <Link to = "/resetpassword">Forget Password?</Link>
        </div>
    )
}

export default Login;