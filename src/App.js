import React from "react";
import FlipbookBanner from "./FlipbookBanner/FlipbookBanner";
import "./app.css";

const pages = [
  {
    image: `${process.env.PUBLIC_URL}/assets/lemons.jpg`,
    title: "Fresh Lemons",
  },
  {
    image: `${process.env.PUBLIC_URL}/assets/avocados.jpg`,
    title: "Ripe Avocados",
  },
  {
    image: `${process.env.PUBLIC_URL}/assets/nuddles.jpg`,
    title: "Delicious Noodles",
  },
  {
    image: `${process.env.PUBLIC_URL}/assets/nuts.jpg`,
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
