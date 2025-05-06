import React from "react";
import { Card, ListGroup, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";

export default function SelectReward({
  rewards,
  selectedRewardId,
  onSelect,
  onDelete
}) {
  const { t } = useTranslation();
  return (
    <Card>
      <Card.Header>
        <Card.Title>{t('adminReward.selectReward.title')}</Card.Title>
      </Card.Header>
      <Card.Body className="p-0">
        <ListGroup
          variant="flush"
          style={{ maxHeight: "300px", overflowY: "auto" }}
        >
          {rewards.map(r => (
            <ListGroup.Item
              key={r.id}
              action
              active={r.id === selectedRewardId}
              onClick={() => onSelect(r.id)}
            >
              {r.name}
            </ListGroup.Item>
          ))}
        </ListGroup>
        <div className="p-3 bg-opacity-10">
          <Button
            variant="danger"
            className="w-100"
            onClick={() => onDelete(selectedRewardId)}
            disabled={!selectedRewardId}
          >
            {t('adminReward.selectReward.deleteButton')}
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}
