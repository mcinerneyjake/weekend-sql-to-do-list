console.log('js working');

$(document).ready(onReady);

function onReady() {
  console.log('jquery working');
  $('#submitButton').on('click', addTask);
}

// GET route to router

function refreshTasks() {
  console.log('in refreshTasks');
}

// POST route to router

function addTask() {
  console.log('submit button works');
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
      refreshTasks();
    })
    .catch((error) => {
      console.log('Error in POST', error);
    });
}

// PUT route to router

// DELETE route to router
