const btn = document.getElementById('submitBtn');
const todoContent = document.getElementById('todoContent');
const todoDuration = document.getElementById('todoDuration');
const todoList = document.getElementById('todoList');
const form = document.querySelector('form');

let totalTimeConsumed = 0;
const totalAvailableTime = 24;

function addTodo(event) {
    event.preventDefault();
    createTodo();
}

function createTodo() {
    if (todoContent.value && todoDuration.value) {
        const duration = parseFloat(todoDuration.value);

        const listItem = document.createElement('li');
        listItem.textContent = `${todoContent.value} (${duration} hrs)`;
        todoContent.value = '';

        const delItem = document.createElement('button');
        delItem.textContent = '🗑️';
        delItem.classList.add('delete-btn');
        delItem.addEventListener('click', function() {
            delTodo(listItem, duration);
        });

        listItem.addEventListener('click', function() {
            listItem.classList.toggle('completed');
        });

        listItem.appendChild(delItem);
        todoList.appendChild(listItem);

        updateTime(duration);
    } else {
        alert("Enter task or time taken");
    }
}

function delTodo(listItem, duration) {
    listItem.remove();
    updateTime(-duration);
}

function updateTime(duration) {
    totalTimeConsumed += duration;
    displayTime();
}

function displayTime() {
    const timePara = document.querySelector('.timePara');

    if (!timePara) {
        const newTimePara = document.createElement('p');
        newTimePara.classList.add('timePara');
        form.appendChild(newTimePara);
    }

    const remainingTime = totalAvailableTime - totalTimeConsumed;
    const timeParaContent = `Time consumed: ${totalTimeConsumed} hrs, Time left: ${remainingTime} hrs`;

    document.querySelector('.timePara').textContent = timeParaContent;
}

btn.addEventListener('click', addTodo);
