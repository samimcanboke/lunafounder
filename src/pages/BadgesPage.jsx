import React, { useState, useEffect } from "react";
import { Card, Table, Modal, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import RanksStore from "../store/RanksStore";

import luna1 from "../images/luna-01.png";
import luna2 from "../images/luna-02.png";
import luna3 from "../images/luna-03.png";
import luna4 from "../images/luna-04.png";
import luna5 from "../images/luna-05.png";
import luna6 from "../images/luna-06.png";

const BadgesPage = () => {
  const { t } = useTranslation();
  const [selectedRank, setSelectedRank] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [rankData, setRankData] = useState({
    totalWorth: 0,
    flatList: [],
    myRank: null,
  });

  useEffect(() => {
    const fetchRankData = async () => {
      try {
        const data = await RanksStore.getMyRank();
        setRankData(data);

      } catch (error) {
        console.error("Error fetching rank data:", error);
      }
    };

    fetchRankData();
  }, []);

  const getProgressPercentage = (score, level) => {
    const ranges = [
      { min: 0, max: 50000 },
      { min: 50000, max: 100000 },
      { min: 100000, max: 500000 },
      { min: 500000, max: 1000000 },
      { min: 1000000, max: 2500000 },
      { min: 2500000, max: 5000000 },
    ];

    const range = ranges[level];
    if (!range) return 0;

    const progress = ((score - range.min) / (range.max - range.min)) * 100;
    return Math.min(Math.max(progress, 0), 100); // Clamp between 0 and 100
  };

  const ranks = [
    {
      name: t("badges.ranksList.1.name"),
      teamumsatz: t("badges.ranksList.1.teamumsatz"),
      prize: t("badges.ranksList.1.prize"),
      rule: t("badges.ranksList.1.rule"),
      icon: luna1,
      style: {
        background: "rgba(25, 28, 31, 1)",
      },
    },
    {
      name: t("badges.ranksList.2.name"),
      teamumsatz: t("badges.ranksList.2.teamumsatz"),
      prize: t("badges.ranksList.2.prize"),
      rule: t("badges.ranksList.2.rule"),
      icon: luna3,
      style: {
        background: "rgba(25, 28, 31, 1)",
      },
    },
    {
      name: t("badges.ranksList.3.name"),
      teamumsatz: t("badges.ranksList.3.teamumsatz"),
      prize: t("badges.ranksList.3.prize"),
      rule: t("badges.ranksList.3.rule"),
      icon: luna5,
      style: {
        background: "rgba(25, 28, 31, 1)",
      },
    },
    {
      name: t("badges.ranksList.4.name"),
      teamumsatz: t("badges.ranksList.4.teamumsatz"),
      prize: t("badges.ranksList.4.prize"),
      rule: t("badges.ranksList.4.rule"),
      icon: luna2,
      style: {
        background: "rgba(25, 28, 31, 1)",
      },
    },
    {
      name: t("badges.ranksList.5.name"),
      teamumsatz: t("badges.ranksList.5.teamumsatz"),
      prize: t("badges.ranksList.5.prize"),
      rule: t("badges.ranksList.5.rule"),
      icon: luna4,
      style: {
        background: "rgba(25, 28, 31, 1)",
      },
    },
    {
      name: t("badges.ranksList.6.name"),
      teamumsatz: t("badges.ranksList.6.teamumsatz"),
      prize: t("badges.ranksList.6.prize"),
      rule: t("badges.ranksList.6.rule"),
      icon: luna6,
      style: {
        background: "rgba(25, 28, 31, 1)",
      },
    },
  ];

  return (
    <div className="container-fluid" style={{ padding: "2rem" }}>
      <div className="row">
        <div className="col-12">
          <h4 className="text-white text-center mb-5 fs-32">
            {t("badges.ranksTitle")}
          </h4>
          <div className="position-relative mb-4">
            <div
              style={{
                height: "8px",
                background:
                  "linear-gradient(to right, rgba(231, 151, 16, 1), rgba(255, 211, 110, 1))",
                width: "100%",
              }}
            ></div>
          </div>
          <p className="text-white fw-light mb-4 text-center fs-32">
            <span
              className="me-5"
              style={
                rankData.myRank
                  ? {
                      background:
                        "linear-gradient(270deg, rgba(231,151,16,1), rgba(255,211,110,1), rgba(231,151,16,1))",
                      backgroundSize: "200% auto",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                      fontWeight: 600,
                      animation: "gradient-move 2s linear infinite",
                      display: "inline-block",
                    }
                  : {}
              }
            >
              {rankData.myRank?.name || t("badges.noBadge")}
            </span>{" "}
            |
            <span className="ms-5">
              {t("badges.totalScore", { score: rankData.totalWorth })}{" "}
              {t("badges.confidenceCannotBeEvaluated")}
            </span>
          </p>
          {/* Gradient animasyonunu ekle */}
          <style>
            {`
              @keyframes gradient-move {
                0% {
                  background-position: 0% 50%;
                }
                100% {
                  background-position: 200% 50%;
                }
              }
            `}
          </style>
          <div className="row g-4 mb-4 d-flex justify-content-center">
            {ranks.map((rank, index) => {
              // Kullanıcının seviyesini bul
              const userLevelIndex = ranks.findIndex(
                (r) => rankData.myRank && r.name === rankData.myRank.name
              );
              // Sadece kendi seviyesinde border göster
              const isUserLevel = index === userLevelIndex;
              return (
                <div
                  key={index}
                  className="col-12 col-sm-6 col-md-4 d-flex justify-content-center"
                >
                  <Card
                    onClick={() => setSelectedRank(index)}
                    style={{
                      ...rank.style,
                      borderRadius: "32px",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      width: "200px",
                      height: "200px",
                      transform:
                        selectedRank === index ? "scale(1.02)" : "scale(1)",
                      opacity: selectedRank === index ? 1 : 0.8,
                      position: "relative",
                      border: isUserLevel
                        ? "2px solid rgba(231, 151, 16, 1)"
                        : "1px solid rgba(55, 55, 55, 1)",
                      boxShadow: isUserLevel
                        ? "0 0 10px rgba(231, 151, 16, 0.2)"
                        : "none",
                    }}
                    className="h-100"
                  >
                    <div
                      style={{
                        position: "absolute",
                        top: "10px",
                        right: "10px",
                        zIndex: 2,
                        color: "#e9c253",
                        fontSize: "1.2rem",
                        opacity: 0.8,
                      }}
                    >
                      <i className="bi bi-info-circle"></i>
                    </div>

                    <Card.Body className="text-center p-3 d-flex flex-column justify-content-center align-items-center">
                      <div
                        className="mb-2"
                        style={{
                          position: "relative",
                          width: "100px",
                          height: "100px",
                        }}
                      >
                        <img
                          src={rank.icon}
                          alt={rank.name}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            filter:
                              selectedRank === index
                                ? "brightness(1.2)"
                                : "brightness(1)",
                          }}
                        />
                      </div>
                      <h6
                        className="text-white mb-1"
                        style={{
                          fontSize: "1rem",
                          color:
                            selectedRank === index
                              ? "rgba(231, 151, 16, 1)"
                              : "rgba(255, 255, 255, 0.9)",
                        }}
                      >
                        {rank.name}
                      </h6>
                      <small
                        className="d-block"
                        style={{
                          fontSize: "0.8rem",
                          color: "rgba(255, 255, 255, 0.5)",
                        }}
                      >
                        {rank.teamumsatz}
                      </small>
                    </Card.Body>
                  </Card>
                </div>
              );
            })}
          </div>

          <Card
            style={{
              background: "rgba(25, 28, 31, 1)",
              border: "1px solid rgba(55, 55, 55, 1)",
              borderRadius: "12px",
            }}
          >
            <Card.Body
              style={{ backgroundColor: "#2f363e" }}
              className="py-3 px-5"
            >
              <div>
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder={t("badges.searchPlaceholder")}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                      background: "rgba(33, 37, 41, 1) !important",
                      border: "1px solid rgba(55, 55, 55, 1)",
                      color: "#fff",
                      borderRadius: "8px",
                      height: "45px",
                      fontSize: "0.875rem",
                    }}
                  />
                </div>
              </div>

              <div className="table-responsive">
                <Table striped hover variant="dark" className="mb-0">
                  <thead>
                    <tr
                      style={{ borderBottom: "1px solid rgba(55, 55, 55, 1)" }}
                    >
                      <th
                        style={{
                          padding: "1rem",
                          color: "rgba(255,255,255,0.5)",
                          fontWeight: "normal",
                          fontSize: "0.875rem",
                          textAlign: "left",
                        }}
                      >
                        {t("badges.table.username")}
                      </th>
                      <th
                        style={{
                          padding: "1rem",
                          color: "rgba(255,255,255,0.5)",
                          fontWeight: "normal",
                          fontSize: "0.875rem",
                          textAlign: "right",
                        }}
                      >
                        {t("badges.table.code")}
                      </th>
                      <th
                        style={{
                          padding: "1rem",
                          color: "rgba(255,255,255,0.5)",
                          fontWeight: "normal",
                          fontSize: "0.875rem",
                          textAlign: "right",
                        }}
                      >
                        {t("badges.table.totalWorth")}
                      </th>
                      <th
                        style={{
                          padding: "1rem",
                          color: "rgba(255,255,255,0.5)",
                          fontWeight: "normal",
                          fontSize: "0.875rem",
                          textAlign: "right",
                        }}
                      >
                        {t("badges.table.totalReferrals")}
                      </th>
                      <th
                        style={{
                          padding: "1rem",
                          color: "rgba(255,255,255,0.5)",
                          fontWeight: "normal",
                          fontSize: "0.875rem",
                          textAlign: "right",
                        }}
                      >
                        {t("badges.table.totalRewards")}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {rankData.flatList.map((item, index) => (
                      <tr
                        key={index}
                        style={{
                          borderBottom: "1px solid rgba(55, 55, 55, 0.3)",
                        }}
                      >
                        <td style={{ padding: "1rem", textAlign: "left" }}>
                          {item.username}
                        </td>
                        <td
                          style={{
                            padding: "1rem",
                            color: "rgba(255,255,255,0.5)",
                            textAlign: "right",
                          }}
                        >
                          {item.code}
                        </td>
                        <td style={{ padding: "1rem", textAlign: "right" }}>
                          {item.totalWorth}
                        </td>
                        <td style={{ padding: "1rem", textAlign: "right" }}>
                          {item.totalReferrals}
                        </td>
                        <td style={{ padding: "1rem", textAlign: "right" }}>
                          {item.totalRewards}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>
      {selectedRank !== null && (
        <Modal
          show={selectedRank !== null}
          onHide={() => setSelectedRank(null)}
          centered
          backdrop="static"
          size="md"
        >
          <Modal.Header
            closeButton
            style={{ background: "#1e1e1e", borderBottom: "1px solid #444" }}
          >
            <Modal.Title style={{ color: "#fff" }}>
              {t("badges.modal.levelInfo")}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ background: "#1e1e1e", color: "#ddd" }}>
            {/* Progress + Icons */}
            <div className="d-flex align-items-center justify-content-between mb-4">
              {/* Current Level Icon */}
              <div style={{ width: "50px", height: "50px" }}>
                <img
                  src={ranks[selectedRank].icon}
                  alt="Current"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                />
              </div>

              {/* Progress Bar */}
              <div
                className="flex-grow-1 mx-3"
                style={{
                  height: "12px",
                  background: "#3a3a3a",
                  borderRadius: "10px",
                }}
              >
                <div
                  style={{
                    width: `${getProgressPercentage(
                      rankData.totalWorth,
                      selectedRank
                    )}%`,
                    height: "100%",
                    backgroundColor: "#e9c253",
                    borderRadius: "10px",
                    transition: "width 0.3s ease",
                  }}
                />
              </div>

              {/* Next Level Icon */}
              <div style={{ width: "50px", height: "50px" }}>
                {ranks[selectedRank + 1] && (
                  <img
                    src={ranks[selectedRank + 1].icon}
                    alt="Next"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                      opacity: 0.7,
                    }}
                  />
                )}
              </div>
            </div>

            {/* Current Level Info */}
            <div className="text-center mb-4">
              <img
                src={ranks[selectedRank].icon}
                alt={ranks[selectedRank].name}
                style={{
                  width: "100px",
                  height: "100px",
                  objectFit: "contain",
                }}
              />
              <h5 className="mt-3" style={{ color: "#e9c253" }}>
                {ranks[selectedRank].name}
              </h5>
              <div className="mb-3 text-white" style={{ textAlign: "left" }}>
                <p>
                  <strong>{t("badges.modal.teamumsatz")}:</strong>{" "}
                  {ranks[selectedRank].teamumsatz}
                </p>
                <p>
                  <strong>{t("badges.modal.prize")}:</strong>{" "}
                  {ranks[selectedRank].prize}
                </p>
                <p>
                  <strong>{t("badges.modal.rule")}:</strong>{" "}
                  {ranks[selectedRank].rule}
                </p>
              </div>
            </div>

            {/* Table */}
            <div style={{ overflow: "hidden", borderRadius: "12px" }}>
              <Table size="sm" striped hover variant="dark" className="mb-0">
                <tbody>
                  {rankData.flatList.map((item, index) => (
                    <tr key={index}>
                      <td>{item.username}</td>
                      <td>{item.code}</td>
                      <td>{item.totalWorth}</td>
                      <td>{item.totalReferrals}</td>
                      <td>{item.totalRewards}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Modal.Body>
          <Modal.Footer
            style={{ background: "#1e1e1e", borderTop: "1px solid #444" }}
          >
            <Button variant="secondary" onClick={() => setSelectedRank(null)}>
              {t("badges.modal.close")}
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default BadgesPage;
