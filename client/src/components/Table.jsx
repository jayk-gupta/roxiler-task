import React, { useEffect, useState } from "react";

function Table() {
  const [search, setSearch] = useState("");
  const [month, setMonth] = useState("Jan");
  const [transactions, setTransactions] = useState([]);
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };
  const handleMonthChange = (e) => {
    setMonth(e.target.value);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
          const res = await fetch(`http://localhost:3000/api/getData` );
        const data = await res.json();
        setTransactions(data);
        console.log(transactions);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [search,month]);

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
          </div>
          <div className="select-month">
            <select
              value={month}
              onChange={handleMonthChange}
              className="text-gray-600 p-2 rounded-xl"
            >
              <option value="">Select Month</option>
              <option value="January">January</option>
              <option value="February">February</option>
              <option value="March">March</option>
              <option value="April">April</option>
              <option value="May">May</option>
              <option value="June">June</option>
              <option value="July">July</option>
              <option value="August">August</option>
              <option value="September">September</option>
              <option value="October">October</option>
              <option value="November">November</option>
              <option value="December">December</option>
            </select>
          </div>
        </div>
      </header>
      <main>
        <header>
          <table className="min-w-full table-auto bg-gray-700 rounded-lg">
            <thead>
              <tr className="bg-gray-900">
                <th className="p-2 border-r">Id</th>
                <th className="p-2 border-r">Title</th>
                <th className="p-2 border-r">Description</th>
                <th className="p-2 border-r">Price</th>
                <th className="p-2 border-r">Category</th>
                <th className="p-2 border-r">Sold</th>
                <th className="p-2 ">Image</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.id} className="border-b border-gray-600">
                  <td className=" px-4 py-2 text-left font-bold  border-r">
                    {transaction.id}
                  </td>
                  <td className="px-4 py-2 text-left  border-r">
                    {transaction.title}
                  </td>
                  <td className="px-4 py-4 text-left  border-r">
                    {transaction.description}
                  </td>
                  <td className="px-4 py-2 text-left  border-r">
                    {transaction.price}
                  </td>
                  <td className="px-4 py-2 text-left  border-r">
                    {transaction.category}
                  </td>
                  <td className="px-4 py-2 text-left  border-r">
                    {transaction.sold ? "Yes" : "No"}
                  </td>
                  <td className="px-4 py-2 text-left">
                    <img
                      src={transaction.image}
                      alt={transaction.title}
                      className="w-16 h-auto"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </header>
      </main>
    </div>
  );
}

export default Table;

/*
"id": 10,
        "title": "SanDisk SSD PLUS 1TB Internal SSD  SATA III 6 Gbs",
        "price": 763,
        "description": "Easy upgrade for faster boot up shutdown application load and response As compared to 5400 RPM SATA 2.5 hard drive Based on published specifications and internal benchmarking tests using PCMark vantage scores Boosts burst write performance making it ideal for typical PC workloads The perfect balance of performance and reliability Readwrite speeds of up to 535MBs450MBs Based on internal testing Performance may vary depending upon drive capacity host device OS and application.",
        "category": "electronics",
        "image": "https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg",
        "sold": false,
        "dateOfSale": "2022-03-27T20:29:54+05:30"


    */
