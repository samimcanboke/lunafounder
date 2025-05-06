import React from "react";
import { Pagination } from "react-bootstrap";

const AdminOverviewPagination = ({
  currentPage,
  itemsPerPage,
  totalItems,
  paginate,
}) => {
  const pageCount = Math.ceil(totalItems / itemsPerPage);
  return (
    <Pagination>
      {Array.from({ length: pageCount }, (_, i) => i + 1).map((num) => (
        <li
          key={num}
          className={`page-item ${currentPage === num ? "active" : ""}`}
        >
          <button
            className="page-link"
            onClick={() => paginate(num)}
            style={{
              backgroundColor:
                currentPage === num ? "#dc3545" : "transparent",
              color: "#fff",
              border: "1px solid rgba(255, 255, 255, 0.1)",
            }}
          >
            {num}
          </button>
        </li>
      ))}
    </Pagination>
  );
};

export default AdminOverviewPagination;
