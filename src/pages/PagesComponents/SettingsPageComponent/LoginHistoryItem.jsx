import React from "react";
import { Button } from "react-bootstrap";
import { MdLogout } from "react-icons/md";
import { useTranslation } from "react-i18next";

function parseUserAgent(uaString) {
  const regex = /^(?<ua_family>[^\/\s]+)\/(?<ua_version>[^\s]+) \((?<platform>[^;]+); (?<os>[^)]+)\) (?<engine>[^\/\s]+)\/(?<engine_version>[^\s]+) \((?<engine_note>[^)]+)\) (?<browser>[^\/\s]+)\/(?<browser_version>[^\s]+)/;
  const match = uaString.match(regex);
  if (!match) return null;
  const { browser, browser_version, os, platform } = match.groups;
  return { browserName: browser, browserVersion: browser_version, os, platform };
}

const LoginHistoryItem = ({ icon, device, loginTime, userAgent }) => {
  const { t } = useTranslation();
  const parsed = parseUserAgent(userAgent);

  return (
    <div className="d-flex justify-content-between align-items-center py-2 border-bottom">
      <div className="d-flex align-items-center">
        {icon}
        <div className="ms-2">
          <small className="d-block">{device}</small>
          <small className="text-muted">{new Date(loginTime).toLocaleString()}</small>
          {parsed ? (
            <>
              <small className="text-muted">{parsed.browserName}</small>
              <small className="text-muted">{parsed.os}</small>
              <small className="text-muted">{parsed.platform}</small>
            </>
          ) : (
            <small className="text-muted">{userAgent}</small>
          )}
        </div>
      </div>
      <Button
        variant="link"
        size="sm"
        className="text-danger"
        aria-label={t('settings.loginHistory.logout')}
      >
        <MdLogout />
      </Button>
    </div>
  );
};

export default LoginHistoryItem;
