import React, { useEffect } from "react";
import { Card, Form, Row, Col, Button } from "react-bootstrap";
import useProfileStore from "../../../store/profileStore";
import { useTranslation } from "react-i18next";

const EditProfileCard = () => {
  const { t } = useTranslation();
  const { userData, fetchUser, setUserData, updateUser } = useProfileStore();

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const handleChange = (e) => setUserData({ [e.target.name]: e.target.value });
  const handlePhoneKeyPress = (e) => {
    if (!/\d/.test(e.key)) e.preventDefault();
  };
  const handleUpdate = () => {
    updateUser();
  };

  return (
    <Card
      className="border-0"
      style={{ backgroundColor: "rgba(39, 46, 53, 1)" }}
    >
      <Card.Body>
        <h5 className="mb-4">{t('settings.editProfile.title')}</h5>
        <Form>
          <Row className="g-3">
            <Col md={6} sm={12}>
              <Form.Group>
                <Form.Label>{t('settings.editProfile.firstName')}</Form.Label>
                <Form.Control
                  name="firstName"
                  type="text"
                  placeholder={t('settings.editProfile.placeholderFirstName')}
                  className="border-secondary"
                  value={userData.firstName}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={6} sm={12}>
              <Form.Group>
                <Form.Label>{t('settings.editProfile.lastName')}</Form.Label>
                <Form.Control
                  name="lastName"
                  type="text"
                  placeholder={t('settings.editProfile.placeholderLastName')}
                  className="border-secondary"
                  value={userData.lastName}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="g-3 mt-3">
            <Col md={6} sm={12}>
              <Form.Group>
                <Form.Label>{t('settings.editProfile.phoneNumber')}</Form.Label>
                <Form.Control
                  name="phoneNumber"
                  type="text"
                  placeholder={t('settings.editProfile.placeholderPhoneNumber')}
                  className="border-secondary"
                  value={userData.phoneNumber}
                  onChange={handleChange}
                  onKeyPress={handlePhoneKeyPress}
                />
              </Form.Group>
            </Col>
            <Col md={6} sm={12}>
              <Form.Group>
                <Form.Label>{t('settings.editProfile.emailAddress')}</Form.Label>
                <Form.Control
                  name="email"
                  type="email"
                  placeholder={t('settings.editProfile.placeholderEmailAddress')}
                  className="border-secondary"
                  value={userData.email}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="g-3 mt-3">
            <Col md={6} sm={12}>
              <Form.Group>
                <Form.Label>{t('settings.editProfile.country')}</Form.Label>
                <Form.Select
                  className="border-secondary"
                  aria-label="Select Country"
                  name="country"
                  value={userData.country}
                  onChange={handleChange}
                >
                  <option disabled>{t('settings.editProfile.selectCountry')}</option>
                  <option>{t('settings.editProfile.countryOptions.us')}</option>
                  <option>{t('settings.editProfile.countryOptions.de')}</option>
                  <option>{t('settings.editProfile.countryOptions.other')}</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={6} sm={12}>
              <Form.Group>
                <Form.Label>{t('settings.editProfile.postalCode')}</Form.Label>
                <Form.Select
                  className="border-secondary custom-select"
                  aria-label="Select Postal Code"
                  name="postalCode"
                  value={userData.postalCode}
                  onChange={handleChange}
                >
                  <option disabled>{t('settings.editProfile.selectPostalCode')}</option>
                  <option>{t('settings.editProfile.postalCodeOptions.code1')}</option>
                  <option>{t('settings.editProfile.postalCodeOptions.code2')}</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Row className="g-3 mt-3">
            <Col md={6} sm={12}>
              <Form.Group>
                <Form.Label>{t('settings.editProfile.city')}</Form.Label>
                <Form.Select
                  className="border-secondary custom-select"
                  aria-label="Select City"
                  name="city"
                  value={userData.city}
                  onChange={handleChange}
                >
                  <option disabled>{t('settings.editProfile.selectCity')}</option>
                  <option>{t('settings.editProfile.cityOptions.california')}</option>
                  <option>{t('settings.editProfile.cityOptions.berlin')}</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={6} sm={12}>
              <Form.Group>
                <Form.Label>{t('settings.editProfile.productName')}</Form.Label>
                <Form.Control
                  name="productName"
                  type="text"
                  placeholder={t('settings.editProfile.placeholderProductName')}
                  className="border-secondary"
                  value={userData.productName}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mt-3">
            <Col>
              <Form.Group>
                <Form.Label>{t('settings.editProfile.aboutMe')}</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder={t('settings.editProfile.placeholderAboutMe')}
                  className="border-secondary"
                  name="aboutMe"
                  value={userData.aboutMe}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>

          <div className="text-end mt-4">
            <Button variant="danger" onClick={handleUpdate}>
              {t('settings.editProfile.submit')}
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default EditProfileCard;
