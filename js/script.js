document.addEventListener("DOMContentLoaded", () => {
  const todoInput = document.getElementById("todo-input");
  const dateInput = document.getElementById("date-input");
  const statusInput = document.getElementById("status-input");
  const actionInput = document.getElementById("action-input");
  const addBtn = document.getElementById("add-btn");
  const deleteAllBtn = document.getElementById("delete-all-btn");
  const filterStatusBtn = document.getElementById("filter-status");
  const filterActionBtn = document.getElementById("filter-action");
  const todoList = document.getElementById("todo-list");

  let tasks = [];

  function renderTasks(data) {
    todoList.innerHTML = "";
    if (data.length === 0) {
      const row = todoList.insertRow();
      const cell = row.insertCell(0);
      cell.colSpan = 4;
      cell.textContent = "No task found";
      return;
    }

    data.forEach((task, index) => {
      const row = todoList.insertRow();
      row.innerHTML = `
        <td>${task.task}</td>
        <td>${task.date}</td>
        <td>${task.status}</td>
        <td>${task.action}</td>
      `;
    });
  }

  addBtn.addEventListener("click", () => {
    const taskText = todoInput.value.trim();
    const date = dateInput.value;
    const status = statusInput.value;
    const action = actionInput.value;

    if (!taskText || !date) {
      alert("Please fill in the task and date.");
      return;
    }

    const newTask = { task: taskText, date, status, action };
    tasks.push(newTask);

    renderTasks(tasks);

    todoInput.value = "";
    dateInput.value = "";
  });

  deleteAllBtn.addEventListener("click", () => {
    tasks = [];
    renderTasks(tasks);
  });

  filterStatusBtn.addEventListener("click", () => {
    const order = ["Not Yet", "On Progress", "Done"];
    const sorted = [...tasks].sort(
      (a, b) => order.indexOf(a.status) - order.indexOf(b.status)
    );
    renderTasks(sorted);
  });

  filterActionBtn.addEventListener("click", () => {
    const order = ["Priority", "Least Priority"];
    const sorted = [...tasks].sort(
      (a, b) => order.indexOf(a.action) - order.indexOf(b.action)
    );
    renderTasks(sorted);
  });

  renderTasks(tasks);
});