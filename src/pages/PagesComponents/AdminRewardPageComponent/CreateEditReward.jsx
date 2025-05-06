import React from "react";
import { Card, Row, Col, Button, Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";

export default function CreateEditReward({
  formData,
  onChange,
  onSubmit
}) {
  const { t } = useTranslation();
  return (
    <Card>
      <Card.Header>
        <Card.Title>{t('adminReward.createReward.title')}</Card.Title>
      </Card.Header>
      <Card.Body>
        <p className="text-muted mb-4">{t('adminReward.createReward.description')}</p>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>{t('adminReward.createReward.name')}</Form.Label>
              <Form.Control
                type="text"
                placeholder={t('adminReward.createReward.namePlaceholder')}
                value={formData.name}
                onChange={e => onChange("name", e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>{t('adminReward.createReward.emoji')}</Form.Label>
              <Form.Control
                type="text"
                placeholder={t('adminReward.createReward.emojiPlaceholder')}
                value={formData.emoji}
                onChange={e => onChange("emoji", e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>{t('adminReward.createReward.amount')}</Form.Label>
              <Form.Control
                type="text"
                placeholder={t('adminReward.createReward.amountPlaceholder')}
                value={formData.amount}
                onChange={e => onChange("amount", e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>{t('adminReward.createReward.imageUrl')}</Form.Label>
              <Form.Control
                type="text"
                placeholder={t('adminReward.createReward.imageUrlPlaceholder')}
                value={formData.imageUrl}
                onChange={e => onChange("imageUrl", e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={6} className="d-flex align-items-center justify-content-center">
            <Button variant="primary" size="lg" className="w-75" onClick={onSubmit}>
              {t('adminReward.createReward.createButton')}
            </Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}
