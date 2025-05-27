import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";
import ticket from "../images/gold_ticket.png";
import wheel from "../images/wheel.png";
import spinningWheel from "../images/spinning-wheel.gif";
import empty_ticket from "../images/empty_ticket.png";
import { useTranslation } from "react-i18next";
import useTicketsStore from "../store/ticketsStore";
import { mintFromCandyMachine } from "../services/MintService";
import { useWallet } from "@solana/wallet-adapter-react";
import myTicketsStore from "../store/myTicketsStore";

const TicketsPage = () => {
  const { t } = useTranslation();
  const fetchTickets = useTicketsStore((state) => state.fetchTickets);
  const tickets = useTicketsStore((state) => state.tickets);
  const [ticketDetails, setTicketDetails] = useState({});
  const { publicKey, connected, connecting, connect } = useWallet();
  const [ticketData, setTicketData] = useState(null);

  const handleMint = async (candyMachineId) => {
    if (!connected) {
      try {
        await connect();
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait for connection
      } catch (error) {
        console.error("Failed to connect wallet:", error);
        alert(t("tickets.walletConnectFailed"));
        return;
      }
    }

    if (!publicKey) {
      alert(t("tickets.walletNotConnected"));
      return;
    }

    try {
      const walletAdapter = window.solana || window.solflare;
      if (!walletAdapter) {
        throw new Error(
          t("tickets.noCompatibleWallet")
        );
      }

      const response = await mintFromCandyMachine(
        {
          publicKey: candyMachineId,
          rpcUrl:
            "https://yolo-prettiest-daylight.solana-mainnet.quiknode.pro/936aa4affd3be470b2673cf5be2f50e295867270",
        },
        {
          publicKey,
          connected,
          connecting,
          signTransaction: walletAdapter.signTransaction.bind(walletAdapter),
          signAllTransactions: walletAdapter.signAllTransactions.bind(walletAdapter),
          signMessage: walletAdapter.signMessage.bind(walletAdapter),
        }
      );


      alert(t("tickets.mintSuccess"));
    } catch (error) {
      console.error("Mint failed:", error);
      alert(error.message || t("tickets.mintFailed"));
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchTickets();
    };
    fetchData();
  }, [fetchTickets]);

  useEffect(() => {
    const fetchTicketDetails = async () => {
      const details = {};
      for (const ticket of tickets) {
        try {
          const response = await fetch(ticket.url);
          const data = await response.json();
          details[ticket._id] = {
            name: data.name,
            description: data.description,
            animation_url: data.animation_url,
            price: data.attributes.find((attr) => attr.trait_type === "Price")
              ?.value,
          };
        } catch (error) {
          console.error(`Failed to fetch details for ticket ${ticket._id}:`, error);
        }
      }
      setTicketDetails(details);
    };

    if (tickets.length > 0) {
      fetchTicketDetails();
    }
  }, [tickets]);

  useEffect(() => {
    const fetchMyTickets = async () => {
      try {
        const data = await myTicketsStore.getMyTickets();

        setTicketData(data);
      } catch (error) {
        console.error("Error fetching ticket data:", error);
      }
    };

    fetchMyTickets();
  }, []);



  return (
    <div>
      <div className="row">
        <div className="col-xl-5 my-5 my-xl-0">
          <Card
            style={{
              background: `linear-gradient(305deg, rgba(221, 88, 88, 1), rgba(180, 19, 19, 1))`,
              minHeight: "150px",
              height: "100%",
            }}
          >
            <Card.Body>
              <h4 className="text-white">{t('tickets.lotteryTickets')}</h4>
              <h5 className="text-white fw-light mb-3">{t('tickets.activeTicketsTitle')}</h5>
              <div className="d-flex flex-column gap-3 pe-5 mt-5">
                {tickets.map((ticket) => {
                  const details = ticketDetails[ticket._id];
                  return (
                    <div
                      key={ticket._id}
                      className="d-flex align-items-center gap-3"
                      style={{
                        borderBottom:
                          tickets[tickets.length - 1]._id !== ticket._id
                            ? "1px solid rgba(55, 55, 55, 1)"
                            : "none",
                        paddingBottom: "1rem",
                      }}
                    >
                      <div
                        className="bg-white rounded d-flex align-items-center justify-content-center"
                        style={{ width: "64px", height: "64px" }}
                      >
                        {details ? (
                          <video
                            src={details.animation_url}
                            autoPlay
                            loop
                            muted
                            style={{
                              width: "64px",
                              height: "64px",
                              borderRadius: "8px",
                              backgroundColor:"black"
                            }}
                          />
                        ) : (
                          <div
                            style={{
                              width: "64px",
                              height: "64px",
                              backgroundColor: "rgba(200, 200, 200, 0.2)",
                            }}
                          />
                        )}
                      </div>
                      <div className="flex-grow-1">
                        <h6 className="text-white mb-1">
                          {details ? details.name : "Loading..."}
                        </h6>
                        <small className="text-white-50">
                          {details ? details.description : ""}
                        </small>
                      </div>
                      <div className="text-white">
                        {details ? details.price : ""}
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card.Body>
          </Card>
        </div>
        <div className="col-xl-7 ">
          <div className="row">
            <div className="col-12 d-none d-xl-block">
              <Card
                style={{
                  background: `linear-gradient(to bottom, rgba(176, 54, 54, 1), rgba(29, 3, 3, 1))`,
                  minHeight: "150px",
                  position: "relative",
                }}
              >
                <Card.Body
                  className="d-flex align-items-center justify-content-between"
                  style={{
                    padding: "1.5rem",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      position: "relative",
                      width: "12rem",
                      height: "12.5rem",
                      marginLeft: "-1rem",
                    }}
                  >
                    {[0, 1, 2].map((index) => (
                      <img
                        key={index}
                        src={ticket}
                        alt="ticket"
                        style={{
                          width: "14rem",
                          objectFit: "contain",
                          position: "absolute",
                          left: `${index * 3.25}rem`,
                          zIndex: 3 - index,
                        }}
                      />
                    ))}
                  </div>

                  <div
                    className="text-center flex-grow-1 ms-5"
                    style={{ position: "relative", zIndex: 5 }}
                  >
                    <h4
                      className="mb-0 fs-32 fw-bold"
                      style={{
                        background:
                          "linear-gradient(to bottom, rgba(249, 223, 112, 1), rgba(153, 102, 13, 1))",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                      }}
                    >
                      {t('tickets.nextDraw', { date: '13.06.2025', time: '10.00' })}
                    </h4>
                  </div>

                  <div
                    style={{
                      width: "12rem",
                      height: "12rem",
                      position: "relative",
                      flex: "0 0 auto",
                    }}
                  >
                    <img
                      src={spinningWheel}
                      alt="wheel"
                      style={{
                        width: "18rem",
                        height: "18rem",
                        position: "absolute",
                        top: "-2.2rem",
                        right: "-3rem",
                        objectFit: "cover",
                        objectPosition: "center",
                      }}
                    />
                  </div>
                </Card.Body>
              </Card>
            </div>

            <div className="col-12 d-block d-xl-none">
              <Card
                style={{
                  background: `linear-gradient(to bottom, rgba(176, 54, 54, 1), rgba(29, 3, 3, 1))`,
                  minHeight: "300px",
                  position: "relative",
                }}
              >
                <Card.Body
                  className="d-flex flex-column align-items-center justify-content-center"
                  style={{ padding: "2rem" }}
                >
                  {/* Çark */}
                  <div
                    style={{
                      width: "18rem",
                      height: "18rem",
                      position: "relative",
                      marginBottom: "1.5rem",
                      overflow: "hidden",
                    }}
                  >
                    <img
                      src={spinningWheel}
                      alt="wheel"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        objectPosition: "center",
                      }}
                    />
                  </div>

                  {/* Tarih */}
                  <div className="text-center mb-4">
                    <h4
                      className="mb-0 display-6 fw-bold"
                      style={{
                        background:
                          "linear-gradient(to bottom, rgba(249, 223, 112, 1), rgba(153, 102, 13, 1))",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                      }}
                    >
                      {t('tickets.nextDraw', { date: '13.06.2025', time: '10.00' })}
                    </h4>
                  </div>

                  <div
                    style={{
                      position: "relative",
                      width: "14rem",
                      height: "16.5rem",
                    }}
                  >
                    {[0, 1, 2].map((index) => (
                      <img
                        key={index}
                        src={ticket}
                        alt="ticket"
                        style={{
                          width: "14rem",
                          height: "16.5rem",
                          objectFit: "contain",
                          position: "absolute",
                          top: 0,
                          left: "50%",
                          transform: `translateX(-50%) translateX(${
                            (index - 1) * 3.25
                          }rem)`,
                          zIndex: 3 - index,
                        }}
                      />
                    ))}
                  </div>
                </Card.Body>
              </Card>
            </div>

            <div className="col-12">
              <Card
                style={{
                  background: "rgba(50, 57, 64, 1)",
                  border: "1px solid rgba(55, 55, 55, 1)",
                  borderRadius: "12px",
                  padding: "1.5rem",
                  height: "100%",
                  minHeight: "400px",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.65)",
                }}
              >
                <div
                  className="row g-3 h-100 align-items-center"
                  style={{ overflowX: "auto", flexWrap: "nowrap" }}
                >
                  {tickets.map((ticket) => (
                    <div
                      key={ticket._id}
                      className="col-12 col-md-6 col-lg-4"
                      style={{ flex: "0 0 auto", minWidth: "300px", cursor: "pointer" }}
                      onClick={() => handleMint(ticket.candyMachineId)}
                    >
                      <Card
                        style={{
                          background: "#1a1a1a",
                          border: "1px solid rgba(55, 55, 55, 1)",
                          borderRadius: "12px",
                          position: "relative",
                          margin: "0",
                          overflow: "hidden",
                        }}
                      >
                        <Card.Body
                          className="position-relative d-flex flex-column align-items-center justify-content-center"
                          style={{ minHeight: "250px", padding: "1.5rem" }}
                        >
                          <h4 className="text-white mb-2">{ticket.prefix}</h4>
                          <h5 className="text-white-50 mb-2">
                            {t('tickets.amount')}: {ticket.amount}
                          </h5>
                          <h6 className="text-white mb-3">
                            {t('tickets.price')}: ${ticket.price}
                          </h6>
                          {ticketDetails[ticket._id]?.animation_url && (
                            <video
                              src={ticketDetails[ticket._id].animation_url}
                              autoPlay
                              loop
                              muted
                              style={{
                                width: "100%",
                                height: "auto",
                                borderRadius: "8px",
                              }}
                            />
                          )}
                        </Card.Body>
                      </Card>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketsPage;
