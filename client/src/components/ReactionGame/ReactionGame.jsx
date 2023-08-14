import React, { useState, useRef } from "react";
import styles from "./ReactionGame.module.css";

const ReactionGame = () => {
  const [targetColor, setTargetColor] = useState("red");
  const [startTime, setStartTime] = useState(null);
  const [reactionTime, setReactionTime] = useState(null);

  const handleClick = () => {
    if (startTime) {
      const endTime = new Date();
      const timeDiff = endTime - startTime;
      setReactionTime(timeDiff);
      setStartTime(null);
    }
  };

  const handleStart = () => {
    setReactionTime(null);
    setTargetColor("green");
    setTimeout(() => {
      setTargetColor("red");
      setStartTime(new Date());
    }, Math.random() * 2000 + 1000);
  };

  return (
    <div className={styles.mainContainer}>
      <div
        className={styles.target}
        style={{ backgroundColor: targetColor }}
        onClick={handleClick}
      >
        TARGET
      </div>
      <button onClick={handleStart}>Start</button>
      <h1>
        {reactionTime !== null
          ? `Your reaction time: ${reactionTime}ms`
          : "Click the target when it turns green"}
      </h1>
    </div>
  );
};

export default ReactionGame;
