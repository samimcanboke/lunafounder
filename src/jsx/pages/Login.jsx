import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { usePrivy } from "@privy-io/react-auth";
import useAuthStore from "../../store/authStore";
import { useTranslation } from "react-i18next";
import ReactCountryFlag from "react-country-flag";
import logo from "../../images/logo_luna.png";
import loginbg from "../../images/bg_login.png";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import TextInput from "../components/custom/text-input";
import Button from "../components/custom/button";

function Login() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { login: privyLogin, authenticated, getAccessToken } = usePrivy();
  const { login, verifyToken, isAuthenticated, loading, error } =
    useAuthStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });

  // language dropdown state
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const languages = [
    { code: "en", country: "GB" },
    { code: "de", country: "DE" },
  ];

  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let hasError = false;
    const errObj = { email: "", password: "" };

    if (!email) {
      errObj.email = t("loginPage.errorEmailRequired");
      hasError = true;
    }
    if (!password) {
      errObj.password = t("loginPage.errorPasswordRequired");
      hasError = true;
    }
    setErrors(errObj);
    if (hasError) return;

    const result = await login(email, password);
    if (!result.success) {
      setErrors({
        ...errObj,
        email: result.error || t("loginPage.authFailed"),
      });
    }
  };

  const handlePrivyLogin = async () => {
    try {
      // console.log("Starting Privy login process...");

      // First, ensure we're authenticated with Privy
      if (!authenticated) {
        // console.log("Not authenticated, initiating Privy login...");
        await privyLogin();
        // console.log("Privy login initiated, waiting for completion...");
        // Wait for authentication to complete
        await new Promise((resolve) => setTimeout(resolve, 3000));
      }

      // console.log("Attempting to get Privy token...");
      // Get the access token
      const privyToken = await getAccessToken();
      // console.log("Privy token received:", privyToken ? "Yes" : "No");

      if (!privyToken) {
        // console.log("Token not received, attempting re-authentication...");
        // If token is not available, try to re-authenticate
        await privyLogin();
        // console.log("Re-authentication initiated, waiting...");
        await new Promise((resolve) => setTimeout(resolve, 3000));

        // console.log("Attempting to get token after re-authentication...");
        const newToken = await getAccessToken();
        // console.log("Token after re-authentication:", newToken ? "Yes" : "No");

        if (!newToken) {
          console.error("Failed to get token after re-authentication");
          throw new Error(
            "Failed to get Privy token after re-authentication. Please try again or contact support."
          );
        }

        return await handlePrivyTokenVerification(newToken);
      }

      return await handlePrivyTokenVerification(privyToken);
    } catch (error) {
      console.error("Privy login error details:", error);
      setErrors({ ...errors, email: t("loginPage.authFailed") });
    }
  };

  const handlePrivyTokenVerification = async (token) => {
    try {
      // console.log("Verifying Privy token with backend...");
      const response = await fetch(
        `https://api.lunafounder.io/api/auth/verify-privy`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        }
      );

      // console.log("Backend response status:", response.status);

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Backend verification error:", errorData);
        throw new Error(
          errorData.error || "Failed to verify Privy token with backend"
        );
      }

      const data = await response.json();
      // console.log("Backend verification successful");

      if (data.token) {
        // console.log("Setting auth token...");
        localStorage.setItem("token", data.token);
        await verifyToken();
        navigate("/");
      } else {
        throw new Error("No token received from backend after verification");
      }
    } catch (error) {
      console.error("Token verification error details:", error);
      setErrors({
        ...errors,
        email: t("loginPage.authFailed"),
      });
    }
  };

  return (
    <div
      className="login-main-page"
      style={{
        backgroundImage: `url(${loginbg})`,
        position: "relative",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px", // Add padding for smaller screens
      }}
    >
      {/* language selector */}
      <div style={{ position: "absolute", top: 20, right: 20 }}>
        <div style={{ position: "relative" }}>
          <button
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
            }}
            onClick={() => setLangDropdownOpen(!langDropdownOpen)}
          >
            <ReactCountryFlag
              countryCode={
                languages.find((l) => l.code === i18n.language)?.country
              }
              svg
              style={{ width: 16, height: 16 }}
            />
            <span className="text-white" style={{ marginLeft: 8 }}>
              {i18n.language.toUpperCase()}
            </span>
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
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                overflow: "hidden",
                zIndex: 1000,
              }}
            >
              {languages.map((lang, idx) => (
                <div
                  key={lang.code}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "8px 12px",
                    cursor: "pointer",
                    color: "#fff",
                    borderBottom:
                      idx < languages.length - 1 ? "1px solid #2C2f36" : "none",
                  }}
                  onClick={() => {
                    i18n.changeLanguage(lang.code);
                    setLangDropdownOpen(false);
                  }}
                >
                  <ReactCountryFlag
                    countryCode={lang.country}
                    svg
                    style={{ width: 16, height: 16 }}
                  />
                  <span style={{ marginLeft: 8 }}>
                    {lang.code.toUpperCase()}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div
        className="login-wrapper"
        style={{
          width: "100%",
          maxWidth: "500px", // Restrict max width for responsiveness
          backgroundColor: "rgba(0, 0, 0, 0.5)", // Add background for better readability
          borderRadius: "8px",
          padding: "20px", // Add padding for content
          
        }}
      >
        <div className="login-aside-right">
          <div className="row m-0 justify-content-center h-100 align-items-center">
            <div className="col-12">
              <div className="authincation-content">
                <div className="row no-gutters">
                  <div className="col-12">
                    <div className="auth-form-1">
                      <div className="mb-4 text-center">
                        <img
                          src={logo}
                          alt="logo"
                          className="mb-3 pt-3"
                          style={{
                            maxWidth: "100px",
                            height: "auto",
                          }}
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
                          {t("loginPage.title")}
                        </h3>
                        <p
                          className="fs-6 text-white"
                          style={{
                            fontSize: "14px", // Adjust font size for smaller screens
                          }}
                        >
                          {t("loginPage.subtitle")}
                        </p>
                      </div>
                      {error && (
                        <div
                          className="bg-red-300 text-danger border border-red-900 p-1 my-2"
                          style={{
                            fontSize: "12px", // Adjust font size for error messages
                          }}
                        >
                          {error}
                        </div>
                      )}
                      <form onSubmit={handleSubmit}>
                        <div className="form-group mb-3">
                          <TextInput
                            icon={<MailOutlined />}
                            placeholder={t("loginPage.emailPlaceholder")}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            name="email"
                            type="text"
                          />
                          {errors.email && (
                            <div
                              className="text-danger"
                              style={{
                                fontSize: "10px", // Adjust font size for error messages
                              }}
                            >
                              {errors.email}
                            </div>
                          )}
                        </div>
                        <div className="form-group mb-3">
                          <TextInput
                            icon={<LockOutlined />}
                            placeholder={t("loginPage.passwordPlaceholder")}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            name="password"
                            type="password"
                          />
                          {errors.password && (
                            <div
                              className="text-danger"
                              style={{
                                fontSize: "10px", // Adjust font size for error messages
                              }}
                            >
                              {errors.password}
                            </div>
                          )}
                        </div>
                        <div className="form-group mb-3">
                          <Button
                            type="submit"
                            className="btn btn-primary btn-block"
                            style={{
                              width: "100%",
                              fontSize: "14px", // Adjust button font size
                              padding: "10px 20px", // Adjust button padding
                            }}
                            disabled={loading}
                          >
                            {loading
                              ? t("loginPage.signingIn")
                              : t("loginPage.signIn")}
                          </Button>
                        </div>
                        <div
                          className="form-group text-center"
                          style={{
                            marginTop: "20px", // Add margin for spacing
                          }}
                        >
                          <Link
                            to="/login-existing"
                            className="text-white"
                            style={{
                              fontSize: "12px", // Adjust font size for smaller screens
                            }}
                          >
                            {t("loginPage.oldUser")}
                          </Link>
                        </div>
                        <div
                          className="form-group text-center"
                          style={{
                            marginTop: "10px", // Add margin for spacing
                          }}
                        >
                          <Link
                            to="/forgot-password"
                            className="text-white"
                            style={{
                              fontSize: "12px", // Adjust font size for smaller screens
                            }}
                          >
                            {t("loginPage.forgotPassword")}
                          </Link>
                        </div>
                        <div
                          className="form-group text-center"
                          style={{
                            marginTop: "10px", // Add margin for spacing
                          }}
                        >
                          <span
                            className="text-white"
                            style={{
                              fontSize: "12px", // Adjust font size for smaller screens
                            }}
                          >
                            {t("loginPage.dontHaveAccount")}
                          </span>
                          <Link
                            to="/register"
                            className="text-primary text-nowrap"
                            style={{
                              fontSize: "12px", // Adjust font size for smaller screens
                              marginLeft: "5px",
                            }}
                          >
                            {t("loginPage.signUp")}
                          </Link>
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
    </div>
  );
}

export default Login;
