import axios from "axios";
import { useEffect, useRef, useState } from "react";
import ExpenseList from "./ExpenseList";

const Expenses = () => {

    

  const dummyExpense = [
    {
      id: 'e1',
      money: '100',
      description: 'For health and school',
      category: 'salary',
    },
  ];

  const [expense, setExpense] = useState(dummyExpense)

  const inputExpenseMoneyRef = useRef();
  const inputExpenseDescriptionRef = useRef();
  const inputExpenseCategoryRef = useRef();


useEffect(()=>{
  axios.get('https://expensetracker-c301c-default-rtdb.firebaseio.com/expenses.json').then(response => {
    console.log("res dat",response.data)
    
    const dataArray = [];
    for(const key in response.data){
      dataArray.push({
        id: response.data[key].id,
        money: response.data[key].money,
        description: response.data[key].description,
        category: response.data[key].category,
      })
      
    }
    console.log("DAr",dataArray)
    setExpense(dataArray)

    // console.log(Object.keys(response.data))

    // Object.keys(response.data).map((d)=>{
    //   return console.log(d)
    // })
    
    // console.log(`Data: ${[data,...expense]} and expense: ${expense}`)
    // setExpense([arr, ...expense])
  })
},[]) 
  
  

  const expenseSubmitHandler = (event) => {
    event.preventDefault();
    console.log(expense)
    const enteredExpenseMoney = inputExpenseMoneyRef.current.value;
    const enteredExpenseDescription = inputExpenseDescriptionRef.current.value;
    const enteredExpenseCategory = inputExpenseCategoryRef.current.value;

    const newExpense =
      {
        money: enteredExpenseMoney,
        description: enteredExpenseDescription,
        category: enteredExpenseCategory,
        id:Math.random().toString()
      }
    // console.log(newExpense[0].money)
    // console.log(newExpense[0].description)
    // console.log(newExpense[0].category)
    // console.log(`state: ${expense}`)
      
      fetch("https://expensetracker-c301c-default-rtdb.firebaseio.com/expenses.json", {
        method: 'POST',
        body: JSON.stringify(newExpense),
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(res=>{
        if(res.ok){
          return res.json()
        }
        else{
          return res.json((data)=>{
            throw new Error(data.error.message)
          })
        }
      }).then(
        setExpense([newExpense,...expense])
      ).catch(err=>{
        alert(err.message)
      })

    // setExpense((prevState) => {
    //   // console.log([newExpense, ...prevState])
    //   return [newExpense, ...prevState]
    // })
    inputExpenseMoneyRef.current.value = '';
    inputExpenseCategoryRef.current.value = '';
    inputExpenseDescriptionRef.current.value = '';
  };

  return (
    <div>
      <h2>Enter Daily Expenses</h2>
      <form onSubmit={expenseSubmitHandler}>
        <label htmlFor="expenseMoney">Money Spent</label>
        <input id="expenseMoney" type="text" ref={inputExpenseMoneyRef}></input>
        <label htmlFor="expenseDescription">Description</label>
        <input
          id="expenseDescription"
          type="text"
          ref={inputExpenseDescriptionRef}
        ></input>
        <label htmlFor="expenseCategory">Category</label>
        <select
          name="Category"
          id="expenseCategory"
          ref={inputExpenseCategoryRef}
        >
          <option value="food">Food</option>
          <option value="petrol">Petrol</option>
          <option value="salary">Salary</option>
        </select>

        <button type="submit">Submit</button>
      </form>
      
      <ExpenseList items={expense} />
    </div>
  );
};

export default Expenses;
