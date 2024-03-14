const calculatorDisplay = document.querySelector('h1');
const inputBtns = document.querySelectorAll('button');
const clearBtn = document.getElementById('clear-btn');

let firstValue=0;
let operatorValue='';
let awitNextValue=false;

function sendNumberValue(number) {
  // replace the dispaly a number only when displayed value is 0, if not than add number to displayed value
  if(awitNextValue){
    calculatorDisplay.textContent = number;
    awitNextValue=false;
  }
  else{
    const displayValue=calculatorDisplay.textContent;
    calculatorDisplay.textContent = displayValue == '0' ? number : displayValue+number;
  }
}

const calucation={
    '/':(firstNumber,secondNumber) => firstNumber/secondNumber,
    '*':(firstNumber,secondNumber) => firstNumber*secondNumber,
    '-':(firstNumber,secondNumber) => firstNumber-secondNumber,
    '+':(firstNumber,secondNumber) => firstNumber+secondNumber,
    '=':(firstNumber,secondNumber) => secondNumber,

};
// add demicimal if there is nodcimak in display 
function addDecimal(){
    if(awitNextValue){
        return;
    }
    if(!calculatorDisplay.textContent.includes('.')){
        calculatorDisplay.textContent =`${calculatorDisplay.textContent}.`
    }
}

function addOperator(operator) {
    const currentValue=Number(calculatorDisplay.textContent);
    if(operatorValue && awitNextValue){
        operatorValue=operator;
        return;
    }
    if(!firstValue){
        firstValue=currentValue;
    }else{
        
        const calucate=calucation[operatorValue](firstValue,currentValue);
        calculatorDisplay.textContent=calucate;
        firstValue=calucate
        
    }
    awitNextValue = true;
    operatorValue=operator;

}

// Add Event Listeners for numbers, operators, decimal
inputBtns.forEach((inputBtn) => {
  if (inputBtn.classList.length === 0) {
    inputBtn.addEventListener('click', () => sendNumberValue(inputBtn.value));
  }else if (inputBtn.classList.contains('operator')) {
    inputBtn.addEventListener('click', () => addOperator(inputBtn.value));
  }else if (inputBtn.classList.contains('decimal')) {
    inputBtn.addEventListener('click', () => addDecimal(inputBtn.value));
  }
});

function resetAll(){
    firstValue=0;
    operatorValue='';
    awitNextValue=false;
    calculatorDisplay.textContent = '0';
   
}

clearBtn.addEventListener('click', resetAll);

