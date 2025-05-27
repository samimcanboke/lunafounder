import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Card,
  Button,
  Form,
  ListGroup,
  Modal,
} from "react-bootstrap";
import { useTranslation } from "react-i18next";
import useAdminRewardsStore from "../store/adminRewardsStore";
import RewardStore from "../store/RewardStore";
import GiveRewardService from "../services/GiveRewardService";
import CreateEditReward from "./PagesComponents/AdminRewardPageComponent/CreateEditReward";

const AdminRewardsPage = () => {
  const { t } = useTranslation();
  const {
    rewards,
    fetchRewards,
    deleteReward,
    createReward,
    setFormData,
    formData,
  } = useAdminRewardsStore();

  const [selectedRewardId, setSelectedRewardId] = useState(null); // Track selected reward ID
  const [rewardDetails, setRewardDetails] = useState(null);
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState("");
  const [tickets, setTickets] = useState("");
  const [showModal, setShowModal] = useState(false); // Modal visibility state

  useEffect(() => {
    fetchRewards();
  }, []);

  const handleSelectReward = (rewardId) => {
    setSelectedRewardId(rewardId); // Only set the selected reward ID
  };

  const handleRandomize = async () => {
    if (!selectedRewardId) {
      alert(t("adminReward.selectUser.validationError"));
      return;
    }

    try {
      const details = await RewardStore.getRewardDetails(selectedRewardId); // Fetch reward details on randomize
      setRewardDetails(details);
      setUsername(details.username || "");
      setUserId(details.userId || "");
      setTickets(details.userTickets?.length || 0);
    } catch (error) {
      console.error("Error fetching reward details:", error);
    }
  };

  const handleGiveReward = async () => {
    try {
      if (!rewardDetails) {
        alert(t("adminReward.selectUser.validationError"));
        return;
      }

      const { userId, rewardId, ticket } = rewardDetails;

      const response = await GiveRewardService.giveReward(
        userId,
        rewardId,
        ticket
      );

      alert(t("adminReward.selectUser.successMessage"));

    } catch (error) {
      console.error("Error giving reward:", error);
      alert(t("adminReward.selectUser.errorMessage"));
    } finally {
      setShowModal(false); // Close the modal after the request
    }
  };

  return (
    <div className="">
      <Row className="g-3 mb-3 justify-content-center">
        {/* Select Reward Section */}
        <Col md={6}>
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
                    active={selectedRewardId === r._id}
                    onClick={() => handleSelectReward(r._id)} // Set selected reward ID
                  >
                    {r.name}
                  </ListGroup.Item>
                ))}
              </ListGroup>
              <div className="p-3 bg-opacity-10">
                <Button
                  variant="danger"
                  className="w-100"
                  onClick={() => deleteReward(selectedRewardId)}
                  disabled={!selectedRewardId}
                >
                  {t("adminReward.selectReward.deleteButton")}
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Select User Section */}
        <Col md={6}>
          <Card>
            <Card.Header>
              <Card.Title>{t("adminReward.selectUser.title")}</Card.Title>
            </Card.Header>
            <Card.Body>
              <p className="text-muted mb-4">
                {t("adminReward.selectUser.description")}
              </p>
              <Button
                variant="primary"
                className="w-100 mb-4"
                onClick={handleRandomize} // Fetch reward details on randomize
              >
                {t("adminReward.selectUser.randomize")}
              </Button>
              <Form.Group className="mb-3">
                <Form.Label>{t("adminReward.selectUser.username")}</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={t("adminReward.selectUser.usernamePlaceholder")}
                  value={username}
                  readOnly
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>{t("adminReward.selectUser.userId")}</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={t("adminReward.selectUser.userIdPlaceholder")}
                  value={userId}
                  readOnly
                />
              </Form.Group>
              <Form.Group className="mb-4">
                <Form.Label>{t("adminReward.selectUser.tickets")}</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={t("adminReward.selectUser.ticketsPlaceholder")}
                  value={tickets}
                  readOnly
                />
              </Form.Group>
              <Button
                variant="success"
                className="w-100"
                onClick={() => setShowModal(true)} // Show the modal
                disabled={!rewardDetails}
              >
                {t("adminReward.selectUser.giveReward")}
              </Button>
            </Card.Body>
          </Card>
        </Col>

        {/* Create/Edit Reward Section */}
        <Col md={12}>
          <CreateEditReward
            formData={formData}
            onChange={(field, value) => setFormData({ [field]: value })}
            onSubmit={createReward}
          />
        </Col>
      </Row>

      {/* Confirmation Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{t("Confirmation")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {t("adminReward.selectUser.confirmationMessage")}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            {t("No")}
          </Button>
          <Button variant="primary" onClick={handleGiveReward}>
            {t("Yes")}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AdminRewardsPage;
