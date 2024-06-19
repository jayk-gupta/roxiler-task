import React from 'react'

function MonthDropDown({month,handleMonthChange}) {
  return (
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
  );
}

export default MonthDropDown