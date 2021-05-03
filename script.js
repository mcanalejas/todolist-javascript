console.log('script loaded')
var TASK_ID_COUNTER = 1;

const resp = fetch('https://jsonplaceholder.typicode.com/users/1/todos')
    .then(resp => resp.json())
    .then(json => json.map((task) => {
        createTask(task)
        TASK_ID_COUNTER = task.id
    }))


document.getElementById('btnSaveTask').addEventListener('click', () => {
    let task = {}
    const taskNameInput = document.getElementById('taskName')
    if (taskNameInput.value === '') {
        alert('Please, fill the input')
    } else {
        task = {
            id: TASK_ID_COUNTER += 1,
            title: taskNameInput.value
        }
        createTask(task)
        document.getElementById("myForm").reset();
    }
})

const createTask = (task) => {
    let taskContainer = document.getElementById('taskContainer')
    taskContainer.innerHTML +=
        `<div class='task-element' id="task` + task.id + `">
        <div class="fix-checkbox">        
                <h2>Task #` + task.id + `</h2>
                <input type="checkbox" id="checkCompleted" onchange="switchStatus(task` + task.id + `, this.checked)"/>
            </div>
            <p>` + task.title + `</p>
            <button class="btn btn-delete-task" onclick="deleteTask(task` + task.id + `)">Delete task</button>
        </div>`

    if (task.completed) {
        document.getElementById('task' + task.id).classList.add('task-completed')
    } else {
        document.getElementById('task' + task.id).classList.add('task-no-completed')
    }
}

const deleteTask = (taskElement) => {
    if (window.confirm('Do you want to remove this task?'))
        taskElement.remove()
}

const switchStatus = (taskElement, checked) => {
    if (checked)
        taskElement.classList.replace('task-no-completed', 'task-completed');
    else
        taskElement.classList.replace('task-completed', 'task-no-completed');
}




