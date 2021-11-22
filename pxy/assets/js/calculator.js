
class UnlimitedState {
    constructor(calculator) {
        this.calculator = calculator;
    }
    pressNumberKey(textContent) {
        this.calculator.removeErrorMsg();
        this.calculator.appendNumberCharacter(textContent);
        this.calculator.ChangeStateTo(this.calculator.unlimitedState);
    }
    pressOperatorKey(textContent) {
        this.calculator.removeErrorMsg();
        this.calculator.appendDotOrOperatorCharacter(textContent);
        this.calculator.ChangeStateTo(this.calculator.onlyNumberKey);
    }
    pressDotKey(textContent) {
        this.calculator.removeErrorMsg();
        this.calculator.appendDotOrOperatorCharacter(textContent);
        this.calculator.ChangeStateTo(this.calculator.limitedDotKey);
    }
    pressEqualsKey() {
        this.calculator.removeErrorMsg();
        this.calculator.calaulatedExpression(this.calculator.display.value);
        this.calculator.display.value.indexOf('.') === -1 ?
            this.calculator.ChangeStateTo(this.calculator.calculatiedComplete) :
            this.calculator.ChangeStateTo(this.calculator.limitedDotKey);
    }
    pressSwitchKey() {
        this.calculator.removeErrorMsg();
        this.calculator.setPowerStateText('Power:Off')
        this.calculator.ChangeStateTo(this.calculator.powerOffState);
        this.calculator.display.value = '';
    }
    pressClearKey() {
        this.calculator.removeErrorMsg();
        this.calculator.toZero();
        this.calculator.ChangeStateTo(this.calculator.unlimitedState);
    }

}

class PowerOffState extends UnlimitedState {

    pressNumberKey(textContent) {
        this.calculator.errorMsg(`没有开机!`, false);
    }
    pressOperatorKey(textContent) {
        this.calculator.errorMsg(`没有开机!`, false);
    }
    pressDotKey(textContent) {
        this.calculator.errorMsg(`没有开机!`, false);
    }
    pressEqualsKey() {
        this.calculator.errorMsg(`没有开机!`, false);
    }
    pressSwitchKey() {
        this.calculator.removeErrorMsg();
        this.calculator.ChangeStateTo(this.calculator.unlimitedState);
        this.calculator.display.value = '0';
        this.calculator.setPowerStateText('Power:On')
    }
    pressClearKey() {
        this.calculator.errorMsg(`没有开机!`, false);
    }
}

class LimitedDotKey extends UnlimitedState {
    pressNumberKey(textContent) {
        this.calculator.removeErrorMsg();
        this.calculator.appendNumberCharacter(textContent);
    }
    pressDotKey(textContent) {
        this.calculator.errorMsg(`不能输入'.'号！`);
    }

}

class CalculatiedComplete extends UnlimitedState {
    pressNumberKey(textContent) {
        this.calculator.removeErrorMsg();
        this.calculator.newLine(textContent);
        this.calculator.ChangeStateTo(this.calculator.unlimitedState);
    }

}

class OnlyNumberKey extends UnlimitedState {
    pressOperatorKey() {
        this.calculator.errorMsg(`只能输入数字！`);
    }
    pressDotKey() {
        this.calculator.errorMsg(`只能输入数字！`);
    }
    pressEqualsKey() {
        this.calculator.errorMsg(`只能输入数字！`);
    }

}

class Calculator {

    constructor() {
        this.unlimitedState = new UnlimitedState(this);
        this.limitedDotKey = new LimitedDotKey(this);
        this.onlyNumberKey = new OnlyNumberKey(this);
        this.calculatiedComplete = new CalculatiedComplete(this);
        this.powerOffState = new PowerOffState(this);
        this.currentState = this.powerOffState;
        this.display = display;
        this.tips = tips;
        this.powerState = powerState;

    }
    ChangeStateTo(state) {
        this.currentState = state;
    }
    newLine(character) {

        this.display.value = '' + character;
    }
    appendNumberCharacter(character) {
        this.display.value =
            this.display.value === '0' ?
                character : this.display.value + '' + character;
    }
    appendDotOrOperatorCharacter(character) {
        this.display.value = this.display.value + '' + character;
    }
    toZero() {
        this.display.value = '0';
    }

    calaulatedExpression(displayExpression) {
        const expression = displayExpression
            .replace(new RegExp('÷', 'g'), '/')
            .replace(new RegExp('×', 'g'), '*');

        this.display.value = parseFloat(eval(expression).toFixed(15)).toString();
    }
    errorMsg(errorMsg, inputToRed = true) {
        if (inputToRed) {
            this.display.classList.add('border-red-500');
        }

        this.tips.innerText = errorMsg;
    }
    removeErrorMsg() {
        this.display.classList.remove('border-red-500');
        this.tips.innerText = '';
    }
    setPowerStateText(text) {
        this.powerState.innerText = text;
    }
}

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


