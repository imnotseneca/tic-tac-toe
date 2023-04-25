//The first line defines a function called "Square". The "export" JavaScript keyword makes this function accessible outside of this file. The "default" keyword tells other files using your code that it’s the main function in your file.
  //The second line returns a button. The return JavaScript keyword means whatever comes after is returned as a value to the caller of the function. <button> is a JSX element. A JSX element is a combination of JavaScript code and HTML tags that describes what you’d like to display. className="square" is a button property or prop that tells CSS how to style the button. X is the text displayed inside of the button and </button> closes the JSX element to indicate that any following content shouldn’t be placed inside the button.
  import { useState } from "react";

function Square({ value, onSquareClick }) {

  return <button className="square" onClick={onSquareClick}> {value} </button>

}


export default function Board() {
  const [xIsNext, setXIsNext] = useState(true);
  //Array(9).fill(null) creates an array with nine elements and sets each of them to null. The useState() call around it declares a squares state variable that’s initially set to that array. Each entry in the array corresponds to the value of a square. When you fill the board in later, the squares array will look like this:
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [history, setHistory] = useState([]);

  function handleClick(i) {
    if(squares[i] || calculateWinner(squares)) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
    const winner = calculateWinner(nextSquares);
    if(winner || nextSquares.every(square => square)) {
      const date = new Date();
      setHistory(prevHistory => [...prevHistory, {winner, date}])
    } else if (nextSquares.every(square => square)) {
      const date = new Date();
      setHistory((prevHistory) => [...prevHistory, {winner: "empate", date}])
    }
  }

    const winner = calculateWinner(squares);
    let status;
    if (winner === "empate"){
      status = "Empate!"
    }
    else if(winner) {
        status = `Ganó: ${winner}`
      }
     else {
      status = "Próximo turno: " + (xIsNext ? "X" : "O");
    }

  function handleReset (){
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  }

  function handleMatchHistoryReset() {
    setHistory([])
  }

  function MatchHistory ({history}) {
    return (
      <div>
        <h2>Historial de partidas:</h2>
        <ul className="match-history">
          {history.map(({winner, date}, index) => 
          <li key={index}>
            <span className="history-player">{winner !== "empate" ? `"${winner}"`: undefined }</span>
            <span className="history-result">{winner === "empate" ? "Se empató un partido en el" : `ganó un partido en el`} <span className="date-history">{date.toLocaleString()}</span></span>
          </li>
          )}
        </ul>
      </div>
    )
  }

  return (
  <><div className="center-div">
    <div>
      <h1>Ta-Te-Ti</h1>
    </div>
      <div className="status">
        <h2>
        {status}
        </h2>
        </div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)}/>
        <Square value={squares[1]} onSquareClick={() => handleClick(1)}/>
        <Square value={squares[2]} onSquareClick={() => handleClick(2)}/>
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)}/>
        <Square value={squares[4]} onSquareClick={() => handleClick(4)}/>
        <Square value={squares[5]} onSquareClick={() => handleClick(5)}/>
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)}/>
        <Square value={squares[7]} onSquareClick={() => handleClick(7)}/>
        <Square value={squares[8]} onSquareClick={() => handleClick(8)}/>
      </div>
      <div>
      <button className="restart-button" onClick={handleReset}>Jugar otra</button>
      </div>
      <MatchHistory history={history} />
      <div>
      <button className="restart-button" onClick={handleMatchHistoryReset}>Reiniciar historial</button>
      </div>
  </div>
  </>
  );
}


function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for(let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  if (squares.filter(square => square === null).length === 0) {
    return "empate";
  }
  return null;
}
