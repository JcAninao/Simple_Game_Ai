export type Token = "X" | "O";
export type Cell = Token | "";

export interface MoveLog {
    token: Token;
    coordinate: string;
    player: string;
}

export interface GameState {
    board: Cell[];
    playerName: string;
    playerToken: Token;
    computerToken: Token;
    currentTurn: Token;
    gameOver: boolean;
    result: string;
    isComputerFirstToMove: boolean;
    isComputerFirstMoveDone: boolean;
    movesLog: MoveLog[];
}

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const coordinates = [
    "1A",
    "1B",
    "1C",
    "2A",
    "2B",
    "2C",
    "3A",
    "3B",
    "3C"
];

export function createInitialGame(
    playerName: string,
    playerToken: Token
): GameState {
    const computerToken: Token =
        playerToken === "X" ? "O" : "X";

    const game: GameState = {
        board: Array(9).fill(""),
        playerName,
        playerToken,
        computerToken,
        currentTurn: "X",
        gameOver: false,
        result: "",
        isComputerFirstToMove: computerToken === "X",
        isComputerFirstMoveDone: false,
        movesLog: []
    };

    if (computerToken === "X") {
        return makeComputerMove(game);
    }

    return game;
}

function checkWinner(
    board: Cell[],
    token: Token
): boolean {
    return winningCombinations.some(combination =>
        combination.every(index => board[index] === token)
    );
}

function isBoardFull(board: Cell[]): boolean {
    return board.every(cell => cell !== "");
}

function getResultAfterMove(
    board: Cell[],
    token: Token,
    playerName: string,
    computerToken: Token
): string {
    if (checkWinner(board, token)) {
        return token === computerToken
            ? "Computer wins!"
            : `${playerName} wins!`;
    }

    if (isBoardFull(board)) {
        return "It's a draw!";
    }

    return "";
}

function addMove(
    game: GameState,
    token: Token,
    coordinate: string,
    player: string
): GameState {
    return {
        ...game,
        movesLog: [
            ...game.movesLog,
            {
                token,
                coordinate,
                player
            }
        ]
    };
}

export function makePlayerMove(
    game: GameState,
    row: number,
    col: number
): GameState {
    if (
        game.gameOver ||
        game.currentTurn !== game.playerToken
    ) {
        return game;
    }

    const index = row * 3 + col;

    if (game.board[index] !== "") {
        return game;
    }

    const board = [...game.board];
    board[index] = game.playerToken;

    let updatedGame: GameState = {
        ...game,
        board,
        currentTurn: game.computerToken
    };

    updatedGame = addMove(
        updatedGame,
        game.playerToken,
        coordinates[index],
        game.playerName
    );

    const result = getResultAfterMove(
        board,
        game.playerToken,
        game.playerName,
        game.computerToken
    );

    if (result) {
        return {
            ...updatedGame,
            gameOver: true,
            result
        };
    }

    return updatedGame;
}

export function makeComputerMove(
    game: GameState
): GameState {
    if (
        game.gameOver ||
        game.currentTurn !== game.computerToken
    ) {
        return game;
    }

    const board = [...game.board];

    let moveIndex = -1;

    if (
        !game.isComputerFirstMoveDone &&
        game.isComputerFirstToMove
    ) {
        if (board[0] === "") {
            moveIndex = 0;
        }

        if (moveIndex !== -1) {
            board[moveIndex] = game.computerToken;

            let updatedGame: GameState = {
                ...game,
                board,
                currentTurn: game.playerToken,
                isComputerFirstMoveDone: true
            };

            updatedGame = addMove(
                updatedGame,
                game.computerToken,
                coordinates[moveIndex],
                "Computer"
            );

            return finishComputerTurn(updatedGame);
        }
    }

    moveIndex = findWinningMove(
        board,
        game.computerToken
    );

    if (moveIndex !== -1) {
        return placeComputerMove(game, moveIndex);
    }

    if (game.isComputerFirstMoveDone) {
        moveIndex = findWinningMove(
            board,
            game.playerToken
        );

        if (moveIndex !== -1) {
            return placeComputerMove(game, moveIndex);
        }
    }

    if (
        !game.isComputerFirstToMove &&
        !game.isComputerFirstMoveDone
    ) {
        if (board[4] === "") {
            return placeComputerMove(game, 4, true);
        }

        if (board[0] === "") {
            return placeComputerMove(game, 0, true);
        }

        if (board[2] === "") {
            return placeComputerMove(game, 2, true);
        }
    }

    if (game.isComputerFirstMoveDone) {
        moveIndex = findStrategicMove(game);

        if (moveIndex !== -1) {
            return placeComputerMove(game, moveIndex);
        }
    }

    const emptyCells = board
        .map((cell, index) =>
            cell === "" ? index : -1
        )
        .filter(index => index !== -1);

    if (emptyCells.length > 0) {
        const randomIndex = Math.floor(
            Math.random() * emptyCells.length
        );

        return placeComputerMove(
            game,
            emptyCells[randomIndex]
        );
    }

    return game;
}

function placeComputerMove(
    game: GameState,
    index: number,
    markFirstMoveDone = false
): GameState {
    const board = [...game.board];

    if (board[index] !== "") {
        return game;
    }

    board[index] = game.computerToken;

    let updatedGame: GameState = {
        ...game,
        board,
        currentTurn: game.playerToken,
        isComputerFirstMoveDone:
            game.isComputerFirstMoveDone ||
            markFirstMoveDone
    };

    updatedGame = addMove(
        updatedGame,
        game.computerToken,
        coordinates[index],
        "Computer"
    );

    return finishComputerTurn(updatedGame);
}

function finishComputerTurn(
    game: GameState
): GameState {
    const result = getResultAfterMove(
        game.board,
        game.computerToken,
        game.playerName,
        game.computerToken
    );

    if (result) {
        return {
            ...game,
            gameOver: true,
            result
        };
    }

    return game;
}

function findWinningMove(
    board: Cell[],
    token: Token
): number {
    for (const combination of winningCombinations) {
        const values = combination.map(
            index => board[index]
        );

        const tokenCount = values.filter(
            value => value === token
        ).length;

        const emptyCount = values.filter(
            value => value === ""
        ).length;

        if (tokenCount === 2 && emptyCount === 1) {
            return combination.find(
                index => board[index] === ""
            ) as number;
        }
    }

    return -1;
}

function findStrategicMove(
    game: GameState
): number {
    const board = game.board;
    const computer = game.computerToken;
    const player = game.playerToken;

    if (board[0] === computer) {
        if (
            board[2] === "" &&
            board[1] !== player
        ) {
            return 2;
        }

        if (
            board[6] === "" &&
            board[3] !== player
        ) {
            return 6;
        }
    }

    if (board[2] === computer) {
        if (
            board[0] === "" &&
            board[1] !== player
        ) {
            return 0;
        }

        if (
            board[8] === "" &&
            board[5] !== player
        ) {
            return 8;
        }
    }

    if (
        board[0] === computer &&
        board[8] === ""
    ) {
        return 8;
    }

    if (
        board[2] === computer &&
        board[6] === ""
    ) {
        return 6;
    }

    return -1;
}