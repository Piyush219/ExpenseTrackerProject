import React from "react";
import { Link, useNavigate } from "react-router-dom";
const Header = (props) =>{
    

    const navigate = useNavigate();

    const logoutHandler = ()=>{
        localStorage.removeItem("TokenIDExpense")
        props.setLogin(false)
        navigate('/login')
    }

    return(
        <div>
            <nav>
                <Link to = "/">Home</Link>
                <Link to = "/login">Login</Link>
                {props.login && <button onClick={logoutHandler} type="button">Logout</button>}
            </nav>
        </div>
    )

}

export default Header;