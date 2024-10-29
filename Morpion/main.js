const mainMenu = document.getElementById("mainMenu");
const playButton = document.getElementById("playButton");

let isPlayer = true;
let isClassic = true;
let isInfinty = false;

const gameOverlay = document.getElementById("gameOverlay")
const gameBoard = document.getElementById("gameBoard");
const endMenu = document.getElementById("endMenu");
const leaveButton = document.getElementById("leave");
const replayButton = document.getElementById("replay");
const settingsButton = document.getElementById("settings");
const announce = document.getElementById("announce");
replayButton.addEventListener("click", () => start());
leaveButton.addEventListener("click", () => leave());
settingsButton.addEventListener("click", () => leave());
let board = []
let winningLines = []

function leave() {
    board = [];
    winningLines = [];
    mainMenu.classList.add("active");
    gameOverlay.classList.remove("active");
    endMenu.classList.remove("active");
    gameBoard.classList.remove("active");
    gameBoard.innerText = "";
    isPlayer = true;
    isClassic = true;
    isConnectFour = false;
}

function start() {
    mainMenu.classList.remove("active");
    endMenu.classList.remove("active");
    gameOverlay.classList.remove("blur")
    isPlayer = document.getElementById("player").checked;
    isClassic = document.getElementById("classic").checked;
    isConnectFour = document.getElementById("connectFour").checked;
    generateGrid();
    generateWinningLines();
}

function generateGrid() {
    gameBoard.innerText = "";
    let addedDelay = 0;
    let speed = 0;
    if (isConnectFour) {
        board = Array.from({ length: 6 }, () => Array(7).fill(''));
        gameBoard.classList.remove("three");
        gameBoard.classList.add("four");
        speed = 25;
    } else {
        board = Array.from({ length: 3 }, () => Array(3).fill(''));
        gameBoard.classList.add("three");
        gameBoard.classList.remove("four");
        speed = 100;
    }

    board.forEach((x, xi) => {
        x.forEach((y, yi) => {
            const slot = document.createElement("div");
            slot.classList.add('slot');
            slot.dataset.x = xi;
            slot.dataset.y = yi;
            slot.style.animationDelay = addedDelay + 'ms';
            addedDelay += speed;
            slot.addEventListener("click", () => {
                if (!isPlayer && currentPlayer != "x") return;
                play(xi, yi)
            });
            gameBoard.appendChild(slot);
        })
    })
    leaveButton.classList.add("active");
    gameOverlay.classList.add("active");
}

function generateWinningLines() {
    let timing = performance.now();
    let lineSize = 3;
    if (isConnectFour) {
        lineSize = 4;
    }

    let boardHorizontal = board.length;
    let boardVertical = board[0].length;
    for (let x = 0; x < boardHorizontal; x++) {
        for (let y = 0; y < boardVertical; y++) {

            // Horizontal (-)
            if (y + lineSize <= boardVertical) {
                const horizontalLine = [];
                for (let i = 0; i < lineSize; i++) {
                    horizontalLine.push([x, y + i]);
                }
                winningLines.push(horizontalLine);
            }

            // Vertical (|)
            if (x + lineSize <= boardHorizontal) {
                const verticalLine = [];
                for (let i = 0; i < lineSize; i++) {
                    verticalLine.push([x + i, y]);
                }
                winningLines.push(verticalLine);
            }

            // Diagonale (\)
            if (x + lineSize <= boardHorizontal && y + lineSize <= boardVertical) {
                const diagLine1 = [];
                for (let i = 0; i < lineSize; i++) {
                    diagLine1.push([x + i, y + i]);
                }
                winningLines.push(diagLine1);
            }

            // Diagonale (/)
            if (x + lineSize <= boardHorizontal && y - lineSize + 1 >= 0) {
                const diagLine2 = [];
                for (let i = 0; i < lineSize; i++) {
                    diagLine2.push([x + i, y - i]);
                }
                winningLines.push(diagLine2);
            }
        }
    }
    console.log("Timming: " + (performance.now() - timing) + "ms")
}

let currentPlayer = "x";
function play(x, y) {
    if (isConnectFour) {
        console.log("x: " + x + " y: " + y);
        if (board[0][y] != "") return;
        for (let i = 0; i < board.length; i++) {
            if (i == 5 && board[i][y] == "") {
                board[i][y] = currentPlayer;
                document.querySelector('[data-x="' + i + '"][data-y="' + y + '"]').textContent = currentPlayer;
                break;
            }
            if (board[i][y] != "") {
                board[i - 1][y] = currentPlayer;
                document.querySelector('[data-x="' + (i - 1) + '"][data-y="' + y + '"]').textContent = currentPlayer;
                break;
            }
        }

    } else {
        if (board[x][y] == "") {
            board[x][y] = currentPlayer;
            document.querySelector('[data-x="' + x + '"][data-y="' + y + '"]').textContent = currentPlayer;
        } else {
            return;
        }
    }

    result = checkWinner();
    if (result.winner || result.egality) {
        console.log(result.winner)
        console.log(result.egality)
        drawEnd(result);
        return;
    }

    currentPlayer = currentPlayer == "x" ? "o" : "x";
    if (!isPlayer && currentPlayer == "o") {
        let x = random(0, board.length - 1);
        let y = random(0, board[0].length - 1);
        if (isConnectFour) {
            while (board[0][y] != "") {
                x = 0;
                y = random(0, board[0].length - 1);
            }
        } else {
            while (board[x][y] != "") {
                x = random(0, board.length - 1);
                y = random(0, board[0].length - 1);
            }
        }
        setTimeout(() => {
            play(x, y);
        }, 500);

    }
}

function checkWinner() {
    for (const line of winningLines) {
        const [x0, y0] = line[0];
        const symbol = board[x0][y0];
        if (!symbol) continue;

        let isWinningLine = line.every(([x, y]) => board[x][y] === symbol);
        if (isWinningLine) {
            return { winner: symbol, winningLine: line, egality: false };
        }

        const isBoardFull = board.every(row => row.every(cell => cell !== ""));
        if (isBoardFull) {
            return { winner: null, winningLine: null, egality: true };
        }
    }
    return { winner: null, winningLine: null, egality: false };
}

function drawEnd(result) {
    if (result.winner) {
        result.winningLine.forEach(([x, y]) => {
            const slot = document.querySelector("[data-x='" + x + "'][data-y='" + y + "']");
            slot.classList.add("win")
        })
        announce.innerText = "Victoire de " + result.winner;
    } else {
        announce.innerText = "Egalité";
    }
    leaveButton.classList.remove("active");
    gameOverlay.classList.add("blur");
    endMenu.classList.add("active");
}

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}