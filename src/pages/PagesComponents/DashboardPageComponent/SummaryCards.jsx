import { useTranslation } from "react-i18next";

const SummaryCards = ({
  myFirstLineCount,
  myFirstLineEarnings,
  myTeamCount,
  myTeamEarnings,
}) => {
  const { t } = useTranslation();
  return (
    <div className="container">
      <div className="row mb-4 d-flex justify-content-center">
        <div className="col-10">
          <video
            src="/videos/db1.mp4"
            autoPlay
            muted
            loop
            playsInline
            style={{
              width: "100%",
              height: "auto",
              borderRadius: "10px",
              backgroundColor: "black",
            }}
          >
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
      <div className="row g-3">
        <div className="col-12 col-sm-6 col-lg-3">
          <div
            className="card overflow-hidden py-5 px-3"
            style={{
              // backgroundImage: `url(${userTop})`,
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
        <div className="col-12 col-sm-6 col-lg-3">
          <div
            className="card overflow-hidden py-5 px-3"
            style={{
              // backgroundImage: `url(${dollarTop})`,
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
        <div className="col-12 col-sm-6 col-lg-3">
          <div
            className="card overflow-hidden py-5 px-3"
            style={{
              // backgroundImage: `url(${userDown})`,
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
        <div className="col-12 col-sm-6 col-lg-3">
          <div
            className="card overflow-hidden py-5 px-3"
            style={{
              // backgroundImage: `url(${dollarDown})`,
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
