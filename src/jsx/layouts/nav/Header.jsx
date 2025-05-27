import React, { useEffect, useState } from "react";
import ReactCountryFlag from "react-country-flag";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import LogoutPage from "./Logout";
import { Dropdown, Modal, Button } from "react-bootstrap";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";
import useUserStore from "../../../store/userStore";

const Header = ({ onNote, toggle, onProfile, onNotification, onClick }) => {
  const { t, i18n } = useTranslation();
  const { publicKey, connected } = useWallet();
  const { setWallet, user, wallet, walletSet } = useUserStore();
  const [showMismatchModal, setShowMismatchModal] = useState(false);
  const [walletAddress, setWalletAddress] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState("en"); // Track selected language

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setSelectedLanguage(lng); // Update selected language
  };

  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a
      href="/"
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
      className="nav-link dz-theme-mode active"
      style={{ display: "flex", alignItems: "center" }}
    >
      {children}
    </a>
  ));
  const token = localStorage.getItem("token");
  const username = JSON.parse(atob(token.split(".")[1]))?.username;

  useEffect(() => {
    if (connected && publicKey && token) {
      const detectedWalletAddress = publicKey.toBase58();
      setWalletAddress(detectedWalletAddress);

      // Sadece mismatch varsa modal açılır, otomatik setWallet yapılmaz
      if (user?.wallet && user.wallet !== detectedWalletAddress) {
        setShowMismatchModal(true);
      }
      // else kısmı kaldırıldı, otomatik setWallet yapılmıyor
    }
  }, [connected, publicKey, token, user]);

  // Modalda evet: adapter adresini setWallet ile gönder
  const handleMismatchYes = async () => {
    if (connected && publicKey) {
      const address = publicKey.toBase58();
      await setWallet(address);
      setShowMismatchModal(false);
    }
  };

  // Modalda hayır: sadece modalı kapat
  const handleMismatchNo = () => {
    setShowMismatchModal(false);
  };

  return (
    <div className="header" style={{ zIndex: "4" }}>
      <div className="header-content">
        <nav className="navbar navbar-expand">
          <div className="collapse navbar-collapse justify-content-between">
            <div className="header-left"></div>
            <ul
              className="navbar-nav header-right"
              style={{ flexDirection: "row", alignItems: "center" }}
            >
              <li className="nav-item dropdown notification_dropdown mt-2">
                {username}
              </li>


           {/* wallet multi buton yoruma alındı */}
              {/* hide on mobile, show on lg+ */}
              <li className="nav-item dropdown notification_dropdown d-none d-lg-block mt-lg-5">
                <WalletMultiButton
                  className="wallet-btn-connect"
                  style={{
                    backgroundColor: "#24292d",
                    color: "#fff",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                />
              </li>

              {/* hide on mobile, show on lg+ */}
              <li className="nav-item dropdown d-none d-lg-block mt-lg-5">
                <Dropdown>
                  <Dropdown.Toggle as={CustomToggle}>
                    <ReactCountryFlag
                      countryCode={selectedLanguage === "en" ? "US" : "DE"} // Show selected flag
                      svg
                      style={{
                        width: "1.25em", // Ensure consistent size
                        height: "1.25em", // Ensure consistent size
                        display: "inline-block", // Prevent layout shifts
                        verticalAlign: "middle", // Align properly
                      }}
                    />
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item
                      className="d-flex justify-content-start align-items-center"
                      onClick={() => changeLanguage("en")}
                    >
                      <ReactCountryFlag
                        countryCode="US"
                        svg
                        style={{
                          width: "1em",
                          height: "1em",
                          marginRight: "0.5em",
                        }}
                      />
                      {t("header.language.en")}
                    </Dropdown.Item>
                    <Dropdown.Item
                      className="d-flex justify-content-start align-items-center"
                      onClick={() => changeLanguage("de")}
                    >
                      <ReactCountryFlag
                        countryCode="DE"
                        svg
                        style={{
                          width: "1em",
                          height: "1em",
                          marginRight: "0.5em",
                        }}
                      />
                      {t("header.language.de")}
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </li>

              {/* hide on mobile, show on lg+ */}
              <li className="nav-item dropdown d-none d-lg-block mt-lg-5">
                <Dropdown>
                  <Dropdown.Toggle as={CustomToggle}>
                    <i
                      className="bi bi-list"
                      style={{ fontSize: "1.25rem" }}
                    ></i>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item className="d-flex justify-content-start align-items-center ">
                      <Link
                        to="/my-ref-profile"
                        className="dropdown-item ai-icon"
                      >
                        <i className="bi bi-person"></i>
                        <span className="ms-2">{t("header.profile")}</span>
                      </Link>
                    </Dropdown.Item>
                    <Dropdown.Item className="d-flex justify-content-start align-items-center ">
                      <LogoutPage>{t("header.logout")}</LogoutPage>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </li>

              {/* mobile-only hamburger menu */}
              <li className="nav-item dropdown d-lg-none">
                <Dropdown>
                  <Dropdown.Toggle as={CustomToggle}>
                    <i
                      className="bi bi-list"
                      style={{ fontSize: "1.25rem" }}
                    ></i>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item className="d-flex justify-content-start align-items-center ">
                      <WalletMultiButton
                        className="wallet-btn-connect"
                        style={{
                          backgroundColor: "#24292d",
                          color: "#fff",
                          borderRadius: "5px",
                          padding: "8px 16px",
                          cursor: "pointer",
                        }}
                      />
                    </Dropdown.Item>
                    <Dropdown.Item
                      className="d-flex justify-content-start align-items-center "
                      onClick={() => changeLanguage("en")}
                    >
                      <ReactCountryFlag
                        countryCode="US"
                        svg
                        style={{
                          width: "1em",
                          height: "1em",
                          marginRight: "0.5em",
                        }}
                      />
                      {t("header.language.en")}
                    </Dropdown.Item>
                    <Dropdown.Item
                      className="d-flex justify-content-start align-items-center "
                      onClick={() => changeLanguage("de")}
                    >
                      <ReactCountryFlag
                        countryCode="DE"
                        svg
                        style={{
                          width: "1em",
                          height: "1em",
                          marginRight: "0.5em",
                        }}
                      />
                      {t("header.language.de")}
                    </Dropdown.Item>
                    <Dropdown.Item className="d-flex justify-content-start align-items-center ">
                      <Link
                        to="/my-ref-profile"
                        className="dropdown-item ai-icon"
                      >
                        <i className="bi bi-person"></i>
                        <span className="ms-2">{t("header.profile")}</span>
                      </Link>
                    </Dropdown.Item>
                    <Dropdown.Item className="d-flex justify-content-start align-items-center ">
                      <LogoutPage>{t("header.logout")}</LogoutPage>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </li>
            </ul>
          </div>
        </nav>
      </div>

      {/* Modal for wallet mismatch */}
      {/* <Modal
        show={showMismatchModal}
        onHide={handleMismatchNo}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>{t("wallet.mismatchTitle")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {t("wallet.mismatchMessage", {
            userWallet: user?.wallet,
            detectedWallet: walletAddress,
          })}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleMismatchNo}>
            {t("wallet.dismiss")}
          </Button>
          <Button variant="primary" onClick={handleMismatchYes}>
            {t("wallet.confirm")}
          </Button>
        </Modal.Footer>
      </Modal> */}
    </div>
  );
};

export default Header;
