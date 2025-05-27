import React, { useState, useEffect } from "react";
import { Form, Modal, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";
import useUserStore from "../../../store/userStore";

export default function WalletInfo({ wallet: initialWallet }) {
  const { t } = useTranslation();
  const { connected, publicKey } = useWallet();
  const setWallet = useUserStore((state) => state.setWallet);
  const walletFromStore = useUserStore((state) => state.wallet);

  // Sadece store'daki wallet veya initialWallet gösterilsin, adapter'dan gelen adres store'a yazılmasın
  const wallet = walletFromStore || initialWallet || "";

  const [showModal, setShowModal] = useState(false);
  const [buttonEnabled] = useState(true); // info modal yok, direkt aktif

  // Sadece mismatch kontrolü, store'a hiçbir zaman otomatik setWallet yapılmaz
  useEffect(() => {
    if (connected && publicKey && wallet && publicKey.toBase58() !== wallet) {
      setShowModal(true);
    }
    // Otomatik setWallet kaldırıldı
    // eslint-disable-next-line
  }, [connected, publicKey, wallet]);

  // Modalda evet: adapter adresini setWallet ile gönder
  const handleMismatchYes = async () => {
    setShowModal(false);
    if (connected && publicKey) {
      const address = publicKey.toBase58();
      await setWallet(address);
    }
  };

  // Modalda hayır: sadece modalı kapat
  const handleMismatchNo = () => {
    setShowModal(false);
  };

  // WalletMultiButton ile cüzdan değiştirildiğinde store'a setWallet yapılmaz
  const handleButtonClick = () => {};

  return (
    <div className="w-100 mb-3 p-2 rounded text-white">
      <span className="mb-2 d-block">{t("referrals.wallet")}</span>
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-2">
        <div className="position-relative w-75">
          <Form.Control
            size="sm"
            type="text"
            value={wallet}
            className="text-white border-1 flex-grow-1 me-0 me-md-3 pe-5"
            readOnly
            style={{ backgroundColor: "transparent" }}
          />
        </div>
        <div className="mt-2 mt-md-0" style={{ position: "relative" }}>
          <div
            style={{ display: "inline-block", width: "100%" }}
            onClick={handleButtonClick}
          >
            <WalletMultiButton
              className="wallet-btn-connect"
              style={{
                backgroundColor: "#24292d",
                color: "#fff",
                borderRadius: "5px",
                cursor: buttonEnabled ? "pointer" : "not-allowed",
                pointerEvents: buttonEnabled ? "auto" : "none",
              }}
              tabIndex={buttonEnabled ? 0 : -1}
              disabled={!buttonEnabled}
            />
          </div>
        </div>
      </div>
      {/* Sadece mismatch modalı */}
      <Modal show={showModal} onHide={handleMismatchNo} centered>
        <Modal.Body className="text-center">
          <i
            className="bi bi-exclamation-diamond-fill"
            style={{ color: "red", fontSize: "2rem", marginBottom: "1rem" }}
          ></i>
          <br />
          <br />
          {t("wallet.mismatchMessage")}
          <br />
          <br />
          <span
            dangerouslySetInnerHTML={{
              __html: t("referrals.walletMismatchText", {
                adapterWallet: `<b>${publicKey && publicKey.toBase58()}</b>`,
                systemWallet: `<b>${wallet}</b>`,
              }),
            }}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleMismatchNo}>
            {t("referrals.walletModalNo")}
          </Button>
          <Button variant="primary" onClick={handleMismatchYes}>
            {t("referrals.walletModalYes")}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
