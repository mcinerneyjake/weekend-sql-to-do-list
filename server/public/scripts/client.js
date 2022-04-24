$(document).ready(onReady);

function onReady() {
  $('#submitButton').on('click', addTask);
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
            <td><button>Complete Task</button></td>
            <td><button>Delete Task</button></td>
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
    .then((respose) => {
      console.log('Response from server:', respose);
      getTasks();
    })
    .catch((error) => {
      console.log('Error in POST', error);
    });
}

// PUT route to router

// DELETE route to router
