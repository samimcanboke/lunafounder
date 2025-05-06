import React, { useEffect, useRef } from "react";
import { Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const NFTVideosSection = ({ nftItems, handleMint }) => {
  const videoRefs = useRef([]);
  const { t } = useTranslation();

  useEffect(() => {
    videoRefs.current = videoRefs.current.slice(0, 7);
  }, []);

  useEffect(() => {
    const order = [0, 6, 1, 5, 2, 4, 3];
    order.forEach((vidIdx, seqIdx) => {
      if (videoRefs.current[vidIdx]) {
        setTimeout(() => {
          videoRefs.current[vidIdx]
            .play()
            .catch((e) => console.log("Video play error:", e));
        }, seqIdx * 100);
      }
    });
    videoRefs.current.forEach((video) => {
      if (!video) return;
      video.addEventListener("ended", () => {
        setTimeout(() => {
          video.play().catch((e) => console.log("Video play error:", e));
        }, 2000);
      });
    });
  }, [nftItems]);

  const renderRow = (items, offset, btnStyle) =>
    items.map((nft, idx) => (
      <div key={idx} className="d-flex flex-column align-items-center">
        {nft.metadata.animation_url ? (
          <video
            ref={(el) => (videoRefs.current[idx + offset] = el)}
            muted
            playsInline
            loop
            style={{ width: "200px", height: "340px", objectFit: "cover" }}
          >
            <source src={nft.metadata.animation_url} type="video/webm" />
            {t("dashboard.videoUnsupported")}
          </video>
        ) : (
          <img
            src={nft.metadata.image || "/placeholder.svg"}
            alt=""
            style={{ width: "200px", height: "340px", objectFit: "cover" }}
          />
        )}
        <Button
          size="sm"
          className="mt-1 px-5 py-1"
          style={btnStyle}
          onClick={() => handleMint(nft)}
        >
          {t("dashboard.mint")}
        </Button>
      </div>
    ));

  return (
    <>
      <div
        className="d-flex justify-content-center flex-wrap mb-4"
        style={{ gap: "8px", rowGap: "4px" }}
      >
        {renderRow(
          nftItems.slice(0, 4),
          0,
          { background: "linear-gradient(to right, #f0f0f0,rgb(139,137,137))", border: "none" }
        )}
      </div>
      <div
        className="d-flex justify-content-center flex-wrap mb-4"
        style={{ gap: "8px", rowGap: "4px" }}
      >
        {renderRow(
          nftItems.slice(4, 7),
          4,
          { background: "linear-gradient(to right, #FFF69F,#D5A554)", border: "none" }
        )}
      </div>
    </>
  );
};

export default NFTVideosSection;
