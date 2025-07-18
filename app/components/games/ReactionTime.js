"use client";
import React, { useState, useRef } from "react";
import { FaRegClock } from "react-icons/fa";

export default function ReactionTime({ onGameOver, savedStats }) {
  const [waiting, setWaiting] = useState(true);
  const [ready, setReady] = useState(false);
  const [start, setStart] = useState(null);
  const [reactionTimes, setReactionTimes] = useState([]);
  const [tries, setTries] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const timeoutRef = useRef();

  const startRound = () => {
    setWaiting(true);
    setReady(false);
    setStart(null);
    timeoutRef.current = setTimeout(() => {
      setReady(true);
      setStart(Date.now());
    }, 1200 + Math.random() * 2000);
  };

  const handleClick = () => {
    if (gameOver) return;
    if (waiting && !ready) {
      // Clicked too soon
      setTries((t) => t + 1);
      setReactionTimes((r) => [...r, 0]);
      startRound();
    } else if (ready) {
      const reaction = Date.now() - start;
      setReactionTimes((r) => [...r, reaction]);
      setTries((t) => t + 1);
      setWaiting(false);
      setReady(false);
      setStart(null);
      if (tries + 1 >= 5) {
        setGameOver(true);
        // --- AI Feedback Stub ---
        const avg = Math.round(
          [...reactionTimes, reaction].filter((x) => x > 0).reduce((a, b) => a + b, 0) /
            ([...reactionTimes, reaction].filter((x) => x > 0).length || 1)
        );
        onGameOver &&
          onGameOver({
            score: 1000 - avg,
            accuracy: Math.round(
              ([...reactionTimes, reaction].filter((x) => x > 0).length / (tries + 1)) * 100
            ),
            reactionTime: avg,
            tries: tries + 1,
            aiTips: "Try to stay relaxed and focused for faster reactions!",
          });
      } else {
        setTimeout(startRound, 1000);
      }
    }
  };

  React.useEffect(() => {
    if (!gameOver) startRound();
    return () => clearTimeout(timeoutRef.current);
    // eslint-disable-next-line
  }, []);

  return (
    <div className="reaction-time-area">
      <h2 className="gameplay-title">Reaction Time</h2>
      <div
        className={`reaction-box${ready ? " ready" : waiting ? " waiting" : ""}`}
        tabIndex={0}
        role="button"
        aria-label={ready ? "Click now!" : waiting ? "Wait for green" : "Game over"}
        onClick={handleClick}
        style={{ cursor: 'pointer' }}
      >
        {gameOver ? (
          <span className="reaction-message">Game Over</span>
        ) : ready ? (
          <span className="reaction-message">Click!</span>
        ) : (
          <span className="reaction-message">Wait for green...</span>
        )}
      </div>
      <div className="reaction-stats">
        <span>Tries: {tries}</span>
        <span>
          Avg: {reactionTimes.filter((x) => x > 0).length
            ? Math.round(
                reactionTimes.filter((x) => x > 0).reduce((a, b) => a + b, 0) /
                  reactionTimes.filter((x) => x > 0).length
              )
            : 0}
          ms
        </span>
      </div>
    </div>
  );
} 