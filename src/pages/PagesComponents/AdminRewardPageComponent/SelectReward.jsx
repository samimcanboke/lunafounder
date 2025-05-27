import React, { useState } from "react";
import { Card, ListGroup, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import RewardStore from "../../../store/RewardStore";

export default function SelectReward({
  rewards,
  selectedRewardId,
  onSelect,
  onDelete,
  setRewardDetails, // Ensure this prop is passed correctly
}) {
  const { t } = useTranslation();
  const [rewardDetails, setLocalRewardDetails] = useState(null);

  const handleSelect = async (rewardId) => {
    onSelect(rewardId); // Update the selected reward ID
    try {
      const rewardDetails = await RewardStore.getRewardDetails(rewardId); // Fetch reward details
      setLocalRewardDetails(rewardDetails); // Store locally
      if (typeof setRewardDetails === "function") {
        setRewardDetails(rewardDetails); // Pass reward details to parent
      } else {
        console.error("setRewardDetails is not a function");
      }
    } catch (error) {
      console.error("Error fetching reward details:", error);
    }
  };

  return (
    <Card>
      <Card.Header>
        <Card.Title>{t("adminReward.selectReward.title")}</Card.Title>
      </Card.Header>
      <Card.Body className="p-0">
        <ListGroup
          variant="flush"
          style={{ maxHeight: "300px", overflowY: "auto" }}
        >
          {rewards.map((r) => (
            <ListGroup.Item
              key={r._id}
              action
              active={r._id === selectedRewardId}
              onClick={() => handleSelect(r._id)} // Call handleSelect
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
            {t("adminReward.selectReward.deleteButton")}
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}
