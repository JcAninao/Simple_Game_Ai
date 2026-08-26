import { useEffect, useRef, useState } from "react";
import {
    createInitialGame,
    makePlayerMove,
    makeComputerMove
} from "./tictactoe_ai";

import type {
    GameState,
    MoveLog,
    Token
} from "./tictactoe_ai";

function App() {
    const [playerName, setPlayerName] = useState("");
    const [selectedToken, setSelectedToken] = useState<Token>("X");
    const [gameStarted, setGameStarted] = useState(false);
    const [showTokenSelection, setShowTokenSelection] = useState(false);
    const [game, setGame] = useState<GameState | null>(null);

    const gameSectionRef = useRef<HTMLDivElement>(null);

    const startFirstGame = () => {
        const name = playerName.trim() || "You";

        setPlayerName(name);

        const newGame = createInitialGame(
            name,
            selectedToken
        );

        setGame(newGame);
        setGameStarted(true);

        setTimeout(() => {
            gameSectionRef.current?.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }, 100);
    };

    const startNewGame = () => {
        if (!playerName) {
            return;
        }

        setShowTokenSelection(true);
    };

    const confirmNewGame = () => {
        const newGame = createInitialGame(
            playerName,
            selectedToken
        );

        setGame(newGame);
        setShowTokenSelection(false);

        setTimeout(() => {
            gameSectionRef.current?.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }, 100);
    };

    const handlePlayerMove = (
        row: number,
        col: number
    ) => {
        if (
            !game ||
            game.gameOver ||
            game.currentTurn !== game.playerToken
        ) {
            return;
        }

        setGame(
            makePlayerMove(
                game,
                row,
                col
            )
        );
    };

    useEffect(() => {
        if (
            !game ||
            game.gameOver ||
            game.currentTurn !== game.computerToken
        ) {
            return;
        }

        const timer = setTimeout(() => {
            setGame(currentGame => {
                if (
                    !currentGame ||
                    currentGame.gameOver
                ) {
                    return currentGame;
                }

                return makeComputerMove(
                    currentGame
                );
            });
        }, 500);

        return () => clearTimeout(timer);
    }, [game]);

    if (!gameStarted || !game) {
    return (
        <div className="app-container">
            <header className="game-header">
                <div className="container">
                    <h1>Simple Games</h1>
                </div>
            </header>

            <main className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-md-7 col-lg-5">
                        <div className="setup-card card border-0 shadow">
                            <div className="card-body p-4 p-md-5">
                                <h2 className="text-center mb-4">
                                    Tic-Tac-Toe
                                </h2>

                                <div className="mb-3">
                                    <label className="form-label">
                                        Player Name
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        value={playerName}
                                        onChange={e =>
                                            setPlayerName(
                                                e.target.value
                                            )
                                        }
                                        placeholder="Enter your name"
                                        onKeyDown={e => {
                                            if (
                                                e.key === "Enter"
                                            ) {
                                                startFirstGame();
                                            }
                                        }}
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="form-label">
                                        Choose your token
                                    </label>

                                    <div className="d-flex gap-2">
                                        <button
                                            type="button"
                                            className={`btn flex-fill ${
                                                selectedToken === "X"
                                                    ? "btn-primary"
                                                    : "btn-outline-primary"
                                            }`}
                                            onClick={() =>
                                                setSelectedToken("X")
                                            }
                                        >
                                            X
                                        </button>

                                        <button
                                            type="button"
                                            className={`btn flex-fill ${
                                                selectedToken === "O"
                                                    ? "btn-primary"
                                                    : "btn-outline-primary"
                                            }`}
                                            onClick={() =>
                                                setSelectedToken("O")
                                            }
                                        >
                                            O
                                        </button>
                                    </div>

                                    <small className="text-muted d-block mt-2">
                                        X always moves first.
                                    </small>
                                </div>

                                <button
                                    className="btn btn-primary w-100"
                                    onClick={startFirstGame}
                                >
                                    Start Game
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

const statusText = game.gameOver
    ? game.result
    : game.currentTurn === game.playerToken
    ? `${game.playerName}'s turn`
    : "Computer's turn";

    return (
        <div className="app-container">
            <header className="game-header">
                <div className="container">
                    <h1>Simple Games</h1>
                </div>
            </header>

            <div className="container-fluid">
                <div className="row min-vh-100">
                    <aside className="col-lg-3 col-xl-2 game-sidebar">
                        <div className="p-3">
                            <h2 className="sidebar-title">
                                Game Types
                            </h2>

                            <button
                                className="game-link active"
                                type="button"
                            >
                                Tic-Tac-Toe
                            </button>

                            <button
                                className="game-link"
                                type="button"
                                disabled
                            >
                                Sudoku
                            </button>

                            <button
                                className="game-link"
                                type="button"
                                disabled
                            >
                                Connect Four
                            </button>
                        </div>
                    </aside>

                    <main
                        className="col-lg-9 col-xl-10 game-main"
                        ref={gameSectionRef}
                    >
                        <div className="intro">
                            <h2>Tic-Tac-Toe</h2>

                            <p>
                                Play against the computer.
                                Get three of your tokens in
                                a row to win.
                            </p>
                        </div>

                        <div className="row justify-content-center">
                            <div className="col-xl-8">
                                <div className="game-card card border-0 shadow">
                                    <div className="card-body p-3 p-md-4">
                                        <div className="game-info">
                                            <div>
                                                <strong>
                                                    Player:
                                                </strong>{" "}
                                                {
                                                    game.playerName
                                                }
                                            </div>

                                            <div>
                                                <strong>
                                                    Your token:
                                                </strong>{" "}
                                                {
                                                    game.playerToken
                                                }
                                            </div>

                                            <div>
                                                <strong>
                                                    Computer:
                                                </strong>{" "}
                                                {
                                                    game.computerToken
                                                }
                                            </div>
                                        </div>

                                        <div className="status">
                                            {statusText}
                                        </div>

                                        <div className="board">
                                            {game.board.map(
                                                (
                                                    cell,
                                                    index
                                                ) => {
                                                    const row =
                                                        Math.floor(
                                                            index /
                                                                3
                                                        );

                                                    const col =
                                                        index %
                                                        3;

                                                    return (
                                                        <button
                                                            key={
                                                                index
                                                            }
                                                            type="button"
                                                            className={`cell cell-${
                                                                index %
                                                                3
                                                            }`}
                                                            disabled={
                                                                cell !==
                                                                    "" ||
                                                                game.gameOver ||
                                                                game.currentTurn !==
                                                                    game.playerToken
                                                            }
                                                            onClick={() =>
                                                                handlePlayerMove(
                                                                    row,
                                                                    col
                                                                )
                                                            }
                                                        >
                                                            {
                                                                cell
                                                            }
                                                        </button>
                                                    );
                                                }
                                            )}
                                        </div>

                                        <div className="text-center mt-4">
                                            <button
                                                className="btn btn-warning px-4"
                                                onClick={
                                                    startNewGame
                                                }
                                            >
                                                New Game
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-xl-4 mt-4 mt-xl-0">
                                <div className="move-log-card card border-0 shadow">
                                    <div className="card-body">
                                        <h3 className="h5 mb-3">
                                            Move Log
                                        </h3>

                                        {game.movesLog
                                            .length ===
                                        0 ? (
                                            <p className="text-muted mb-0">
                                                No moves yet.
                                            </p>
                                        ) : (
                                            <div className="move-log">
                                                {[
                                                    ...game.movesLog
                                                ]
                                                    .reverse()
                                                    .map(
                                                        (
                                                            move: MoveLog,
                                                            index
                                                        ) => (
                                                            <div
                                                                className="move-item"
                                                                key={`${move.coordinate}-${index}`}
                                                            >
                                                                <span>
                                                                    {
                                                                        move.token
                                                                    }{" "}
                                                                    at{" "}
                                                                    {
                                                                        move.coordinate
                                                                    }
                                                                </span>

                                                                <span>
                                                                    {
                                                                        move.player
                                                                    }
                                                                </span>
                                                            </div>
                                                        )
                                                    )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>

            {showTokenSelection && (
                <div className="modal-backdrop-custom">
                    <div className="token-modal card border-0 shadow">
                        <div className="card-body p-4">
                            <h3 className="text-center mb-3">
                                New Game
                            </h3>

                            <p className="text-center text-muted">
                                Choose your token.
                            </p>

                            <div className="d-flex gap-2 mb-4">
                                <button
                                    type="button"
                                    className={`btn flex-fill ${
                                        selectedToken ===
                                        "X"
                                            ? "btn-primary"
                                            : "btn-outline-primary"
                                    }`}
                                    onClick={() =>
                                        setSelectedToken(
                                            "X"
                                        )
                                    }
                                >
                                    X
                                </button>

                                <button
                                    type="button"
                                    className={`btn flex-fill ${
                                        selectedToken ===
                                        "O"
                                            ? "btn-primary"
                                            : "btn-outline-primary"
                                    }`}
                                    onClick={() =>
                                        setSelectedToken(
                                            "O"
                                        )
                                    }
                                >
                                    O
                                </button>
                            </div>

                            <div className="d-flex gap-2">
                                <button
                                    type="button"
                                    className="btn btn-secondary flex-fill"
                                    onClick={() =>
                                        setShowTokenSelection(
                                            false
                                        )
                                    }
                                >
                                    Cancel
                                </button>

                                <button
                                    type="button"
                                    className="btn btn-primary flex-fill"
                                    onClick={
                                        confirmNewGame
                                    }
                                >
                                    Start Game
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;