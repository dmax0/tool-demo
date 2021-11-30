// 获取表单输入的用户名，密码
const form = document.querySelector('#form'),
    username = form.username,
    password = form.password,
    submit = form.submit;


function login () {
    const user = localStorage.getItem('username');
    const pwd = localStorage.getItem('password');
    console.log(username.value, password.value);
    console.log(user, pwd);
    if (user && pwd) {
        
        if (user === username.value && pwd === password.value) {
            
            // 将当前时间戳存入本地存储
            localStorage.setItem('token', Date.now());
            window.location.href = 'person.html';
            alert('登录成功');
        } else {
            alert('用户名或密码错误');
        }
    } else {
        alert('用户名或密码错误');
    }
}

submit.addEventListener('click', () => {
    if (username.value && password.value) {
        login();
    } else {
        alert('请填写完整信息');
    }
});