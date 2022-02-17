import React, { useEffect } from "react";

function GameClone() {
  useEffect(() => {
    const gameScript = document.createElement("script");
    gameScript.src = "gameScript.js";
    // gameScript.async = true;
    document.body.appendChild(gameScript);

    return () => {
      document.body.removeChild(gameScript);
    };
  }, []);

  return <div />;
}

export default GameClone;
