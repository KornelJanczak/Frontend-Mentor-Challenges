// - Add new todos to the list /
// - Mark todos as complete
// - Delete todos from the list
// - Filter by all/active/complete todos
// - Clear all completed todos
// - Toggle light and dark mode
// - **Bonus**: Drag and drop to reorder items on the list
const todoInput = document.querySelector(".todo-input");
const todoContainer = document.querySelector(".todo-container");
// Options
const itemsCounter = document.querySelector(".items-counter");
const allItems = document.querySelector(".all");
const activeItems = document.querySelector(".active");
const completedItems = document.querySelector(".completed");
const clear = document.querySelector(".clear__completed");
const modeSwitch = document.querySelector(".mode-switcher");
let todoArr = [];
let todoId;

// Save Todo
const saveTodo = function () {
  const todoContent = todoInput.value;
  const duplicate = todoArr.some(
    (t) => t.value.toLowerCase() === todoContent.toLowerCase()
  );
  if (todoContent === "") {
    alert("Is empty!");
  } else if (duplicate) {
    alert("Todo is duplicate!");
    return (todoContent = "");
  } else {
    const todo = {
      value: todoContent,
      checked: false,
      active: true,
      completed: false,
    };
    todoArr.push(todo);
  }
  console.log(todoArr);
};

// Generate Todo
const renderTodo = function (where, todoArr) {
  let todoString;
  let todoStatus;
  let checkStatus;
  todoContainer.innerHTML = "";
  todoArr.forEach((todo, i) => {
    checkStatus = todo.checked === true ? `checked` : `no-checked`;
    todoStatus = todo.completed === true ? `todo-completed` : ``;

    todoString = `
    <div class="todo" id="${i}">
            <input type="checkbox" class="checkbox todo-checkbox" ${checkStatus}  />
            <span class="todo-text ${todoStatus}">${todo.value}</span>
            <img
              src="images/icon-cross.svg"
              alt="cross-icon"
              class="delete-todo"
            />
          </div>
    `;
    todoContainer.insertAdjacentHTML(`${where}`, todoString);
  });
  itemsCounter.textContent = `${todoArr.length.toString()} items left`;
  todoInput.value = "";
};

// id Todo
const checkTodoId = function () {
  todoContainer.addEventListener("click", function (e) {
    const element = e.target;
    todoId = +element.closest(".todo").id;
    if (element.classList.contains("todo-checkbox")) {
      completTodo();
      updateUI();
      console.log(todoArr);
    }
    if (element.classList.contains("delete-todo")) {
      deleteTodo();
      updateUI();
    }
  });
};
checkTodoId();

// Completed Todo
const completTodo = function () {
  todoArr.forEach((t, i) => {
    if (i === todoId) {
      t.active = false;
      t.completed = true;
      t.checked = true;
    }
  });
};

// Delete todo
const deleteTodo = function () {
  todoArr = todoArr.filter((t, i) => i !== todoId);
};

// Filters
const filter = function (filter) {
  const completeArr = todoArr.filter((t) => t.completed === filter);
  console.log(completeArr);
  todoContainer.innerHTML = "";
  renderTodo("afterbegin", completeArr);
};

// Clear all completed
const clearCompleted = function () {
  todoArr = todoArr.filter((t) => t.completed !== true);
  updateUI();
};

// Update UI
const updateUI = function () {
  todoContainer.innerHTML = "";
  renderTodo("afterbegin", todoArr);
};

// Switch Mode
modeSwitch.addEventListener("click", function () {
  document.body.classList.toggle("dark");
  document.body.classList.toggle("dark-body");
});

// Event Handler
todoInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    saveTodo();
    updateUI();
  }
});

completedItems.addEventListener("click", function () {
  filter(true);
});

activeItems.addEventListener("click", function () {
  filter(false);
});

allItems.addEventListener("click", updateUI);

clear.addEventListener("click", clearCompleted);
