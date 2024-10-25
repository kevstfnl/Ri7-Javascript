const canvas = document.getElementById("stage");
const ctx = canvas.getContext('2d');
const input = document.getElementById("letter");
const sendButton = document.getElementById("send");
const maskedWord = document.getElementById("maskedWord");
const used = document.getElementById("used");

let error = 0;
let usedLetters = [];
let word = "";
let masked = "";

async function main() {
    word = await getRandomWord();
    masked = ".".repeat(word.length);
    maskedWord.textContent = masked;
}

async function getRandomWord() {
    try {
        const response = await fetch("https://trouve-mot.fr/api/random");
        const data = await response.json();
        return data[0].name;
    } catch (err) {
        console.error(err);
    }
}

function checkLetter(letter) {
    let charList = masked.split("");
    let hasChanged = false;
    for (let i = 0; i < charList.length; i++) {
        if (word[i] == letter) {
            charList[i] = letter;
            hasChanged = true;
        }
    }
    masked = charList.join().replaceAll(",", "");
    return hasChanged;
}

function userEntry() {
    let val = input.value;
    if (val && !usedLetters.includes(val)) {
        usedLetters.push(val);
        used.textContent = usedLetters;

        input.value = "";
        if (checkLetter(val)) {
            maskedWord.textContent = masked;
            if (!masked.includes(".")) {
                alert("Victoire")
            }
        } else {
            handleError();
        }
    }
}

function handleError() {
    error++;
    switch (error) {
        case 1: {
            ctx.beginPath();
            ctx.lineCap = 'round';
            ctx.lineWidth = "10";
            ctx.lineJoin = 'round';
            ctx.strokeStyle = "black";
            ctx.moveTo(45, 295);
            ctx.lineTo(15, 295);
            ctx.stroke();
            break;
        }
        case 2: {
            ctx.moveTo(30, 295);
            ctx.lineTo(30, 5);
            ctx.stroke();
            break;
        }
        case 3: {
            ctx.lineTo(210, 5);
            ctx.stroke();
            break;
        }
        case 4: {
            ctx.lineTo(210, 50);
            ctx.stroke();
            break;
        }
        case 5: {
            ctx.moveTo(30, 50);
            ctx.lineTo(80, 5);
            ctx.stroke();
            break;
        }
        case 6: {
            ctx.beginPath();
            ctx.fillStyle = "black";
            ctx.arc(210, 50, 20, 0, Math.PI * 2);
            ctx.fill();
            break;
        }
        case 7: {
            ctx.beginPath();
            ctx.strokeStyle = "black";
            ctx.moveTo(210, 50);
            ctx.lineTo(210, 150);
            ctx.stroke();
            break;
        }
        case 8: {
            ctx.beginPath();
            ctx.moveTo(210, 80);
            ctx.lineTo(170, 110);
            ctx.stroke();
            break;
        }

        case 9: {
            ctx.beginPath();
            ctx.moveTo(210, 80);
            ctx.lineTo(250, 110);
            ctx.stroke();
            break;
        }
        case 10: {
            ctx.beginPath();
            ctx.moveTo(210, 150);
            ctx.lineTo(190, 200);
            ctx.stroke();
            break;
        }
        case 11: {
            ctx.beginPath();
            ctx.moveTo(210, 150);
            ctx.lineTo(230, 200);
            ctx.stroke();
            ctx.beginPath();
            ctx.fillStyle = "black";
            ctx.arc(210, 50, 20, 0, Math.PI * 2);
            ctx.fill();
            alert("Defaite, le mot etais: " + word)
            break;
        }
        default: {
            error = 0;
            ctx.clearRect(0, 0, 300, 300);
        }
    }
}

sendButton.addEventListener('click', userEntry)
document.addEventListener('keydown', (e) => { if (e.key == "Enter") userEntry(); })
main();