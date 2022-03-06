import React, { useEffect, useState } from "react";
import Header from "./Header";
import "./css/Game.scss";

function createGameScriptObject() {
  const script = document.createElement("script");
  script.src = "gameScript.js";
  script.type = "module";
  return script;
}

const Play = ({ updateScore }) => {
  useEffect(() => {
    let script = createGameScriptObject();

    document.addEventListener("updateScore", updateScore);
    document.body.appendChild(script);
    document.getElementById("game-container")?.removeAttribute("hidden");

    return () => {
      if (script) {
        document.removeEventListener("updateScore", updateScore);
        script.remove();
        document
          .getElementById("game-container")
          .setAttribute("hidden", "true");
      }
    };
  }, [updateScore]);

  return <Header showBackButton={true} />;
};

export default Play;
