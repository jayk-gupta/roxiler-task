import React from 'react'

function Footer({prevPage,currentPage,nextPage,currentTransactions,transactionsPerPage}) {
  
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
    return (
    <footer className="flex justify-between">
      <button
        className="bg-slate-800 p-2 m-2 hover:bg-slate-900"
                onClick={() => {
                    prevPage()
                    handleScrollToTop()
                }}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <button
        className="bg-slate-800 p-2 m-2 hover:bg-slate-900"
                onClick={() => {
                    nextPage()
                    handleScrollToTop()
                }}
        disabled={currentTransactions.length < transactionsPerPage}
      >
        Next
      </button>
    </footer>
  );
}

export default Footer