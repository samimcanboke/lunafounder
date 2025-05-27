import React, { useState } from "react";
import { Table, Button, Collapse } from "react-bootstrap";
import { BiCopy, BiChevronDown, BiChevronUp } from "react-icons/bi";
import { useTranslation } from "react-i18next";
import userNftsPaidService from "../../../services/userNftsPaidService";
import AdminOverviewPagination from "../AdminOverviewPageComponent/AdminOverviewPagination";

const UserNftsTable = ({ data, expandedRow, toggleRow, onPaidToggle }) => {
  const { t } = useTranslation();
  const [copied, setCopied] = useState({});
  const [subPage, setSubPage] = useState({});
  const itemsPerPageInner = 3;

  const handleCopy = (rowId, field, value) => {
    const key = `${rowId}-${field}`;
    navigator.clipboard.writeText(value);
    setCopied((p) => ({ ...p, [key]: true }));
    setTimeout(() => setCopied((p) => ({ ...p, [key]: false })), 2000);
  };

  const handlePaidChange = async (userId, nftId, currentPaid) => {
    const newPaid = !currentPaid;
    try {
      await userNftsPaidService.updatePaidStatus(userId, nftId, newPaid);
      onPaidToggle(userId, nftId, newPaid);
    } catch (err) {
      console.error("Failed to toggle paid:", err);
    }
  };

  return (
    <Table hover size="sm">
      <thead>
        <tr>
          <th></th>
          <th>{t('userNfts.table.username')}</th>
          <th>{t('userNfts.table.wallet')}</th>
          <th className="text-center">{t('userNfts.table.count')}</th>
        </tr>
      </thead>
      <tbody>
        {data.map((user) => {
          const allNfts = user.nfts || [];
          const walletVal = user.wallet || "";
          const wKey = `${user.userId}-wallet`;
          const page = subPage[user.userId] || 1;
          const end = page * itemsPerPageInner;
          const start = end - itemsPerPageInner;
          const slice = allNfts.slice(start, end);

          return (
            <React.Fragment key={user.userId}>
              <tr>
                <td className="p-1">
                  <Button
                    className="text-white"
                    variant="link"
                    onClick={() => toggleRow(user.userId)}
                    aria-controls={`collapse-${user.userId}`}
                    aria-expanded={expandedRow === user.userId}
                  >
                    {expandedRow === user.userId ? (
                      <BiChevronUp />
                    ) : (
                      <BiChevronDown />
                    )}
                  </Button>
                </td>
                <td className="p-1">{user.username}</td>
                <td>
                  {walletVal
                    ? <>
                        {walletVal.slice(0, 6)}…{walletVal.slice(-4)}{" "}
                        {copied[wKey] ? (
                          <span>{t('userNfts.table.copied')}</span>
                        ) : (
                          <BiCopy
                            style={{ cursor: "pointer" }}
                            onClick={() =>
                              handleCopy(user.userId, "wallet", walletVal)
                            }
                          />
                        )}
                      </>
                    : "-"}
                </td>
                <td className="text-center">{allNfts.length}</td>
              </tr>
              <tr>
                <td colSpan="4" style={{ padding: 0, border: 0 }}>
                  <Collapse in={expandedRow === user.userId}>
                    <div id={`collapse-${user.userId}`} className="p-2">
                      <Table size="sm" borderless className="mb-0">
                        <thead>
                          <tr>
                            <th>{t('userNfts.table.nftName')}</th>
                            <th>{t('userNfts.table.date')}</th>
                            <th>{t('userNfts.table.signature')}</th>
                            <th className="text-center">{t('userNfts.table.paid')}</th>
                          </tr>
                        </thead>
                        <tbody>
                          {slice.map((nft) => {
                            const nKey = `${user.userId}-${nft._id}-nft`;
                            return (
                              <tr key={nft._id}>
                                <td>{nft.nftName}</td>
                                <td>
                                  {new Date(nft.date).toLocaleDateString()}
                                </td>
                                <td>
                                  {nft.signature
                                    ? `${nft.signature.slice(0, 6)}…${nft.signature.slice(-4)}`
                                    : "-"}{" "}
                                  {nft.signature && (
                                    copied[nKey] ? (
                                      <span>{t('userNfts.table.copied')}</span>
                                    ) : (
                                      <BiCopy
                                        style={{ cursor: "pointer" }}
                                        onClick={() =>
                                          handleCopy(
                                            `${user.userId}-${nft._id}`,
                                            "nft",
                                            nft.signature
                                          )
                                        }
                                      />
                                    )
                                  )}
                                </td>
                                <td className="text-center">
                                  <input
                                    type="checkbox"
                                    checked={nft.isPaid}
                                    onChange={() =>
                                      handlePaidChange(
                                        user.userId,
                                        nft._id,
                                        nft.isPaid
                                      )
                                    }
                                  />
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </Table>
                      {allNfts.length > itemsPerPageInner && (
                        <div className="d-flex justify-content-center mt-2">
                          <AdminOverviewPagination
                            currentPage={page}
                            itemsPerPage={itemsPerPageInner}
                            totalItems={allNfts.length}
                            paginate={(p) =>
                              setSubPage((prev) => ({
                                ...prev,
                                [user.userId]: p,
                              }))
                            }
                          />
                        </div>
                      )}
                    </div>
                  </Collapse>
                </td>
              </tr>
            </React.Fragment>
          );
        })}
      </tbody>
    </Table>
  );
};

export default UserNftsTable;
