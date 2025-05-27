import React, { useState, useEffect } from "react";
import { Row, Card } from "react-bootstrap";
import UserNftsTable from "./PagesComponents/UserNftsPageComponent/UserNftsTable";
import AdminOverviewPagination from "./PagesComponents/AdminOverviewPageComponent/AdminOverviewPagination";
import userNftsStore from "../store/userNftsStore";
import { useTranslation } from "react-i18next";

const UserNftsPage = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedRow, setExpandedRow] = useState(null);
  const [totalItems, setTotalItems] = useState(0);
  const itemsPerPage = 5;
  const { t } = useTranslation();

  useEffect(() => {
    userNftsStore
      .getOldDistributions(currentPage, itemsPerPage)
      .then(({ users, totalUsers }) => {
        const mapped = users.map((item) => ({
          userId: item._id,
          username: item.username,
          wallet: item.wallet,
          nfts: item.nfts || [],
        }));
        setData(mapped);
        setTotalItems(totalUsers);
      })
      .catch(console.error);
  }, [currentPage]);

  const handlePaidToggle = (oldDistributionId, nftId, isPaid) => {
    setData((prev) =>
      prev.map((user) =>
        user.userId === oldDistributionId
          ? {
              ...user,
              nfts: user.nfts.map((n) =>
                n._id === nftId ? { ...n, isPaid } : n
              ),
            }
          : user
      )
    );
  };

  const start = (currentPage - 1) * itemsPerPage + 1;
  const end = start + data.length - 1;

  return (
    <Row>
      <div className="col-lg-12">
        <Card>
          <div className="card-body">
            <h3 className="text-center text-white mb-4">
              {t("oldNfts.title")}
            </h3>
            <div className="table-responsive">
              <UserNftsTable
                data={data}
                expandedRow={expandedRow}
                toggleRow={(id) =>
                  setExpandedRow(expandedRow === id ? null : id)
                }
                onPaidToggle={handlePaidToggle}
              />
            </div>
            <div className="d-flex justify-content-between align-items-center mt-3">
              <div className="text-muted">
                {/* Showing {start} to {end} of {totalItems} entries */}
              </div>
              <nav>
                <AdminOverviewPagination
                  currentPage={currentPage}
                  itemsPerPage={itemsPerPage}
                  totalItems={totalItems}
                  paginate={setCurrentPage}
                />
              </nav>
            </div>
          </div>
        </Card>
      </div>
    </Row>
  );
};

export default UserNftsPage;
