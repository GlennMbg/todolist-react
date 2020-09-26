let inputField = document.getElementById('todoField');
inputField.className = 'todoinput';
let addButton = document.getElementById('addTodoButton');
let root = document.getElementById('root');
let rootdiv = root.appendChild(document.createElement('div'));
rootdiv.className = "rootdiv";

inputField.addEventListener("keyup", event => {
    if(event.keyCode === 13) {
        event.preventDefault;
        addButton.click();
    }
});

let todoList = {
    todo: [],
    addTodo: function(todoText, index) {
        this.todo.push({
            todoText: todoText,
            isCompleted: false,
            index: index
        });
        this.displayTodos();
    },
    removeTodo: function(index) {
        for (let todo of this.todo){
            if(todo.index === parseInt(index)){
                this.todo.splice(this.todo.indexOf(todo), 1);
            }
        }
        this.displayTodos();
    },
    toggleTodo: function(index) {
        for (let todo of this.todo){
            if(todo.index === parseInt(index)){
                todo.isCompleted = !todo.isCompleted;
            }
        }
        this.displayTodos();
    },
    changeTodo: function(index, change) {
        for (let todo of this.todo){
            if(todo.index === parseInt(index)){
                todo.todoText = change;
            }
        }
        this.displayTodos();
    },
    displayTodos: function() {
        while(rootdiv.firstChild){
            rootdiv.removeChild(rootdiv.firstChild);
        }
        for (let todo of this.todo){
            rootdiv.appendChild(createCheck(todo.isCompleted, todo.index));
            rootdiv.appendChild(createText(todo.todoText, todo.index));
            rootdiv.appendChild(createDelete(todo.index));
            rootdiv.appendChild(document.createElement('br'));
        }
    }
};

let handler = {
    indexCounter: 0,
    addTodo: function() {
        todoList.addTodo(inputField.value, this.indexCounter);
        inputField.value = "";
        this.indexCounter++;
    },
    eventListeners: function() {
        rootdiv.addEventListener('click', event => {
            if(event.target.className === 'checkbutton') {
                todoList.toggleTodo(event.target.id)
            } else if (event.target.className === 'deletebutton') {
                todoList.removeTodo(event.target.id);
            }
        });
        rootdiv.addEventListener('keyup', event => {
            if (event.target.className === 'todofield' && event.keyCode === 13) {
                todoList.changeTodo(event.target.id, event.target.value);
            }
        });
    }
}

function createCheck(isComplete, index){
    let checkbutton = document.createElement('input');
    checkbutton.type = 'checkbox';
    checkbutton.className = 'checkbutton';
    checkbutton.checked = isComplete;
    checkbutton.id = index;
    return checkbutton;
}

function createText(todo, index){
    let todotext = document.createElement('input');
    todotext.value = todo;
    todotext.className = 'todofield';
    todotext.id = index;
    return todotext;
}

function createDelete(index){
    let deletebutton = document.createElement('button');
    deletebutton.className = 'deletebutton'
    deletebutton.textContent = 'Delete';
    deletebutton.id = index;
    return deletebutton;
}

function editText(index){
    let editbutton = document.createElement('button');
    editbutton.className = 'editbutton'
    editbutton.textContent = 'Edit';
    editbutton.id = index;
    return editbutton;
}

/*
addTodo(){
    console.log(inputField.value);
    inputField.value = "";
}*/

handler.eventListeners();