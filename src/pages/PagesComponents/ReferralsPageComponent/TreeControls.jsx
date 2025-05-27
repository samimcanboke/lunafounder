import React from "react";
import { Button, Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";

export default function TreeControls({ onExpandAll, onCollapseAll, onSearch }) {
  const { t } = useTranslation();
  return (
    <div className="mb-3 d-flex gap-2 justify-content-center align-items-center">
      <Button size="sm" onClick={onExpandAll}>
        {t('referrals.expandAll')}
      </Button>
      <Button size="sm" onClick={onCollapseAll}>
        {t('referrals.collapseAll')}
      </Button>
      <Form.Control
        size="sm"
        type="text"
        placeholder={t('referrals.searchPlaceholder')}
        onChange={e => onSearch(e.target.value)}
        style={{ width: '150px' }}
      />
    </div>
  );
}
