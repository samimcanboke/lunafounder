import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import useAuthStore from "../../store/authStore";
import TextInput from "../components/custom/text-input";
import Button from "../components/custom/button";
import { Modal } from "antd";
import logo from "../../images/logo_luna.png";
import loginbg from "../../images/bg_login.png";
import { LockOutlined } from "@ant-design/icons";

function ResetPassword() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") || "";

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({ newPassword: "", confirmPassword: "" });
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const { resetPassword, loading } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = { newPassword: "", confirmPassword: "" };
    let hasError = false;

    if (!newPassword) {
      err.newPassword = "Please enter a new password";
      hasError = true;
    }
    if (newPassword !== confirmPassword) {
      err.confirmPassword = "Passwords do not match";
      hasError = true;
    }
    setErrors(err);
    if (hasError) return;

    const result = await resetPassword(token, newPassword);
    if (result.success) {
      setShowSuccessModal(true);
    } else {
      setErrors({ newPassword: result.error });
    }
  };

  const handleModalOk = () => {
    setShowSuccessModal(false);
    navigate("/login");
  };

  return (
    <div className="login-main-page" style={{ backgroundImage: `url(${loginbg})` }}>
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
                          Reset Your Password
                        </h3>
                      </div>
                      <form onSubmit={handleSubmit}>
                        <div className="form-group mb-3">
                          <TextInput
                            icon={<LockOutlined style={{ color: "#fff" }} />}
                            placeholder="New Password"
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            name="newPassword"
                          />
                          {errors.newPassword && (
                            <div
                              className="text-danger"
                              style={{ fontSize: "10px" }}
                            >
                              {errors.newPassword}
                            </div>
                          )}
                        </div>
                        <div className="form-group mb-3">
                          <TextInput
                            icon={<LockOutlined style={{ color: "#fff" }} />}
                            placeholder="Confirm New Password"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            name="confirmPassword"
                          />
                          {errors.confirmPassword && (
                            <div
                              className="text-danger"
                              style={{ fontSize: "10px" }}
                            >
                              {errors.confirmPassword}
                            </div>
                          )}
                        </div>
                        <div className="form-group mb-3">
                          <Button
                            type="submit"
                            className="btn btn-primary btn-block"
                            style={{ width: "100%" }}
                            disabled={loading}
                          >
                            Reset Password
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
        title="Password Reset Successful"
        open={showSuccessModal}
        onOk={handleModalOk}
        onCancel={handleModalOk}
        centered
        footer={[
          <Button
            key="ok"
            type="primary"
            onClick={handleModalOk}
            style={{ width: "100%" }}
          >
            OK
          </Button>,
        ]}
      >
        <p>
          Your password has been reset successfully. Please log in with your new
          password.
        </p>
      </Modal>
    </div>
  );
}

export default ResetPassword;
