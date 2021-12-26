import React, { useRef, useState } from "react";
import styles from'./SignUp.module.css'
import VerifyEmail from "./VerifyEmail";

const SignUp = ()=>{

    const [isVerify, setIsVerify] = useState(false);

    const inputEmailRef = useRef();
    const inputPassRef = useRef();
    const inputConfirmPassRef = useRef();

    const submitHandler = (event)=>{
        event.preventDefault();

        const enteredEmail = inputEmailRef.current.value;
        const enteredPassword = inputPassRef.current.value;

        if(enteredPassword!==inputConfirmPassRef.current.value){
            alert("Confirm Password is not Same");
            return;
        }

        fetch("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA5nYjPCDidltvXYlAkGXzCUR0CIOQBAOo",{
            method: 'POST',
            body:JSON.stringify({
                email: enteredEmail,
                password: enteredPassword,
                returnSecureToken: true
              }),
              headers:{
                'Content-Type': 'application/json'
              }
        }).then(res=>{
            if(res.ok){

                console.log('Successfully Registered')
                alert('Successfully Registered')
                setIsVerify(true)
                return res.json();
            }
            else{
                return res.json().then(data => {
                    console.log(data.error.message)
                    alert(data.error.message)
                })
            }
        }).then((data) => {
            let id = data.idToken;
            fetch("https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyA5nYjPCDidltvXYlAkGXzCUR0CIOQBAOo",{
                method:'POST',
                body:JSON.stringify({
                    requestType: "VERIFY_EMAIL",
                    idToken: id,
                  }),
                  headers:{
                    'Content-Type': 'application/json'
                  }

            }).then(res =>{
                if(res.ok){
                    console.log("OTP SENT")
                }
                else{
                    return res.json().then(data =>{
                        alert("Something went wrong")
                    })
                }
            })
        })
        



    }


    return (
        <div className={styles.signupBody}>
            <h2>SignUp</h2>
            <form onSubmit={submitHandler} className={styles.signupForm}>
                <label htmlFor="signupEmail">Email: </label>
                <input id="signupEmail" type="email" required ref={inputEmailRef}></input>
                <label htmlFor="signupPass">Password: </label>
                <input id="signupPass" type="password" required ref= {inputPassRef}></input>
                <label htmlFor="signupConfirmPass">Confirm Password: </label>
                <input id="signupConfirmPass" type="password" required ref = {inputConfirmPassRef}></input>
                <button type="submit" className={styles.signupBtn}>SignUp</button>
            </form>
            <div className={styles.verifyOtp}>
            {isVerify && <VerifyEmail/>}
            </div>
            
        </div>
    )

}

export default SignUp;