import React, { useEffect, useState } from "react";
import { Button, Dropdown } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import Image from "react-bootstrap/Image";
import LunaLogo from "../../images/logo_luna.png";
import Ellipse from "../../images/Ellipse.png";
import Ellipse2 from "../../images/Ellipse2.png";
import Ellipse3 from "../../images/Ellipse3.png";
import Ellipse4 from "../../images/Ellipse4.png";
import MrLuna from "../../images/mrluna.svg";
import Solana from "../../images/solanacoin.png";
import GoldenCoin from "../../images/goldcoin.png";
import GoldHeart from "../../images/Gold-Heart.png";
import GoldSpade from "../../images/Gold-Spade.png";
import GoldDiamond from "../../images/Gold-Diamond.png";
import GoldWallet from "../../images/GoldWallet.png";
import GoldenClover from "../../images/GoldenClover.png";
import GoldSolana from "../../images/GoldSolana.png";
import GoldDollar from "../../images/GoldDollar.png";
import GoldNFT from "../../images/GoldNFT.png";
import GoldHeartCard from "../../images/GoldHeartCard.png";
import PolaroidCardGrid from "../components/Components/landing-cards";
import useUserAllNftsStore from "../../store/userAllNfts";
import { useNavigate } from "react-router-dom";
import { useWallet } from "@solana/wallet-adapter-react";
import { useDispatch } from "react-redux";

const getVideoPoster = (videoUrl, timeInSeconds) => {
  const canvas = document.createElement("canvas");
  const video = document.createElement("video");

  return new Promise((resolve) => {
    video.src = videoUrl;
    video.crossOrigin = "anonymous";
    video.currentTime = timeInSeconds;

    video.onloadeddata = () => {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      resolve(canvas.toDataURL("image/png"));
    };
  });
};

const Header = () => {
  const { t, i18n } = useTranslation();
  const changeLang = (lng) => i18n.changeLanguage(lng);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [expandedCard, setExpandedCard] = useState(null);
  const [tiers, setTiers] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { publicKey, connected } = useWallet();
  const [nfts, setNfts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fiveK, setFiveK] = useState("");
  const [activeVideo, setActiveVideo] = useState(null);
  const [videoPosters, setVideoPosters] = useState({});

  const handleMint = (tier) => {

    try {
      navigate("/login");
    } catch (error) {
      console.error("Navigation error:", error);
    }
  };

  const toggleCard = (index) => {
    if (expandedCard === index) {
      setExpandedCard(null);
    } else {
      setExpandedCard(index);
    }
  };

  const { allNfts, fetchAllNfts } = useUserAllNftsStore();
  useEffect(() => {
    fetchAllNfts();
  }, [fetchAllNfts]);

  useEffect(() => {
    const fetchTierData = async () => {
      const result = [];
      for (let config of allNfts || []) {
        try {
          const res = await fetch(config.url);
          if (!res.ok) continue;
          const json = await res.json();
          result.push({ ...config, data: json });
        } catch (err) {
          console.warn(`❌ ${config.tier} fetch error`, err);
        }
      }
      setTiers(result);
    };
    if (allNfts?.length) fetchTierData();
  }, [allNfts]);

  useEffect(() => {
    const fetchPosters = async () => {
      const poster1 = await getVideoPoster(
        "https://api.lunafounder.io/luna.mp4",
        30
      );
      const poster2 = await getVideoPoster(
        "https://api.lunafounder.io/luna2.mp4",
        30
      );
      setVideoPosters({ 0: poster1, 1: poster2 });
    };
    fetchPosters();
  }, []);

  const nftImages = Object.values(allNfts || {})
    .map((n) => n.metadata?.animation_url || n.metadata?.image)
    .filter(Boolean)
    .slice(0, 5);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const tier5kImage = tiers.find((t) => t.tier === "5000")?.data?.image;

  const handleVideoClick = (videoIndex) => {
    setActiveVideo(videoIndex);
    document.body.style.overflow = "hidden"; // Disable scrolling
  };

  const handleOverlayClick = () => {
    setActiveVideo(null);
    document.body.style.overflow = ""; // Re-enable scrolling
  };

  // eklendi: dil bazlı video kaynağı
  const videoSrc =
    i18n.language === "de"
      ? "https://api.lunafounder.io/lunavideo.mp4"
      : "https://api.lunafounder.io/lunavideo_en.mp4";

  return (
    <div>
      <div
        className="position-relative w-100"
        style={{
          minHeight: "100vh",
          backgroundColor: "#080C12",
          overflow: "hidden",
        }}
      >
        <div>
          <img
            src={Ellipse}
            alt="Decoration"
            className="position-absolute d-none d-md-block"
            style={{ top: 0, left: 0, zIndex: 0 }}
          />
          <img
            src={Ellipse2}
            alt="Decoration"
            className="position-absolute d-none d-md-block"
            style={{ bottom: 0, right: 0, zIndex: 0 }}
          />

          <header
            className="d-flex justify-content-between align-items-center px-3 px-md-4 py-3"
            style={{ zIndex: 1, position: "relative" }}
          >
            <div className="d-flex align-items-center">
              <Image
                src={LunaLogo}
                alt="Luna Casino Logo"
                style={{ height: "clamp(40px, 6vw, 64px)" }}
              />
            </div>

            <button
              className="d-md-none bg-transparent border-0 text-white"
              onClick={toggleMenu}
              aria-label="Toggle navigation"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 12H21"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M3 6H21"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M3 18H21"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <nav className="d-none d-md-flex align-items-center gap-3 gap-lg-4">
              {/* <a
                href="#how"
                className="text-white text-decoration-none fw-medium"
              >
                {t("landing.header.how")}
              </a>
              <a
                href="#buy"
                className="text-white text-decoration-none fw-medium"
              >
                {t("landing.header.founderMint")}
              </a> */}
              <a
                href="https://lunacasino.io/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white text-decoration-none fw-medium"
              >
                {t("landing.header.casino")}
              </a>
              <a
                href="/faq"
                className="text-white text-decoration-none fw-medium"
              >
                {t("landing.header.faq")}
              </a>
            </nav>

            <div className="d-none d-md-flex align-items-center gap-2">
              <Dropdown onSelect={changeLang}>
                <Dropdown.Toggle variant="outline-light" size="sm">
                  {i18n.language.toUpperCase()}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item eventKey="en">
                    {t("header.language.en")}
                  </Dropdown.Item>
                  <Dropdown.Item eventKey="de">
                    {t("header.language.de")}
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <Button variant="" href="/login" size="sm" className="text-white">
                {t("landing.header.login")}
              </Button>
              <Button
                href="/register"
                className="text-white border-0"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, #FFF69F, #D5A554)",
                  color: "#000",
                }}
              >
                {t("landing.header.register")}
              </Button>
            </div>
          </header>

          {isMenuOpen && (
            <div
              className="d-md-none position-absolute w-100 bg-dark p-3"
              style={{ zIndex: 10 }}
            >
              <nav className="d-flex flex-column gap-3">
                <a
                  href="https://lunacasino.io/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white text-decoration-none fw-medium"
                  onClick={toggleMenu}
                >
                  {t("landing.header.casino")}
                </a>
                <a
                  href="/faq"
                  className="text-white text-decoration-none fw-medium"
                  onClick={toggleMenu}
                >
                  {t("landing.header.faq")}
                </a>
              </nav>
              <div className="d-flex gap-2 mt-3">
                <Button
                  variant=""
                  href="/login"
                  size="sm"
                  className="text-white flex-grow-1"
                  onClick={toggleMenu}
                >
                  {t("landing.header.login")}
                </Button>
                <Button
                  className="text-white border-0 flex-grow-1"
                  href="/register"
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, #FFF69F, #D5A554)",
                    color: "#000",
                  }}
                  onClick={toggleMenu}
                >
                  {t("landing.header.register")}
                </Button>
              </div>
            </div>
          )}

          <div className="d-flex flex-column justify-content-center align-items-center vh-100">
            <div className="h-100 d-flex flex-column flex-md-row align-items-center justify-content-between text-white px-3 px-md-4">
              <div className="col-12 col-md-8 order-1 order-md-0 text-center text-md-start mt-5 mt-md-0">
                <h1
                  className="display-4 fw-bold mb-3"
                  style={{
                    fontFamily: "Krona One, sans-serif",
                    fontSize: "clamp(2rem, 5vw, 3.5rem)",
                  }}
                >
                  {t("landing.hero.welcome")} <br />
                  <span
                    style={{
                      background: "linear-gradient(to right, #FFD36E, #E79710)",
                      WebkitBackgroundClip: "text",
                      color: "transparent",
                    }}
                  >
                    {t("landing.hero.platformName")}
                  </span>
                </h1>

                <h2
                  className="h4 fw-lighter mb-3 display-6 d-block d-md-none"
                  style={{
                    fontStyle: "italic",
                    fontSize: "clamp(1rem, 2vw, 1.5rem)",
                  }}
                >
                  {t("landing.hero.subtitle")}
                </h2>

                <h2
                  className="h4 fw-lighter mb-3 display-6 d-none d-md-block"
                  style={{
                    fontStyle: "italic",
                    fontSize: "clamp(3rem, 2vw, 1.5rem)",
                  }}
                >
                  {t("landing.hero.subtitle")}
                </h2>

                <p
                  className="mb-4 fs-5"
                  style={{ fontSize: "clamp(1rem, 2vw, 1.25rem)" }}
                >
                  {t("landing.hero.registerNow")}
                </p>
                <div className="d-flex gap-3 justify-content-center justify-content-md-start">
                  <Button
                    href="/register"
                    style={{
                      backgroundImage:
                        "linear-gradient(to right, #FFF69F, #D5A554)",
                      color: "#000",
                      border: "none",
                      zIndex: 3,
                    }}
                  >
                    {t("landing.hero.registerButton")}
                  </Button>
                  {/* <Button className="text-decoration-underline" variant="">
                    {t("landing.hero.howWorksButton")}
                  </Button> */}
                </div>

                <div className="d-flex flex-wrap gap-3 mt-5 justify-content-center justify-content-md-start">
                  <div className="d-flex gap-2 align-items-center">
                    <img
                      height={48}
                      src={GoldSpade}
                      alt="gold-spade"
                      style={{ height: "clamp(32px, 5vw, 48px)" }}
                    />
                    <p className="m-0">
                      {t("landing.benefits.protectedGateway")}
                    </p>
                  </div>

                  <div className="d-flex gap-2 align-items-center">
                    <img
                      height={48}
                      src={GoldDiamond}
                      alt="gold-diamond"
                      style={{ height: "clamp(32px, 5vw, 48px)" }}
                    />
                    <p className="m-0">{t("landing.benefits.easyPlatform")}</p>
                  </div>

                  <div className="d-flex gap-2 align-items-center">
                    <img
                      height={48}
                      src={GoldHeart}
                      alt="gold-heart"
                      style={{ height: "clamp(32px, 5vw, 48px)" }}
                    />
                    <p className="m-0">
                      {t("landing.benefits.fastBankTransfer")}
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-12 col-md-6 position-relative d-flex justify-content-center align-items-center order-0 order-md-1">
                <Image
                  src={MrLuna}
                  alt="Mr Luna"
                  fluid
                  style={{
                    maxHeight: "min(80vw, 600px)",
                    position: "relative",
                    zIndex: 1,
                  }}
                />
                <div
                  className="position-absolute d-flex justify-content-center align-items-center"
                  style={{
                    bottom: "30px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    zIndex: 1,
                    width: "100%",
                  }}
                >
                  <Image
                    src={Solana}
                    alt="Solana Coin"
                    className="mx-2 d-none d-md-block"
                    style={{
                      width: "min(50vw, 520px)",
                      transform: "translateY(80px) translateX(120px)",
                      zIndex: 3,
                    }}
                  />
                  <Image
                    src={GoldenCoin}
                    alt="Golden Coin"
                    className="d-none d-md-block"
                    style={{
                      width: "min(30vw, 300px)",
                      transform: "translateY(120px) translateX(-130px)",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="position-relative w-100 d-flex flex-column justify-content-center align-items-center"
        style={{
          minHeight: "100vh",
          backgroundColor: "#080C12",
          overflow: "hidden",
          padding: "20px",
          textAlign: "center",
        }}
      >
        <img
          src={Ellipse3}
          alt="Decoration"
          className="position-absolute d-none d-md-block"
          style={{
            top: 0,
            right: 0,
            zIndex: 0,
            maxWidth: "100%",
            height: "auto",
          }}
        />

        <div
          className="position-relative"
          style={{ zIndex: 1, maxWidth: "1200px" }}
        >
          {/* <div className="d-flex position-relative my-5 gap-4">
            {activeVideo !== null && (
              <div
                className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-75 d-flex justify-content-center align-items-center"
                style={{ zIndex: 99 }} // Set zIndex to 99
                onClick={handleOverlayClick}
              >
                <video
                  src={
                    activeVideo === 0
                      ? "https://api.lunafounder.io/luna.mp4"
                      : "https://api.lunafounder.io/luna2.mp4"
                  }
                  controls
                  autoPlay
                  muted
                  crossOrigin="anonymous"
                  style={{
                    width: "80%",
                    height: "auto",
                    borderRadius: "10px",
                    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.5)",
                    zIndex: 99, // Ensure video is above other elements
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  Your browser does not support the video tag.
                </video>
              </div>
            )}
            <div
              className="flex-grow-1 position-relative"
              style={{
                cursor: "pointer",
                overflow: "hidden",
                transform: activeVideo === 0 ? "scale(1)" : "scale(0.9)", // Slightly shrink when not selected
                transition: "transform 0.3s ease",
              }}
              onClick={() => handleVideoClick(0)}
            >
              <video
                src="https://api.lunafounder.io/luna.mp4"
                autoPlay
                muted
                loop
                crossOrigin="anonymous"
                poster={videoPosters[0]} // Set the poster for the first video
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "10px",
                }}
              >
                Your browser does not support the video tag.
              </video>
            </div>
            <div
              className="flex-grow-1 position-relative"
              style={{
                cursor: "pointer",
                overflow: "hidden",
                transform: activeVideo === 1 ? "scale(1)" : "scale(0.9)", // Slightly shrink when not selected
                transition: "transform 0.3s ease",
              }}
              onClick={() => handleVideoClick(1)}
            >
              <video
                src="https://api.lunafounder.io/luna2.mp4"
                autoPlay
                muted
                loop
                crossOrigin="anonymous"
                poster={videoPosters[1]} // Set the poster for the second video
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "10px",
                }}
              >
                Your browser does not support the video tag.
              </video>
            </div>
          </div> */}

          <h1
            className="display-4 mb-3"
            style={{
              fontFamily: "Krona One, sans-serif",
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              lineHeight: "1.2",
            }}
          >
            {t("landing.steps.title")}
          </h1>
          <h6
            className="fw-light mx-auto"
            style={{
              maxWidth: "600px",
              fontSize: "clamp(0.875rem, 2vw, 1.25rem)",
            }}
          >
            {t("landing.steps.description")}
          </h6>

          <div
            className="row justify-content-center g-4"
            style={{ maxWidth: "1200px" }}
          >
            <div className="col-md-6">
              <div className="d-flex align-items-start text-start p-4 rounded">
                <img
                  src={GoldWallet}
                  alt="Gold Heart"
                  className="me-4"
                  style={{ width: "60px", height: "60px" }}
                />
                <div>
                  <h3 className="h4 mb-3">{t("landing.steps.step1.title")}</h3>
                  <p className="mb-0 fw-light">
                    {t("landing.steps.step1.desc")}
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="d-flex align-items-start text-start p-4 rounded">
                <img
                  src={GoldSolana}
                  alt="Gold Heart"
                  className="me-4"
                  style={{ width: "60px", height: "60px" }}
                />
                <div>
                  <h3 className="h4 mb-3">{t("landing.steps.step2.title")}</h3>
                  <p className="mb-0 fw-light">
                    {t("landing.steps.step2.desc")}
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="d-flex align-items-start text-start p-4 rounded">
                <img
                  src={GoldDollar}
                  alt="Gold Heart"
                  className="me-4"
                  style={{ width: "60px", height: "60px" }}
                />
                <div>
                  <h3 className="h4 mb-3">{t("landing.steps.step3.title")}</h3>
                  <p className="mb-0 fw-light">
                    {t("landing.steps.step3.desc")}
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="d-flex align-items-start text-start p-4 rounded">
                <img
                  src={GoldNFT}
                  alt="Gold Heart"
                  className="me-4"
                  style={{ width: "60px", height: "60px" }}
                />
                <div>
                  <h3 className="h4 mb-3">{t("landing.steps.step4.title")}</h3>
                  <p className="mb-0 fw-light">
                    {t("landing.steps.step4.desc")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="position-relative w-100 d-flex flex-column justify-content-center align-items-center"
        style={{ backgroundColor: "#080C12", overflow: "hidden" }}
      >
        <img
          src={Ellipse4}
          alt="Decoration"
          className="position-absolute d-none d-md-block"
          style={{
            top: 0,
            left: 0,
            zIndex: 0,
            maxWidth: "100%",
            height: "auto",
          }}
        />

        <div
          className="d-flex flex-column flex-lg-row justify-content-center align-items-center"
          style={{ maxWidth: "1400px", width: "100%", zIndex: 1, gap: "60px" }}
        >
          <div
            className="text-center text-lg-start"
            style={{ maxWidth: "700px" }}
          >
            <h1
              className="text-white mb-5"
              style={{
                fontSize: "clamp(1rem, 2vw, 3.5rem)",
                fontWeight: "500",
                lineHeight: "1.3",
                fontFamily: "Krona One, sans-serif",
              }}
            >
              {t("landing.founder5K.title")}
            </h1>
            <div
              className="text-white text-start"
              style={{
                fontSize: "clamp(1rem, 2vw, 1rem)",
                lineHeight: "1.6",
                fontFamily: "Roboto, sans-serif",
              }}
            >
              {/* <p>
                <strong>{t("landing.founder5K.title")}</strong>
              </p> */}
              <ul className="ps-3" style={{ listStyleType: "disc" }}>
                <li className="mb-3">
                  <strong>
                    <i className="bi bi-dot"></i>{" "}
                    {t("landing.founder5K.list.profitshare")}
                  </strong>
                  <br /> {t("landing.founder5K.list.profitshareDesc")}
                </li>
                <li className="mb-3">
                  <strong>
                    <i className="bi bi-dot"></i>{" "}
                    {t("landing.founder5K.list.autoLotto")}
                  </strong>
                  <br /> {t("landing.founder5K.list.autoLottoDesc")}
                </li>
                <li className="mb-3">
                  <strong>
                    <i className="bi bi-dot"></i>{" "}
                    {t("landing.founder5K.list.streamlinePower")}
                  </strong>
                  <br /> {t("landing.founder5K.list.streamlinePowerDesc")}
                </li>
                <li className="mb-3">
                  <strong>
                    <i className="bi bi-dot"></i>{" "}
                    {t("landing.founder5K.list.exclusiveAccess")}
                  </strong>
                  <br /> {t("landing.founder5K.list.exclusiveAccessDesc")}
                </li>
                <li className="mb-3">
                  <strong>
                    <i className="bi bi-dot"></i>{" "}
                    {t("landing.founder5K.list.valueTrade")}
                  </strong>
                  <br /> {t("landing.founder5K.list.valueTradeDesc")}
                </li>
              </ul>
            </div>
          </div>

          <div
            className="d-flex justify-content-center"
            style={{ maxWidth: "700px", width: "100%" }}
          >
            <img
              src={tier5kImage || GoldHeartCard}
              alt="Golden Card"
              className="img-fluid"
              style={{
                maxHeight: "700px",
                width: "100%",
                height: "auto",
                maxWidth: "100%",
                objectFit: "contain",
              }}
            />
          </div>
        </div>
      </div>

      <div
        className="position-relative w-100 py-5"
        style={{ backgroundColor: "#080C12", overflow: "hidden" }}
      >
        <div>
          <img
            src={Ellipse}
            alt="Decoration"
            className="position-absolute d-none d-md-block"
            style={{ top: 0, left: 0, zIndex: 0 }}
          />
          <img
            src={Ellipse2}
            alt="Decoration"
            className="position-absolute d-none d-md-block"
            style={{ bottom: 0, right: 0, zIndex: 0 }}
          />

          <div>
            <h1
              className="text-center display-1 px-3"
              style={{
                fontFamily: "Krona One, sans-serif",
                background: "linear-gradient(to right, #D5A554, #E79710)",
                WebkitBackgroundClip: "text",
                color: "transparent",
                fontSize: "clamp(2rem, 5vw, 4rem)",
                lineHeight: "1.2",
                wordBreak: "break-word",
                marginBottom: "2rem",
              }}
            >
              {t("landing.collections.title")}
            </h1>
            <div className="container">
              <div className="row justify-content-center">
                {tiers.map(
                  ({
                    tier,
                    data,
                    cmId,
                    collectionMint,
                    authority,
                    version,
                  }) => (
                    <div key={tier} className="col-md-4 mb-4">
                      <div
                        style={{
                          background: "transparent",
                          border: "1px solid rgba(255,255,255,0.1)",
                          borderRadius: "12px",
                          padding: "15px",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          height: "100%",
                          position: "relative",
                          zIndex: 1,
                        }}
                      >
                        <div
                          style={{
                            width: "100%",
                            height: "240px",
                            overflow: "hidden",
                            borderRadius: "10px",
                            position: "relative",
                            zIndex: 1,
                          }}
                        >
                          <video
                            src={data.animation_url}
                            autoPlay
                            muted
                            noFullscreen
                            loop
                            playsInline
                            controlsList="nofullscreen"
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "contain",
                              backgroundColor: "rgba(0,0,0,0.2)",
                              position: "relative",
                              zIndex: 1,
                            }}
                          />
                        </div>
                        <div
                          className="mt-3 w-100"
                          style={{ position: "relative", zIndex: 2 }}
                        >
                          <h5 className="text-center text-white mb-3">
                            {t("landing.header.level")} {tier}
                          </h5>
                          <Button
                            className="btn w-100"
                            style={{
                              background:
                                "linear-gradient(to right, #FFF69F, #D5A554)",
                              border: "none",
                              color: "#000",
                              fontWeight: "bold",
                              borderRadius: "8px",
                              fontSize: "14px",
                              padding: "8px 0",
                              cursor: "pointer",
                              position: "relative",
                              zIndex: 2,
                            }}
                            onClick={() => handleMint(tier)}
                          >
                            {t("dashboard.mint")}
                          </Button>
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="position-relative w-100 d-flex flex-column justify-content-center align-items-center"
        style={{
          minHeight: "100vh",
          backgroundColor: "#080C12",
          overflow: "hidden",
          padding: "20px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            width: "90%",
            maxWidth: "1200px",
            height: "60vh",
            position: "relative",
            zIndex: 1,
            margin: "auto",
          }}
        >
          <video
            playsInline
            controls
            autoPlay
            muted
            loop
            crossOrigin="anonymous"
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "8px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
              objectFit: "cover",
            }}
          >
            <source src={videoSrc} type="video/mp4" crossOrigin="anonymous" />
            Your browser does not support the video tag.
          </video>
        </div>

        <img
          src={Ellipse3}
          alt="Decoration"
          className="position-absolute d-none d-md-block"
          style={{
            top: 0,
            right: 0,
            zIndex: 0,
            maxWidth: "100%",
            height: "auto",
          }}
        />
        <img
          src={Ellipse4}
          alt="Decoration"
          className="position-absolute d-none d-md-block"
          style={{
            top: 0,
            left: 0,
            zIndex: 0,
            maxWidth: "100%",
            height: "auto",
          }}
        />
      </div>

      <div
        className="container-fluid py-4 py-md-5"
        style={{
          backgroundColor: "#080C12",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <img
          src={Ellipse}
          alt="Decoration"
          className="position-absolute d-none d-md-block"
          style={{ top: -250, left: 0, zIndex: 0 }}
        />
        <div className="px-5">
          <PolaroidCardGrid />
        </div>

        <hr
          style={{
            width: "90%",
            height: "4px",
            border: "none",
            borderRadius: "2px",
            background: "linear-gradient(to right, #E79710, #FFD36E)",
            margin: "3rem auto 2rem auto",
          }}
        />

        <div className="text-center text-white px-3">
          <p
            style={{
              fontSize: "1rem",
              maxWidth: "800px",
              margin: "0 auto 1.5rem auto",
            }}
          >
            {t("landing.footer.description")}
          </p>

          <div
            className="d-flex justify-content-center align-items-center mb-3 gap-3 flex-wrap"
            style={{ fontSize: "clamp(1rem, 5vw, 1.5rem)" }}
          >
            <a
              href="https://x.com/lunafounder1"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="bi bi-twitter-x"></i>
            </a>
            <a
              href="https://www.tiktok.com/@lunafounder"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="bi bi-tiktok"></i>
            </a>
            <a
              href="https://www.instagram.com/lunafounder.io/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="bi bi-instagram"></i>
            </a>
          </div>

          <p className="mb-1" style={{ fontSize: "0.95rem" }}>
            {t("landing.footer.copyright")}
          </p>

          <div
            className="d-flex justify-content-center align-items-center gap-4"
            style={{ fontSize: "0.9rem" }}
          >
            <a href="/agb" className="text-white text-decoration-none">
              {t("landing.footer.tos")}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
