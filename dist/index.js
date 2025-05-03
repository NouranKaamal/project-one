"use strict";
const input = document.getElementById('input');
const add = document.getElementById('add');
const update = document.getElementById('update');
const titleAdd = document.getElementById("titleAdd");
const titleUpdate = document.getElementById("titleUpdate");
const closee = document.getElementById("closee");
const addTap = document.getElementById("addTap");
const addNew = document.getElementById("addNew");
const localStorageProp = 'arrItems';
class Todo {
    constructor(itemName) {
        this.itemName = itemName;
        this.state = 'New';
        this.id = Date.now();
    }
}
class TodoList {
    constructor() {
        this.arrItems = [];
        this.init();
    }
    init() {
        try {
            const localStorageValue = localStorage.getItem(localStorageProp);
            if (localStorageValue) {
                this.arrItems = JSON.parse(localStorageValue);
            }
        }
        catch (error) {
            console.error("error in data");
            localStorage.removeItem(localStorageProp);
        }
    }
    transition(i) {
        // if(this.arrItems[i].inprograss== false && this.arrItems[i].completed== false){
        //     return this.arrItems[i].state = "New" ;
        // }
        // if(this.arrItems[i].completed== true && this.arrItems[i].inprograss== false){
        //    return this.arrItems[i].state = "Completed" ;
        // }
        // if(this.arrItems[i].inprograss== true && this.arrItems[i].completed== false){
        //    return this.arrItems[i].state = "Inprograss"
        // }else{
        //     return;
        // }
    }
    validate() {
        if (input.value.length > 1 && input.value.length < 30) {
            return true;
        }
        else {
            return false;
        }
    }
    add(itemName) {
        let value = itemName.trim();
        this.arrItems.push(new Todo(value));
        render();
        localStorage.setItem(localStorageProp, JSON.stringify(this.arrItems));
    }
    remove(id) {
        this.arrItems = this.arrItems.filter((todo) => todo.id !== id);
        localStorage.setItem(localStorageProp, JSON.stringify(this.arrItems));
        render();
    }
    setValueInInput(index) {
        let content = this.arrItems[index].itemName;
        input.value = content;
    }
    update(index) {
        let newContent = input.value;
        newContent = newContent.trim();
        this.arrItems[index].itemName = newContent;
        localStorage.setItem(localStorageProp, JSON.stringify(this.arrItems));
        render();
    }
    completed(index) {
        if (this.arrItems[index].state != 'Completed') {
            this.arrItems[index].state = 'Completed';
            //this.transition(index);
            localStorage.setItem(localStorageProp, JSON.stringify(this.arrItems));
            render();
        }
        else {
            this.arrItems[index].state = 'New';
            //this.transition(index);
            localStorage.setItem(localStorageProp, JSON.stringify(todoList.arrItems));
            render();
        }
        console.log(this.arrItems[index]);
    }
    inprograss(index) {
        if (this.arrItems[index].state != 'Inprograss') {
            this.arrItems[index].state = 'Inprograss';
            //this.transition(index);
            localStorage.setItem(localStorageProp, JSON.stringify(this.arrItems));
            render();
        }
        else {
            this.arrItems[index].state = 'New';
            //this.transition(index);
            localStorage.setItem(localStorageProp, JSON.stringify(this.arrItems));
            render();
        }
        ;
        console.log(this.arrItems[index]);
    }
}
const todoList = new TodoList();
render();
addNew.addEventListener("click", function () {
    addTap.classList.add("visible");
    addTap.classList.remove("d-none");
});
closee.addEventListener("click", function () {
    addTap.classList.add("d-none");
    addTap.classList.remove("visible");
});
add.addEventListener('click', function () {
    if (todoList.validate()) {
        todoList.add(input.value);
        input.value = "";
        addTap.classList.add("d-none");
        addTap.classList.remove("visible");
    }
    else {
        alert("the task name must be more than one character and less than 30 character");
    }
});
// input.addEventListener("keydown", function (event) {
//     if (event.key === "Enter") {
//         add.click();
//     }
//   });
function render() {
    let newBox = "";
    let completedBox = "";
    let inprograssBox = "";
    for (let i = 0; i < todoList.arrItems.length; i++) {
        const todo = todoList.arrItems[i];
        if (todo.state == "New") {
            newBox += `
         <tr>
        <th scope="row">${i + 1}</th>
        <td class="title id="title" >${todo.itemName}</td>
        <td>
             <button id="" class="myInpro "onclick="inprograss(${i})">
                <i class="inprograss inpro fa-solid fa-spinner"></i>
            </button>
         </td>
        <td id="check">
            <button class="myDone "onclick="completed(${i})">
               <i class=" done fa-solid fa-circle-check"></i>
            </button>
        </td>
        <td>
            <button onclick="updateItem(${i})"  >
                <i class="update fa-solid fa-pen-to-square"></i> 
            </button>           
        </td>
        <td>
            <button onclick="deleteItem(${todo.id})">
                <i class=" delete fa-solid fa-trash-can"></i> 
            </button>           
        </td>
        <tr>
        `;
        }
        if (todo.state == "Completed") {
            completedBox += `
            <tr>
           <th scope="row">${i + 1}</th>
           <td class="title text-secondary text-decoration-line-through " id="title" >${todo.itemName}</td>
           <td>
                <button id="" class="myInpro text-secondary" onclick="inprograss(${i})">
                   <i class="inprograss text-secondary inpro fa-solid fa-spinner"></i>
               </button>
            </td>
           <td id="check">
               <button class="myDone  text-secondary" onclick="completed(${i})">
                  <i class=" done text-secondary fa-solid fa-circle-check"></i>
               </button>
           </td>
           <td>
               <button onclick="updateItem(${i})" >
                   <i class="update text-secondary fa-solid fa-pen-to-square"></i> 
               </button>           
           </td>
           <td>
               <button onclick="deleteItem(${todo.id})" >
                   <i class=" text-secondary delete fa-solid fa-trash-can"></i> 
               </button>           
           </td>
           <tr>
           `;
        }
        if (todo.state == "Inprograss") {
            inprograssBox += `
            <tr>
           <th scope="row">${i + 1}</th>
           <td class="title id="title" >${todo.itemName}</td>
           <td>
                <button id="" class="myInpro "onclick="inprograss(${i})">
                   <p class="inprograss inpro spinner"></p>
               </button>
            </td>
           <td id="check">
               <button class="myDone "onclick="completed(${i})">
                  <i class=" done fa-solid fa-circle-check"></i>
               </button>
           </td>
           <td>
               <button onclick="updateItem(${i})"  >
                   <i class="update fa-solid fa-pen-to-square"></i> 
               </button>           
           </td>
           <td>
               <button onclick="deleteItem(${todo.id})">
                   <i class=" delete fa-solid fa-trash-can"></i> 
               </button>           
           </td>
           <tr>
           `;
        }
    }
    document.getElementById("newTableBody").innerHTML = newBox;
    document.getElementById("completedTableBody").innerHTML = completedBox;
    document.getElementById("inprograssTableBody").innerHTML = inprograssBox;
}
function deleteItem(id) {
    let result = confirm("Are you sure you deleted this task?");
    if (result == true) {
        todoList.remove(id);
    }
    else {
        return;
    }
}
let updateIndex = -1;
function updateItem(index) {
    updateIndex = index;
    todoList.setValueInInput(index);
    update.classList.remove("d-none");
    add.classList.add("d-none");
    addTap.classList.add("visible");
    addTap.classList.remove("d-none");
    titleAdd.classList.add("d-none");
    titleUpdate.classList.remove("d-none");
}
update.addEventListener('click', function () {
    if (updateIndex == -1)
        return;
    todoList.update(updateIndex);
    add.classList.remove("d-none");
    update.classList.add("d-none");
    addTap.classList.add("d-none");
    addTap.classList.remove("visible");
    titleAdd.classList.remove("d-none");
    titleUpdate.classList.add("d-none");
    input.value = "";
    updateIndex = -1;
});
function completed(index) {
    todoList.completed(index);
}
function inprograss(index) {
    todoList.inprograss(index);
}
