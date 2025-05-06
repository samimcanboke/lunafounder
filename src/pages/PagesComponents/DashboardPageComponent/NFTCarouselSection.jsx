import React from "react";
import { Row } from "react-bootstrap";
import NFTCarousel from "../../../jsx/components/Components/nft-carousel";
import { useTranslation } from "react-i18next";

const NFTCarouselSection = ({ nftImages, latestSales }) => {
  const { t } = useTranslation();
  return (
    <Row className="my-5">
      <h1
        style={{
          background: "linear-gradient(to right, #D5A554, #E79710)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          fontFamily: '"Krona One", sans-serif',
        }}
        className="mb-2 text-center"
      >
        {t("dashboard.carouselSection.founderCollections")}
      </h1>
      <div className="col-xl-12">
        <div className="card px-5">
          <div className="d-flex justify-content-between align-items-center flex-wrap">
            <div className="col-xl-8 col-12 col-lg-8 p-2">
              <NFTCarousel images={nftImages} className="max-w-4xl w-full" />
            </div>
            <div className="col-xl-3 col-12 col-lg-3">
              <div className="card shadow-lg">
                <div className="card-header border-0 pb-0 ">
                  <h4 className="fs-20">
                    {t("dashboard.carouselSection.latestSales")}
                  </h4>
                </div>
                <div className="card-body">
                  {latestSales.map((data, index) => (
                    <div
                      className="media pb-3 border-bottom mb-3 align-items-center"
                      key={index}
                    >
                      <span className="ticket-icon text-white me-3 display-6 bg-primary">
                        {data.name.charAt(0)}
                      </span>
                      <div className="media-body">
                        <h6 className="fs-16 mb-0">{data.name}</h6>
                        <div className="fs-14 text-muted mb-1">{data.type}</div>
                        <div className="d-flex">
                          <span className="fs-14 me-auto">{data.nft}</span>
                          <span className="fs-14">{data.price}$</span>
                        </div>
                        <div className="fs-12 text-secondary">{data.date}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Row>
  );
};

export default NFTCarouselSection;
