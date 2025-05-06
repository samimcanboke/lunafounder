import React from "react";
import { Card, Form, Row, Col, Button } from "react-bootstrap";
import useProfileStore from "../../../store/profileStore";
import { useTranslation } from "react-i18next";

const ChangePasswordCard = () => {
  const { t } = useTranslation();
  const { passData, setPassData, changePassword } = useProfileStore();

  const handleChange = (e) => setPassData({ [e.target.name]: e.target.value });
  const isMatch = passData.newPassword === passData.confirmPassword;
  const handleSubmit = () => {
    if (!isMatch) return;
    changePassword();
  };

  return (
    <Card
      className="border-secondary"
      style={{ backgroundColor: "rgba(39, 46, 53, 1)" }}
    >
      <Card.Body>
        <h5 className="mb-3">{t('settings.changePassword.title')}</h5>
        <Form>
          <Row className="g-3">
            <Col md={4}>
              <Form.Group>
                <Form.Label>{t('settings.changePassword.currentPassword')}</Form.Label>
                <Form.Control
                  name="oldPassword"
                  type="password"
                  placeholder={t('settings.changePassword.placeholderCurrent')}
                  className="border-secondary"
                  value={passData.oldPassword}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>{t('settings.changePassword.newPassword')}</Form.Label>
                <Form.Control
                  name="newPassword"
                  type="password"
                  placeholder={t('settings.changePassword.placeholderNew')}
                  className="border-secondary"
                  value={passData.newPassword}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>{t('settings.changePassword.repeatNewPassword')}</Form.Label>
                <Form.Control
                  name="confirmPassword"
                  type="password"
                  placeholder={t('settings.changePassword.placeholderRepeat')}
                  className="border-secondary"
                  value={passData.confirmPassword}
                  onChange={handleChange}
                />
                {passData.confirmPassword && !isMatch && (
                  <Form.Text className="text-danger">
                    {t('settings.changePassword.passwordsNotMatch')}
                  </Form.Text>
                )}
              </Form.Group>
            </Col>
          </Row>
          <div className="d-flex justify-content-between align-items-center mt-3">
            <a
              href="#!"
              className="text-danger text-decoration-underline small"
            >
              {t('settings.changePassword.forgotPassword')}
            </a>
            <Button
              variant="danger"
              onClick={handleSubmit}
              disabled={
                !passData.oldPassword ||
                !passData.newPassword ||
                !passData.confirmPassword ||
                !isMatch
              }
            >
              {t('settings.changePassword.submit')}
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default ChangePasswordCard;
