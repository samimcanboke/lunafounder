import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import ReactCountryFlag from "react-country-flag";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import logo from "../../images/logo_luna.png";
import loginbg from "../../images/bg_login.png";
import google from "../../images/google-logo.png";
import {
  UserOutlined,
  MailOutlined,
  LockOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import TextInput from "../components/custom/text-input";
import Button from "../components/custom/button";
import Loader from "../pages/Loader/Loader";
import {
  loadingToggleAction,
  signupAction,
} from "../../store/actions/AuthActions";
import {
  handleReferral,
  getReferralFromCookies,
} from "../../utils/referralHandler";

function Register(props) {
  const { t, i18n } = useTranslation();
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const languages = [
    { code: "en", country: "GB" },
    { code: "de", country: "DE" },
  ];

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [referralCode, setReferralCode] = useState("");
  let errorsObj = { email: "", password: "", username: "" };
  const [errors, setErrors] = useState(errorsObj);
  const [password, setPassword] = useState("");
  const [searchParams] = useSearchParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    handleReferral();
    const referralFromCookies = getReferralFromCookies();
    if (referralFromCookies) {
      setReferralCode(referralFromCookies);
    }
  }, []);

  function onSignUp(e) {
    e.preventDefault();
    // console.log("Form submitted with:", {
    //   email,
    //   password,
    //   username,
    //   referralCode,
    // });

    let error = false;
    const errorObj = { ...errorsObj };

    if (username === "") {
      errorObj.username = t("registrationPage.validationUsernameRequired");
      error = true;
    }

    if (email === "") {
      errorObj.email = t("registrationPage.validationEmailRequired");
      error = true;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errorObj.email = t("registrationPage.validationEmailInvalid");
      error = true;
    }

    if (password === "") {
      errorObj.password = t("registrationPage.validationPasswordRequired");
      error = true;
    } else if (password.length < 6) {
      errorObj.password = t("registrationPage.validationPasswordMin", {
        count: 6,
      });
      error = true;
    }

    setErrors(errorObj);

    if (error) {
      // console.log("Form validation errors:", errorObj);
      return;
    }

    const termsCheckbox = document.getElementById("terms_checkbox");
    if (!termsCheckbox.checked) {
      setErrors({
        ...errorObj,
        terms: t("registrationPage.validationTermsRequired"),
      });
      return;
    }

    // console.log("Dispatching signup action with:", {
    //   email,
    //   password,
    //   username,
    //   by: referralCode,
    // });
    dispatch(loadingToggleAction(true));
    dispatch(signupAction(email, password, username, navigate, referralCode));

    // Form alanlarını sıfırla
    setEmail("");
    setUsername("");
    setPassword("");
    setReferralCode("");
    setErrors(errorsObj);
  }

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
              countryCode={
                languages.find((l) => l.code === i18n.language).country
              }
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
                    {props.showLoading && <Loader />}
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
                          {t("registrationPage.createAccountTitle")}
                        </h3>
                        <p
                          className="fs-6 text-white"
                          style={{
                            fontSize: "14px", // Adjust font size for smaller screens
                          }}
                        >
                          {t("registrationPage.createAccountSubtitle")}
                        </p>
                      </div>
                      {props.errorMessage && (
                        <div
                          className="bg-red-300 text-danger border border-red-900 p-1 my-2"
                          style={{
                            fontSize: "12px", // Adjust font size for error messages
                          }}
                        >
                          {props.errorMessage}
                        </div>
                      )}
                      {props.successMessage && (
                        <div
                          className="bg-green-300 text-danger text-green-900 p-1 my-2"
                          style={{
                            fontSize: "12px", // Adjust font size for success messages
                          }}
                        >
                          {props.successMessage}
                        </div>
                      )}
                      <form onSubmit={onSignUp}>
                        <div className="form-group mb-3">
                          <TextInput
                            icon={<UserOutlined />}
                            placeholder={t(
                              "registrationPage.placeholderUsername"
                            )}
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            name="username"
                          />
                          {errors.username && (
                            <div
                              className="text-danger"
                              style={{
                                fontSize: "10px", // Adjust font size for error messages
                              }}
                            >
                              {errors.username}
                            </div>
                          )}
                        </div>
                        <div className="form-group mb-3">
                          <TextInput
                            icon={<MailOutlined />}
                            placeholder={t("registrationPage.placeholderEmail")}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            name="email"
                            type="email"
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
                            placeholder={t(
                              "registrationPage.placeholderPassword"
                            )}
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
                        {referralCode && (
                          <div className="form-group mb-3">
                            <TextInput
                              icon={<UsergroupAddOutlined />}
                              placeholder={t(
                                "registrationPage.referralWithCode",
                                { referral: referralCode }
                              )}
                              value={t("registrationPage.referralWithCode", {
                                referral: referralCode,
                              })}
                              readOnly
                              name="referral"
                            />
                          </div>
                        )}
                        <div className="form-row d-flex justify-content-between align-items-center mt-4 mb-2">
                          <div className="form-group mb-0 d-flex align-items-center">
                            <div className="form-check custom-checkbox mb-0 d-flex align-items-center">
                              <input
                                type="checkbox"
                                className="form-check-input"
                                id="terms_checkbox"
                                style={{ marginRight: "8px" }} // Add spacing between checkbox and label
                              />
                              <Link
                                to="/agb"
                                className="cursor-pointer"
                                style={{
                                  fontSize: "10px", // Adjust font size for smaller screens
                                  textDecoration: "underline", // Add underline to text
                                }}
                              >
                                {t("registrationPage.checkboxTerms")}
                              </Link>
                            </div>
                          </div>
                        </div>
                        <div className="text-center">
                          <Button
                            type="submit"
                            htmlType="submit"
                            className="btn-block"
                            style={{
                              fontSize: "14px", // Adjust button font size
                              padding: "10px 20px", // Adjust button padding
                            }}
                          >
                            {t("registrationPage.signUpButton")}
                          </Button>
                        </div>
                      </form>
                      {/* <div
                        className="google-box text-center my-1"
                        style={{
                          marginTop: "20px", // Add margin for spacing
                        }}
                      >
                        <div className="d-flex align-items-center justify-content-center">
                          <span
                            className="px-3 text-muted fs-10 text-white text-center"
                            style={{
                              fontSize: "12px", // Adjust font size for smaller screens
                            }}
                          >
                            {t("registrationPage.orSignUpWith")}
                          </span>
                        </div>
                        <button
                          className="btn d-flex align-items-center justify-content-center w-100"
                          style={{
                            padding: "10px", // Adjust button padding
                          }}
                        >
                          <img
                            src={google}
                            alt="Google"
                            style={{
                              width: "44px",
                              marginRight: "10px",
                            }}
                          />
                        </button>
                      </div> */}
                      <div className="text-center">
                        <p
                          className="text-white"
                          style={{
                            fontSize: "12px", // Adjust font size for smaller screens
                          }}
                        >
                          {t("registrationPage.haveAccount")}&nbsp;
                          <Link to="/login">
                            <span className="text-primary">
                              {t("registrationPage.signIn")}
                            </span>
                          </Link>
                        </p>
                      </div>
                    </div>
                    {/* end of auth-form-1 */}
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

const mapStateToProps = (state) => {
  return {
    errorMessage: state.auth.errorMessage,
    successMessage: state.auth.successMessage,
    showLoading: state.auth.showLoading,
  };
};

export default connect(mapStateToProps, { loadingToggleAction })(Register);
