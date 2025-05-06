import React, { useEffect, useRef } from "react";
import useUserAllNftsStore from "../store/userAllNfts";
import { Button, Card, Col, Row, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import loadable from "@loadable/component";
import pMinDelay from "p-min-delay";
import CreditCard from "../images/credit_card.png";
import MrLuna3 from "../images/MRLuna3.png";
import useUserTreeStore from "../store/userTreeStore";
import useUserStore from "../store/userStore";
import { useTranslation } from "react-i18next";

const RevenueChart = loadable(() =>
  pMinDelay(import("../jsx/components/Karciz/EventPage/RevenueChart"), 1000)
);
const TicketChart = loadable(() =>
  pMinDelay(import("../jsx/components/Karciz/EventPage/TicketChart"), 1000)
);

const ProfilePage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { tree, fetchTree } = useUserTreeStore();
  const { user, getProfile } = useUserStore();
  // Create an array of refs for each possible video
  const videoRefs = useRef([]);

  // Set up refs when component mounts
  useEffect(() => {
    videoRefs.current = videoRefs.current.slice(0, 7);
  }, []);

  useEffect(() => {
    fetchTree();
    getProfile();
  }, [fetchTree, getProfile]);

  // Play videos in sequence when loaded
  useEffect(() => {
    if (videoRefs.current.length > 0) {
      const order = [0, 6, 1, 5, 2, 4, 3];
      // Initial staggered play
      order.forEach((vidIdx, seqIdx) => {
        if (videoRefs.current[vidIdx]) {
          setTimeout(() => {
            const video = videoRefs.current[vidIdx];
            if (video)
              video.play().catch((e) => console.log("Video play error:", e));
          }, seqIdx * 100);
        }
      });

      // Loop each on end with 2s delay
      videoRefs.current.forEach((video) => {
        if (!video) return;
        video.addEventListener("ended", () => {
          setTimeout(() => {
            if (video)
              video.play().catch((e) => console.log("Video play error:", e));
          }, 2000);
        });
      });
    }
  }, [videoRefs.current]);

  return (
    <div className="container-fluid">
      {/* Profile section */}
      <Row className="my-5 justify-content-center">
        <Col xs={12} className="text-center">
          <div className="d-flex align-items-center justify-content-center flex-column flex-md-row gap-3">
            <div
              className="rounded-circle overflow-hidden mb-2 mb-md-0"
              style={{ width: "80px", height: "80px", flexShrink: 0 }}
            >
              <img
                src={MrLuna3 || "/placeholder.svg"}
                alt={t('profilePage.profilePictureAlt', { name: `${user?.firstName} ${user?.lastName}` })}
                className="w-100 h-100 object-fit-cover"
              />
            </div>
            <h1 className="display-6 fw-bold mb-0">
              {user?.firstName} {user?.lastName}
            </h1>
          </div>
        </Col>
      </Row>
      {/* Wallet stats section */}
      <Row className="my-4 g-4">
        <Col xs={12} sm={6} lg={3}>
          <Card
            className="h-100 overflow-hidden"
            style={{ minHeight: "100px" }}
          >
            <div className="card-header border-0 pb-0">
              <div>
                <p className="mb-2">{t('profilePage.walletBalance')}</p>
                <h3 className="mb-0 fs-24 font-w600">{user?.walletBalance}</h3>
              </div>
            </div>
            <div className="card-body p-0">
              <div
                className="col-7 px-0 offset-5 mt-widget"
                style={{ pointerEvents: "none" }}
              >
                <RevenueChart />
              </div>
            </div>
          </Card>
        </Col>
        {/* Other stat cards */}
        <Col xs={12} sm={6} lg={3}>
          <Card
            className="h-100 overflow-hidden"
            style={{ minHeight: "100px" }}
          >
            <div className="card-header border-0 pb-0">
              <div>
                <p className="mb-2">{t('profilePage.firstLineEarnings')}</p>
                <h3 className="mb-0 fs-24 font-w600">
                  {user?.firstLineEarnings} {t('profilePage.pcs')}
                </h3>
              </div>
            </div>
            <div className="card-body p-0">
              <div
                className="col-7 px-0 offset-5 mt-widget"
                style={{ pointerEvents: "none" }}
              >
                <TicketChart />
              </div>
            </div>
          </Card>
        </Col>

        <Col xs={12} sm={6} lg={3}>
          <Card
            className="h-100 overflow-hidden bg-image bg-danger"
            style={{ minHeight: "100px" }}
          >
            <div className="card-header border-0">
              <div>
                <p className="mb-2 text-light">{t('profilePage.teamEarnings')}</p>
                <h3 className="mb-0 fs-24 font-w600 text-white">
                  {user?.teamEarnings} {t('profilePage.pcs')}
                </h3>
              </div>
            </div>
          </Card>
        </Col>

        <Col xs={12} sm={6} lg={3}>
          <Card
            className="h-100 overflow-hidden position-relative"
            style={{
              backgroundImage: `linear-gradient(to bottom, #b03636, rgba(0, 0, 0, 0.5)), url(${CreditCard})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              minHeight: "100px",
            }}
          >
            <div className="card-header border-0 pb-0">
              <div className="position-absolute top-0 start-0 p-3">
                <p className="mb-2 text-light">{t('profilePage.creditCardForm')}</p>
              </div>
            </div>
            <div className="card-body p-0">
              <div className="col-7 px-0 offset-5 mt-widget"></div>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Mint Button */}
      <Row className="my-5">
        <Col
          xs={12}
          className="text-center position-relative"
          style={{ zIndex: 1 }}
        >
          <Button
            className="btn-lg fw-semibold px-5 py-3"
            style={{
              background:
                "linear-gradient(to bottom, rgba(255, 246, 159, 1), rgba(213, 165, 84, 1))",
              border: "none",
              color: "#fff",
              borderRadius: "30px",
            }}
            onClick={() => navigate("/dashboard")}
          >
            {t('profilePage.mintNewNfts')}
          </Button>
        </Col>
      </Row>
      {/* Referrals Section */}
      <Row>
        <Col xs={12}>
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-3">
            <div>
              <h2 className="display-6 fw-bold mb-2">{t('profilePage.yourReferrals')}</h2>
              <p className="text-white-50 mb-0">
                {t('profilePage.directReferrals', { count: tree?.length || 0 })}
              </p>
            </div>
          </div>
          <Card
            style={{
              background: "rgba(33, 37, 41, 1)",
              border: "1px solid rgba(55, 55, 55, 1)",
              borderRadius: "12px",
            }}
          >
            <Card.Body className="p-0 p-sm-3">
              <div className="table-responsive">
                <Table variant="dark" borderless className="mb-0">
                  <thead>
                    <tr>
                      <th style={{ color: "rgba(255,255,255,0.5)" }}>{t('profilePage.table.date')}</th>
                      <th style={{ color: "rgba(255,255,255,0.5)" }}>{t('profilePage.table.walletAddress')}</th>
                      <th style={{ color: "rgba(255,255,255,0.5)" }}>{t('profilePage.table.status')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {!tree?.length ? (
                      <tr>
                        <td colSpan="3" className="text-center text-white-50">
                          {t('profilePage.noReferrals')}
                        </td>
                      </tr>
                    ) : (
                      tree.map((referral, index) => (
                        <tr
                          key={index}
                          style={{
                            borderBottom: "1px solid rgba(55, 55, 55, 1)",
                          }}
                        >
                          <td className="text-white">
                            {new Date(referral.createdAt).toLocaleDateString()}
                          </td>
                          <td className="text-white">
                            {`${referral.walletAddress.slice(
                              0,
                              6
                            )}...${referral.walletAddress.slice(-4)}`}
                          </td>
                          <td>
                            <span className="badge bg-success">{t('profilePage.statusActive')}</span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </Table>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ProfilePage;
