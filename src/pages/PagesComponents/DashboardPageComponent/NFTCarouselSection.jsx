import { Row } from "react-bootstrap";
import NFTCarousel from "../../../jsx/components/Components/nft-carousel";
import { useTranslation } from "react-i18next";

const NFTCarouselSection = ({ images, latestSales }) => {
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
        <div className="card px-2 h-100">
          <div
            className="d-flex flex-wrap"
            style={{
              flexDirection: "row", // Default horizontal layout
              gap: "16px", // Add spacing between sections
            }}
          >
            <div
              className="col-xl-8 col-12 col-lg-8"
              style={{
                flex: "1 1 60%", // Take 60% of the width
                overflow: "hidden",
              }}
            >
              <NFTCarousel
                images={images}
                className="max-w-4xl w-full"
                playsInline
                style={{
                  width: "100%",
                  height: "auto",
                  objectFit: "cover",
                }}
              />
            </div>
            <div
              className="col-xl-3 col-12 col-lg-3"
              style={{
                flex: "1 1 20%", // Take 35% of the width
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                className="card shadow-lg"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                }}
              >
                <div
                  className="card-header border-0 pb-0"
                  style={{
                    textAlign: "center",
                    padding: "16px",
                  }}
                >
                  <h4
                    className="fs-20"
                    style={{
                      fontSize: "1.25rem",
                      margin: 0,
                    }}
                  >
                    {t("dashboard.carouselSection.latestSales")}
                  </h4>
                </div>
                <div
                  className="card-body"
                  style={{
                    flexGrow: 1,
                    overflowY: "auto",
                    padding: "16px",
                  }}
                >
                  {latestSales.slice(-5).length > 0 ? (
                    latestSales.slice(-5).map((data, index) => (
                      <div
                        className="media pb-3 border-bottom mb-3 align-items-center"
                        key={index}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          paddingBottom: "12px",
                          marginBottom: "12px",
                          borderBottom: "1px solid #ddd",
                        }}
                      >
                        <span
                          className="ticket-icon text-white me-3 display-6 bg-primary"
                          style={{
                            display: "inline-block",
                            width: "40px",
                            height: "40px",
                            lineHeight: "40px",
                            textAlign: "center",
                            borderRadius: "50%",
                            backgroundColor: "#007bff",
                            color: "#fff",
                            fontSize: "1.5rem",
                            marginRight: "12px",
                          }}
                        >
                          {data.userId.username.charAt(0)}
                        </span>
                        <div
                          className="media-body"
                          style={{
                            flex: 1,
                          }}
                        >
                          <h6
                            className="fs-16 mb-0 text-truncate"
                            style={{
                              fontSize: "1rem",
                              marginBottom: "4px",
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                          >
                            {data.userId.username}
                          </h6>
                          <div
                            className="fs-14"
                            style={{
                              fontSize: "0.875rem",
                              color: "#555",
                            }}
                          >
                            {data.metadata.price}$
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p
                      className="text-center text-muted"
                      style={{
                        textAlign: "center",
                        color: "#6c757d",
                        fontSize: "0.875rem",
                      }}
                    >
                      {t("dashboard.carouselSection.noSales")}
                    </p>
                  )}
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
