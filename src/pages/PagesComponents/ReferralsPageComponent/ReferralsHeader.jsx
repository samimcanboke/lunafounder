import React from "react";
import { Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";

export default function ReferralsHeader({ position, bonus, onReload }) {
  const { t } = useTranslation();
  return (
    <div>
      <h4 className="text-white mb-2" style={{ fontSize: "1.25rem" }}>
        {t('referrals.networkTitle')}
      </h4>
      <p
        className="text-muted mb-2 mt-3 mt-md-5"
        style={{ fontSize: "0.875rem" }}
      >
        {t('referrals.positionBonus', { position: position || t('referrals.none'), bonus: bonus || 0 })}
      </p>
    </div>
  );
}
