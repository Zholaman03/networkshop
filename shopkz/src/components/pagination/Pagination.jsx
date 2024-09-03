import React from "react";

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div>
      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => onPageChange(number)}
          style={{ margin: "0 5px", backgroundColor: currentPage === number ? "lightblue" : "white" }}
        >
          {number}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
