// 点击logo跳转首页
const logo = document.querySelector('#logo');
logo.addEventListener('click', () => {
    window.location.href = 'index.html';
});


// 导航栏登录item
const logItem = document.querySelector('#nav-content>ul>li:last-child');

const isLogin = () => {
    if (localStorage.getItem('token')) {
        return true;
    } else {
        return false;
    }
}



if (!isLogin()) {
    logItem.innerHTML = `<a class="inline-block  no-underline  py-2 px-4" href="login.html">登录</a>`;
} else {
    // 获取当前时间戳
    const now = Date.now();
    const last = localStorage.getItem('lastLogin');
    const diff = now - last;
    // 计算时间差的小时数
    const hours = Math.floor(diff / 1000 / 60 / 60);
    // 计算时间差的分钟数
    const minutes = Math.floor(diff / 1000 / 60 % 60);
    // 计算时间差的秒数
    const seconds = Math.floor(diff / 1000 % 60);


    const lastLoginTime = () => {
        if (hours > 0) {
            return `${hours}小时`;
        } else if (minutes > 0) {
            return `${minutes}分钟`;
        }
        return `${seconds}秒`;
    }
   
    const user = `<div class="flex items-center  py-2">
    <div class="flex-shrink-0">
    <a href="person.html"><img src="image/avatar.jpg" alt="用户头像"></a>
    </div>
    <div class="ml-3">
    <p class="text-sm leading-5 font-medium text-gray-900">
    <span class="text-gray-600 text-lg">${localStorage.getItem('username')}</span>
        <button id="logout" class="text-lg bg-opacity-0 rounded text-blue-500">退出</button>
    </p>
    <p class="text-xs leading-4 font-medium text-gray-500">
        上次登录: ${lastLoginTime()}前
        
    </p>
    </div>
</div>`;
    logItem.innerHTML = user;
    logItem.classList.remove('active');
    logItem.href = 'person.html';
}


const navToggle = document.getElementById('nav-toggle');
const navContent = document.getElementById('nav-content');
const navAction = document.getElementById('navAction');

navToggle.addEventListener('click', () => {
    navContent.classList.toggle('hidden');
});

// 退出登录
const logout = document.querySelector('#logout');
if (logout) {
    logout.addEventListener('click', () => {
        localStorage.removeItem('token');
        localStorage.setItem('lastLogin', Date.now());
        window.location.href = 'index.html';
    });
}


// codelist





// 记录是否开启夜间模式

const nightMode = document.querySelector('#nightMode');
nightMode.addEventListener('change',() => {
    if (nightMode.checked) {
        localStorage.setItem('mode', 'night');
        document.body.style.backgroundColor = '#1e1e1e';
    } else {
        localStorage.setItem('mode', 'day');
        document.body.style.backgroundColor = '#fff';
    }
});

// nightMode
const mode = localStorage.getItem('mode');

window.addEventListener('load', () => {
    if (mode === 'night') {
        nightMode.checked = true;
        document.body.style.backgroundColor = '#1e1e1e';
        
    }else{
        nightMode.checked = false;
        document.body.style.backgroundColor = '#fff';   
        
    }   
});


// message二级菜单
const message = document.querySelector('#message');
const secMessage = document.querySelector('#secMessage');

message.addEventListener( 'mouseout', () => {
    if (secMessage.classList.contains('block')) {
        secMessage.classList.remove('block');
        secMessage.classList.add('hidden');
    }
});
message.addEventListener( 'mouseover', () => {
    if (secMessage.classList.contains('hidden')) {
        secMessage.classList.remove('hidden');
        secMessage.classList.add('block');
    }
});

secMessage.addEventListener( 'mouseover', () => {
    secMessage.classList.remove('hidden');
    secMessage.classList.add('block');
});
secMessage.addEventListener( 'mouseout', () => {
    secMessage.classList.add('hidden');
    secMessage.classList.remove('block');
});
