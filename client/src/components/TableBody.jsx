import React from 'react'

function TableBody({currentTransactions,TransactionItem}) {
  return (
    <tbody>
      {currentTransactions.map((transaction) => (
        <TransactionItem transaction={transaction} key={transaction.id} />
      ))}
    </tbody>
  );
}

export default TableBody