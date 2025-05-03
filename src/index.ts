const input = document.getElementById('input') as HTMLInputElement;
const add = document.getElementById('add')as HTMLInputElement;
const update = document.getElementById('update')as HTMLInputElement;
const titleAdd = document.getElementById("titleAdd")as HTMLElement;
const titleUpdate = document.getElementById("titleUpdate")as HTMLElement;
const closee = document.getElementById("closee")as HTMLButtonElement;
const addTap = document.getElementById("addTap")as HTMLElement;
const addNew = document.getElementById("addNew") as HTMLButtonElement;

const localStorageProp = 'arrItems';
type State = "New" | "Inprograss" |"Completed";

class Todo {
    itemName:string;
    state:State;
    id:number;
    constructor(itemName:string){
        this.itemName = itemName;
        this.state ='New';
        this.id=Date.now();
    }
}
class TodoList {
    arrItems :Todo[]= [];
    constructor(){
       this.init();
    }
    init(){
        try {
            const localStorageValue = localStorage.getItem(localStorageProp);
            if (localStorageValue) {
                this.arrItems = JSON.parse(localStorageValue) as Todo[] ;
               
            }
        } catch (error) {
          console.error("error in data");
          localStorage.removeItem(localStorageProp); 
        }
    }
    transition(i:number) {
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
    validate(){
        if(input.value.length>1 && input.value.length < 30){
            return true;
        }else{
            return false;
        }
    }
    add(itemName:string){
        let value = itemName.trim();
        this.arrItems.push(new Todo(value));
        render();
        localStorage.setItem(localStorageProp, JSON.stringify(this.arrItems));
    }
    remove(id:number){
        this.arrItems = this.arrItems.filter((todo)=> todo.id !== id)
        localStorage.setItem(localStorageProp, JSON.stringify(this.arrItems));
     render();
    }
    setValueInInput(index:number){
        let content : string = this.arrItems[index].itemName;
        input.value = content;
    }
    update(index : number){
        let newContent : string = input.value;
        newContent =newContent.trim();
        this.arrItems[index].itemName = newContent;
        localStorage.setItem(localStorageProp, JSON.stringify(this.arrItems));
        render();
    }
    completed(index:number){
        if(this.arrItems[index].state != 'Completed'){
            this.arrItems[index].state = 'Completed'
            //this.transition(index);
            localStorage.setItem(localStorageProp, JSON.stringify(this.arrItems));
            render();
        }else{
            this.arrItems[index].state = 'New'
            //this.transition(index);
            localStorage.setItem(localStorageProp, JSON.stringify(todoList.arrItems));
            render();
        }
        console.log(this.arrItems[index])
    }
    inprograss(index:number){
        if(this.arrItems[index].state != 'Inprograss'){
            this.arrItems[index].state = 'Inprograss'
            //this.transition(index);
            localStorage.setItem(localStorageProp, JSON.stringify(this.arrItems));
            render();
        }else{
            this.arrItems[index].state = 'New'
            //this.transition(index);
            localStorage.setItem(localStorageProp, JSON.stringify(this.arrItems));
            render();
        };
        console.log(this.arrItems[index])
    }
    
}
const todoList = new TodoList();
render();
addNew.addEventListener("click", function () {
    addTap.classList.add("visible");
    addTap.classList.remove("d-none");
})
closee.addEventListener("click", function () {
    addTap.classList.add("d-none");
    addTap.classList.remove("visible");
})
add.addEventListener('click', function () {
    if(todoList.validate()){
        todoList.add(input.value);
        input.value="";
        addTap.classList.add("d-none");
        addTap.classList.remove("visible");
    }else{
        alert("the task name must be more than one character and less than 30 character")
    }
 }
 
)
input.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        if (updateStat == -1){
            add.click();
        }
        if(updateStat == 1){
            update.click();
        } 
    }
  });

function render() : void {
    let newBox = "";
    let completedBox = "";
    let inprograssBox = "";
    let counter:number =1
    for (let i = 0; i < todoList.arrItems.length; i++) {
        
        const todo = todoList.arrItems[i];
        if(todo.state == "New"){
            newBox += `
         <tr>
        <th scope="row">${i+1}</th>
        <td class="title p-0 m-0" id="title" >${todo.itemName}</td>
        <td class="p-0 m-0 text-end">
        <div class="dropdown">
                        <button class="btn fs-5 m-0 p-0 " type="button" data-bs-toggle="dropdown" aria-expanded="false">
                          <i class="fa-solid fa-bars"></i>
                        </button>
                        <ul class="dropdown-menu p-0 m-0">
                          <li a class="dropdown-item " >
                            <button id="" class="myInpro w-100 "onclick="inprograss(${i})">
                              <i class="inprograss inpro fa-solid fa-spinner"></i>
                          </button>
                          </li>
                          <li a class="dropdown-item  " >
                            <button class="myDone w-100" onclick="completed(${i})">
                            <i class=" done fa-solid fa-circle-check"></i>
                           </button>
                          </li>
                          <li a class="dropdown-item  " >
                             <button onclick="updateItem(${i})" class="w-100" >
                             <i class="update fa-solid fa-pen-to-square"></i> 
                             </button> 
                          </li>
                          <li a class="dropdown-item" >
                             <button onclick="deleteItem(${todo.id})" class="w-100">
                             <i class=" delete fa-solid fa-trash-can"></i> 
                             </button>  
                          </li>
                        </ul>
                      </div>
                   </td>



        <tr>
        `
        }
        if(todo.state == "Completed"){
            completedBox += `
            <tr>
           <th scope="row">${i + 1}</th>
           <td class="title p-0 m-0 text-secondary text-decoration-line-through " id="title" >${todo.itemName}</td>
          
           <td id="check" class="p-0 m-0">
               <button class="myDone  text-secondary" onclick="completed(${i})">
                  <i class=" done text-secondary fa-solid fa-circle-check"></i>
               </button>
           </td>
           <td class="p-0 m-0 text-end">
           <div class="dropdown">
            <button class="btn fs-5 m-0 p-0 " type="button" data-bs-toggle="dropdown" aria-expanded="false">
             <i class="fa-solid fa-bars"></i>
            </button>
            <ul class="dropdown-menu p-0 m-0 text-end ">
             <li a class="dropdown-item" >
              <button id="" class="myInpro text-secondary w-100" onclick="inprograss(${i})">
                <i class="inprograss text-secondary inpro fa-solid fa-spinner"></i>
              </button>
            </li>
            <li a class="dropdown-item" >
             <button onclick="updateItem(${i})" class="w-100" >
               <i class="update text-secondary fa-solid fa-pen-to-square"></i> 
             </button> 
             </li>
            <li a class="dropdown-item" >
             <button onclick="deleteItem(${todo.id})" class="w-100" >
              <i class=" text-secondary delete fa-solid fa-trash-can"></i> 
             </button> 
            </li>
          </ul>
         </div>
        </td>
    <tr>
           `
        }
        if(todo.state == "Inprograss"){
            
            inprograssBox += `
            <tr>
           <th scope="row">${i+1}</th>
           <td class="title m-0 p-0 " id="title" >${todo.itemName}</td>
           <td class=p-0 m-0 ">
                <button id="" class="myInpro "onclick="inprograss(${i})">
                   <p class="inprograss inpro spinner"></p>
               </button>
            </td>
           <td class="p-0 m-0 text-end">
           <div class="dropdown">
  <button class="btn fs-5 m-0 p-0 " type="button" data-bs-toggle="dropdown" aria-expanded="false">
    <i class="fa-solid fa-bars"></i>
  </button>
  <ul class="dropdown-menu p-0 m-0">
    <li a class="dropdown-item" >
      <button class="myDone w-100 "onclick="completed(${i})">
        <i class=" done fa-solid fa-circle-check"></i>
     </button>
    </li>
     <li a class="dropdown-item" >
      <button onclick="updateItem(${i})" class="w-100" >
                   <i class="update fa-solid fa-pen-to-square"></i> 
               </button>   
    </li>
    <li a class="dropdown-item" >
      <button onclick="deleteItem(${todo.id})" class="w-100">
        <i class=" delete fa-solid fa-trash-can"></i> 
    </button>   
    </li>
  </ul>
</div>

           </td>
           <tr>
           `
          
        }
        counter+=1
    }
(document.getElementById("newTableBody") as HTMLElement ) ! .innerHTML = newBox;
(document.getElementById("completedTableBody") as HTMLElement ) ! .innerHTML = completedBox;
(document.getElementById("inprograssTableBody") as HTMLElement ) ! .innerHTML = inprograssBox;

}
function deleteItem(id : number) : void{
    let result : boolean = confirm("Are you sure you deleted this task?");
        if (result == true){
            todoList.remove(id)
        }
    else{
        return;
    }
}
let updateIndex : number = -1 ;
let updateStat : number = -1;
function updateItem ( index : number ) : void {
    updateIndex = index;
    updateStat = 1;
    todoList.setValueInInput(index);
    update.classList.remove("d-none");
    add.classList.add("d-none");
    addTap.classList.add("visible");
    addTap.classList.remove("d-none");
    titleAdd.classList.add("d-none");
    titleUpdate.classList.remove("d-none");
}
update.addEventListener('click', function () {
    if(updateIndex == -1) return;
    todoList.update(updateIndex)
    add.classList.remove("d-none");
    update.classList.add("d-none");
    addTap.classList.add("d-none");
    addTap.classList.remove("visible");
    titleAdd.classList.remove("d-none");
    titleUpdate.classList.add("d-none");
    input.value= "";
    updateIndex = -1;
    updateStat= -1;
})
function completed(index:number){
    todoList.completed(index);
}
function inprograss(index:number){
    todoList.inprograss(index);
}






