import React from "react";
import { useTranslation } from "react-i18next";

export default function LevelsTable({ levels }) {
  const { t } = useTranslation();
  return (
    <div className="mb-4">
      <div className="overflow-auto border" style={{ borderRadius: "8px", WebkitOverflowScrolling: "touch" }}>
        <div className="d-flex align-items-center" style={{ minWidth: "600px" }}>
          <div className="flex-shrink-0" style={{
            backgroundImage: "linear-gradient(to bottom, #e9c253, #997b3d)",
            padding: "1.5rem", width: "150px",
          }}>
            <div className="text-dark text-center" style={{ fontSize: "1rem" }}>
              {t('referrals.levels.depth')}<hr className="my-2" />{t('referrals.levels.peopleActive')}
            </div>
          </div>
          {levels.map(l => (
            <div key={l.id} className="flex-grow-1 text-center px-3 py-2" style={{
              borderLeft: "1px solid rgba(255, 255, 255, 0.1)", minWidth: "80px",
            }}>
              <div className="text-white mb-1">{l.id}</div>
              <hr className="my-2" />
              <div className="text-muted" style={{ fontSize: "0.875rem" }}>
                {l.id - 1}/0
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
