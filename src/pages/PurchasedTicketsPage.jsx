import React, { useState, useEffect } from "react";
import { Row, Card, Table, Button, Collapse, Spinner } from "react-bootstrap";
import { BiCopy, BiChevronDown, BiChevronUp } from "react-icons/bi";
import { useTranslation } from "react-i18next";
import useTicketsStore from "../store/ticketsStore";
import TicketDetailsService from "../services/TicketDetailsService"; // Import the new service

const PurchasedTicketsPage = () => {
  const { t } = useTranslation();
  const [expandedRow, setExpandedRow] = useState(null);
  const [copied, setCopied] = useState({});
  const [ticketDetails, setTicketDetails] = useState({});
  const [loadingDetails, setLoadingDetails] = useState(false);
  const { tickets = [], fetchTickets } = useTicketsStore(); // Ensure tickets is an empty array by default

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchTickets();

    };

    fetchData();
  }, [fetchTickets]);

  const toggleRow = async (index, collectionMint) => {
    if (expandedRow === index) {
      setExpandedRow(null); // Collapse the row
      return;
    }

    setExpandedRow(index); // Expand the row
    if (!ticketDetails[collectionMint]) {
      setLoadingDetails(true);
      try {
        const data = await TicketDetailsService.getTicketDetails(
          collectionMint
        ); // Use the new service
        setTicketDetails((prev) => ({
          ...prev,
          [collectionMint]: data,
        }));
      } catch (error) {
        console.error("Error fetching ticket details:", error);
      } finally {
        setLoadingDetails(false);
      }
    }
  };

  const handleCopy = (rowId, value) => {
    navigator.clipboard.writeText(value);
    setCopied((prev) => ({ ...prev, [rowId]: true }));
    setTimeout(() => setCopied((prev) => ({ ...prev, [rowId]: false })), 2000);
  };

  return (
    <Row>
      <div className="col-lg-12">
        <Card style={{ backgroundColor: "rgba(39, 46, 53, 1)" }}>
          <div className="card-body">
            <h3 className="text-center text-white mb-4">
              {t("purchasedTickets.title")}
            </h3>
            <div className="table-responsive">
              <Table hover size="sm" className="mb-0">
                <thead>
                  <tr>
                    <th></th>
                    <th>{t("purchasedTickets.Prefix")}</th>

                    <th>{t("purchasedTickets.Type")}</th>
                    <th>{t("purchasedTickets.Amount")}</th>
                    <th>{t("purchasedTickets.Price")}</th>
                    <th>{t("purchasedTickets.Status")}</th>
                  </tr>
                </thead>
                <tbody>
                  {tickets.map((item, index) => (
                    <React.Fragment key={index}>
                      <tr>
                        <td className="p-1">
                          <Button
                            className="text-white"
                            variant="link"
                            onClick={() =>
                              toggleRow(index, item.collectionMint)
                            } // Pass collectionMint
                            aria-controls={`collapse-${index}`}
                            aria-expanded={expandedRow === index}
                          >
                            {expandedRow === index ? (
                              <BiChevronUp />
                            ) : (
                              <BiChevronDown />
                            )}
                          </Button>
                        </td>
                        <td>{item.prefix}</td>

                        <td>{item.type}</td>

                        <td>{item.amount}</td>
                        <td>{item.price}</td>
                        <td>{item.status}</td>
                      </tr>
                      <tr>
                        <td colSpan="6" style={{ padding: 0, border: 0 }}>
                          <Collapse in={expandedRow === index}>
                            <div id={`collapse-${index}`} className="p-2">
                              {loadingDetails && expandedRow === index ? (
                                <Spinner
                                  animation="border"
                                  variant="light"
                                  size="sm"
                                />
                              ) : ticketDetails[item.collectionMint] &&
                                ticketDetails[item.collectionMint].users ? (
                                <Table size="sm" borderless className="mb-0">
                                  <thead>
                                    <tr>
                                      <th>{t("purchasedTickets.Username")}</th>
                                      <th>{t("purchasedTickets.Wallet")}</th>
                                      <th>{t("purchasedTickets.Mints")}</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {ticketDetails[
                                      item.collectionMint
                                    ].users.map((user) => (
                                      <tr key={user._id}>
                                        <td>{user.username}</td>
                                        <td>{user.wallet}</td>
                                        <td>
                                          {t("purchasedTickets.amountWithCount", { count: user.mints.length })}
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </Table>
                              ) : (
                                <p className="text-white">
                                  {t("purchasedTickets.noDetails")}
                                </p>
                              )}
                            </div>
                          </Collapse>
                        </td>
                      </tr>
                    </React.Fragment>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>
        </Card>
      </div>
    </Row>
  );
};

export default PurchasedTicketsPage;
