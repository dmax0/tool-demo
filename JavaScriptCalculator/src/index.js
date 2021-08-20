
/** --- 答案显示部分 ---**/

const result = document.querySelector("#result");

const btns = document.querySelectorAll("button");

/**
 * 点击按钮事件函数
 */

const operator = ['add', 'subtract', 'multiply', 'divide', 'dot', 'mod'],
    key = ['+', '-', '×', '÷', '%'],
    otherKey = ['clear', 'backspace', 'calculate'];
let isAddDot = true,
    isNewLine = true;
function Calculaor() {

    const action = this.dataset.action;

    if (otherKey.indexOf(action) > -1) {

        if (action === 'calculate' && isLegal(result.value)) {

            const resultExp =
                result
                    .value.replace(new RegExp('×', 'g'), '*')
                    .replace(new RegExp('÷', 'g'), '/');

            result.value =
                parseFloat(eval(resultExp).toFixed(12))
                    .toString();
            isNewLine = true;
            console.log(result.value.indexOf('.'))
            isAddDot = result.value.indexOf('.') > -1 ?
                false : true;
        }
        else if (action === 'clear') {
            result.value = '0';
            isAddDot = true,
                isNewLine = true;
        }
        else if (action === 'backspace') {
            if (result.value.length === 1) {
                result.value = '0';
                
                isNewLine = true;
            }
            if(result.value.length > 1){
                result.value = 
                result.value.slice(0, -1);
            }
            if (!result.value.includes('.')) isAddDot = true;
            else {
                const idx = result.value.indexOf('.');
                for (let i = idx; i < result.value.split('').length; i++) {
                    if (result.value.split('')[i] === '.')
                        isAddDot = false;
                    if (key.indexOf(result.value.split('')[i]) > -1) {
                        isAddDot = true;
                    }
                }
                
            }
        }
    }
    else if (operator.indexOf(action) > -1) {


        if (action === 'dot' && isLegal(result.value)) {
            if (isAddDot) {
                result.value += '.';
                isAddDot = false;
                isNewLine = false;
            }
        }
        else {
            if (isLegal(result.value)) {
                result.value += this.textContent;
                isAddDot = true;
                isNewLine = false;
            }

        }

    } else if (!action) {

        if (result.value === '0' || isNewLine === true) {
            result.value = this.textContent;
            isNewLine = false;
            if (!result.value.includes('.')) isAddDot = true;

        } else {
            result.value += this.textContent;
            isNewLine = false;
        }


    }
}

function isLegal(str) {
    return !key.includes(str.substr(-1, 1));
}


for (const btn of btns) {
    btn.addEventListener('click', () => Calculaor.call(btn));

}
