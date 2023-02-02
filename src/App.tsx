import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [grid, setGrid] = useState([0, 1, 3, 5, 3, 2, 4, 0, 4, 2, 1, 5]);
  const [picked, setPicked] = useState<number[]>([]);
  const [confirm, setConfirm] = useState<number[]>([]);
  const [found, setFound] = useState<number[]>([]);

  // shuffle the grid
  function newGame() {
    const newGrid = [...grid];
    newGrid.sort(() => Math.random() - 0.5);
    setGrid(newGrid);
  }
  // clear found
  function clear() {
    setFound([]);
  }
  // isPicked
  function isPicked(idx: number, value: number): boolean {
    let isAlreadyPicked = false;
    if (picked[0] === idx && picked[1] === value) {
      isAlreadyPicked = true;
    }
    return isAlreadyPicked;
  }
  // isClicked
  function isClicked(idx: number, value: number): boolean {
    let isClicked = false;
    if (confirm[0] === idx && confirm[1] === value) {
      isClicked = true;
    }
    return isClicked;
  }
  // isMatched
  function isMatched(): boolean {
    let matched = false;
    if (picked.length === 1 && confirm.length === 1) {
      if (picked[0] !== confirm[0] && picked[1] === confirm[1]) {
        matched = true;
      }
    }
    return matched;
  }
  // card click handler
  function handleCardClick(idx: number, value: number) {
    // if not already picked
    if (picked.length === 0 && !isPicked(idx, value)) {
      setPicked([idx, value]);
    } else if (confirm.length === 0) {
      setConfirm([idx, value]);
    }
  }
  // macthing
  useEffect(() => {
    if (picked.length !== 0 && confirm.length !== 0) {
      if (picked[0] !== confirm[0] && picked[1] === confirm[1]) {
        console.log("matched");
        setFound([...found, picked[1]]);
      } else {
        console.log("not matched");
      }
      setTimeout(() => {
        setPicked([]);
        setConfirm([]);
      }, 800);
    }

    return () => {};
  }, [picked, confirm]);
  
  return (
    <div className="App">
      {/* <div className="message">{message}</div> */}
      <div className="grid">
        {grid.map((val, idx) => (
          <div
            className="card"
            key={idx}
            onClick={() => handleCardClick(idx, val)}
          >
            {isPicked(idx, val) ||
            isClicked(idx, val) ||
            found.includes(val) ? (
              <span className={`color-${val}`}>{val}</span>
            ) : (
              ""
            )}
          </div>
        ))}
      </div>
      <div className="actions">
        <button onClick={newGame}>Shuffle</button>
        <span>Found: {JSON.stringify(found)}</span>
        <button onClick={clear}>Restart</button>
      </div>
    </div>
  );
}

export default App;
