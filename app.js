//selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");


//event listeners
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);

// functions 

function addTodo(event) {
    //prevent form from submitting
    event.preventDefault();
    // creating  to do divs
    const todoDiv = document.createElement("div")
    todoDiv.classList.add("todo")
    //create LI
    const newTodo = document.createElement('li')
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    //check mark button 
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"> </i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    //check delete button 
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class = "fas fa-trash"> </i>';
    deleteButton.classList.add("trash-btn");
    todoDiv.appendChild(deleteButton);
    //append to list
    todoList.appendChild(todoDiv);
    //clear todo input value
    todoInput.value = "";
}

function deleteCheck(event) {
    const item = event.target
    console.log(event.target)
    console.log(item.classList)
    //delete to do
    if (item.classList[0] === 'trash-btn') {
        //! instead of removing item, remove the parent element of the item
        const todo = item.parentElement;
        console.log(todo)
        todo.remove()
    }

}

