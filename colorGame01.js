// notice properties takeTurn and id are being passed in
const Square = ({ id, newState }) => {
    const [color, setColor] = React.useState("green");
    const [status, setStatus] = React.useState(null);
    const xo = ["O", "X"];

    const palet = ["blue", "red", "green"];
    const getRandomColor = () => palet[Math.floor(Math.random() * 3)];
    // id is the square's number
    // We call takeTurn to tell Parent we have clicked in this square
    React.useEffect(() => {
        console.log(`Render ${id}`);
        return () => console.log(`unmounting Square ${id}`);
    });
  
    return (
      <button

        onClick={(e) => {
          let col = getRandomColor();
          setColor(col);
          let nextPlayer = newState(id);
          setStatus(nextPlayer);
          e.target.style.background = col;
        }}

      >
          <h2>{xo[status]}</h2>
      </button>
    );
  };
  
  const Board = () => {
    const [player, setPlayer] = React.useState(1);
    const [state, setState] = React.useState(Array(9).fill(null));

    let status = `Player ${player}, make your move ...`;
    let winner = checkWinner(state);
    if(winner != null) status = `Player ${winner} wins!`;

    function checkWinner(state) {
        // state is an array of 0 , 1 and null
    
        const win = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
    
        for ( let i=0; i < win.length; i++) {
            const [a, b, c] = win[i];
            if (state[a] == state[b] && state[a] == state[c] && state[a])
                return state[a];
        }
        return null;
    }



    const newState = idOfSquare => {
        let thePlayer = player
        state[idOfSquare] = player; // player is present player
        setState(state); // state is an array of 0, 1 or null
        let nextplayer = (player + 1) % 2;
        setPlayer(nextplayer);
        return thePlayer; // we need to return the present player
    }

    function renderSquare(i) {
      // use properties to pass callback function takeTurn to Child
      return <Square id={i} player={player} newState={newState}></Square>;
    }

    return (
      <div className="game-board">
        <div className="grid-row">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className="grid-row">
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className="grid-row">
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
        <div id="info">
            <button className="extraButtons">Show/Hide Row</button>
            <button className="extraButtons">Re-render</button>
          <h1> {status} </h1>
        </div>
      </div>
    );
  };
  
  // ========================================
  
  ReactDOM.render(<Board />, document.getElementById("root"));
  