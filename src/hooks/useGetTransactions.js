import { collection, doc, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useGetUserInfo } from './useGetUserInfo';
import { db } from '../config/firebase';

export const useGetTransactions = () => {
    const [ transactions, setTransactions ] = useState([]);
    const [transactionTotals, setTransactionTotals] = useState({
      balance: 0.0,
      income: 0.0,
      expenses: 0.0,
    });

    const transactionCollectionRef = collection(db, 'transactions')
    const { userID }  = useGetUserInfo();

    const getTransaction = async () => {

      let unsubscribe;

      try {
        const queryTransaction = query(
          transactionCollectionRef, 
          where('userID', '==', userID),
          orderBy('createdAt') );
  
        unsubscribe = onSnapshot(queryTransaction, (snapshot) => {
          let docs = [];
          let totalIncome = 0;
          let totalExpenses = 0;
  
          snapshot.forEach((doc)=>{
            const data = doc.data();
            const id = doc.id;
            docs.push({...data, id});
            

            if (data.transactionType === "expense") {
              totalExpenses += Number(data.transactionAmount);
            } else {
              totalIncome += Number(data.transactionAmount);
            }
            console.log(totalExpenses, totalIncome);

          })
  
          setTransactions(docs);

          let balance = totalIncome - totalExpenses;
          setTransactionTotals({
            balance,
            income: totalIncome,
            expenses: totalExpenses,
          });

        });
      } catch (error) {
        console.log('Firebase Query Error: ', error)
      }
      return ()=> unsubscribe();
    }

    useEffect(()=>{
        getTransaction();
    },[])

  return { transactions, transactionTotals }
}
