"use client";

import { useState, useEffect } from "react";
import LunaNFT from "../../../images/3DLunaNFT.png";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function NFTCarousel({
  images = [LunaNFT, LunaNFT, LunaNFT],
  className,
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();

  // Limit images to the last three
  const limitedImages = images.slice(-3);

  const goToSlide = (index) => {
    setActiveIndex(index);
  };

  const handleMint = () => {
    navigate("/login");
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) =>
        prevIndex === limitedImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [limitedImages.length]);

  const containerStyle = {
    width: "100%",
    position: "relative",
  };

  const carouselContainerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "500px",
    position: "relative",
  };

  return (
    <div style={containerStyle} className={className || ""}>
      <div style={carouselContainerStyle}>
        {limitedImages.map((image, index) => {
          const isActive = index === activeIndex;
          const isPrev =
            index === activeIndex - 1 ||
            (activeIndex === 0 && index === limitedImages.length - 1);
          const isNext =
            index === activeIndex + 1 ||
            (activeIndex === limitedImages.length - 1 && index === 0);

          if (!isActive && !isPrev && !isNext) return null;

          const itemStyle = {
            position: "absolute",
            transition: "all 0.5s ease-in-out",
            transform: isActive
              ? "scale(1)"
              : isPrev
              ? "scale(0.85) translateX(-80%)"
              : "scale(0.85) translateX(80%)",
            opacity: isActive ? 1 : 0.7,
            zIndex: isActive ? 30 : 20,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          };

          const imgStyle = {
            borderRadius: "8px",
            boxShadow: "0 10px 25px rgba(0, 0, 0, 0)",
            maxHeight: "400px",
            width: "auto",
          };

          return (
            <div key={index} style={itemStyle}>
              <img
                src={image || "/placeholder.svg"}
                alt={`NFT ${index + 1}`}
                style={imgStyle}
              />
              {isActive && (
                <Button
                  className="mt-3"
                  style={{
                    background: "linear-gradient(to right, #FFF69F, #D5A554)",
                    border: "none",
                    color: "#000",
                    fontWeight: "bold",
                    borderRadius: "8px",
                    fontSize: "14px",
                    padding: "8px 24px",
                  }}
                  onClick={handleMint}
                >
                  Mint
                </Button>
              )}
            </div>
          );
        })}
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "16px",
          gap: "8px",
        }}
      >
        {limitedImages.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "9999px",
              transition: "all 0.3s",
              backgroundColor: activeIndex === index ? "white" : "transparent",
              border: "white 1px solid",
              cursor: "pointer",
            }}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
