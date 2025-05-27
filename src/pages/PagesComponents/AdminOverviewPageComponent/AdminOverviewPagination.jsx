import React from "react";
import { Pagination } from "react-bootstrap";

const AdminOverviewPagination = ({
  currentPage,
  itemsPerPage,
  totalItems,
  paginate,
}) => {
  const pageCount = Math.ceil(totalItems / itemsPerPage);

  const getPages = () => {
    const pages = [];
    if (pageCount <= 7) {
      // Show all pages if the total count is small
      for (let i = 1; i <= pageCount; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 4) pages.push("start-ellipsis");
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(pageCount - 1, currentPage + 1);
      for (let i = start; i <= end; i++) pages.push(i);
      if (currentPage < pageCount - 3) pages.push("end-ellipsis");
      pages.push(pageCount);
    }
    return pages;
  };

  return (
    <Pagination className="justify-content-center">
      <Pagination.Prev
        onClick={() => paginate(currentPage - 1)}
        disabled={currentPage === 1}
      />
      {getPages().map((p, idx) =>
        p === "start-ellipsis" || p === "end-ellipsis" ? (
          <Pagination.Ellipsis key={p + idx} disabled />
        ) : (
          <Pagination.Item
            key={p}
            active={currentPage === p}
            onClick={() => paginate(p)}
          >
            {p}
          </Pagination.Item>
        )
      )}
      <Pagination.Next
        onClick={() => paginate(currentPage + 1)}
        disabled={currentPage === pageCount}
      />
    </Pagination>
  );
};

export default AdminOverviewPagination;
