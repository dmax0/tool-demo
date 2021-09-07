/*
 * @Author: KslgmrDry
 * @Date: 2021-09-06 19:18:31
 * @LastEditTime: 2021-09-07 15:14:03
 * @LastEditors: KslgmrDry
 * @Description: 
 * @FilePath: \tool&demo\JavaScriptToDoList\src\index.js
 * 
 */
// 
const add = document.getElementById('add'),
    list = document.getElementById('list'),
    input = document.getElementById('input');

// 事项数组
let listArray = [];
//每个事项的唯一标识
let identity = 0;

// 未完成的事项
function notDoneItem(id,content) {
    return {
        id : id,
        content : content,
        elem :  
            `<li class="flex items-center justify-between p-3 mt-2 bg-blue-100" id=${id}>
                    <input type="checkbox"  onclick="itemIsDone(${id})" id="input${id}">
                    <label for="input${id}"><p id="p${id}">${content}</p></label>
                <button 
                    class="bg-transparent hover:bg-red-300 text-red-700 hover:text-white py-2 px-4 border border-red-300 hover:border-transparent rounded"
                        onclick="deleteItem(${id++})">
                    delete
                </button>
            </li>`,
    };
}
// 已完成的事项
function isDoneItem(id,content){
    return {
        id : id,
        content : content,
        elem :  
            `<li class="flex items-center justify-between p-3 mt-2 bg-green-100" id=${id}>
                    <input type="checkbox"  onclick="itemNotDone(${id})" checked="true" id="input${id}">
                    <label for="input${id}"><p id="p${id}" class="line-through">${content}</p></label>
                <button 
                    class="bg-transparent hover:bg-red-300 text-red-700 hover:text-white py-2 px-4 border border-red-300 hover:border-transparent rounded"
                        onclick="deleteItem(${id++})">
                    delete
                </button>
            </li><label for=${id}></label>`,
    };
}
// 将数组listArray中的元素渲染出来

function showListItem() {
    list.innerHTML = '';
    return listArray.forEach(item => {
        list.innerHTML += item.elem;
    })
}


// 添加事项
add.addEventListener('click', () => {
    if (input.value.trim()) {
        listArray.push(notDoneItem(identity++,input.value.trim()));
        showListItem();
        input.value = '';
    }

})

//删除事项

function deleteItem(index) {
    listArray = listArray.filter(item => {
        
        return item.id != index;
    })
    if (listArray.length === 0) {
        identity = 0;
    }
    showListItem();
}

//事项状态切换

function itemIsDone(index) {
    
    listArray = listArray.reduce((arrlist,cur) => {
        if (cur.id === index){
            arrlist.push(isDoneItem(cur.id,cur.content));

        }else{
            arrlist.push(cur);
        }

        return arrlist;
    },[]);
    
    showListItem();

    
}


function itemNotDone(index) {
    listArray = listArray.reduce((arrlist,cur) => {
        if (cur.id === index){
            arrlist.push(notDoneItem(cur.id,cur.content));
        }else{
            arrlist.push(cur);
        }

        return arrlist;
    },[]);
    showListItem();
}