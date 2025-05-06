import React from "react";
import { Button } from "react-bootstrap";
import { MdLogout } from "react-icons/md";
import { useTranslation } from "react-i18next";

const LoginHistoryItem = ({ icon, device, date }) => {
  const { t } = useTranslation();

  return (
    <div className="d-flex justify-content-between align-items-center py-2 border-bottom">
      <div className="d-flex align-items-center">
        {icon}
        <div className="ms-2">
          <small className="d-block">{device}</small>
          <small className="text-muted">{date}</small>
        </div>
      </div>
      <Button
        variant="link"
        size="sm"
        className="text-danger"
        aria-label={t('settings.loginHistory.logout')}
      >
        <MdLogout />
      </Button>
    </div>
  );
};

export default LoginHistoryItem;
