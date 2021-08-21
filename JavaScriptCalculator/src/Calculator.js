

class UnlimitedState{
    constructor(calculator){
        this.calculator = calculator;
    }
    pressNumberKey(textContent){
        this.calculator.removeErrorMsg();
        this.calculator.appendNumberCharacter(textContent);
        this.calculator.ChangeStateTo(this.calculator.unlimitedState);
    }
    pressOperatorKey(textContent){
        this.calculator.removeErrorMsg();
        this.calculator.appendDotOrOperatorCharacter(textContent);
        this.calculator.ChangeStateTo(this.calculator.onlyNumberKey) ;
    }
    pressDotKey(textContent){
        this.calculator.removeErrorMsg();
        this.calculator.appendDotOrOperatorCharacter(textContent);
        this.calculator.ChangeStateTo(this.calculator.limitedDotKey) ;
    }
    pressEqualsKey(){
        this.calculator.removeErrorMsg();
        this.calculator.calaulatedExpression(this.calculator.display.value);
        this.calculator.display.value.indexOf('.') === -1 ?
        this.calculator.ChangeStateTo(this.calculator.calculatiedComplete):
        this.calculator.ChangeStateTo(this.calculator.limitedDotKey);
    }
    pressSwitchKey(){
        this.calculator.removeErrorMsg();
        this.calculator.setPowerStateText('Power:Off')
        this.calculator.ChangeStateTo(this.calculator.powerOffState);
        this.calculator.display.value = '';
    }
    pressClearKey(){
        this.calculator.removeErrorMsg();
        this.calculator.toZero();
        this.calculator.ChangeStateTo(this.calculator.unlimitedState);
    }

}

class PowerOffState extends UnlimitedState{
    
    pressNumberKey(textContent){
        this.calculator.errorMsg(`没有开机!`);
    }
    pressOperatorKey(textContent){
        this.calculator.errorMsg(`没有开机!`);
    }
    pressDotKey(textContent){
        this.calculator.errorMsg(`没有开机!`);
    }
    pressEqualsKey(){
        this.calculator.errorMsg(`没有开机!`);
    }
    pressSwitchKey(){
        this.calculator.removeErrorMsg();
          this.calculator.ChangeStateTo(this.calculator.unlimitedState);
          this.calculator.display.value='0';
          this.calculator.setPowerStateText('Power:On')
    }
    pressClearKey(){
        this.calculator.errorMsg(`没有开机!`);
    }
}

class LimitedDotKey extends UnlimitedState{
    pressNumberKey(textContent){
        this.calculator.removeErrorMsg();
        this.calculator.appendNumberCharacter(textContent);
    }
    pressDotKey(textContent){
        this.calculator.errorMsg(`不能输入'.'号！`);
    }
    
}

class CalculatiedComplete extends UnlimitedState{
    pressNumberKey(textContent){
        this.calculator.removeErrorMsg();
        this.calculator.newLine(textContent);
    }
    
}

class OnlyNumberKey extends UnlimitedState{
    
    pressOperatorKey(){
        this.calculator.errorMsg(`只能输入数字！`);
    }
    pressDotKey(){
        this.calculator.errorMsg(`只能输入数字！`);
    }
    pressEqualsKey(){
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
    getTheEndOfCharacter() {

        return this.display.value.substr(-1, 1);
    }
    removeTheEndOfCharacter() {
        this.display.value.length === 1 ?
        this.toZero():
        this.display.value = this.display.value.slice(0,-1);
    }
    calaulatedExpression(displayExpression) {

        const expression = displayExpression.replace(new RegExp('×', 'g'), '*')
            .replace(new RegExp('÷', 'g'), '/');

        this.display.value =
            parseFloat(eval(expression).toFixed(12))
                .toString();
    }
    errorMsg(errorMsg) {
        this.display.classList.add('border-red-500');
        this.tips.innerText = errorMsg;
    }
    removeErrorMsg() {
        this.display.classList.remove('border-red-500');
        this.tips.innerText = '';
    }
    setPowerStateText(text){
        
        this.powerState.innerText = text;
    }
}
