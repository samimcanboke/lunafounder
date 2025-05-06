import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
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
import NFTCarousel from "../components/Components/nft-carousel";
import GoldPaperPlane from "../../images/Gold-PaperPlane.png";
import PolaroidCardGrid from "../components/Components/landing-cards";
import useUserAllNftsStore from "../../store/userAllNfts";
import { useNavigate } from "react-router-dom";
import { useWallet } from "@solana/wallet-adapter-react";
import { useDispatch } from "react-redux";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [expandedCard, setExpandedCard] = useState(null);
  const [tiers, setTiers] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { publicKey, connected } = useWallet();
  const [nfts, setNfts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleMint = (tier) => {
    console.log("Mint clicked for tier:", tier);
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

  const tierConfigs = [
    {
      tier: "50",
      url: "https://arweave.net/jGeiZZeBPyn9iBhpc3gcl2lDV2FpgOAn84a0jMztJuk",
      cmId: "8Pg2oEwTPaf2yZHhmsLQ3pwKP6LY7AgZjhGUubfrSxYW",
      authority: "Bq2WXh3cC1E2LmWCfBKHHqU8bTdFHVivUsmP2GtVQ56N",
      collectionMint: "2hikvwP1MrQaT15kFcLW2sieLsnHErjWFhTUt7HiXG5m",
      version: 2,
      col: "2hikvwP1MrQaT15kFcLW2sieLsnHErjWFhTUt7HiXG5m",
    },
    {
      tier: "100",
      url: "https://gateway.irys.xyz/8CrQdAHs550iRiRBNuPHJjiskKrGye4r5gAc1-kjMQ8",
      cmId: "4LrQkwD4owXkEmmgKNvo5CWKUmmAjSCAdxXQe1hAyWVd",
      col: "4WxnmG5xNDqeFnrotL7WYQF9JfAdYyszNZnY6eEKipBe",
      authority: "Bq2WXh3cC1E2LmWCfBKHHqU8bTdFHVivUsmP2GtVQ56N",
      collectionMint: "4WxnmG5xNDqeFnrotL7WYQF9JfAdYyszNZnY6eEKipBe",
      version: 2,
    },
    {
      tier: "500",
      url: "https://gateway.irys.xyz/KalP9TAyiHF3Egwnmc60pGdH7slwoVq_k5e_if2UQPE",
      cmId: "CspHh5wjUMesEH6QkAb8HA6EjbXYXzTGxdqK9vewwJc3",
      col: "H28aTJzDy7Nka1s18nqHL78g2J7mUTbt4b8vPbY9cQJT",
    },
    {
      tier: "1000",
      url: "https://gateway.irys.xyz/vxuwQHmCMsMT7q5IXL31uRjLJjp526raq1PLK6kCRKc",
      cmId: "8gmAnr1Z6hXHrc4eUccGtroZZRGCrAJSvkBN8ZKqo9cd",
      col: "64dF39heZJUq4nZsHhTWcJYD89aFGauL6pCjbBZqQ5Bq",
    },
    {
      tier: "5000",
      url: "https://gateway.irys.xyz/INZJmYW1wSmdeE6gic_stc9PDmmuVXrAKeGJcriNQno",
      cmId: "AB8YhJmpJ65DVUjo51AysvYy9eittb4ymjFGSvSkWTjy",
      col: "Foq4TxJ1VieMAnGE8oHNGdXQPtWZeYrRQeN1ZE7vhw1j",
    },
    {
      tier: "10000",
      url: "https://gateway.irys.xyz/K3nf8DFlt8zxc6XH_Ar5VdPgRuc8c6_yYNoLnMWzrno",
      cmId: "ECkxtfx2dDCbQYtdu8G8EgiSBCt2y78Bkc7jVGorCF4z",
      col: "E48RNxzJwyWh3AQ1BK1Jn7xyNrJ43SMYoojZ14dqUW9G",
    },
    {
      tier: "25000",
      url: "https://gateway.irys.xyz/7nEBt5MZir9qSgDB77Qri1fyTI38RnDwwMpbkQk4xK8",
      cmId: "5dQMTBu1r1kAcnLZy24N8o4kuUdaCK6yTWjEQYuYbrcm",
      col: "A6cPDCRUY7JgxfS66M5ifzkwn5WNSE1ZWcJg6QKX6DtA",
    },
    {
      tier: "50000",
      url: "https://gateway.irys.xyz/_3-eahwCSzpA7dRVtnuFdVbc3dsdB7GPYI4yheRDqM4",
      cmId: "676M8JsXGR1sZJnf7ZaZgGk2FPdiCBM8bzkncUo7k6Y3",
      col: "7pLEZa1PrAjdzDapjdRJgjATffPUPJuWjhkneUUbQVtk",
    },
  ];

  const fetchTierData = async () => {
    const result = [];
    for (let config of tierConfigs) {
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

  useEffect(() => {
    fetchTierData();
  }, []);

  const { allNfts, fetchAllNfts } = useUserAllNftsStore();
  useEffect(() => {
    fetchAllNfts();
  }, [fetchAllNfts]);

  const nftImages = Object.values(allNfts || {})
    .map((n) => n.metadata?.animation_url || n.metadata?.image)
    .filter(Boolean)
    .slice(0, 5);

  const cards = [
    {
      image: GoldWallet,
      title: "HERUNTERLADEN",
      subtitle: "PHANTOM WALLET",
      content:
        "Laden Sie die Phantom Wallet herunter, um Ihre Krypto-Assets sicher zu speichern und zu verwalten. Verbinden Sie sie mit unserer Plattform für nahtlose Transaktionen und Belohnungsverfolgung.",
    },
    {
      image: GoldenClover,
      title: "REGISTRIERUNG",
      subtitle: "FÜR LUNA CASINO",
      content:
        "Erstellen Sie Ihr Konto mit dem Empfehlungscode. Erhalten Sie sofortigen Zugang zu exklusiven Boni und erkunden Sie die Welt von Luna Casino.",
    },
    {
      image: GoldNFT,
      title: "KAUF EINES",
      subtitle: "NFT",
      content:
        "Kaufen Sie limitierte LunaFounder NFTs, um erweiterte Funktionen freizuschalten und monatliche Belohnungen zu erhalten. Erlangen Sie digitales Eigentum an LunaCasino und werden Sie Teil einer wachsenden Web3-Community auf Solana.",
    },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

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
              <a
                href="#how"
                className="text-white text-decoration-none fw-medium"
              >
                So funktioniert's
              </a>
              <a
                href="#buy"
                className="text-white text-decoration-none fw-medium"
              >
                Gründer-Minten
              </a>
              <a
                href="https://lunacasino.io/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white text-decoration-none fw-medium"
              >
                Casino
              </a>
              <a
                href="/faq"
                className="text-white text-decoration-none fw-medium"
              >
                FAQ
              </a>
            </nav>

            <div className="d-none d-md-flex align-items-center gap-2">
              <Button variant="" href="/login" size="sm" className="text-white">
                Log In
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
                Registrieren
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
                  href="#how"
                  className="text-white text-decoration-none fw-medium"
                  onClick={toggleMenu}
                >
                  So funktioniert's
                </a>
                <a
                  href="#buy"
                  className="text-white text-decoration-none fw-medium"
                  onClick={toggleMenu}
                >
                  Kaufen
                </a>
                <a
                  href="#sell"
                  className="text-white text-decoration-none fw-medium"
                  onClick={toggleMenu}
                >
                  Verkaufen
                </a>
                <a
                  href="#casino"
                  className="text-white text-decoration-none fw-medium"
                  onClick={toggleMenu}
                >
                  Casino
                </a>
                <a
                  href="#lotto"
                  className="text-white text-decoration-none fw-medium"
                  onClick={toggleMenu}
                >
                  Lotto
                </a>
              </nav>
              <div className="d-flex gap-2 mt-3">
                <Button
                  variant=""
                  href="/login"
                  size="sm"
                  className="text-white flex-grow-1"
                >
                  Log In
                </Button>
                <Button
                  className="text-white border-0 flex-grow-1"
                  href="/register"
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, #FFF69F, #D5A554)",
                    color: "#000",
                  }}
                >
                  Registrieren
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
                  Willkommen <br />
                  bei{" "}
                  <span
                    style={{
                      background: "linear-gradient(to right, #FFD36E, #E79710)",
                      WebkitBackgroundClip: "text",
                      color: "transparent",
                    }}
                  >
                    Luna Gründer
                  </span>
                </h1>

                <h2
                  className="h4 fw-lighter mb-3 display-6 d-block d-md-none"
                  style={{
                    fontStyle: "italic",
                    fontSize: "clamp(1rem, 2vw, 1.5rem)",
                  }}
                >
                  Ihr Zugang <br />
                  NFTs und Online-Glücksspiel!
                </h2>

                <h2
                  className="h4 fw-lighter mb-3 display-6 d-none d-md-block"
                  style={{
                    fontStyle: "italic",
                    fontSize: "clamp(3rem, 2vw, 1.5rem)",
                  }}
                >
                  Ihr Zugang <br />
                  NFTs und Online-Glücksspiel!
                </h2>

                <p
                  className="mb-4 fs-5"
                  style={{ fontSize: "clamp(1rem, 2vw, 1.25rem)" }}
                >
                  Jetzt registrieren
                </p>
                <div className="d-flex gap-3 justify-content-center justify-content-md-start">
                  <Button
                    style={{
                      backgroundImage:
                        "linear-gradient(to right, #FFF69F, #D5A554)",
                      color: "#000",
                      border: "none",
                    }}
                  >
                    Registrieren
                  </Button>
                  <Button className="text-decoration-underline" variant="">
                    So funktioniert's
                  </Button>
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
                      Geschütztes <br /> Zahlungsgateway
                    </p>
                  </div>

                  <div className="d-flex gap-2 align-items-center">
                    <img
                      height={48}
                      src={GoldDiamond}
                      alt="gold-diamond"
                      style={{ height: "clamp(32px, 5vw, 48px)" }}
                    />
                    <p className="m-0">
                      Einfache <br /> Plattformnutzung
                    </p>
                  </div>

                  <div className="d-flex gap-2 align-items-center">
                    <img
                      height={48}
                      src={GoldHeart}
                      alt="gold-heart"
                      style={{ height: "clamp(32px, 5vw, 48px)" }}
                    />
                    <p className="m-0">
                      Schnelle <br /> Banküberweisung
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
                    zIndex: 2,
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
          <h1
            className="display-4 mb-3"
            style={{
              fontFamily: "Krona One, sans-serif",
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              lineHeight: "1.2",
            }}
          >
            Ihr Einstieg
          </h1>
          <h6
            className="fw-light mx-auto"
            style={{
              maxWidth: "600px",
              fontSize: "clamp(0.875rem, 2vw, 1.25rem)",
            }}
          >
            Laden Sie Phantom herunter, kaufen Sie Solana (SOL) und minten Sie
            Ihr erstes NFT - schnell und einfach!
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
                  <h3 className="h4 mb-3">
                    Phantom Wallet installieren & einrichten
                  </h3>
                  <p className="mb-0 fw-light">
                    Installieren Sie die Phantom Wallet für Solana
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
                  <h3 className="h4 mb-3">Solana (SOL) kaufen</h3>
                  <p className="mb-0 fw-light">
                    Kaufen Sie Solana für Ihre Transaktionen
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
                  <h3 className="h4 mb-3">NFTs prägen</h3>
                  <p className="mb-0 fw-light">
                    Erstellen Sie Ihre eigenen NFTs auf der Solana-Blockchain
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
                  <h3 className="h4 mb-3">Passives Einkommen generieren</h3>
                  <p className="mb-0 fw-light">
                    Verdienen Sie passives Einkommen durch unsere Plattform
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
              Luna Gründer 5K
            </h1>
            <div
              className="text-white text-start"
              style={{
                fontSize: "clamp(1rem, 2vw, 1rem)",
                lineHeight: "1.6",
                fontFamily: "Roboto, sans-serif",
              }}
            >
              <p>
                <strong>Ihre Vorteile:</strong>
              </p>
              <ul className="ps-3" style={{ listStyleType: "disc" }}>
                <li className="mb-3">
                  <strong>
                    <i class="bi bi-dot"></i> 15% Profitshare von LunaCasino
                  </strong>
                  <br />
                  Erhalten Sie 15% der Gewinne von LunaCasino als passives
                  Einkommen
                </li>
                <li className="mb-3">
                  <strong>
                    <i class="bi bi-dot"></i> Automatische Lotto-Tickets
                  </strong>
                  <br />
                  Automatische Teilnahme an unseren Lotto-Ziehungen
                </li>
                <li className="mb-3">
                  <strong>
                    <i class="bi bi-dot"></i> Streamline Power
                  </strong>
                  <br />
                  Erhöhte Gewinnchancen und exklusive Boni
                </li>
                <li className="mb-3">
                  <strong>
                    <i class="bi bi-dot"></i> Exklusive Zugänge
                  </strong>
                  <br />
                  Zugang zu exklusiven Events und Angeboten
                </li>
                <li className="mb-3">
                  <strong>
                    <i class="bi bi-dot"></i> Wertentwicklung & Handel
                  </strong>
                  <br />
                  Potenzielle Wertsteigerung und Handel Ihrer NFTs
                </li>
              </ul>
            </div>
          </div>

          <div
            className="d-flex justify-content-center"
            style={{ maxWidth: "700px", width: "100%" }}
          >
            <img
              src={GoldHeartCard}
              alt="Golden Card"
              className="img-fluid"
              style={{
                maxHeight: "700px",
                width: "auto",
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
              LUNA FOUNDER KOLLEKTIONEN
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
                            Stufe {tier}
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
                            Minten
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
            width="100%"
            height="100%"
            controls
            autoPlay
            muted
            loop
            crossOrigin="anonymous"
            style={{
              borderRadius: "8px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
              objectFit: "cover",
            }}
          >
            <source
              src="https://api.lunafounder.io/lunavideo.mp4"
              type="video/mp4"
              crossOrigin="anonymous"
            />
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
            Luna Lotto und Luna Casino sind innovative Plattformen, die die
            Welten des Online-Glücksspiels und der Blockchain-Technologie
            zusammenführen.
          </p>

          <div
            className="d-flex justify-content-center align-items-center mb-3 gap-3"
            style={{ fontSize: "1.5rem" }}
          >
            <i className="bi bi-facebook"></i>
            <i class="bi bi-twitter"></i>
            <i className="bi bi-instagram"></i>
          </div>

          <p className="mb-1" style={{ fontSize: "0.95rem" }}>
            © 2025 Copyright Lunalotto. Alle Rechte vorbehalten
          </p>

          <div
            className="d-flex justify-content-center align-items-center gap-4"
            style={{ fontSize: "0.9rem" }}
          >
            <a href="/agb" className="text-white text-decoration-none">
              Allgemeine Geschäftsbedingungen (AGB)
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
