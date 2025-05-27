import React, { useState } from "react";
import { Table, Button, Collapse } from "react-bootstrap";
import { BiCopy, BiChevronDown, BiChevronUp } from "react-icons/bi";
import { useTranslation } from "react-i18next";
import OldDistributionService from "../../../services/OldDistributionService";
import AdminOverviewPagination from "./AdminOverviewPagination";

const AdminOverviewTable = ({ data, expandedRow, toggleRow, onPaidToggle }) => {
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

  const handlePaidChange = async (distributionId, nftId, currentPaid) => {
    const newPaid = !currentPaid;
    try {
      await OldDistributionService.updatePaidStatus(distributionId, nftId, newPaid);
      onPaidToggle(distributionId, nftId, newPaid);
    } catch (err) {
      console.error("Failed to toggle paid:", err);
    }
  };

  return (
    <Table hover size="sm">
      <thead>
        <tr>
          <th></th>
          <th>{t('adminOverview.table.username')}</th>
          <th>{t('adminOverview.table.wallet')}</th>
          <th className="text-center">{t('adminOverview.table.count')}</th>
        </tr>
      </thead>
      <tbody>
        {data.map((user) => {
          const wKey = `${user.userId}-wallet`;
          const page = subPage[user.userId] || 1;
          const end = page * itemsPerPageInner;
          const start = end - itemsPerPageInner;
          const currentDists = user.distributions.slice(start, end);

          return (
            <React.Fragment key={user.userId}>
              <tr>
                <td className="p-1">
                  <Button
                    variant="link"
                    className="text-white"
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
                  {user.wallet.slice(0, 6)}…{user.wallet.slice(-4)}{" "}
                  {copied[wKey] ? (
                    <span>{t('adminOverview.table.copied')}</span>
                  ) : (
                    <BiCopy
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        handleCopy(user.userId, "wallet", user.wallet)
                      }
                    />
                  )}
                </td>
                <td className="text-center">{user.distributions.length}</td>
              </tr>
              <tr>
                <td colSpan="4" style={{ padding: 0, border: 0 }}>
                  <Collapse in={expandedRow === user.userId}>
                    <div id={`collapse-${user.userId}`} className="p-2">
                      <Table size="sm" borderless className="mb-0">
                        <thead>
                          <tr>
                            <th>{t('adminOverview.table.nftName')}</th>
                            <th>{t('adminOverview.table.price')}</th>
                            <th>{t('adminOverview.table.signature')}</th>
                            <th className="text-center">{t('adminOverview.table.paid')}</th>
                          </tr>
                        </thead>
                        <tbody>
                          {currentDists.map((d) => {
                            const sigKey = `${user.userId}-${d._id}-sig`;
                            return (
                              <tr key={d._id}>
                                <td>{d.nftName}</td>
                                <td>{d.price}</td>
                                <td>
                                  {d.signature
                                    ? `${d.signature.slice(0, 6)}…${d.signature.slice(-4)}`
                                    : "-"}{" "}
                                  {d.signature && (
                                    copied[sigKey] ? (
                                      <span>{t('adminOverview.table.copied')}</span>
                                    ) : (
                                      <BiCopy
                                        style={{ cursor: "pointer" }}
                                        onClick={() =>
                                          handleCopy(
                                            `${user.userId}-${d._id}`,
                                            "sig",
                                            d.signature
                                          )
                                        }
                                      />
                                    )
                                  )}
                                </td>
                                <td className="text-center">
                                  <input
                                    type="checkbox"
                                    checked={d.isPaid}
                                    onChange={() =>
                                      handlePaidChange(
                                        user.distributionId,
                                        d._id,
                                        d.isPaid
                                      )
                                    }
                                  />
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </Table>
                      {user.distributions.length > itemsPerPageInner && (
                        <div className="d-flex justify-content-center mt-2">
                          <AdminOverviewPagination
                            currentPage={page}
                            itemsPerPage={itemsPerPageInner}
                            totalItems={user.distributions.length}
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

export default AdminOverviewTable;
