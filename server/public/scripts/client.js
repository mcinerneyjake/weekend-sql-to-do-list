$(document).ready(onReady);

function onReady() {
  getTasks();
  $('#submitButton').on('click', addTask);
  $(document).on('click', '.deleteButton', deleteTask);
  $(document).on('click', '.completeButton', updateTask);
}

// GET route to router

function getTasks() {
  $('#taskList').empty();
  $.ajax({
    method: 'GET',
    url: '/tasks',
  })
    .then((response) => {
      console.log('GET /tasks response', response);
      for (let task of response) {
        $('#taskList').append(`
        <tr data-id = ${task.id}>
            <td>${task.name}</td>
            <td>${task.type}</td>
            <td>${task.importance}</td>
            <td><button class="completeButton">Complete</button></td>
            <td><button class="deleteButton">Delete</button></td>
            <td>${task.notes}</td>
        </tr>
        `);
      }
    })
    .catch((error) => {
      console.log('Error in GET', error);
    });
}

// POST route to router

function addTask() {
  let taskToAdd = {
    name: $('#taskNameInput').val(),
    type: $('#taskTypeInput option:selected').text(),
    importance: $('#taskImportance option:selected').text(),
    notes: $('#notesInput').val(),
  };
  $.ajax({
    method: 'POST',
    url: '/tasks',
    data: taskToAdd,
  })
    .then((response) => {
      console.log('Response from server:', response);
      getTasks();
    })
    .catch((error) => {
      console.log('Error in POST', error);
    });
}

// PUT route to router

function updateTask() {}

// DELETE route to router

function deleteTask() {
  let taskIdToDelete = $(this).closest('tr').data('id');
  $.ajax({
    method: 'DELETE',
    url: `/tasks/${taskIdToDelete}`,
  })
    .then((response) => {
      getTasks();
    })
    .catch((error) => {
      console.log('Error in DELETE', error);
    });
}
