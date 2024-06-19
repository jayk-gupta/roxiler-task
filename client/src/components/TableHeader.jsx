import React from 'react'
const style = "p-2 border-r-[0.5px] border-gray-500"
function TableHeader() {
  return (
    <thead>
      <tr className="bg-gray-900">
        <th className={style}>Id</th>
        <th className={style}>Title</th>
        <th className={`${style} w-1/4`}>
          Description
        </th>
        <th className={style}>Price</th>
        <th className={style}>Category</th>
        <th className={style}>Sold</th>
        <th className="p-2 w-1/4">Image</th>
      </tr>
    </thead>
  );
}

export default TableHeader