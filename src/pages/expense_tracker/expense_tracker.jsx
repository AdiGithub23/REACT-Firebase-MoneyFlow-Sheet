import React, { useState } from 'react'
// import './expense_styles.css'
import './expenseStyles.css'
import { useAddTransaction } from '../../hooks/useAddTransaction'
import { useGetTransactions } from '../../hooks/useGetTransactions';
import { useGetUserInfo } from '../../hooks/useGetUserInfo';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../config/firebase';

const ExpenseTracker = () => {
  const navigate = useNavigate();
  
  const { addTransaction } = useAddTransaction();
  const { transactions, transactionTotals } = useGetTransactions();
  const { name, profilePhoto, userID } = useGetUserInfo();
  
  const { balance, income, expenses } = transactionTotals;

  const [description, setDescription] = useState("");
  const [transactionAmount, setTransactionAmount] = useState(0);
  const [transactionType, setTransactionType] = useState("expense");

  const onSubmit = (e) => {
    e.preventDefault();
    addTransaction({
      description, transactionAmount, transactionType
    });

    setDescription("");
    setTransactionAmount("");
  };

  const onSignOut = async () => {
    try {
      await signOut(auth);
      localStorage.clear();
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    // <>
      
    //   <div className="expense-tracker">
    //     <div className="container">
    //       <h1>{name}'s Expense Tracker</h1>
    //       <div className="balance">
    //         <h3> Your Balance</h3>
    //         {balance >= 0 ? <h2> ${balance}</h2> : <h2> -${balance*(-1)}</h2>}
    //       </div>
    //       <div className="summary">
    //         <div className="income">
    //           <h4> Income</h4>
    //           <p>${income}</p>
    //         </div>
    //         <div className="expenses">
    //           <h4> Expenses</h4>
    //           <p>${expenses}</p>
    //         </div>
    //       </div>

    //       <form className="add-transaction" onSubmit={onSubmit} >
    //         <input
    //           type="text" required 
    //           placeholder="Description"
    //           value={description} onChange={(e) => setDescription(e.target.value)}
    //         />
    //         <input
    //           type="number" required
    //           placeholder="Amount"
    //           value={transactionAmount} onChange={(e) => setTransactionAmount(e.target.value)}
    //         />
    //         <input
    //           type="radio"
    //           id="expense"
    //           value="expense"
    //           checked={transactionType === "expense"}
    //           onChange={(e) => setTransactionType(e.target.value)}
    //         />
    //         <label htmlFor="expense"> Expense</label>
    //         <input
    //           type="radio"
    //           id="income"
    //           value="income"
    //           checked={transactionType === "income"}
    //           onChange={(e) => setTransactionType(e.target.value)}
    //         />
    //         <label htmlFor="income"> Income</label>

    //         <button type="submit"> Add Transaction</button>
    //       </form>
    //     </div>

    //     {
    //       profilePhoto && 
    //       (
    //         <div className="profile"> {" "}
    //           <img className="profile-photo" src={profilePhoto} />
    //           <button className="sign-out-button" onClick={onSignOUt}>
    //             Sign Out
    //           </button>
    //         </div>
    //       )
    //     }

    //   </div>

    //   {/* {transactions.length > 0 && ( */}
    //   <div className='transactions'>
    //     <h3>Transactions</h3>
    //     <ul>
    //       {transactions.map((transaction) => (
    //         <li key={transaction.id}> {/* Add key for better performance */}
    //           <h4>{transaction.description}</h4>
    //           <p>${transaction.transactionAmount} ({transaction.transactionType})</p>
    //         </li>
    //       ))}
    //     </ul>
    //   </div>
    //   {/* )} */}


    // </>
        
    <div className="background-animation">
    <div className="container">
      <div className="left-column">
        <h1>{name}'s Expense Tracker</h1>
        <div className="balance">
          <h3>Your Balance</h3>
          {balance >= 0 ? <h2 className='balance-green'>${balance}</h2> : <h2 className='balance-red'>-${balance*(-1)}</h2>}
          {/* <h2 className={balance >= 0 ? 'balance-green' : 'balance-red'}>${Math.abs(balance)}</h2> */}
        </div>
        <div className="summary">
          <div className="income">
            <h4>Income</h4>
            <p>${income}</p>
          </div>
          <div className="expenses">
            <h4>Expenses</h4>
            <p>${expenses}</p>
          </div>
        </div>
        <form className="add-transaction" onSubmit={onSubmit}>
          <input
            type="text" required 
            placeholder="Description"
            value={description} onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="number" required
            placeholder="Amount"
            value={transactionAmount} onChange={(e) => setTransactionAmount(e.target.value)}
          />
          <div className="radio-group">
            <input
              type="radio"
              id="expense"
              value="expense"
              checked={transactionType === "expense"}
              onChange={(e) => setTransactionType(e.target.value)}
            />
            <label htmlFor="expense">Expense</label>
            <input
              type="radio"
              id="income"
              value="income"
              checked={transactionType === "income"}
              onChange={(e) => setTransactionType(e.target.value)}
            />
            <label htmlFor="income">Income</label>
          </div>
          <button 
            type="submit" 
            className={transactionType === 'expense' ? 'expense-button' : 'income-button'}
          >
            Add Transaction
          </button>
        </form>
        {
          profilePhoto && 
          (
            <div className="profile"> 
              <img className="profile-photo" src={profilePhoto} alt="Profile"/>
              <button className="sign-out-button" onClick={onSignOut}>
                Sign Out
              </button>
            </div>
          )
        }
      </div>
      <div className="right-column">
        <div className="transactions">
          <h3>Transactions</h3>
          <ul>
            {transactions.map((transaction) => (
              <li key={transaction.id}>
                <h4>{transaction.description}</h4>
                <p>${transaction.transactionAmount} ({transaction.transactionType})</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
    </div>
  )
}

export default ExpenseTracker