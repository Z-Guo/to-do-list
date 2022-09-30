//selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo")

//event listeners
document.addEventListener('DOMContentLoaded', getTodos)
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo)

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
    //add todo to local storage 
    saveLocalTodos(todoInput.value)
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
    //delete to do
    if (item.classList[0] === 'trash-btn') {
        //! instead of removing item, remove the parent element of the item
        const todo = item.parentElement;
        todo.classList.add("fall");
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', event => {
            // wait until transition finishes and then execute the function
            todo.remove()
        });
    }

    // Check Mark 
    if (item.classList[0] === 'complete-btn') {
        const todo = item.parentElement
        todo.classList.toggle("completed");
    }
}

function filterTodo(e) {
    const todos = todoList.childNodes;
    // check what's being clicked, a loop to check 
    todos.forEach(function (todo) {
        switch (e.target.value) {
            case "all":
                // show everything 
                todo.style.display = 'flex';
                break;
            case "completed":
                if (todo.classList.contains('completed')) {
                    // display the todos with class 'completed'
                    todo.style.display = 'flex';
                    // if none of the classes are 'completed' then display nothing 
                } else {
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if (!todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
        }
    });
}

function saveLocalTodos(todo) {
    // check for existing todos, if not, create an empty list 
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        // if we already do have todos, get back the todos from localStorage in array 
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    // push the new todo and set it in the local storage 
    todos.push(todo)

    // set it back to the localStorage 
    localStorage.setItem("todos", JSON.stringify(todos));
}


function getTodos() {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        // if we already do have todos, get back the todos from localStorage in array 
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(function (todo) {
        // creating  to do divs
        const todoDiv = document.createElement("div")
        todoDiv.classList.add("todo")
        //create LI
        const newTodo = document.createElement('li')
        newTodo.innerText = todo;
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
    })
}

function removeLocalTodos(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        // if we already do have todos, get back the todos from localStorage in array 
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    // find the particular todo 
    // console.log(todo.children[0])
    const todoIndex = todo.children[0].innerText;
    // removing the index specified, just removing 1
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}