// Declare variables to get elements in HTML
const inputValue = document.getElementById("input-task");
const business = document.getElementById("cat1");
const personal = document.getElementById("cat2");
const addTask = document.querySelector(".add");
const tasks = document.querySelector(".tasks");

// Array of tasks that the tasks pushed in to save in Local Storage
let todos = [];

// get data from local storage
window.addEventListener("load", () => {
  if (localStorage.getItem("tasks")) {
    todos = JSON.parse(localStorage.getItem("tasks"));
  }
  getData();
});
// Add task
addTask.addEventListener("click", () => {
  if (
    (inputValue.value && business.checked) ||
    (inputValue.value && personal.checked)
  ) {
    addToDos(inputValue.value);
    inputValue.value = "";
    business.checked = false;
    personal.checked = false;
    inputValue.focus();
  }
});

// Edit and Delete
tasks.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    delFromLocal(
      e.target.parentElement.parentElement.previousSibling.firstElementChild.getAttribute(
        "data-id"
      )
    );
    e.target.parentElement.parentElement.parentElement.remove();
  }
});

// add task to array
function addToDos(taskValue) {
  // define category after checking what radio is checked
  if (business.checked) {
    cat = business.value;
  } else {
    cat = personal.value;
  }
  // Data of task

  // if(inputValue.value){
  const task = {
    id: Date.now(),
    content: taskValue,
    category: cat,
    done: false
  };

  // push task to array
  todos.push(task);
  // Add tasks to page
  addTaskToPage(todos);
  // Add tasks to local storage
  addToLStorage(todos);
  // }
}

function addTaskToPage(todos) {
  // empty the tasks div
  tasks.innerHTML = "";
  tasks.innerHTML = `<h3 style = "color:#12486B;">TODO LIST</h3>`;
  todos.forEach((todo) => {
    // create main div
    let task = document.createElement("div");
    task.classList.add("task");
    // create label and input to create bubble
    let label = document.createElement("label");
    let input = document.createElement("input");
    input.type = "checkbox";
    // add class done to checked tasks
    if (todo.done) {
      task.classList.add("done");
      input.checked = true;
    }
    input.addEventListener("click", (e) => {
      todo.done = e.target.checked;
      if (todo.done) {
        task.classList.add("done");
      } else {
        task.classList.remove("done");
      }
      addToLStorage(todos);
    });
    // create bubble
    let span = document.createElement("span");
    span.classList.add("bubble");
    span.classList.add(`${todo.category}`);
    // append input and checkbox to label
    label.appendChild(input);
    label.appendChild(span);
    // create task content
    let taskContent = document.createElement("div");
    taskContent.classList.add("task-content");
    let content = document.createElement("input");
    content.type = "text";
    content.value = todo.content;
    content.style.display = "none";
    content.setAttribute("data-id", todo.id);
    // add attribute readonly to prevent editing the task and append content to div
    content.setAttribute("readonly", "true");
    taskContent.appendChild(content);
    // create paragraph for task content
    let pContent = document.createElement("p");
    pContent.innerHTML = todo.content;
    taskContent.appendChild(pContent);
    // Create action buttons div
    let actions = document.createElement("div");
    actions.classList.add("actions");
    // create date and time of task
    let dateSpan = document.createElement("span");
    let date = new Date(todo.id);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hour = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();
    if (month < 10) {
      month = `0${month}`;
    }
    if (day < 10) {
      day = `0${day}`;
    }
    if (hour > 12) {
      hour = `0${hour - 12}`;
    }
    if (minute < 10) {
      minute = `0${minute}`;
    }
    if (second < 10) {
      second = `0${second}`;
    }
    dateSpan.innerHTML = `Date: ${year}/${month}/${day} ${hour}:${minute}:${second}`;
    actions.appendChild(dateSpan);
    // Create edit button
    let btns = document.createElement("div");
    btns.classList.add("btns");
    let edit = document.createElement("button");
    edit.classList.add("edit");
    edit.textContent = `Edit`;
    edit.addEventListener("click", () => {
      pContent.style.display = "none";
      content.style.display = "block";
      content.removeAttribute("readonly");
      content.focus();
      content.addEventListener("blur", (e) => {
        content.style.display = "none";
        pContent.style.display = "block";
        content.setAttribute("readonly", true);
        todo.content = e.target.value;
        pContent.innerHTML = todo.content;
        addToLStorage(todos);
      });
    });
    // Create delete Button
    let del = document.createElement("button");
    del.textContent = `Delete`;
    del.classList.add("delete");
    btns.appendChild(edit);
    btns.appendChild(del);
    // Append buttons to actions div
    actions.appendChild(btns);
    // append elements to main div
    task.appendChild(label);
    task.appendChild(taskContent);
    task.appendChild(actions);
    tasks.appendChild(task);
  });
}

// Create function to add tasks to local storage
function addToLStorage(todos) {
  localStorage.setItem("tasks", JSON.stringify(todos));
}
// function to get data from local storage
function getData() {
  let data = localStorage.getItem("tasks");
  if (data) {
    let tasks = JSON.parse(data);
    addTaskToPage(tasks);
  }
}

// Delete from local storage
function delFromLocal(taskId) {
  todos = todos.filter((e) => e.id != taskId);
  addToLStorage(todos);
}
// Edit on Local Storage
function editOnLocal(editedContent) {
  for (let i = 0; i < todos.length; i++) {
    // console.log(`${todos[i].content} === ${editedContent}`)
    todos.content = editedContent;
  }
  addToLStorage(todos);
}
