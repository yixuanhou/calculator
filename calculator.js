let runningTotal = 0;
let buffer = "0";
let previousOperator = null;
const screen = document.querySelector(".cal-screen")

document.querySelector(".cal-buttons").addEventListener("click", function(event) {
buttonClick(event.target.innerText);
})
function buttonClick(value) {
    if (isNaN(parseInt(value))) {
        handleSymbol(value);
    } else {
        handleNumber(value);
    }
}
function handleNumber(value) {
    if (buffer === "0") {
        buffer = value;
    } else {
        buffer += value;
    }
    reRender();
}
function handleSymbol(value) {
    switch (value) {
        case "C":
            buffer = "0";
            runningTotal = 0;
            previousOperatior = null;
            break;
        case "=":
            if (previousOperator === null) {
                return;
            } 
            flushOpeation(parseInt(buffer));
            buffer = " " + runningTotal;
            runningTotal = 0;
            previousOperator = null;
            break;
        case "↩︎":
            if (buffer.length === 1) {
                buffer = "0";
            } else {
                buffer = buffer.substring(0, buffer.length - 1);
            }
            break;
        default:
            handleMath(value);
    }
    reRender();
}
function handleMath(value) {
    const intBuffer = parseInt(buffer);
    if (runningTotal === 0) {
        runningTotal = intBuffer;
    } else {
        flushOpeation(intBuffer);
    }
    previousOperator = value;
    buffer = "0";
}
function flushOpeation (intBuffer) {
    if (previousOperator === "+") {
        runningTotal += intBuffer;
    } else if (previousOperator === "x") {
        runningTotal *= intBuffer;
    } else if (previousOperator === "-") {
        runningTotal -= intBuffer;
    } else {
        runningTotal /= intBuffer;
    }
}
function reRender() {
    screen.innerText = buffer;
}