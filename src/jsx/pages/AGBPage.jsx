import { useTranslation } from "react-i18next";
import ReactCountryFlag from "react-country-flag";
import { useState } from "react";

export default function LunaAGB() {
  const { t, i18n } = useTranslation();
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const languages = [
    { code: "en", country: "GB" },
    { code: "de", country: "DE" },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "1.5rem",
        backgroundColor: "#080C12",
        color: "white",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "48rem",
          marginLeft: "auto",
          marginRight: "auto",
          position: "relative",
        }}
      >
        <div style={{ position: "absolute", top: "1rem", right: "1rem" }}>
          <div style={{ position: "relative" }}>
            <button
              style={{
                backgroundColor: "#1C222A",
                color: "white",
                border: "none",
                borderRadius: "4px",
                padding: "4px 8px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
              }}
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
            >
              <ReactCountryFlag
                countryCode={
                  languages.find((l) => l.code === i18n.language).country
                }
                svg
                style={{ width: "16px", height: "16px" }}
              />
              <span style={{ marginLeft: "8px" }}>
                {i18n.language.toUpperCase()}
              </span>
            </button>
            {langDropdownOpen && (
              <div
                style={{
                  position: "absolute",
                  top: "100%",
                  right: 0,
                  backgroundColor: "#1C222A",
                  borderRadius: "4px",
                  marginTop: "4px",
                  overflow: "hidden",
                  zIndex: 1000,
                }}
              >
                {languages.map((lang, i) => (
                  <div
                    key={lang.code}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      padding: "8px 12px",
                      cursor: "pointer",
                      color: "white",
                      fontSize: "14px",
                      backgroundColor: "#1C222A",
                      borderBottom:
                        i !== languages.length - 1
                          ? "1px solid #2C2f36"
                          : "none",
                    }}
                    onClick={() => {
                      i18n.changeLanguage(lang.code);
                      setLangDropdownOpen(false);
                    }}
                  >
                    <ReactCountryFlag
                      countryCode={lang.country}
                      svg
                      style={{ width: "16px", height: "16px" }}
                    />
                    <span style={{ marginLeft: "8px" }}>
                      {lang.code.toUpperCase()}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <h1
          style={{
            fontSize: "1.875rem",
            color: "#D5A554",
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: "2rem",
          }}
        >
          {t("agb.title")}
        </h1>
        <h2
          style={{
            fontSize: "1.5rem",
            color: "#D5A554",
            fontWeight: "600",
            textAlign: "center",
            marginBottom: "2rem",
          }}
        >
          {t("agb.subtitle")}
        </h2>

        <div style={{ marginBottom: "2rem" }}>
          <section style={{ marginBottom: "2rem" }}>
            <h3
              style={{
                fontSize: "1.25rem",
                color: "#D5A554",
                fontWeight: "600",
                marginBottom: "1rem",
              }}
            >
              {t("agb.sections.1.title")}
            </h3>
            <p style={{ color: "white" }}>{t("agb.sections.1.content")}</p>
          </section>

          <section style={{ marginBottom: "2rem" }}>
            <h3
              style={{
                fontSize: "1.25rem",
                color: "#D5A554",
                fontWeight: "600",
                marginBottom: "1rem",
              }}
            >
              {t("agb.sections.2.title")}
            </h3>
            <p style={{ color: "white" }}>{t("agb.sections.2.content")}</p>
          </section>

          <section style={{ marginBottom: "2rem" }}>
            <h3
              style={{
                fontSize: "1.25rem",
                color: "#D5A554",
                fontWeight: "600",
                marginBottom: "1rem",
              }}
            >
              {t("agb.sections.3.title")}
            </h3>
            <ul
              style={{
                listStyleType: "disc",
                paddingLeft: "1.5rem",
                marginBottom: "1rem",
                color: "white",
              }}
            >
              {t("agb.sections.3.content", { returnObjects: true }).map(
                (item, index) => (
                  <li key={index} style={{ marginBottom: "0.5rem" }}>
                    <i className="bi bi-dot"></i> {item}
                  </li>
                )
              )}
            </ul>
          </section>

          <section style={{ marginBottom: "2rem" }}>
            <h3
              style={{
                fontSize: "1.25rem",
                color: "#D5A554",
                fontWeight: "600",
                marginBottom: "1rem",
              }}
            >
              {t("agb.sections.4.title")}
            </h3>
            <ul
              style={{
                listStyleType: "disc",
                paddingLeft: "1.5rem",
                marginBottom: "1rem",
                color: "white",
              }}
            >
              {t("agb.sections.4.content", { returnObjects: true }).map(
                (item, index) => (
                  <li key={index} style={{ marginBottom: "0.5rem" }}>
                    <i className="bi bi-dot"></i> {item}
                  </li>
                )
              )}
            </ul>
          </section>

          <section style={{ marginBottom: "2rem" }}>
            <h3
              style={{
                fontSize: "1.25rem",
                color: "#D5A554",
                fontWeight: "600",
                marginBottom: "1rem",
              }}
            >
              {t("agb.sections.5.title")}
            </h3>
            <ul
              style={{
                listStyleType: "disc",
                paddingLeft: "1.5rem",
                marginBottom: "1rem",
                color: "white",
              }}
            >
              {t("agb.sections.5.content", { returnObjects: true }).map(
                (item, index) => (
                  <li key={index} style={{ marginBottom: "0.5rem" }}>
                    <i className="bi bi-dot"></i> {item}
                  </li>
                )
              )}
            </ul>
          </section>

          <section style={{ marginBottom: "2rem" }}>
            <h3
              style={{
                fontSize: "1.25rem",
                color: "#D5A554",
                fontWeight: "600",
                marginBottom: "1rem",
              }}
            >
              {t("agb.sections.6.title")}
            </h3>
            <ul
              style={{
                listStyleType: "disc",
                paddingLeft: "1.5rem",
                marginBottom: "1rem",
                color: "white",
              }}
            >
              {t("agb.sections.6.content", { returnObjects: true }).map(
                (item, index) => (
                  <li key={index} style={{ marginBottom: "0.5rem" }}>
                    <i className="bi bi-dot"></i> {item}
                  </li>
                )
              )}
            </ul>
          </section>

          <section style={{ marginBottom: "2rem" }}>
            <h3
              style={{
                fontSize: "1.25rem",
                color: "#D5A554",
                fontWeight: "600",
                marginBottom: "1rem",
              }}
            >
              {t("agb.sections.7.title")}
            </h3>
            <ul
              style={{
                listStyleType: "disc",
                paddingLeft: "1.5rem",
                marginBottom: "1rem",
                color: "white",
              }}
            >
              {t("agb.sections.7.content", { returnObjects: true }).map(
                (item, index) => (
                  <li key={index} style={{ marginBottom: "0.5rem" }}>
                    <i className="bi bi-dot"></i> {item}
                  </li>
                )
              )}
            </ul>
          </section>

          <section style={{ marginBottom: "2rem" }}>
            <h3
              style={{
                fontSize: "1.25rem",
                color: "#D5A554",
                fontWeight: "600",
                marginBottom: "1rem",
              }}
            >
              {t("agb.sections.8.title")}
            </h3>
            <ul
              style={{
                listStyleType: "disc",
                paddingLeft: "1.5rem",
                marginBottom: "1rem",
                color: "white",
              }}
            >
              {t("agb.sections.8.content", { returnObjects: true }).map(
                (item, index) => (
                  <li key={index} style={{ marginBottom: "0.5rem" }}>
                    <i className="bi bi-dot"></i> {item}
                  </li>
                )
              )}
            </ul>
          </section>

          <section style={{ marginBottom: "2rem" }}>
            <h3
              style={{
                fontSize: "1.25rem",
                color: "#D5A554",
                fontWeight: "600",
                marginBottom: "1rem",
              }}
            >
              {t("agb.sections.9.title")}
            </h3>
            <ul
              style={{
                listStyleType: "disc",
                paddingLeft: "1.5rem",
                marginBottom: "1rem",
                color: "white",
              }}
            >
              {t("agb.sections.9.content", { returnObjects: true }).map(
                (item, index) => (
                  <li key={index} style={{ marginBottom: "0.5rem" }}>
                    <i className="bi bi-dot"></i> {item}
                  </li>
                )
              )}
            </ul>
          </section>

          <section style={{ marginBottom: "2rem" }}>
            <h3
              style={{
                fontSize: "1.25rem",
                color: "#D5A554",
                fontWeight: "600",
                marginBottom: "1rem",
              }}
            >
              {t("agb.sections.10.title")}
            </h3>
            <ul
              style={{
                listStyleType: "disc",
                paddingLeft: "1.5rem",
                marginBottom: "1rem",
                color: "white",
              }}
            >
              {t("agb.sections.10.content", { returnObjects: true }).map(
                (item, index) => (
                  <li key={index} style={{ marginBottom: "0.5rem" }}>
                    <i className="bi bi-dot"></i> {item}
                  </li>
                )
              )}
            </ul>
          </section>

          <section style={{ marginBottom: "2rem" }}>
            <h3
              style={{
                fontSize: "1.25rem",
                color: "#D5A554",
                fontWeight: "600",
                marginBottom: "1rem",
              }}
            >
              {t("agb.sections.11.title")}
            </h3>
            <ul
              style={{
                listStyleType: "disc",
                paddingLeft: "1.5rem",
                marginBottom: "1rem",
                color: "white",
              }}
            >
              {t("agb.sections.11.content", { returnObjects: true }).map(
                (item, index) => (
                  <li key={index} style={{ marginBottom: "0.5rem" }}>
                    <i className="bi bi-dot"></i> {item}
                  </li>
                )
              )}
            </ul>
          </section>

          <section style={{ marginBottom: "2rem" }}>
            <h3
              style={{
                fontSize: "1.25rem",
                color: "#D5A554",
                fontWeight: "600",
                marginBottom: "1rem",
              }}
            >
              {t("agb.contact.title")}
            </h3>
            <ul
              style={{
                listStyleType: "disc",
                paddingLeft: "1.5rem",
                marginBottom: "1rem",
                color: "white",
              }}
            >
              {t("agb.contact.content", { returnObjects: true }).map(
                (item, index) => (
                  <li key={index} style={{ marginBottom: "0.5rem" }}>
                    <i className="bi bi-dot"></i> {item}
                  </li>
                )
              )}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
