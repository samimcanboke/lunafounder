import React, { useEffect } from "react";
import useUserStore from "../store/userStore";
import { Container, Row, Col } from "react-bootstrap";
import userImage from "../images/MRLuna3.png";
import ProfileCard from "./PagesComponents/SettingsPageComponent/ProfileCard";
import LoginHistoryCard from "./PagesComponents/SettingsPageComponent/LoginHistoryCard";
import EditProfileCard from "./PagesComponents/SettingsPageComponent/EditProfileCard";
import ChangePasswordCard from "./PagesComponents/SettingsPageComponent/ChangePasswordCard";

const SettingsPage = () => {
  const { user, loginHistory, loading, error, getProfile } = useUserStore();

  useEffect(() => {
    getProfile();
  }, [getProfile]);

  return (
    <Container fluid className="min-vh-100 py-4">
      <Row className="g-4">
        {/* Left Column */}
        <Col xl={3} lg={4} md={12}>
          <div className="d-flex flex-column gap-4">
            <ProfileCard
              userImage={userImage}
              user={user}
              loading={loading}
              error={error}
            />
            <LoginHistoryCard
              loginHistory={loginHistory}
              loading={loading}
              error={error}
            />
          </div>
        </Col>
        {/* Right Column */}
        <Col xl={9} lg={8} md={12}>
          <div className="d-flex flex-column gap-4">
            <EditProfileCard />
            <ChangePasswordCard />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default SettingsPage;
