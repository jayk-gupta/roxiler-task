import React, { useEffect, useState } from "react";
import TransactionItem from "./TransactionItem";
import MonthDropDown from "./MonthDropDown";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import Footer from "./Footer";

function Table() {
  // USESTATE HOOKS
  const [search, setSearch] = useState("");
  const [month, setMonth] = useState("March");
  const [transactions, setTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const transactionsPerPage = 10;
  

  // EVENT HANDLERS
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };
  const handleMonthChange = (e) => {
    setMonth(e.target.value);
  };
  // PAGINATION
  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };
  const handleSearchClick = async () => {
    try {
      const queryParams = new URLSearchParams();
      queryParams.append("month", month.toLowerCase());
      if (search.trim() !== "") {
        queryParams.append("search", search.trim());
      }
      const url = `http://localhost:3000/api/getData?${queryParams.toString()}`;
      const res = await fetch(url);
      const data = await res.json();
      setTransactions(data);
      console.log(transactions);
    } catch (error) {
      console.log(error);
    }
  };

  // USEEFFECT HOOK
    useEffect(() => {
        handleSearchClick();
    }, [search, month]);
    const indexOfLastTransaction = currentPage * transactionsPerPage;
    const indexOfFirstTransaction =
      indexOfLastTransaction - transactionsPerPage;
    const currentTransactions = transactions.slice(
      indexOfFirstTransaction,
      indexOfLastTransaction
    );
  /////////////////////////////////////////////////
  return (
    <div className="px-24 py-6  bg-gray-700 text-white  w-full">
      <header className="mb-4">
        <div className="flex justify-between ">
          <div className="search-input">
            <input
              className="bg-gray-100 text-black 
              border-none rounded-xl p-2"
              type="text"
              placeholder="Search transactions"
              value={search}
              onChange={handleSearchChange}
            />
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleSearchClick}
            >
              Search
            </button>
          </div>
          <div className="select-month">
            <MonthDropDown
              handleMonthChange={handleMonthChange}
              month={month}
            />
          </div>
        </div>
      </header>
      <main>
        <header>
          <table className="min-w-full table-auto bg-gray-700 rounded-lg">
            <TableHeader />
            <TableBody
              currentTransactions={currentTransactions}
              TransactionItem={TransactionItem}
            />
          </table>
        </header>
      </main>
      <Footer
        prevPage={prevPage}
        currentPage={currentPage}
        nextPage={nextPage}
        currentTransactions={currentTransactions}
        transactionsPerPage={transactionsPerPage}
      />
    </div>
  );
}

export default Table;
