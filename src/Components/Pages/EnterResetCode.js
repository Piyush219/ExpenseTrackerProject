import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
const EnterResetCode = () => {
  const inputResetCodeRef = useRef();
  const navigate = useNavigate();

  const resetCodeHandler = (event) => {
    event.preventDefault();
    const enteredResetCode = inputResetCodeRef.current.value;

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:resetPassword?key=AIzaSyA5nYjPCDidltvXYlAkGXzCUR0CIOQBAOo",
      {
        method: "POST",
        body: JSON.stringify({
          obbCode: enteredResetCode,
          
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        alert("checking");
        console.log("checking");
        if (res.ok) {
          alert("Verified");
          console.log("checking1");
          return res.json();
        } else {
            console.log("checking else",res); 
          return res.json((data) => {
            console.log("checking 2");
            alert(data.error.message);
          });
        }
      })
      .then(
        localStorage.setItem("ObbCode", enteredResetCode),
        navigate("/createpassword")
      )
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <div>
      <label htmlFor="resetCode">Enter Reset Code</label>
      <input
        id="resetCode"
        required
        type="text"
        ref={inputResetCodeRef}
      ></input>
      <button type="submit" onClick={resetCodeHandler}>
        Submit
      </button>
    </div>
  );
};

export default EnterResetCode;
