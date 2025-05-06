import React from "react";
import { Card, Button, Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";

export default function SelectUser({
  onRandomize,
  username,
  userId,
  tickets,
  onChange
}) {
  const { t } = useTranslation();
  return (
    <Card>
      <Card.Header>
        <Card.Title>{t('adminReward.selectUser.title')}</Card.Title>
      </Card.Header>
      <Card.Body>
        <p className="text-muted mb-4">
          {t('adminReward.selectUser.description')}
        </p>
        <Button
          variant="primary"
          className="w-100 mb-4"
          onClick={onRandomize}
        >
          {t('adminReward.selectUser.randomize')}
        </Button>
        <Form.Group className="mb-3">
          <Form.Label>{t('adminReward.selectUser.username')}</Form.Label>
          <Form.Control
            type="text"
            placeholder={t('adminReward.selectUser.usernamePlaceholder')}
            value={username}
            onChange={e => onChange("username", e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>{t('adminReward.selectUser.userId')}</Form.Label>
          <Form.Control
            type="text"
            placeholder={t('adminReward.selectUser.userIdPlaceholder')}
            value={userId}
            onChange={e => onChange("userId", e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-4">
          <Form.Label>{t('adminReward.selectUser.tickets')}</Form.Label>
          <Form.Control
            type="text"
            placeholder={t('adminReward.selectUser.ticketsPlaceholder')}
            value={tickets}
            onChange={e => onChange("tickets", e.target.value)}
          />
        </Form.Group>
        <Button variant="success" className="w-100">
          {t('adminReward.selectUser.giveReward')}
        </Button>
      </Card.Body>
    </Card>
  );
}
