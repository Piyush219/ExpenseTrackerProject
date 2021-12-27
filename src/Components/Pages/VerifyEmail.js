import React, { useRef } from "react";

const VerifyEmail = (props) =>{
    
    const inputOtpRef = useRef();

    const verifySubmitHandler = (event)=>{
        event.preventDefault();
        const enteredOtp = inputOtpRef.current.value;

        fetch("https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyA5nYjPCDidltvXYlAkGXzCUR0CIOQBAOo", {
            method: 'POST',
            body:JSON.stringify({
                oobCode: enteredOtp,

            }),
            headers:{
                'Content-Type': 'application/json'
              }
        }).then(res=>{
            if(res.ok){

                console.log('Successfully Verified')
                alert('Successfully Verified')
                props.verify(false)
                return res.json();
            }
            else{
                return res.json().then(data => {
                    console.log(data.error.message)
                    alert(data.error.message)
                })
            }
        })

    }


    return (
        <div>
            <form onSubmit={verifySubmitHandler}>
            <label htmlFor="verify">Please Enter OTP to Verify Email</label>
            <input type="text" id="verify" ref={inputOtpRef}></input>
            <button type="submit">Submit</button>
        
            </form>
        </div>
    )
}

export default VerifyEmail;