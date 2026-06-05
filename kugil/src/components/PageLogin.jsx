import { useState } from "react";
import authService from "../Api/authService";
import "../css/LoginPage.css";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/AuthContext";
import  LanguageDropdown  from "../components/lang/LanguagesDropDown";
import "../css/LanguagesDropDown.css";

export default function LoginPage() {
  const navigate = useNavigate();
  const auth = useAuth();
  const [employeeCode, setEmployeeCode] = useState("1admin");
  const [password, setPassword] = useState("123456");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({employeeCode: "", password: ""});
  const { t } = useTranslation("login");

  const handleLogin = async (e) => {
  e.preventDefault();

  let newErrors = {
    employeeCode: "",
    password: ""
  };

  let hasError = false;

  if (!employeeCode.trim()) {
    newErrors.employeeCode = "PleaseEnterYourID";
    hasError = true;
  }

  if (!password.trim()) {
    newErrors.password = "PleaseEnterYourPassword.";
    hasError = true;
  }

  if (password && password.length <= 4) {
    newErrors.password = "Password must be at least 4 characters.";
  }

  setErrors(newErrors);

  if (hasError) return;

  try {
    setLoading(true);

    const res = await authService.login(employeeCode, password);

    console.log("LOGIN RESULT:", res);

    if (res?.access_token) {
      auth.login(res);          // lưu token + user + decode payload
      navigate("/dashboard");
    } else {
      alert("Login failed");
    }
  } catch (err) {
    console.log(err);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="login-screen">
      <div className="login-screen__card">

        {/* LOGO */}
        <div className="login-screen__brand">
          <img
            className="login-screen__logo"
            src="/images/logos/kugil.png"
            alt="logo"
          />
        </div>

        {/* TITLE */}
        <div className="login-screen__headline">
          <h1 className="login-screen__title">
             {t("title")}
          </h1>
          <p className="login-screen__subtitle">{t("login")}</p>
        </div>

        {/* FORM */}
        <form className="login-screen__form" noValidate="" onSubmit={handleLogin}>
          <div className="login-screen__field">
            <div className="login-screen__fieldwrap">
              <label className="login-screen__label" htmlFor="EmployeeCode">
                {t("employeeCode")}<span className="login-screen__required">*</span>
              </label>
              <input
                id="EmployeeCode"
                className={`login-screen__input ${errors.employeeCode ? "input-error" : ""}`}
                type="text"
                autoComplete="username"
                value={employeeCode}
                onChange={(e) => {
                  setEmployeeCode(e.target.value);
                  setErrors((prev) => ({ ...prev, employeeCode: "" }));
                }}
              />

              {errors.employeeCode && (
                <div className="error-text">
                  {t(errors.employeeCode)}
                </div>
              )}  

                    </div>
                    </div>
                    <div className="login-screen__field">
                        <div className="login-screen__fieldwrap">
                            <label className="login-screen__label" htmlFor="Password">
                                {t("password")}<span className="login-screen__required">*</span>
                            </label>
                            <input
                              id="Password"
                              className={`login-screen__input ${errors.password ? "input-error" : ""}`}
                              type="password"
                              autoComplete="current-password"
                              value={password}
                              onChange={(e) => {
                                setPassword(e.target.value);
                                setErrors((prev) => ({ ...prev, password: "" }));
                              }}
                            />

                            {errors.password && (
                              <div className="error-text">
                                {t(errors.password)}
                              </div>
                            )}
                        </div>
                    </div>
                    <button type="submit" className="login-screen__submit">
                        {t("button")}
                    </button>
                            </form>

        {/* LANGUAGE */}
          <div className="login-screen__language">
            <LanguageDropdown className="login-screen__language"
            showSmall={true} />
          </div>
      </div>
    </div>
  );
}