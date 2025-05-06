import React, { useEffect } from "react";
import { Card, Spinner } from "react-bootstrap";
import useUserStore from "../../../store/userStore";
import { useTranslation } from "react-i18next";

const ProfileCard = ({ userImage }) => {
  const { t } = useTranslation();
  const { user, loading, error, getProfile } = useUserStore();

  useEffect(() => {
    getProfile();
  }, [getProfile]);

  if (loading) {
    return (
      <Card
        className="border-secondary"
        style={{ backgroundColor: "rgba(39, 46, 53, 1)" }}
      >
        <Card.Body
          className="d-flex justify-content-center align-items-center"
          style={{ minHeight: "300px" }}
        >
          <Spinner animation="border" variant="light" />
        </Card.Body>
      </Card>
    );
  }

  if (error) {
    return (
      <Card
        className="border-secondary"
        style={{ backgroundColor: "rgba(39, 46, 53, 1)" }}
      >
        <Card.Body className="text-center text-danger">
          <p>{t('settings.profileCard.errorLoading')} {error}</p>
        </Card.Body>
      </Card>
    );
  }

  return (
    <Card
      className="border-secondary"
      style={{ backgroundColor: "rgba(39, 46, 53, 1)" }}
    >
      <Card
        className="border-secondary"
        style={{ backgroundColor: "rgba(39, 46, 53, 1)" }}
      >
        <Card.Body>
          <div className="d-flex justify-content-center align-items-center mb-3">
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ width: "60px", height: "60px", marginRight: "1rem" }}
            >
              <img
                src={user?.profileImage || userImage}
                alt={t('settings.profileCard.userAlt')}
                className="img-fluid rounded-circle"
              />
            </div>
          </div>
          <hr />
          <div className="d-flex justify-content-between text-muted small mb-1">
            <strong>{t('settings.profileCard.name')}:</strong>
            <span>
              {user?.username}
            </span>
          </div>
          <hr />
          <div className="d-flex justify-content-between text-muted small mb-1">
            <strong>{t('settings.profileCard.mobile')}:</strong>
            <span>{user?.phoneNumber || t('settings.profileCard.notSet')}</span>
          </div>
          <hr />
          <div className="d-flex justify-content-between text-muted small mb-1">
            <strong>{t('settings.profileCard.mail')}:</strong>
            <span>{user?.email || t('settings.profileCard.notSet')}</span>
          </div>
          <hr />
          <div className="d-flex justify-content-between text-muted small">
            <strong>{t('settings.profileCard.location')}:</strong>
            <span>{user?.country || t('settings.profileCard.notSet')}</span>
          </div>
        </Card.Body>
      </Card>
    </Card>
  );
};

export default ProfileCard;
