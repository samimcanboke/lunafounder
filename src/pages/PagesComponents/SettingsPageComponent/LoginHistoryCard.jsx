import React from "react";
import { Card, Button } from "react-bootstrap";
import { FaDesktop, FaTabletAlt, FaMobileAlt } from "react-icons/fa";
import LoginHistoryItem from "./LoginHistoryItem";
import { useTranslation } from "react-i18next";

const iconStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "rgba(255, 255, 255, 0.2)",
  borderRadius: "50%",
  padding: "10px",
  width: "40px",
  height: "40px",
};

const LoginHistoryCard = () => {
  const { t } = useTranslation();

  return (
    <Card
      className="border-secondary"
      style={{ backgroundColor: "rgba(39, 46, 53, 1)" }}
    >
      <Card.Body style={{ padding: "1.5rem" }}>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 style={{ fontSize: "1.1rem", color: "#fff", marginBottom: 0 }}>
            {t('settings.loginHistory.title')}
          </h5>
          <Button variant="danger" size="sm">
            {t('settings.loginHistory.logoutAll')}
          </Button>
        </div>

        <LoginHistoryItem
          icon={<div style={iconStyle}><FaDesktop /></div>}
          device="Web"
          date="Apr 10, 2023 at 07:18 AM"
        />
        <LoginHistoryItem
          icon={<div style={iconStyle}><FaTabletAlt /></div>}
          device="iPad"
          date="Apr 09, 2023 at 09:20 AM"
        />
        <LoginHistoryItem
          icon={<div style={iconStyle}><FaMobileAlt /></div>}
          device="iPhone"
          date="Apr 02, 2023 at 09:06 AM"
        />
      </Card.Body>
    </Card>
  );
};

export default LoginHistoryCard;
