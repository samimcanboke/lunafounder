import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import useAdminRewardsStore from "../store/adminRewardsStore";
import SelectReward from "./PagesComponents/AdminRewardPageComponent/SelectReward";
import SelectUser from "./PagesComponents/AdminRewardPageComponent/SelectUser";
import CreateEditReward from "./PagesComponents/AdminRewardPageComponent/CreateEditReward";

const AdminRewardsPage = () => {
  const {
    rewards,
    formData,
    selectedRewardId,
    fetchRewards,
    createReward,
    deleteReward,
    setFormData,
    setSelectedReward
  } = useAdminRewardsStore();

  useEffect(() => {
    fetchRewards();
  }, []);

  return (
    <div className="p-3">
      <Row className="g-3 mb-3 justify-content-center">
        <Col md={5}>
          <SelectReward
            rewards={rewards}
            selectedRewardId={selectedRewardId}
            onSelect={setSelectedReward}
            onDelete={deleteReward}
          />
        </Col>
        <Col md={5}>
          <SelectUser
            onRandomize={() => {}}
            username=""
            userId=""
            tickets=""
            onChange={() => {}}
          />
        </Col>
        <Col md={10}>
          <CreateEditReward
            formData={formData}
            onChange={(field, val) => setFormData({ [field]: val })}
            onSubmit={createReward}
          />
        </Col>
      </Row>
    </div>
  );
};

export default AdminRewardsPage;
