const addBtn = document.getElementById("add");
const deleteBtn = document.getElementById("delete");
const clearBtn = document.getElementById("clear");

const todoList = document.getElementById("list");
const textInput = document.getElementById("input");

let todos = JSON.parse(localStorage.getItem("todos")) || [];
let id = todos.length ? todos[todos.length - 1].id + 1 : 0;

addBtn.addEventListener("click", addTodo);
deleteBtn.addEventListener("click", deleteTodos);
clearBtn.addEventListener("click", clearTodos);

// Load todos from localStorage when the page is loaded
window.onload = loadTodos;

// Trigger addTodo when the "Enter" key is pressed
textInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    addTodo();
  }
});

function addTodo() {
  let todoText = textInput.value;
  if (todoText === "") {
    alert("Please enter a todo");
  } else {
    let todo = {
      id: id,
      text: todoText,
      completed: false,
    };

    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));

    let todoItem = createTodoElement(todo);
    todoList.appendChild(todoItem);

    textInput.value = "";
    id++;
  }
}

function deleteTodos() {
  let todoElements = Array.from(document.querySelectorAll(".check"));
  todos = todos.filter((todo, index) => {
    let checkbox = todoElements[index];
    if (checkbox.checked) {
      checkbox.parentElement.remove();
      return false;
    }
    return true;
  });

  localStorage.setItem("todos", JSON.stringify(todos));
}

function clearTodos() {
  todoList.innerHTML = "";
  todos = [];
  localStorage.removeItem("todos");
}

function loadTodos() {
  todos.forEach((todo) => {
    let todoItem = createTodoElement(todo);
    todoList.appendChild(todoItem);
  });
}

// Helper function to create a todo element
function createTodoElement(todo) {
  let todoItem = document.createElement("div");
  todoItem.classList.add("todo-item");
  todoItem.innerHTML = `
    <p id="${todo.id}">${todo.text}</p>
    <input type="checkbox" class="check" ${todo.completed ? "checked" : ""}>
  `;
  return todoItem;
}
