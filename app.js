//selectors
const todoInput=document.querySelector('.todo-input');
const todoButton=document.querySelector('.todo-button');
const todoList=document.querySelector('.todo-list');
const filterOption = document.querySelector(".filter-todo");

//event listner
document.addEventListener('DOMContentLoaded',getTodos);
todoButton.addEventListener('click',addTodo);
todoList.addEventListener("click",deleteCheck);
filterOption.addEventListener("click",filterTodo);

todoInput.onkeyup = ()=>{
    let userEnteredValue = todoInput.value; //getting user entered value
    if(userEnteredValue.trim() != 0){ //if the user value isn't only spaces
    todoButton.classList.add("active"); //active the add button
    }else{
        todoButton.classList.remove("active"); //unactive the add button
    }
  }


//functions

function addTodo(event){
    //prevent form from submiting
    event.preventDefault();
         
 //create div
    const todoDiv= document.createElement('div');
    todoDiv.classList.add("todo");
    //creat Li
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
      newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    //check mark button
    const completedButton = document.createElement('button');
    completedButton.innerHTML='<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    // add todo stotrage
    saveLocalTodos(todoInput.value);
    //check trach button
    const trashButton = document.createElement('button');
    trashButton.innerHTML='<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    //append to list
    todoList.appendChild(todoDiv);
    //clear todo value
    todoInput.value = "";
    todoButton.classList.remove("active"); 
  
}
function deleteCheck(e){
    const item=e.target;
    //delete todo
    if (item.classList[0] ==='trash-btn')
    {
        const todo = item.parentElement;
        //animation
        todo.classList.add("fall");
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', function(){
            todo.remove();
        });
        //
    }
      //Marck todo
      if (item.classList[0] ==='complete-btn')
      {
          const todo = item.parentElement;
          todo.classList.toggle("completed");
       }
}

function filterTodo(e){
    const todos = todoList.childNodes;
    todos.forEach(function(todo){

       switch(e.target.value){
           case "all":
                todo.style.display="flex";
                break;
            case "completed":
                if(todo.classList.contains('completed')){
                    todo.style.display ="flex";
                }else{
                    todo.style.display ="none";
                }
                break;
            case "uncompleted":
                if(!todo.classList.contains('completed')){
                    todo.style.display ="flex";
                }else{
                    todo.style.display ="none";
                }
                break;
         }
    });
}

function saveLocalTodos(todo){
    //check --- hey do i already have thing in here?
    let todos;
    if (localStorage.getItem('todos') === null){
        todos=[];
    }else{
        todos=JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos',JSON.stringify(todos));
}

function getTodos(){
    let todos;
    if (localStorage.getItem('todos') === null){
        todos=[];
    }else{
        todos=JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function(todo){
        //create div
    const todoDiv= document.createElement('div');
    todoDiv.classList.add("todo");
    //creat Li
    const newTodo = document.createElement('li');
    newTodo.innerText = todo;
      newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    //check mark button
    const completedButton = document.createElement('button');
    completedButton.innerHTML='<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    // add todo stotrage
    //check trach button
    const trashButton = document.createElement('button');
    trashButton.innerHTML='<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    //append to list
    todoList.appendChild(todoDiv);
    });
}

function removeLocalTodos(todo){
    let todos;
    if (localStorage.getItem('todos') === null){
        todos=[];
    }else{
        todos=JSON.parse(localStorage.getItem('todos'));
    }
    //console.log(todo); tester function working or no
    //console.log(todo.childNodes[0].innerText);
    const todoIndex = todo.children[0].innerText    
    todos.splice(todos.indexOf(todoIndex),1);
    localStorage.setItem('todos',JSON.stringify(todos));
}