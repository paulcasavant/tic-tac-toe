import './App.css';
import { useState } from 'react';

function Square({ value, onClick }) {
  return (
    <button className="square" onClick={onClick}>{value}</button>
  )
}

function Board() {
  const [ state, setState ] = useState({
    squares: Array(9).fill(null),
    isXTurn: true,
  });

  const [ history, setHistory ] = useState([state]);

  const [ winner, setWinner ] = useState(null);

  const winConditions = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 4, 6],
    [2, 5, 8],
    [3, 4, 5],
    [6, 7, 8],
  ];

  function handleButtonClick(index) {
    setState((prevState) => ({
      ...prevState,
      squares: history[index].squares}));
    setHistory((oldHistory) => oldHistory.slice(0, index + 1));
    if (winner && index < history.length - 1) {
      setWinner(null);
    }
  }

  function checkWinner(currentSquares, symbol) {
    const ownedIndices = new Set([]);
    let foundWin = false;
    let has_empty = false;

    for (const [index, value] of currentSquares.entries()) {
      if (value === symbol) {
        ownedIndices.add(index);
      }
      else if (value === null) {
        has_empty = true;
      }
    }

    if (!has_empty) {
      setWinner("Tie")
    } else {
      for (const condition of winConditions) {
        if (condition.every(element => ownedIndices.has(element))) {
          foundWin = true;
        }
      }
    }

    return foundWin;
  }

  function handleSquareClick(index) {
    // Return early if square at index already has a value
    // or if there is a winner
    if (state.squares[index] != null || winner) {
      return;
    }

    let new_squares = state.squares.slice();
    new_squares[index] = state.isXTurn ? "X" : "O";


    const newState = {
      isXTurn: !state.isXTurn,
      squares: new_squares,
    };
    const symbol = state.isXTurn ? "X" : "O";
    if (checkWinner(new_squares, symbol)) {
      setWinner(symbol);
    }
    setState(newState);
    setHistory((prevHistory) => [...prevHistory, newState]);
  }

  function get_status() {
    if (winner) {
      return "Winner: " + winner
    }
    return "Next player: " + (state.isXTurn ? "X" : "O")
  }

  return (
    <>
      <div style={{ paddingLeft: '10px' }}>
        <h2>{get_status()}</h2>
        <div className="board-row">
          <Square value={state.squares[0]} onClick={() => {handleSquareClick(0)}}></Square>
          <Square value={state.squares[1]} onClick={() => {handleSquareClick(1)}}></Square>
          <Square value={state.squares[2]} onClick={() => {handleSquareClick(2)}}></Square>
        </div>
        <div className="board-row">
          <Square value={state.squares[3]} onClick={() => {handleSquareClick(3)}}></Square>
          <Square value={state.squares[4]} onClick={() => {handleSquareClick(4)}}></Square>
          <Square value={state.squares[5]} onClick={() => {handleSquareClick(5)}}></Square>
        </div>
        <div className="board-row">
          <Square value={state.squares[6]} onClick={() => {handleSquareClick(6)}}></Square>
          <Square value={state.squares[7]} onClick={() => {handleSquareClick(7)}}></Square>
          <Square value={state.squares[8]} onClick={() => {handleSquareClick(8)}}></Square>
        </div>
        <ol style={{ paddingLeft: 1 }}>
          {history.map((_, index) => (
            <li key={index} style={{ listStyleType: 'none' }}>
              <button style={{ width: '300px', height: '50px' }}onClick={() => {handleButtonClick(index)}}>Turn: {index}</button>
            </li>
          ))}
        </ol>
      </div>
    </>
  )
}

export default function Game() {
  return (
    <Board />
  );
}