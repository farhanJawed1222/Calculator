//---------------------------------------------------------Reference---------------------------------------------------------- 
const numberBtns = document.querySelector(".number__box");
const operatorBtns = document.querySelector(".operators__box");
const displayBox = document.querySelector("#input");
const actionBtn  = document.querySelector(".action__box");

//-----------------------------------------------------------Variable----------------------------------------------------------
let num1 = "";
let num2 = "";
let operator = "";
//---------------------------------------------------------Functions/variables------------------------------------------------

//  function for different calculation

function Addition(num1,num2){
    num1 =Number(num1);
    num2 = Number(num2);

    return num1 + num2;
}

function subtraction(num1,num2){
    num1 =Number(num1);
    num2 = Number(num2);

    return num1 - num2;
}

function MUltiplication(num1,num2){
    num1 =Number(num1);
    num2 = Number(num2);

    return num1 * num2;
}

function Division(num1,num2){
    num1 =Number(num1);
    num2 = Number(num2);
    if(num2 === 0) return "undefined";
    return num1 / num2;
}

function getOperator(operator,num1, num2){
    switch(operator){
        case "+": return Addition(num1,num2);
        case "−": return subtraction(num1,num2);
        case "×": return MUltiplication(num1,num2);
        case "÷": return Division(num1,num2);
    }
}

//-----------------------------------------------------------Event delegation--------------------------------------------------
numberBtns.addEventListener("click", e =>{
    let btn = e.target.closest("button");
    let digit = btn.textContent;

    if(operator === ""){
        num1 += digit;
    }
    else{
        num2 +=digit
    }
    displayBox.value += digit  
});

operatorBtns.addEventListener("click", e =>{
     let btn = e.target.closest("button");
    let symbol = btn.textContent;

    operator = symbol;
    displayBox.value += symbol;
});

actionBtn.addEventListener("click",e =>{
    let btn = e.target.closest("button");
    let symbol = btn.textContent;
    
    if(symbol === "="){
       num1 = getOperator(operator,num1,num2);
       displayBox.value = num1;
       num2 = "";
    }

    else if(symbol === "Clear"){
        num1 = ""
        num2 = ""
        operator = "";
        displayBox.value = "";

    }
});