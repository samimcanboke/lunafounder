import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";

export default function ShareReferralLink({ url }) {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="w-100 mb-3 p-2 p-md-3 rounded text-white">
      <span className="mb-2 d-block">{t('referrals.shareReferralLink')}</span>
      <Form className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-2">
        <div className="position-relative w-100">
          <Form.Control
            size="sm"
            type="text"
            value={url}
            className="text-white border-1 flex-grow-1 me-0 me-md-3 pe-5"
            readOnly
            style={{ backgroundColor: "transparent" }}
          />
          {copied ? (
            <span
              className="position-absolute"
              style={{
                right: "10px", top: "50%", transform: "translateY(-50%)",
                color: "#fff", padding: "0.2rem 0.5rem", borderRadius: "0.25rem",
                backgroundColor: "rgba(0,0,0,0.5)", fontSize: "0.9rem"
              }}
            >
              {t('referrals.copied')}
            </span>
          ) : (
            <i
              className="bi bi-link-45deg position-absolute"
              style={{
                right: "10px", top: "50%", transform: "translateY(-50%)",
                color: "#fff", cursor: "pointer", fontSize: "1.25rem",
              }}
              onClick={handleCopy}
            />
          )}
        </div>
        <div className="text-white px-3 py-1 rounded d-flex align-items-center mt-2 mt-md-0"
             style={{ minHeight: "38px", border: "1px solid #3e454d", cursor: "default" }}>
          <i className="lab la-instagram mx-2" style={{ fontSize: "1.25rem", color: "#fff" }} />
          <i className="lab la-linkedin mx-2" style={{ fontSize: "1.25rem", color: "#fff" }} />
          <i className="lab la-facebook mx-2" style={{ fontSize: "1.25rem", color: "#fff" }} />
        </div>
      </Form>
    </div>
  );
}
