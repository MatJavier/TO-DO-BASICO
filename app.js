// Variable global para almacenar el índice de la tarea en edición
let editingIndex = null;

// Array para almacenar las tareas
let tasks = [];

// Función para renderizar la lista de tareas
function renderTasks() {
    const tableBody = document.querySelector('#taskTable tbody');
    tableBody.innerHTML = '';

    tasks.forEach((task, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="px-4 py-2">${task.name}</td>
            <td class="px-4 py-2">
                <button class="btn-edit bg-blue-500 text-white px-2 py-1 rounded mr-2" data-index="${index}">Editar</button>
                <button class="btn-delete bg-red-500 text-white px-2 py-1 rounded" data-index="${index}">Eliminar</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Función para mostrar el modal con detalles de la tarea
function showTaskDetails(index) {
    const taskDetails = document.querySelector('#editedTaskName');
    taskDetails.value = tasks[index].name;
    editingIndex = index; // Establecer el índice de edición
    document.getElementById('taskModal').classList.remove('hidden');
}

// Función para agregar una nueva tarea
function addTask(name) {
    tasks.push({ name });
    renderTasks();
}

// Función para editar una tarea
function editTask(index, newName) {
    tasks[index].name = newName;
    renderTasks();
}

// Función para eliminar una tarea
function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

// Función para eliminar tareas seleccionadas
function deleteSelectedTasks() {
    const checkboxes = document.querySelectorAll('.task-checkbox:checked');
    checkboxes.forEach(checkbox => {
        deleteTask(checkbox.dataset.index);
    });
    document.getElementById('selectAll').checked = false;
    document.getElementById('deleteSelected').disabled = true;
}

// Manejador de eventos para el formulario de agregar tarea
document.getElementById('addTaskForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const taskInput = document.getElementById('taskInput');
    const taskName = taskInput.value.trim();
    if (taskName !== '') {
        addTask(taskName);
        taskInput.value = '';
    }
});

// Manejador de eventos para los botones de eliminar y editar
document.getElementById('taskTable').addEventListener('click', function(event) {
    const target = event.target;
    if (target.classList.contains('btn-delete')) {
        const index = target.dataset.index;
        deleteTask(index);
    } else if (target.classList.contains('btn-edit')) {
        const index = target.dataset.index;
        showTaskDetails(index);
    }
});

// Manejador de eventos para el botón de cerrar modal
document.getElementById('closeModal').addEventListener('click', function() {
    document.getElementById('taskModal').classList.add('hidden');
});

// Manejador de eventos para el botón de guardar tarea editada
document.getElementById('saveEditedTask').addEventListener('click', function() {
    if (editingIndex !== null) {
        const newName = document.getElementById('editedTaskName').value.trim();
        if (newName !== '') {
            editTask(editingIndex, newName);
            document.getElementById('taskModal').classList.add('hidden');
            editingIndex = null; // Restablecer el índice de edición
        }
    }
});

// Manejador de eventos para la selección masiva
document.getElementById('selectAll').addEventListener('change', function(event) {
    const checkboxes = document.querySelectorAll('.task-checkbox');
    checkboxes.forEach(checkbox => {
        checkbox.checked = event.target.checked;
    });
    const deleteButton = document.getElementById('deleteSelected');
    deleteButton.disabled = !event.target.checked;
});

// Manejador de eventos para el botón de eliminar seleccionados
document.getElementById('deleteSelected').addEventListener('click', function() {
    deleteSelectedTasks();
});
