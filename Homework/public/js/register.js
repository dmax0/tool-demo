// 获取表单
 const form = document.querySelector('form');
// 获取表单输入的用户名，密码, 邮箱，手机号，确认密码,提交按钮
const username = form.username,
    password = form.password,
    email = form.email,
    phone = form.phone,
    confirm = form.confirm,
    submit = form.submit;
console.log(username.value);
// 验证手机号
function checkPhone () {
    const phoneReg = /^1[34578]\d{9}$/;
    if (!phoneReg.test(phone.value)) {
        alert('手机号格式不正确');
        return false;
    } else {
        return true;
    }
}
// 验证邮箱
function checkEmail () {
    const emailReg = /^\w+@\w+\.\w+$/;
    if (!emailReg.test(email.value)) {
        alert('邮箱格式不正确');
        
        return false;
    } else {
        return true;
    }
}

submit.addEventListener('click', () => {
    if (username.value && password.value && email.value && phone.value && confirm.value) {
        if (password.value === confirm.value) {
            if (checkPhone() && checkEmail()) {
                
                localStorage.setItem('username', username.value);
                localStorage.setItem('password', password.value);
                localStorage.setItem('email', email.value);
                window.location.href = 'login.html';
                alert('注册成功');
            }
        } else {
            alert('两次密码不一致');
            return false;
        }
    } else {
        alert('请填写完整信息');
        return false;
    }
});