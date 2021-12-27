import React from "react";
import { Link } from "react-router-dom";
import Expenses from "./Expenses/Expense";

const WelcomePage = () => {
    return (
        <div>
            <h1>Welcome to Expense Tracker</h1>

            <p>Your profile is incomplete</p>
            <Link to ="/completeprofile">Complete Now</Link>
            <Expenses/>
        </div>
    )
}

export default WelcomePage;