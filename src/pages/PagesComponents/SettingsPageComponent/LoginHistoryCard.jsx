import React from "react";
import { Card, Button, Spinner } from "react-bootstrap";
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

const LoginHistoryCard = ({ loginHistory, loading, error }) => {
  const { t } = useTranslation();

  const getIcon = (device) => {
    switch (device) {
      case "iPad":
        return <FaTabletAlt />;
      case "iPhone":
        return <FaMobileAlt />;
      default:
        return <FaDesktop />;
    }
  };

  if (loading) {
    return (
      <Card className="border-secondary" style={{ backgroundColor: "rgba(39, 46, 53, 1)" }}>
        <Card.Body className="d-flex justify-content-center align-items-center" style={{ minHeight: "200px" }}>
          <Spinner animation="border" variant="light" />
        </Card.Body>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="border-secondary" style={{ backgroundColor: "rgba(39, 46, 53, 1)" }}>
        <Card.Body className="text-center text-danger">
          <p>{t('settings.loginHistory.errorLoading')} {error}</p>
        </Card.Body>
      </Card>
    );
  }

  return (
    <Card className="border-secondary" style={{ backgroundColor: "rgba(39, 46, 53, 1)" }}>
      <Card.Body style={{ padding: "1.5rem" }}>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 style={{ fontSize: "1.1rem", color: "#fff", marginBottom: 0 }}>
            {t('settings.loginHistory.title')}
          </h5>
          <Button variant="danger" size="sm">
            {t('settings.loginHistory.logoutAll')}
          </Button>
        </div>

        {loginHistory?.map((item, idx) => (
          <LoginHistoryItem
            key={idx}
            icon={<div style={iconStyle}>{getIcon(item.device)}</div>}
            device={item.device}
            loginTime={item.loginTime}
            userAgent={item.userAgent}
          />
        ))}

        {(!loginHistory || loginHistory.length === 0) && (
          <p className="text-muted small">{t('settings.loginHistory.noHistory')}</p>
        )}
      </Card.Body>
    </Card>
  );
};

export default LoginHistoryCard;
