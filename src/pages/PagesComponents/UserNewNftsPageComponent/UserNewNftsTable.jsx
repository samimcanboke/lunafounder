import React, { useState } from "react";
import { Table, Button, Collapse, Modal, Form } from "react-bootstrap";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { useTranslation } from "react-i18next";
import { useWallet } from "@solana/wallet-adapter-react";
import userMintedNftsPaidService from "../../../services/userMintedNftsPaidService";
import TokenTransferService from "../../../services/TokenTransferService";

const UserNewNftsTable = ({ data, expandedRow, toggleRow, onPaidToggle }) => {
  const { t } = useTranslation();
  const wallet = useWallet();
  const [showModal, setShowModal] = useState(false);
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [selected, setSelected] = useState({
    nftId: null,
    distributions: [],
  });
  const [txHash, setTxHash] = useState("");
  const [transferStatus, setTransferStatus] = useState({
    loading: false,
    error: null,
  });

  const openModal = (nftId, distId, newPaid) => {
    setSelected({ nftId, distributions: [] });
    setTxHash("");
    setShowModal(true);
  };

  const confirmPaid = async () => {
    const { nftId, distId, newPaid } = selected;
    try {
      await userMintedNftsPaidService.updatePaidStatus(
        nftId,
        distId,
        newPaid,
        txHash
      );
      onPaidToggle(nftId, distId, newPaid);
    } catch (err) {
      console.error(err);
    } finally {
      setShowModal(false);
    }
  };

  const getUnpaidDistributions = (nft) => {
    return (nft.distribution || []) // Ensure distribution is always an array
      .filter((dist) => !dist.isPaid)
      .map((dist) => ({
        nftId: nft._id,
        distId: dist._id,
        wallet: dist.wallet,
        price: dist.price,
        username: dist.username,
      }));
  };

  const handleBulkTransfer = async () => {
    if (!wallet.connected) {
      setTransferStatus({
        loading: false,
        error: "Please connect your wallet first",
      });
      return;
    }

    try {
      setTransferStatus({ loading: true, error: null });

      // Send all transfers in a single transaction
      const result = await TokenTransferService.sendBulkUSDT(
        wallet,
        selected.distributions
      );

      if (result.success) {
        // Update the backend for all successful transfers
        for (const dist of selected.distributions) {
          await userMintedNftsPaidService.updatePaidStatus(
            dist.nftId,
            dist.distId,
            true,
            result.signature // Send the transaction hash
          );
          onPaidToggle(dist.nftId, dist.distId, true); // Update UI state
        }
      }

      setShowTransferModal(false); // Close the modal after all transfers
    } catch (error) {
      setTransferStatus({
        loading: false,
        error: error.message || "Failed to transfer USDT",
      });
    } finally {
      setTransferStatus({ loading: false });
    }
  };

  const openBulkTransferModal = (nft) => {
    const unpaidDists = getUnpaidDistributions(nft);
    setSelected({
      nftId: nft._id,
      distributions: unpaidDists,
    });
    setTransferStatus({ loading: false, error: null });
    setShowTransferModal(true);
  };

  return (
    <>
      <Table hover size="sm">
        <thead>
          <tr>
            <th></th>
            <th>{t("mintedNftsPage.table.username")}</th>
            <th>{t("mintedNftsPage.table.nftName")}</th>
          </tr>
        </thead>
        <tbody>
          {data.map((nft) => {
            const unpaidCount = getUnpaidDistributions(nft).length;
            const totalAmount = getUnpaidDistributions(nft).reduce(
              (sum, dist) => sum + dist.price,
              0
            );

            return (
              <React.Fragment key={nft._id}>
                <tr>
                  <td className="p-1">
                    <Button
                      variant="link"
                      className="text-white"
                      onClick={() => toggleRow(nft._id)}
                      aria-controls={`dist-${nft._id}`}
                      aria-expanded={expandedRow === nft._id}
                    >
                      {expandedRow === nft._id ? (
                        <BiChevronUp />
                      ) : (
                        <BiChevronDown />
                      )}
                    </Button>
                  </td>
                  <td className="p-1">{nft.userId?.username || "N/A"}</td>
                  <td>{nft.nftName || "N/A"}</td>
                </tr>
                <tr>
                  <td colSpan="3" style={{ padding: 0, border: 0 }}>
                    <Collapse in={expandedRow === nft._id}>
                      <div id={`dist-${nft._id}`} className="p-2">
                        {unpaidCount > 0 && (
                          <div className="mb-2 d-flex justify-content-end">
                            <Button
                              variant="primary"
                              size="sm"
                              onClick={() => openBulkTransferModal(nft)}
                            >
                              Pay All ({unpaidCount}) - {totalAmount} USDT
                            </Button>
                          </div>
                        )}
                        <Table size="sm" borderless className="mb-0">
                          <thead>
                            <tr>
                              <th>{t("mintedNftsPage.table.level")}</th>
                              <th>{t("mintedNftsPage.table.username")}</th>
                              <th>{t("mintedNftsPage.table.wallet")}</th>
                              <th className="text-center">
                                {t("mintedNftsPage.table.price")}
                              </th>
                              <th className="text-center">
                                {t("mintedNftsPage.table.rate")}
                              </th>
                              <th className="text-center">
                                {t("mintedNftsPage.table.paid")}
                              </th>
                              <th className="text-center">Depth</th>
                            </tr>
                          </thead>
                          <tbody>
                            {(nft.distribution || []).map((d) => (
                              <tr key={d._id}>
                                <td>{d.level}</td>
                                <td>{d.username}</td>
                                <td>{d.wallet}</td>
                                <td className="text-center">{d.price}</td>
                                <td className="text-center">{d.rate}</td>
                                <td className="text-center">
                                  <input
                                    type="checkbox"
                                    checked={d.isPaid}
                                    onChange={() =>
                                      openModal(nft._id, d._id, !d.isPaid)
                                    }
                                  />
                                </td>
                                <td className="text-center">{d.level}</td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      </div>
                    </Collapse>
                  </td>
                </tr>
              </React.Fragment>
            );
          })}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{t("mintedNftsPage.modal.title")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>{t("mintedNftsPage.modal.txHash")}</Form.Label>
            <Form.Control
              type="text"
              value={txHash}
              onChange={(e) => setTxHash(e.target.value)}
              placeholder="Enter tx address"
            />
          </Form.Group>
          <Form.Check
            className="mt-2"
            type="checkbox"
            label={t("mintedNftsPage.modal.markPaid")}
            checked={selected.newPaid}
            readOnly
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            {t("mintedNftsPage.modal.cancel")}
          </Button>
          <Button variant="primary" onClick={confirmPaid} disabled={!txHash}>
            {t("mintedNftsPage.modal.submit")}
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showTransferModal}
        onHide={() => setShowTransferModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Bulk USDT Transfer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            You are about to send USDT to {selected.distributions.length}{" "}
            recipients:
          </p>
          <div className="mb-3">
            <strong>
              Total Amount:{" "}
              {selected.distributions.reduce(
                (sum, dist) => sum + dist.price,
                0
              )}{" "}
              USDT
            </strong>
          </div>
          <div style={{ maxHeight: "200px", overflowY: "auto" }}>
            {selected.distributions.map((dist, index) => (
              <div key={dist.distId} className="mb-2">
                {index + 1}. {dist.username} ({dist.wallet.slice(0, 6)}...
                {dist.wallet.slice(-4)}) - {dist.price} USDT
              </div>
            ))}
          </div>
          {transferStatus.error && (
            <div className="alert alert-danger mt-3">
              {transferStatus.error}
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowTransferModal(false)}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleBulkTransfer}
            disabled={transferStatus.loading}
          >
            {transferStatus.loading
              ? "Sending..."
              : `Send ${selected.distributions.reduce(
                  (sum, dist) => sum + dist.price,
                  0
                )} USDT`}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UserNewNftsTable;
