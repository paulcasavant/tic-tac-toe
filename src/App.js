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
    isXTurn: true
  });

  const [ history, setHistory ] = useState([state]);

  const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]

  function handleButtonClick(index) {
    setState((prevState) => ({
      ...prevState,
      squares: history[index].squares}));
    setHistory((oldHistory) => oldHistory.slice(0, index + 1));
  }

  function calculateWin() {
    for (const sqr of state.squares) {
    }
  }

  function handleSquareClick(index) {
    // Return early if square at index already has a value
    if (state.squares[index] != null) {
      return;
    }

    let new_squares = state.squares.slice();
    new_squares[index] = state.isXTurn ? "X" : "O";

    const newState = {
      squares: new_squares,
      isXTurn: !state.isXTurn
    }

    setState(prevState => (
      {
        isXTurn: !prevState.isXTurn,
        squares: new_squares
      }
    ));
    setHistory((oldHistory) => ([...oldHistory, newState]));
    calculateWin()
  }

  return (
    <>
      <div style={{ paddingLeft: '10px' }}>
        <h1>Next player: {state.isXTurn ? "X" : "O"} </h1>
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
          {history.map((item, index) => (
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