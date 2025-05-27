import React, { useState, useEffect } from "react";
import { Row, Card } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import UserNewNftsTable from "./PagesComponents/UserNewNftsPageComponent/UserNewNftsTable";
import AdminOverviewPagination from "./PagesComponents/AdminOverviewPageComponent/AdminOverviewPagination";
import userMintedNftsStore from "../store/userMintedNftsStore";

const UserNewNftsPage = () => {
  const { t } = useTranslation();
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedRow, setExpandedRow] = useState(null);
  const [totalItems, setTotalItems] = useState(0);
  const itemsPerPage = 5;

  useEffect(() => {
    (async () => {
      try {
        const response = await userMintedNftsStore.getMintedNfts(
          currentPage,
          itemsPerPage
        );

        const { nfts, totalNfts } = response;
        setData(nfts);
        setTotalItems(totalNfts);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [currentPage]);

  const handlePaidToggle = (mintedNftId, distId, isPaid) => {
    setData((prev) =>
      prev.map((nft) =>
        nft._id === mintedNftId
          ? {
              ...nft,
              distribution: nft.distribution.map((d) =>
                d._id === distId ? { ...d, isPaid } : d
              ),
            }
          : nft
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
              {t("newNfts.title")}
            </h3>
            <div className="table-responsive">
              <UserNewNftsTable
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
                {t("mintedNftsPage.pagination", {
                  start,
                  end,
                  total: totalItems,
                })}
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

export default UserNewNftsPage;