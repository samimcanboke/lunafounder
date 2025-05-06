import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import userLogo from "../../../images/UserVector.png";
import solanaLogo from "../../../images/SolanaVector.png";

const TicketCard = ({ howManyTicketsSold, howManyUser, hoMuchSolana }) => {
  const { t } = useTranslation();
  return (
    <div className="col-xl-6 col-xxl-5 col-lg-6">
      <div className="card ticket-bx">
        <div className="card-body">
          <div className="d-sm-flex d-block pb-sm-3 align-items-end">
            <div className="me-auto pr-3 mb-2 mb-sm-0">
              <span className="text-white fs-20 font-w200 d-block mb-sm-3 mb-2">
                {t("dashboard.ticketCard.soldToday")}
              </span>
              <h2 className="fs-40 text-white mb-0">
                {howManyTicketsSold}
                <span className="fs-18 ms-2">{t("dashboard.ticketCard.pcs")}</span>
              </h2>
            </div>
            <div className="p-3">
              <div className="text-end mb-2 me-1 fw-light text-white">
                {t("dashboard.ticketCard.prize")}
              </div>
              <div className="d-flex justify-content-between bg-primary py-2 px-3 gap-5 rounded-3">
                <div className="d-flex flex-column align-items-center p-2 me-3">
                  <img src={userLogo} alt="User" />
                  <p className="mb-0 mt-2 text-center">{howManyUser}</p>
                </div>
                <div className="d-flex flex-column align-items-center ms-3">
                  <img src={solanaLogo} alt="Solana" />
                  <p className="mb-0 mt-1 text-center">{hoMuchSolana}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="progress mt-3 mb-4" style={{ height: "15px" }}>
            <div
              className="progress-bar-striped progress-bar-animated"
              style={{ width: "86%", height: "15px" }}
              role="progressbar"
            >
              <span className="sr-only">86% Complete</span>
            </div>
          </div>
          <p className="fs-12">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <Link to="#" className="text-white">
            {t("dashboard.ticketCard.viewDetail")}
            <i className="las la-long-arrow-alt-right scale5 ms-3"></i>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TicketCard;
