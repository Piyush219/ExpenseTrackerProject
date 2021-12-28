import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

const ExpenseList = (props) => {
    const navigate = useNavigate();
  const removeHandler = (tempkey) => {
    console.log("tempk", tempkey);
    axios
      .delete(
        `https://expensetracker-c301c-default-rtdb.firebaseio.com/expenses/${tempkey}.json`
      )
      .then((response) => {
          console.log("resDelete", response.data)
        axios
          .get(
            "https://expensetracker-c301c-default-rtdb.firebaseio.com/expenses.json"
          )
          .then((response) => {
            

            const dataArray = [];
            for (const key in response.data) {
              console.log("sfjbh", key);
              dataArray.push({
                tempkey: key,
                id: response.data[key].id,
                money: response.data[key].money,
                description: response.data[key].description,
                category: response.data[key].category,
              });
            }
            
            props.update(dataArray);
          });
      });
  };

  return (
    <div>
      {props.items.map((item) => {
        return (
          <ul key={item.id}>
            <li>Money Spent: {item.money}</li>
            <li>Description: {item.description} </li>
            <li>Category: {item.category}</li>
            <button type="button" onClick = {()=> navigate(`/editexpense/${item.tempkey}`)}>Edit</button>
            <button type="button" onClick={() => removeHandler(item.tempkey)}>
              Delete
            </button>
          </ul>
        );
      })}
    </div>
  );
};

export default ExpenseList;
