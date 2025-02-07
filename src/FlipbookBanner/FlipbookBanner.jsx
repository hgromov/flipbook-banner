import React, { useState, useEffect } from "react";
import './flipbookBanner.css'

const images = [
  "/assets/lemons.jpg",
  "/assets/avocados.jpg",
  "/assets/nuddles.jpg",
  "/assets/nuts.jpg",
];

const FlipbookBanner = () => {
  const [index, setIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    if (autoPlay) {
      const interval = setInterval(() => {
        handleNext();
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [autoPlay, index]);

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div style={{
      position: "relative",
      width: "970px",
      height: "250px",
      perspective: "1000px",
      borderRadius: "16px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
      overflow: "hidden",
      background: "transparent",
    }}>
      <div style={{
        position: "absolute",  
        width: "100%",
        height: "100%",
      }}>
        <img
          src={images[index]}
          alt="Product"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>
      <div style={{ position: "absolute", inset: 0, display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px" }}>
        <button onClick={handlePrev} style={{ backgroundColor: "#333", color: "white", padding: "8px", borderRadius: "50%", border: "none", cursor: "pointer" }}>◀</button>
        <button onClick={handleNext} style={{ backgroundColor: "#333", color: "white", padding: "8px", borderRadius: "50%", border: "none", cursor: "pointer" }}>▶</button>
      </div>
      <div style={{ position: "absolute", bottom: "16px", left: "50%", transform: "translateX(-50%)", display: "flex", gap: "8px" }}>
        {images.map((_, i) => (
          <button
            key={i}
            style={{ width: "12px", height: "12px", borderRadius: "50%", backgroundColor: i === index ? "white" : "gray", border: "none", cursor: "pointer" }}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
      <button
        style={{ position: "absolute", top: "16px", right: "16px", backgroundColor: "#333", color: "white", padding: "8px 12px", borderRadius: "8px", border: "none", cursor: "pointer" }}
        onClick={() => setAutoPlay(!autoPlay)}
      >
        {autoPlay ? "Pause" : "Play"}
      </button>
    </div>
  );
};

export default FlipbookBanner;