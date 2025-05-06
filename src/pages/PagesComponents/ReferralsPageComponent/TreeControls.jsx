import React from "react";
import { Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";

export default function TreeControls({ onExpandAll, onCollapseAll, onZoomIn, onZoomOut }) {
  const { t } = useTranslation();
  return (
    <div className="mb-3 d-flex gap-2 justify-content-center align-items-center">
      <Button size="sm" onClick={onExpandAll}>{t('referrals.expandAll')}</Button>
      <Button size="sm" onClick={onCollapseAll}>{t('referrals.collapseAll')}</Button>
      <Button size="sm" onClick={onZoomIn}>{t('referrals.zoomIn')}</Button>
      <Button size="sm" onClick={onZoomOut}>{t('referrals.zoomOut')}</Button>
    </div>
  );
}
