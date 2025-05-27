import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import ReactCountryFlag from "react-country-flag";
import { Link, useNavigate } from "react-router-dom";
import { usePrivy } from "@privy-io/react-auth";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import useAuthStore from "../../store/authStore";
import logo from "../../images/logo_luna.png";
import loginbg from "../../images/bg_login.png";
import { MailOutlined } from "@ant-design/icons";
import TextInput from "../components/custom/text-input";
import Button from "../components/custom/button";
import { Modal } from "antd";

function ForgotPassword() {
  const { t, i18n } = useTranslation();
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const languages = [
    { code: "en", country: "GB" },
    { code: "de", country: "DE" },
  ];
  const navigate = useNavigate();
  const { login: privyLogin, authenticated, getAccessToken } = usePrivy();
  const {
    forgotPassword,
    verifyToken,
    isAuthenticated,
    loading,
    error,
  } = useAuthStore();
  const { publicKey, connected } = useWallet();
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({
    email: "",
  });
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (connected && publicKey) {
      setEmail(publicKey.toString());
    }
  }, [connected, publicKey]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let errorFlag = false;
    const errorObj = { email: "" };

    if (!connected) {
      errorObj.email = t("forgotPasswordPage.errorConnectWallet");
      errorFlag = true;
    }

    setErrors(errorObj);
    if (errorFlag) return;

    try {
      const result = await forgotPassword(publicKey.toString());

      if (result.success) {
        setShowSuccessModal(true);
      } else {
        setErrors({ email: result.error });
      }
    } catch (err) {
      setErrors({ email: err.message });
    }
  };

  const handleSuccessModalOk = () => {
    setShowSuccessModal(false);
    navigate("/login");
  };

  return (
    <div
      className="login-main-page"
      style={{ backgroundImage: `url(${loginbg})`, position: "relative" }}
    >
      {/* language selector */}
      <div style={{ position: "absolute", top: 20, right: 20 }}>
        <div style={{ position: "relative" }}>
          <button
            onClick={() => setLangDropdownOpen(!langDropdownOpen)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              color: "#fff",
            }}
          >
            <ReactCountryFlag
              countryCode={languages.find((l) => l.code === i18n.language).country}
              svg
              style={{ width: 16, height: 16 }}
            />
            <span style={{ marginLeft: 8 }}>{i18n.language.toUpperCase()}</span>
          </button>
          {langDropdownOpen && (
            <div
              style={{
                position: "absolute",
                top: "100%",
                right: 0,
                marginTop: "4px",
                backgroundColor: "#1C222A",
                borderRadius: "4px",
                boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                overflow: "hidden",
                zIndex: 1000,
              }}
            >
              {languages.map((lang, idx) => (
                <div
                  key={lang.code}
                  onClick={() => {
                    i18n.changeLanguage(lang.code);
                    setLangDropdownOpen(false);
                  }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "8px 12px",
                    cursor: "pointer",
                    color: "#fff",
                    borderBottom:
                      idx < languages.length - 1 ? "1px solid #2C2f36" : "none",
                  }}
                >
                  <ReactCountryFlag
                    countryCode={lang.country}
                    svg
                    style={{ width: 16, height: 16 }}
                  />
                  <span style={{ marginLeft: 8 }}>{lang.code.toUpperCase()}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="login-wrapper">
        <div className="login-aside-right">
          <div className="row m-0 justify-content-center h-100 align-items-center">
            <div className="col-xl-11 mx-auto">
              <div className="authincation-content">
                <div className="row no-gutters">
                  <div className="col-xl-12">
                    <div className="auth-form-1">
                      <div className="mb-4 text-center">
                        <img
                          src={logo}
                          alt="logo"
                          className="mb-3 pt-5"
                          style={{ maxWidth: "150px", height: "auto" }}
                        />
                        <h3
                          className="mb-1 fs-3"
                          style={{
                            color: "#fff",
                            background:
                              "linear-gradient(to right, #ffd36e, #e89b17)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                          }}
                        >
                          {t("forgotPasswordPage.title")}
                        </h3>
                        <p className="fs-6 text-white">
                          {t("forgotPasswordPage.subtitle")}
                        </p>
                      </div>
                      {error && (
                        <div className="bg-red-300 text-danger border border-red-900 p-1 my-2">
                          {error}
                        </div>
                      )}
                      <form onSubmit={handleSubmit}>
                        <div className="form-group mb-3">
                          <TextInput
                            icon={
                              <MailOutlined
                                style={{ color: connected ? "#fff" : "#fff" }}
                              />
                            }
                            placeholder={t(
                              "forgotPasswordPage.placeholderWalletAddress"
                            )}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            name="email"
                            type="text"
                            disabled={connected}
                            style={{
                              backgroundColor: connected
                                ? "#f5f5f5"
                                : "transparent",
                              color: connected ? "#fff" : "#fff",
                              opacity: connected ? 1 : 1,
                              cursor: connected ? "not-allowed" : "text",
                              borderColor: connected ? "#d9d9d9" : "#fff",
                              "&::placeholder": {
                                color: connected ? "#fff" : "#fff",
                              },
                            }}
                          />
                          {errors.email && (
                            <div
                              className="text-danger"
                              style={{ fontSize: "10px" }}
                            >
                              {errors.email}
                            </div>
                          )}
                        </div>
                        <div className="form-group mb-3">
                          <WalletMultiButton
                            style={{
                              width: "100%",
                              height: "40px",
                              backgroundColor: "#24292d",
                              color: "white",
                              border: "none",
                              borderRadius: "4px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              cursor: "pointer",
                              fontSize: "14px",
                              fontWeight: "500",
                            }}
                          />
                        </div>
                        <div className="form-group mb-3">
                          <Button
                            type="submit"
                            className="btn btn-primary btn-block"
                            style={{ width: "100%" }}
                            disabled={loading || !connected}
                          >
                            {t("forgotPasswordPage.sendResetLink")}
                          </Button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        title={t("forgotPasswordPage.modalTitle")}
        open={showSuccessModal}
        onOk={handleSuccessModalOk}
        onCancel={handleSuccessModalOk}
        centered
        footer={[
          <Button
            key="ok"
            type="primary"
            onClick={handleSuccessModalOk}
            style={{ width: "100%" }}
          >
            {t("forgotPasswordPage.modalOk")}
          </Button>,
        ]}
      >
        <p>{t("forgotPasswordPage.modalMessage")}</p>
      </Modal>
    </div>
  );
}

export default ForgotPassword;
