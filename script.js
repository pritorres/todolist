const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

// --- Load saved tasks ---
document.addEventListener('DOMContentLoaded', loadTasks);

// --- Agregar tasks ---
addTaskBtn.addEventListener('click', addTask);

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === '') return;

    const li = document.createElement('li');
    li.innerHTML = `
    <span>${taskText}</span>
    <div>
      <button class="complete">✔</button>
      <button class="delete">🗑</button>
    </div>
  `;

    console.log("se creo nueva task", taskText)
    taskList.appendChild(li);
    saveTasks();
    taskInput.value = '';
}

// --- Mark or delete ---
taskList.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete')) {
        e.target.closest('li').remove();
    } else if (e.target.classList.contains('complete')) {
        e.target.closest('li').classList.toggle('completed');
    }
    saveTasks();
});

// --- save in localStorage ---
function saveTasks() {
    const tasks = [];
    taskList.querySelectorAll('li').forEach(li => {
        tasks.push({
            text: li.querySelector('span').textContent,
            completed: li.classList.contains('completed')
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// --- load tasks ---
function loadTasks() {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    savedTasks.forEach(t => {
        const li = document.createElement('li');
        li.innerHTML = `
      <span>${t.text}</span>
      <div>
        <button class="complete">✔</button>
        <button class="delete">🗑</button>
      </div>
    `;
        if (t.completed) li.classList.add('completed');
        taskList.appendChild(li);
    });
}
