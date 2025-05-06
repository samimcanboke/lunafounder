import React, { useState } from "react";
import { Row, Card } from "react-bootstrap";
import AdminOverviewHeader from "./PagesComponents/AdminOverviewPageComponent/AdminOverviewHeader";
import AdminOverviewTable from "./PagesComponents/AdminOverviewPageComponent/AdminOverviewTable";
import AdminOverviewPagination from "./PagesComponents/AdminOverviewPageComponent/AdminOverviewPagination";

const AdminOverviewPage = () => {
  const referralData = [
    {
      id: 1,
      name: "John Doe",
      level: "Gold",
      date: "2025-04-01",
      commission: "$150.00",
      joinDate: "2024-01-15",
      nfts: 5,
      lastOrder: "2025-03-20",
      totalSpend: "$1,250.00",
    },
    {
      id: 2,
      name: "Jane Smith",
      level: "Silver",
      date: "2025-04-02",
      commission: "$75.00",
      joinDate: "2024-06-10",
      nfts: 3,
      lastOrder: "2025-04-05",
      totalSpend: "$850.00",
    },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const [expandedRow, setExpandedRow] = useState(null);
  const itemsPerPage = 5;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = referralData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const toggleRow = (id) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  return (
    <>
      <Row>
        {/* Başlık ve tooltip */}
        <AdminOverviewHeader />

        <div className="col-lg-12">
          <Card style={{ backgroundColor: "rgba(39, 46, 53, 1)" }}>
            <div className="card-body">
              <div className="table-responsive">
                {/* Tablo */}
                <AdminOverviewTable
                  data={currentItems}
                  expandedRow={expandedRow}
                  toggleRow={toggleRow}
                />
              </div>
              <div className="d-flex justify-content-between align-items-center mt-3">
                <div className="text-muted">
                  Showing {indexOfFirstItem + 1} to{" "}
                  {Math.min(indexOfLastItem, referralData.length)} of{" "}
                  {referralData.length} entries
                </div>
                <nav>
                  {/* Sayfalama */}
                  <AdminOverviewPagination
                    currentPage={currentPage}
                    itemsPerPage={itemsPerPage}
                    totalItems={referralData.length}
                    paginate={paginate}
                  />
                </nav>
              </div>
            </div>
          </Card>
        </div>
      </Row>
    </>
  );
};

export default AdminOverviewPage;
