//---------------------------------------------------------Reference---------------------------------------------------------- 
const numberBtns = document.querySelector(".number__box");
const operatorBtns = document.querySelector(".operators__box");
const displayBox = document.querySelector("#input");
const actionBtn = document.querySelector(".action__box");

//-----------------------------------------------------------Variable----------------------------------------------------------
let num1 = "";
let num2 = "";
let operator = "";
//---------------------------------------------------------Functions/variables------------------------------------------------

//  function for different calculation

function Addition(num1, num2) {
    num1 = Number(num1);
    num2 = Number(num2);

    return Math.round((num1 + num2) * 1000) / 1000;
}

function subtraction(num1, num2) {
    num1 = Number(num1);
    num2 = Number(num2);

    return Math.round((num1 - num2) * 1000) / 1000;
}

function multiplication(num1, num2) {
    num1 = Number(num1);
    num2 = Number(num2);

    return Math.round((num1 * num2) * 1000) / 1000;
}

function Division(num1, num2) {
    num1 = Number(num1);
    num2 = Number(num2);
    if (num2 === 0) return "undefined";
    return Math.round((num1 / num2) * 1000) / 1000;
}

function getOperator(operator, num1, num2) {
    switch (operator) {
        case "+": return Addition(num1, num2);
        case "−": return subtraction(num1, num2);
        case "×": return multiplication(num1, num2);
        case "÷": return Division(num1, num2);
    }
}
// function to get numbers for calculation
function handleNumbers(digit) {
    if (operator === "") {
        if (digit === "." && num1.includes(".")) return;
        if (num1 === "") num1 = "0";
        if (num1 === "-" && digit.includes(".")) num1 = "-0";
        if (num1 === "0" && !(digit.includes("."))) {
            num1 = digit
        }
        else {
            num1 += digit;
        }
    }
    else {
        if (digit === "." && num2.includes(".")) return;
        if (num2 === "") num2 = "0";
        if (num2 === "-" && digit.includes(".")) num2 = "-0";
        if (num2 === "0" && !(digit.includes("."))) {
            num2 = digit;
        }
        else {
            num2 += digit;
        }
    }
}

// function to get operator for calculation
function handleOperator(symbol) {
    // adding the guard for another operator
    if (num2 !== "" && num2 !== "-") {
        num1 = getOperator(operator, num1, num2);
        num2 = "";
        operator = "";
    }

    // If the previous result was a divide-by-zero error ("undefined"),
    // discard the new operator press instead of chaining off a broken num1
    if (num1 === "undefined") {
        operator = "";
    }
    else {
        if (num1 === "" && symbol !== "−") return;

        if (num1 === "" && symbol === "−") {
            num1 += "-";
        }
        //num2 get - if operator is not addition and subtraction
        else if ((operator !== "+" && operator !== "−") && num2 === "" && symbol === "−") {
            num2 += "-";
        }
        else if (num1 === "-" || num2 === "-") {
            return;
        }

        else {
            operator = symbol;
        }
    }
}

// function for give result output
function handleResult() {
    if (num1 === "" || operator === "" || num2 === "" || num2 === "-") return;
    num1 = getOperator(operator, num1, num2);
    num2 = "";
    operator = ""
}

//function for clear functionality
function handleClear() {
    num1 = "";
    num2 = "";
    operator = "";
}

// function to handle backspace
function handleBackspace() {
    if (num2 !== "") {
        num2 = num2.slice(0, -1);
    }
    else if (operator !== "" && num2 === "") {
        operator = operator.slice(0, -1);
    }
    else {
        // converting num1 to string 
        num1 = String(num1).slice(0, -1);
    }
}
function updateDisplay() {
    displayBox.value = `${num1} ${operator} ${num2}`;
}

function clearUndefinedResult() {
    if (num1 === "undefined") num1 = "0";
}

//-----------------------------------------------------------Event delegation--------------------------------------------------
numberBtns.addEventListener("click", e => {
    let btn = e.target.closest("button");
    if (!btn) return;

    let digit = btn.textContent;
    handleNumbers(digit);
    updateDisplay();
});

operatorBtns.addEventListener("click", e => {
    let btn = e.target.closest("button");
    if (!btn) return;
    let symbol = btn.textContent;
    handleOperator(symbol);
    updateDisplay();

    //reset num1 from "undefined" back to "0" after a divide-by-zero result.
    clearUndefinedResult();
});

actionBtn.addEventListener("click", e => {
    let btn = e.target.closest("button");
    let command = btn.textContent;

    if (command === "=") {
        handleResult();
        updateDisplay();
        //reset num1 from "undefined" back to "0" after a divide-by-zero result.
        clearUndefinedResult();
    }

    else if (command === "Clear") {
        handleClear();
        updateDisplay();
    }

    //backspace to remove last character
    else if (command === "Back") {
        handleBackspace();
        updateDisplay();
    }
});