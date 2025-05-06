import React from "react";
import { useTranslation } from "react-i18next";
import userTop from "../../../images/user-top.png";
import dollarTop from "../../../images/dollar-top.png";
import userDown from "../../../images/user-down.png";
import dollarDown from "../../../images/dollar-down.png";

const SummaryCards = ({
  myFirstLineCount,
  myFirstLineEarnings,
  myTeamCount,
  myTeamEarnings,
}) => {
  const { t } = useTranslation();
  return (
    <div className="col-xl-6 col-xxl-7 col-lg-6">
      <div className="row">
        <div className="col-sm-6 order-1 order-sm-1">
          <div
            className="card overflow-hidden py-5 px-3"
            style={{
              backgroundImage: `url(${userTop})`,
              backgroundPosition: "right bottom",
              backgroundSize: "auto 50%",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className="d-flex align-items-center">
              <div className="flex-grow-1 px-2">
                <div className="text-white">
                  {t("dashboard.summaryCards.firstline")}
                </div>
                <hr className="w-75 my-1" />
                <div className="fw-light">
                  {t("dashboard.summaryCards.count")}
                </div>
              </div>
              <div className="d-flex align-items-center justify-content-center px-3">
                <strong className="display-6 text-red fw-bold">
                  {myFirstLineCount}
                </strong>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-6 order-3 order-sm-2">
          <div
            className="card overflow-hidden py-5 px-3"
            style={{
              backgroundImage: `url(${dollarTop})`,
              backgroundPosition: "right bottom",
              backgroundSize: "auto 50%",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className="d-flex align-items-center">
              <div className="flex-grow-1 px-2">
                <div className="text-white">
                  {t("dashboard.summaryCards.firstline")}
                </div>
                <hr className="w-75 my-1" />
                <div className="fw-light">
                  {t("dashboard.summaryCards.earnings")}
                </div>
              </div>
              <div className="d-flex align-items-center justify-content-center px-3">
                <strong className="display-6 text-red fw-bold">
                  {`${myFirstLineEarnings}$`}
                </strong>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-6 order-2 order-sm-3">
          <div
            className="card overflow-hidden py-5 px-3"
            style={{
              backgroundImage: `url(${userDown})`,
              backgroundPosition: "right top",
              backgroundSize: "auto 37%",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className="d-flex align-items-center">
              <div className="flex-grow-1 px-2">
                <div className="text-white">
                  {t("dashboard.summaryCards.team")}
                </div>
                <hr className="w-75 my-1" />
                <div className="fw-light">
                  {t("dashboard.summaryCards.count")}
                </div>
              </div>
              <div className="d-flex align-items-center justify-content-center px-3">
                <strong className="display-6 text-red fw-bold">
                  {myTeamCount}
                </strong>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-6 order-4 order-sm-4">
          <div
            className="card overflow-hidden py-5 px-3"
            style={{
              backgroundImage: `url(${dollarDown})`,
              backgroundPosition: "right top",
              backgroundSize: "auto 50%",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className="d-flex align-items-center">
              <div className="flex-grow-1 px-2">
                <div className="text-white">
                  {t("dashboard.summaryCards.team")}
                </div>
                <hr className="w-75 my-1" />
                <div className="fw-light">
                  {t("dashboard.summaryCards.earnings")}
                </div>
              </div>
              <div className="d-flex align-items-center justify-content-center px-3">
                <strong className="display-6 text-red fw-bold">
                  {`${myTeamEarnings}$`}
                </strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryCards;
