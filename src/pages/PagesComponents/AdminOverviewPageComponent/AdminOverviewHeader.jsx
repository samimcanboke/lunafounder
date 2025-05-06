import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { BiInfoCircle } from "react-icons/bi";
import { useTranslation } from "react-i18next";

const AdminOverviewHeader = () => {
  const { t } = useTranslation();
  return (
    <div className="d-flex justify-content-between align-items-center mb-3">
      <h1 className="text-white">{t('adminOverview.header.title')}</h1>
      <OverlayTrigger
        placement="bottom"
        overlay={
          <Tooltip id="admin-overview-tooltip">
            {t('adminOverview.header.tooltip')}
          </Tooltip>
        }
      >
        <div className="text-muted">
          <BiInfoCircle size={20} />
          <span className="ms-2">{t('adminOverview.header.clickRows')}</span>
        </div>
      </OverlayTrigger>
    </div>
  );
};

export default AdminOverviewHeader;
