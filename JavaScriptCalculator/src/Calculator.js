class Calculator{
    constructor(num1,num2) {
        this.num1 = parseFloat(num1);
        this.num2 = parseFloat(num2);
    }
    
    
}
class Add extends Calculator{
    constructor(num1,num2){
        super(num1,num2);
    }
    run(){
        return this.num1 + this.num2;
    }
}

class Divide extends Calculator{
    constructor(num1,num2){
        super(num1,num2);
    }
    run(){
        return this.num1 - this.num2;
    }
}

class Multiply extends Calculator{
    constructor(num1,num2){
        super(num1,num2);
    }
    run(){
        return this.num1 * this.num2;
    }
}
