import Cookies from "js-cookie";

export const handleReferral = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const referral = urlParams.get("r");

  if (referral) {
    Cookies.set("referral", referral, { expires: 7 }); // 7 gün boyunca sakla
  }
};

export const getReferralFromCookies = () => {
  return Cookies.get("referral");
};
