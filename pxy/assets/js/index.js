
//dom选择器
function domSelector(selector, nums = false) {

    if (nums) {
        return document.querySelectorAll(selector);
    } else {
        return document.querySelector(selector);
    }
}

function setInforMation(arr = [], domArr = []) {
    console.log(arr)
    for (let i = 0; i < arr.length; i++) {
        domArr[i].innerHTML = arr[i];
    }
}

//js读取本地config.json文件
const xhr = new XMLHttpRequest();
xhr.open('GET', './assets/config.json', false);
xhr.send(null);
const data = JSON.parse(xhr.responseText)
//config文件信息
const config = {
    'username': data.username,
    'email': data.email,
    'avatar_path': data.avatar_path,
    'title': data.title,
};


setInforMation(
    [
        config.title,
        config.username,
        config.email
    ],
    [
        document.title,
        domSelector('#username'),
        domSelector('#email')
    ]
)

//取url得到文件名
function getUrl(url) {
    let arr = url.split('/');
    return arr[arr.length - 1];
}
//点击按钮改变iframe的src

function changeMainIframe
    (button_list, button,
        url = '', animateIn = 'animate__zoomInUp', animateOut = 'animate__zoomOutDown',
        index_iframe = domSelector('iframe'), main_div = domSelector('.m'),duration = 500) {
    button.addEventListener('click', () => {
        if (getUrl(index_iframe.src )!= url) {
           
            main_div.classList.add('animated', animateOut);
            setTimeout(() => {
                main_div.classList.remove('animated', animateOut);
                index_iframe.src = url;
                main_div.classList.add('animated', animateIn);
            }, duration);
            button_list.forEach(item => {
                item.classList.remove('active');
            });
            button.classList.add('active');
        }
    });


}


/**
 * 左侧导航栏按钮
 */

const button_list = domSelector('.navlist_button', true);
const index_iframe = domSelector('iframe'),
    main_div = domSelector('.m'),
    plan = domSelector('#plan'),
    schedule = domSelector('#schedule'),
    addProject = domSelector('#addProject'),
    project = domSelector('#project'),
    goToIndex = domSelector('#goToIndex'),
    dropdown = domSelector('#dropdown'),
    dropdown_menu = domSelector('#dropdown-menu'),
    tool = domSelector('#tool'),
    calculator = domSelector('#calculator'),
    me = domSelector('#me');


//
 tool.addEventListener('click', () => {
        if (dropdown_menu.style.display == 'block') {
            dropdown_menu.style.display = 'none';
        } else {
            dropdown_menu.style.display = 'block';
        }

    })

window.onload = () => {
    main_div.style.display = 'block';
    goToIndex.classList.add('active');
    main_div.classList.add('animate__animated', 'animate__zoomInUp');
    index_iframe.src = 'home.html';
}
//route
changeMainIframe(button_list,addProject, 'addProject.html');
changeMainIframe(button_list,project, 'project.html');
changeMainIframe(button_list, schedule, 'schedule.html');
changeMainIframe(button_list, goToIndex, 'home.html');
changeMainIframe(button_list, plan, 'plan.html');
changeMainIframe(button_list, calculator, 'calculator.html');
changeMainIframe(button_list, me, 'me.html');
//
const pxy = domSelector('.pxy');
changeMainIframe(button_list, pxy, 'chat.html');
//退出登录
const logout = domSelector('.logout');
const left = domSelector('.left');

logout.addEventListener('click', () => {
    main_div.classList.remove('animate__animated', 'animate__zoomInUp');
    main_div.classList.add('animated', 'animate__hinge');
    setTimeout(() => {
        document.location.href = './login.html';
    }, 1700);
});