import React from "react";
import { Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";

export default function WalletInfo({ wallet }) {
  const { t } = useTranslation();
  return (
    <div className="w-100 mb-3 p-2 p-md-3 rounded text-white">
      <span className="mb-2 d-block">{t('referrals.wallet')}</span>
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-2">
        <div className="position-relative w-100">
          <Form.Control
            size="sm"
            type="text"
            value={wallet}
            className="text-white border-1 flex-grow-1 me-0 me-md-3 pe-5"
            readOnly
            style={{ backgroundColor: "transparent" }}
          />
        </div>
      </div>
    </div>
  );
}
