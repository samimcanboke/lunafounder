import React from "react";
import { useTranslation } from "react-i18next";

export default function LevelsTable({ levels, tree }) {
  const { t } = useTranslation();

  // count nodes at each depth
  const levelCounts = [];
  if (tree) {
    // start from root.children at depth 1
    const queue = (tree.children || []).map(child => ({ node: child, depth: 1 }));
    while (queue.length) {
      const { node, depth } = queue.shift();
      levelCounts[depth] = (levelCounts[depth] || 0) + 1;
      (node.children || []).forEach(child =>
        queue.push({ node: child, depth: depth + 1 })
      );
    }
  }

  return (
    <div className="mb-4">
      <div
        className="border"
        style={{
          borderRadius: "8px",
          WebkitOverflowScrolling: "touch",
          overflowX: "auto"    // allow horizontal scroll
        }}
      >
        <div className="d-flex align-items-center" style={{ minWidth: "600px" }}>
          {/* depth header */}
          <div
            className="flex-shrink-0"
            style={{
              backgroundImage: "linear-gradient(to bottom, #e9c253, #997b3d)",
              padding: "1.5rem",
              width: "150px"
            }}
          >
            <div
              className="text-dark text-center"
              style={{ fontSize: "1rem" }}
            >
              {t("referrals.levels.depth")}
              <hr className="my-2" />
              {t("referrals.levels.people")}
            </div>
          </div>
          {levels.map(l => (
            <div
              key={l.id}
              className="flex-grow-1 text-center px-3 py-2"
              style={{
                borderLeft: "1px solid rgba(255, 255, 255, 0.1)",
                minWidth: "80px"
              }}
            >
              <div className="text-white mb-1">{l.id}</div>
              <hr className="my-2" />
              <div
                className="text-muted"
                style={{ fontSize: "0.875rem" }}
              >
                {levelCounts[l.id] || 0}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
