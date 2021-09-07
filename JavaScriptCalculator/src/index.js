
const display = document.querySelector("#display"),
    numberKeys = document.querySelectorAll("button[data-action='number']"),
    operatorKeys = document.querySelectorAll("button[data-action='operator']"),
    dotKey = document.querySelector("button[data-action='dot']"),
    clearKey = document.querySelector("button[data-action='clear']"),
    equalKey = document.querySelector("button[data-action='equal']"),
    switchKey = document.querySelector("button[data-action='switch']"),
    tips = document.querySelector('#tips'),
    powerState = document.querySelector('#powerState');

const calculator = new Calculator();

for (const numberKey of numberKeys) {
    numberKey.addEventListener('click', function () {
        calculator.currentState.pressNumberKey(this.textContent);
    })
}

for (const operatorKey of operatorKeys) {
    operatorKey.addEventListener('click', function () {
        calculator.currentState.pressOperatorKey(this.textContent);
    })
}

dotKey.addEventListener('click', function () {
    calculator.currentState.pressDotKey(this.textContent);
})

equalKey.addEventListener('click', function () {
    calculator.currentState.pressEqualsKey();
})
clearKey.addEventListener('click', function () {
    calculator.currentState.pressClearKey();
})
switchKey.addEventListener('click', function () {

    calculator.currentState.pressSwitchKey();
})


