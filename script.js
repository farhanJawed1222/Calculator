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

    return num1 + num2;
}

function subtraction(num1, num2) {
    num1 = Number(num1);
    num2 = Number(num2);

    return num1 - num2;
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

function updateDisplay() {
    displayBox.value = `${num1} ${operator} ${num2}`;
}

//-----------------------------------------------------------Event delegation--------------------------------------------------
numberBtns.addEventListener("click", e => {
    let btn = e.target.closest("button");
    if (!btn) return;

    let digit = btn.textContent;

    if (operator === "") {
        if (digit === "." && num1.includes(".")) return;
        if (num1 === "") num1 = "0";
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
        if (num2 === "0" && !(digit.includes("."))) {
            num2 = digit;
        }
        else {
            num2 += digit;
        }
    }
    updateDisplay();
});

operatorBtns.addEventListener("click", e => {
    let btn = e.target.closest("button");
    if (!btn) return;
    let symbol = btn.textContent;

    // adding the guard for another operator
    if (num2 !== "") {
        num1 = getOperator(operator, num1, num2);
        num2 = "";
    }
    operator = symbol;
    updateDisplay();
});

actionBtn.addEventListener("click", e => {
    let btn = e.target.closest("button");
    let symbol = btn.textContent;

    if (symbol === "=") {
        // check if num1 and operator variable is empty
        if (num1 === "" || operator === "" || num2 === "") return;

        num1 = getOperator(operator, num1, num2);
        num2 = "";
        operator = ""
        updateDisplay();
    }

    else if (symbol === "Clear") {
        num1 = "";
        num2 = "";
        operator = "";
        updateDisplay();
    }

    //backspace to remove last character
    else if (symbol === "Back") {

        if (num2 !== "") {
            num2 = num2.slice(0, -1);
        }
        else if (operator !== "" && num2 === "") {
            operator = operator.slice(0, -1);
        }
        else {
            if (num1 === "undefined") {
                num1 = "";
            }
            else {
                num1 = num1.slice(0, -1);
            }
        }
        updateDisplay();
    }
});