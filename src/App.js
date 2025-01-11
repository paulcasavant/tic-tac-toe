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

  function handleClick(index) {
    // Return early if square at index already has a value
    if (state.squares[index] != null) {
      return;
    }

    let new_squares = state.squares.slice();
    new_squares[index] = state.isXTurn ? "X" : "O";

    setState(prevState => (
      {
        isXTurn: !prevState.isXTurn,
        squares: new_squares
      }
    ));
  }

  return (
    <>
      <h1>Next player: {state.isXTurn ? "X" : "O"} </h1>
      <button onClick={handleClick}>Click</button>
      <div className="board-row">
        <Square value={state.squares[0]} onClick={() => {handleClick(0)}}></Square>
        <Square value={state.squares[1]} onClick={() => {handleClick(1)}}></Square>
        <Square value={state.squares[2]} onClick={() => {handleClick(2)}}></Square>
      </div>
      <div className="board-row">
        <Square value={state.squares[3]} onClick={() => {handleClick(3)}}></Square>
        <Square value={state.squares[4]} onClick={() => {handleClick(4)}}></Square>
        <Square value={state.squares[5]} onClick={() => {handleClick(5)}}></Square>
      </div>
      <div className="board-row">
        <Square value={state.squares[6]} onClick={() => {handleClick(6)}}></Square>
        <Square value={state.squares[7]} onClick={() => {handleClick(7)}}></Square>
        <Square value={state.squares[8]} onClick={() => {handleClick(8)}}></Square>
      </div>
    </>
  )
}

export default function Game() {
  return (
    <Board />
  );
}