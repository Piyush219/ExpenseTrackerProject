import React from "react";
import styles from './Header.module.css'
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../../store/authReducer";


const Header = () =>{
    
    const islogin = useSelector(state=> state.auth.isAuthenticated)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = ()=>{
        localStorage.removeItem("TokenIDExpense")
        dispatch(authActions.logout())
        navigate('/login')
    }

    return(
        <div className={styles.headBody}> 
        <span>Expense Tracker</span>
            <nav className={styles.headNav}>
                <Link className={styles.headHome} to = "/">Home</Link>
                {!islogin && <Link className={styles.headLogin} to = "/login">Login</Link>}
                {islogin && <button className={styles.logoutBtn} onClick={logoutHandler} type="button">Logout</button>}
            </nav>
        </div>
    )

}

export default Header;