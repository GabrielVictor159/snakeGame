import React, { useState, useRef, useEffect } from 'react';
import './App.css';

const App = () => {
  const [snake, setSnake] = useState([[0, 0]]);
  const [food, setFood] = useState([10, 10]);
  const [direction, setDirection] = useState('RIGHT');
  const [speed, setSpeed] = useState(100);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);

  const snakeRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(moveSnake, speed);
    document.onkeydown = handleKeyPress;
    return () => clearInterval(interval);
  }, [speed, snake, gameOver]);

  const moveSnake = () => {
    let snakeCopy = [...snake];
    let newHead = snakeCopy[snakeCopy.length - 1].slice();

    if (direction === 'RIGHT') newHead[0] += 1;
    else if (direction === 'LEFT') newHead[0] -= 1;
    else if (direction === 'UP') newHead[1] -= 1;
    else if (direction === 'DOWN') newHead[1] += 1;

    if (newHead[0] < 0 || newHead[0] >= 20 || newHead[1] < 0 || newHead[1] >= 20) {
      setGameOver(true);
      return;
    }

    for (let i = 0; i < snakeCopy.length; i++) {
      if (newHead[0] === snakeCopy[i][0] && newHead[1] === snakeCopy[i][1]) {
        setGameOver(true);
        return;
      }
    }

    if (newHead[0] === food[0] && newHead[1] === food[1]) {
      setFood([Math.floor(Math.random() * 20), Math.floor(Math.random() * 20)]);
      setScore(score + 1);
    } else {
      snakeCopy.shift();
    }

    snakeCopy.push(newHead);
    setSnake(snakeCopy);
  };

  const handleKeyPress = (e) => {
    e = e || window.event;
    if (e.keyCode === 38 && direction !== 'DOWN') setDirection('UP');
    else if (e.keyCode === 40 && direction !== 'UP') setDirection('DOWN');
    else if (e.keyCode === 37 && direction !== 'RIGHT') setDirection('LEFT');
    else if (e.keyCode === 39 && direction !== 'LEFT') setDirection('RIGHT');
  };

  const restartGame = () => {
    setSnake([[0, 0]]);
    setFood([10, 10]);
    setDirection('RIGHT');
    setSpeed(100);
    setGameOver(false);
    setScore(0);
  };

  return (
    <div className="snake-game">
     
     <div className="snake-grid" ref={snakeRef}>
        {snake.map(([x, y], i) => (
          <div
            key={i}
            className="snake-block"
            style={{ left: `${x * 20}px`, top: `${y * 20}px` }}
          />
        ))}
        <div
          className="food-block"
          style={{ left: `${food[0] * 20}px`, top: `${food[1] * 20}px` }}
        />
      </div>
      {gameOver && (
        <div className="game-over">
          <p>Game over!</p>
          <p>Sua pontuação: {score}</p>
          <button onClick={restartGame}>Restart</button>
        </div>
      )}
    </div>
  );
};

export default App;

