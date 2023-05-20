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
// Zaznaczyć elementy na podstawie id
// Po zaznaczeniu elementów zmienić checked na true
// Wykonać operacje Active/Completed na zaznaczonych elementach

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
  todoArr.forEach((todo, i) => {
    todoStatus = todo.completed === true ? `todo-completed` : ``;

    todoString = `
    <div class="todo" id="${i}">
            <input type="checkbox" class="checkbox todo-checkbox"  />
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
};

// id Todo
const checkTodoId = function () {
  todoContainer.addEventListener("click", function (e) {
    const element = e.target;
    if (
      element.classList.contains("todo-checkbox") &&
      element.checked === true
    ) {
      todoId = +element.parentNode.id;
      console.log(todoId);
      todoArr.forEach((t, i) =>
        i === todoId ? (t.checked = true) : (t.checked = false)
      );
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
    if (t.checked === true) {
      t.active = false;
      t.completed = true;
      t.checked = false;
    }
  });
};

// Delete todo
const deleteTodo = function () {
  todoArr = todoArr.filter((t, i) => i !== todoId);
};

// Update UI
const updateUI = function () {
  todoContainer.innerHTML = "";
  renderTodo("afterbegin", todoArr);
};

// Event Handler
todoInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    saveTodo();
    updateUI();
  }
});

completedItems.addEventListener("click", function () {
  completTodo();
  updateUI();
  console.log(todoArr);
});
