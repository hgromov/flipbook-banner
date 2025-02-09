import React from "react";
import FlipbookBanner from "./FlipbookBanner/FlipbookBanner";
import "./app.css";

const pages = [
  {
    image: "/assets/lemons.jpg",
    title: "Fresh Lemons",
  },
  {
    image: "/assets/avocados.jpg",
    title: "Ripe Avocados",
  },
  {
    image: "/assets/nuddles.jpg",
    title: "Delicious Noodles",
  },
  {
    image: "/assets/nuts.jpg",
    title: "Mixed Nuts",
  },
];

function App() {
  return (
    <div className="App">
      <FlipbookBanner
        pages={pages}
        animationDuration={1000}
        animationEasing="ease-out"
      />
    </div>
  );
}

export default App;
