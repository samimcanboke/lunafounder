import { useState } from 'react';
import ReactCountryFlag from 'react-country-flag';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export default function LunaFAQ() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [activeSection, setActiveSection] = useState('lunafounder');
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const languages = [
    { code: 'en', country: 'GB' },
    { code: 'de', country: 'DE' }
  ];

  const mainStyle = {
    minHeight: "100vh",
    backgroundColor: "#080C12",
    color: "white",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    fontFamily: "'Arial', sans-serif"
  };

  const headerStyle = {
    fontSize: "36px",
    fontWeight: "bold",
    marginBottom: "30px",
    textAlign: "center",
    fontFamily: "Krona One, sans-serif",
    background: "linear-gradient(to right, #FFF69F, #D5A554)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent"
  };

  const contentContainerStyle = {
    width: "100%",
    maxWidth: "900px",
    marginBottom: "30px"
  };

  const tabContainerStyle = {
    display: "flex",
    marginBottom: "20px"
  };

  const tabStyle = (isActive) => ({
    flex: "1",
    padding: "12px 16px",
    backgroundColor: isActive ? "#2C3540" : "#1C222A",
    border: "none",
    color: "white",
    cursor: "pointer",
    transition: "background-color 0.3s",
    fontFamily: "Krona One, sans-serif"
  });

  const tabLeftStyle = {
    borderTopLeftRadius: "8px",
    borderBottomLeftRadius: "8px"
  };

  const tabRightStyle = {
    borderTopRightRadius: "8px",
    borderBottomRightRadius: "8px"
  };

  const faqContainerStyle = {
    backgroundColor: "#1C222A",
    borderRadius: "8px",
    padding: "24px"
  };

  const faqHeaderStyle = {
    fontSize: "24px",
    marginBottom: "24px",
    fontFamily: "Krona One, sans-serif",
    background: "linear-gradient(to right, #FFF69F, #D5A554)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent"
  };

  const faqItemStyle = {
    marginBottom: "20px"
  };

  const questionStyle = {
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "8px",
    color: "#D5A554"
  };

  const answerStyle = {
    fontSize: "16px",
    lineHeight: "1.6"
  };

  const topBarStyle = {
    width: "100%",
    maxWidth: "900px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px"
  };

  const btnStyle = {
    background: "none",
    border: "none",
    color: "white",
    cursor: "pointer",
    fontSize: "24px"
  };

  const selectStyle = {
    backgroundColor: "#1C222A",
    color: "white",
    border: "none",
    borderRadius: "4px",
    padding: "4px 8px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center"
  };

  const dropdownContainerStyle = { position: 'relative' };

  const dropdownListStyle = {
    position: 'absolute',
    top: '100%',
    right: 0,
    backgroundColor: '#1C222A',
    borderRadius: '4px',
    marginTop: '4px',
    overflow: 'hidden',
    zIndex: 1000
  };

  const dropdownItemStyle = {
    display: 'flex',
    alignItems: 'center',
    padding: '8px 12px',
    cursor: 'pointer',
    color: 'white',
    fontSize: '14px',
    backgroundColor: '#1C222A'
  };

  const lunaFounderFAQ = t('faqPage.sections.lunafounder.items', { returnObjects: true });
  const lunaLottoFAQ = t('faqPage.sections.lunalotto.items', { returnObjects: true });

  return (
    <div style={mainStyle}>
      <div style={topBarStyle}>
        <button style={btnStyle} onClick={() => navigate('/')}>
          <i className="bi bi-chevron-left"></i>
        </button>
        <div style={dropdownContainerStyle}>
          <button
            style={selectStyle}
            onClick={() => setLangDropdownOpen(!langDropdownOpen)}
          >
            <ReactCountryFlag
              countryCode={languages.find(l => l.code === i18n.language).country}
              svg
              style={{ width: '16px', height: '16px' }}
            />
            <span style={{ marginLeft: '8px' }}>
              {i18n.language.toUpperCase()}
            </span>
          </button>
          {langDropdownOpen && (
            <div style={dropdownListStyle}>
              {languages.map((lang, i) => (
                <div
                  key={lang.code}
                  style={{
                    ...dropdownItemStyle,
                    borderBottom:
                      i !== languages.length - 1
                        ? '1px solid #2C2f36'
                        : 'none'
                  }}
                  onClick={() => {
                    i18n.changeLanguage(lang.code);
                    setLangDropdownOpen(false);
                  }}
                >
                  <ReactCountryFlag
                    countryCode={lang.country}
                    svg
                    style={{ width: '16px', height: '16px' }}
                  />
                  <span style={{ marginLeft: '8px' }}>
                    {lang.code.toUpperCase()}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <h1 style={headerStyle}>{t('faqPage.title')}</h1>

      <div style={contentContainerStyle}>
        <div style={tabContainerStyle}>
          <button
            style={{ ...tabStyle(activeSection === 'lunafounder'), ...tabLeftStyle }}
            onClick={() => setActiveSection('lunafounder')}
          >
            {t('faqPage.tabs.lunafounder')}
          </button>
          <button
            style={{ ...tabStyle(activeSection === 'lunalotto'), ...tabRightStyle }}
            onClick={() => setActiveSection('lunalotto')}
          >
            {t('faqPage.tabs.lunalotto')}
          </button>
        </div>

        <div style={faqContainerStyle}>
          {activeSection === 'lunafounder' && (
            <>
              <h2 style={faqHeaderStyle}>{t('faqPage.sections.lunafounder.header')}</h2>
              {lunaFounderFAQ.map((item, i) => (
                <div key={i} style={faqItemStyle}>
                  <h3 style={questionStyle}>{item.question}</h3>
                  <p style={answerStyle}>{item.answer}</p>
                </div>
              ))}
            </>
          )}

          {activeSection === 'lunalotto' && (
            <>
              <h2 style={faqHeaderStyle}>{t('faqPage.sections.lunalotto.header')}</h2>
              {lunaLottoFAQ.map((item, i) => (
                <div key={i} style={faqItemStyle}>
                  <h3 style={questionStyle}>{item.question}</h3>
                  <p style={answerStyle}>{item.answer}</p>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}