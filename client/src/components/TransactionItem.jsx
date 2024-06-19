import React from "react";

const style = `px-4 py-2 text-left border-r-[0.5px] border-gray-500`;

function TransactionItem({ transaction }) {
  return (
    <tr key={transaction.id} className="border-b border-gray-600">
      <td className={style}>{transaction.id}</td>
      <td className={style}>{transaction.title}</td>
      <td className={style}>{transaction.description}</td>
      <td className={style}>{transaction.price}</td>
      <td className={style}>{transaction.category}</td>
      <td className={style}>{transaction.sold ? "Yes" : "No"}</td>
      <td className="px-4 py-2 flex items-center justify-center">
        <img
          src={transaction.image}
          alt={transaction.title}
          className="w-32 h-auto"
        />
      </td>
    </tr>
  );
}

export default TransactionItem;
