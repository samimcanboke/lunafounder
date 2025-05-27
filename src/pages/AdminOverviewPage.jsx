import React, { useState, useEffect } from "react";
import { Row, Card } from "react-bootstrap";
import AdminOverviewHeader from "./PagesComponents/AdminOverviewPageComponent/AdminOverviewHeader";
import AdminOverviewTable from "./PagesComponents/AdminOverviewPageComponent/AdminOverviewTable";
import AdminOverviewPagination from "./PagesComponents/AdminOverviewPageComponent/AdminOverviewPagination";
import OldDistributionService from "../services/OldDistributionService";

const AdminOverviewPage = () => {
  const [referralData, setReferralData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedRow, setExpandedRow] = useState(null);
  const [totalItems, setTotalItems] = useState(0);
  const itemsPerPage = 10;

  useEffect(() => {
    OldDistributionService.getOldDistributions(currentPage, itemsPerPage)
      .then(({ oldDistributions, totalOldDistributions }) => {
        const users = oldDistributions.map((item) => ({
          distributionId: item._id,
          userId: item.user._id,
          username: item.user.username,
          wallet: item.wallet,
          distributions: item.distributions,
        }));
        setReferralData(users);
        setTotalItems(totalOldDistributions);
      })
      .catch((err) => console.error(err));
  }, [currentPage]);

  const handlePaidToggle = (distributionId, nftId, isPaid) => {
    setReferralData((prev) =>
      prev.map((user) =>
        user.distributionId === distributionId
          ? {
              ...user,
              distributions: user.distributions.map((dist) =>
                dist._id === nftId ? { ...dist, isPaid } : dist
              ),
            }
          : user
      )
    );
  };

  const toggleRow = (id) => setExpandedRow(expandedRow === id ? null : id);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const start = (currentPage - 1) * itemsPerPage + 1;
  const end = start + referralData.length - 1;

  return (
    <>
      <Row>
        <AdminOverviewHeader />
        <div className="col-lg-12">
          <Card style={{ backgroundColor: "rgba(39, 46, 53, 1)" }}>
            <div className="card-body">
              <div className="table-responsive">
                <AdminOverviewTable
                  data={referralData}
                  expandedRow={expandedRow}
                  toggleRow={toggleRow}
                  onPaidToggle={handlePaidToggle}
                />
              </div>
              <div className="d-flex justify-content-between align-items-center mt-3">
                <div className="text-muted">
                  Showing {start} to {end} of {totalItems} entries
                </div>
                <nav>
                  <AdminOverviewPagination
                    currentPage={currentPage}
                    itemsPerPage={itemsPerPage}
                    totalItems={totalItems}
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
