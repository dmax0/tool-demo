//顶部标题
const title = window.parent.document.querySelector('.m-title>p');


if(title){
    title.innerHTML = `Chatting with 裴先易`;
    title.classList.add('animate__animated', 'animate__jackInTheBox');
}


const panel = window.parent.document.querySelector('iframe');
//聊天输入框
const input = document.querySelector('#sendinput');
//聊天窗口
const chat_form = document.querySelector('#chat_form');



//转义
function escape(str) {
    return str.replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quto;')
        .replace(/'/g, '&#39;')
        .replace(/`/g, '&#96;')
        .replace(/\//g, '&#x2F;');
}
//格式化当前时间，补足0
function format(num) {
    return num < 10 ? '0' + num : num;
}
const now = () => {
    let date = new Date();
    let hour = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();
    return `${format(hour)}:${format(minute)}:${format(second)}`;
}

function send_bubble(value){
    return `<div class="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
    <div>
        <div class="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg">
            <p class="text-sm">${escape(value)}</p>
        </div>
        <span class="text-xs text-gray-500 leading-none">${now()}</span>
    </div>
    <img src="images/jg.jpg" alt="头像" class="rounded-full flex-shrink-0 h-10 w-10">
    </div>`;
}

function send_bubble_op(value){
    return `<div class="flex w-full mt-2 space-x-3 max-w-xs">
    <img src="images/pxy.jpg" alt="头像" class="rounded-full flex-shrink-0 h-10 w-10">
    <div>
        <div class="bg-gray-300 p-3 rounded-r-lg rounded-bl-lg">
            <p class="text-sm">${value}</p>
        </div>
        <span class="text-xs text-gray-500 leading-none">${now()}</span>
    </div>
</div>`;
}

//常用语数组
const common_words = [
    '你好',
    '你好，我是裴先易',
    '哦，是吗',
    '哦，我是裴先易',
    '哦，我是裴先易，你好',
    '那很棒哦!',
    '那很棒!',
    '那很棒哦，我是裴先易',
    '那很棒，我是裴先易',
    '我是猪吗?',
    '尼玛',
    '你是谁?',
    '哈麻皮',
    '哈麻皮，我是裴先易',
    '给你妈两下',
    '给你妈两下，我是裴先易',
    '我是猪',
    '我是猪吗，我是裴先易',
    '你才是傻逼?',
    '你才是傻逼，我是裴先易',
    '下午上课去不去?',
    '下午上课去不去，我是裴先易',
    '我啥都开了房',
];
//表情数组
const face_list = [
    '😀',
    '😁',
    '😂',
    '🤣',
    '😃',
    '😄',
    '😅',
    '😆',
    '😉',
    '😊',
    '😋',
    '😎',
    '😍',
    '😘',
    '😗',
    '😙',
    '😚',
    '🙂',
    '🤗',
    '🤩',
    '🤔',
    '🤨',
];


input.addEventListener('keypress', e => {
    if (e.keyCode === 13) {
        if (input.value) {
            chat_form.innerHTML += send_bubble(input.value);
            input.value = '';
            chat_form.scrollTop = chat_form.scrollHeight;
            setTimeout(() => {
                chat_robot(common_words[Math.floor(Math.random() * common_words.length)]+face_list[Math.floor(Math.random() * face_list.length)]);
            }, 1000);

        }
    }
})


//对话机器人
function chat_robot(value) {
    chat_form.innerHTML += send_bubble_op(value);
    chat_form.scrollTop = chat_form.scrollHeight;
}