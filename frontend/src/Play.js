import React, { useEffect } from "react";
import Header from "./Header";

const Play = ({ updateScore }) => {
  useEffect(() => {
    let gameScript = document.createElement("script");

    gameScript.src = "gameScript.js";
    gameScript.type = "module";

    document.addEventListener("updateScore", updateScore);
    document.body.appendChild(gameScript);

    return () => {
      if (gameScript) {
        document.body.removeChild(gameScript);
        document.removeEventListener("updateScore", updateScore);
      }
    };
  }, [updateScore]);

  // return <div />;
  return <Header showBackButton={true} />;
};

export default Play;
