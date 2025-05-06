import React from "react";
import { Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";

export default function InviteFriends({ url }) {
  const { t } = useTranslation();
  return (
    <div className="w-100 mb-2 p-2 p-md-3 rounded text-white">
      <span className="mb-2 d-block">{t('referrals.inviteFriends')}</span>
      <Form className="d-flex justify-content-between align-items-center mb-2 position-relative">
        <Form.Control
          size="sm"
          type="text"
          value={url}
          className="text-muted flex-grow-1 pe-5"
          readOnly
          style={{ backgroundColor: "transparent" }}
        />
        <div className="position-absolute d-flex align-items-center" style={{
          right: "10px", top: "50%", transform: "translateY(-50%)", gap: "8px",
        }}>
          <i className="bi bi-send" style={{
            backgroundImage: "linear-gradient(to bottom, #e9c253, #997b3d)",
            backgroundClip: "text", color: "transparent", fontSize: "1.2rem", cursor: "pointer",
          }} />
          <i className="bi bi-whatsapp" style={{
            backgroundImage: "linear-gradient(to bottom, #e9c253, #997b3d)",
            backgroundClip: "text", color: "transparent", fontSize: "1.2rem", cursor: "pointer",
          }} />
        </div>
      </Form>
    </div>
  );
}
