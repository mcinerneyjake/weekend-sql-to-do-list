$(document).ready(onReady);

function onReady() {
  getTasks();
  $('#submitButton').on('click', addTask);
  $(document).on('click', '.deleteButton', deleteTask);
  $(document).on('click', '.completeButton', updateTask);
}

// GET route to router

function getTasks() {
  $('#homeTaskList').empty();
  $('#yardTaskList').empty();
  $('#errandTaskList').empty();
  $('#workTaskList').empty();
  $('#miscellaneousTaskList').empty();
  $.ajax({
    method: 'GET',
    url: '/tasks',
  })
    .then((response) => {
      console.log('GET /tasks response', response);
      for (let task of response) {
        switch (task.type) {
          case 'Home':
            $('#homeTaskList').append(`
            <tr data-id = ${task.id}>
                <td>${task.name}</td>
                <td>${task.type}</td>
                <td>${task.importance}</td>
                <td><button class="completeButton">Complete</button></td>
                <td><button class="deleteButton">Delete</button></td>
                <td>${task.notes}</td>
            </tr>
            `);
            break;
          case 'Yard':
            $('#yardTaskList').append(`
            <tr data-id = ${task.id}>
                <td>${task.name}</td>
                <td>${task.type}</td>
                <td>${task.importance}</td>
                <td><button class="completeButton">Complete</button></td>
                <td><button class="deleteButton">Delete</button></td>
                <td>${task.notes}</td>
            </tr>
            `);
            break;
          case 'Errand':
            $('#errandTaskList').append(`
            <tr data-id = ${task.id}>
                <td>${task.name}</td>
                <td>${task.type}</td>
                <td>${task.importance}</td>
                <td><button class="completeButton">Complete</button></td>
                <td><button class="deleteButton">Delete</button></td>
                <td>${task.notes}</td>
            </tr>
            `);
            break;
          case 'Work':
            $('#workTaskList').append(`
            <tr data-id = ${task.id}>
                <td>${task.name}</td>
                <td>${task.type}</td>
                <td>${task.importance}</td>
                <td><button class="completeButton">Complete</button></td>
                <td><button class="deleteButton">Delete</button></td>
                <td>${task.notes}</td>
            </tr>
            `);
            break;
          case 'Miscellaneous':
            $('#miscellaneousTaskList').append(`
            <tr data-id = ${task.id}>
                <td>${task.name}</td>
                <td>${task.type}</td>
                <td>${task.importance}</td>
                <td><button class="completeButton">Complete</button></td>
                <td><button class="deleteButton">Delete</button></td>
                <td>${task.notes}</td>
            </tr>
                    `);
            break;
        }
      }
    })
    .catch((error) => {
      console.log('Error in GET', error);
    });
}

// POST route to router

function addTask() {
  if (
    $('#taskNameInput').val() === '' ||
    $('#taskTypeInput option:eq(0)').prop('selected', true) ||
    $('#taskImportance option:eq(0)').prop('selected', true)
  ) {
    alert('Please fill all required fields.');
    return;
  } else {
    let taskToAdd = {
      name: $('#taskNameInput').val(),
      type: $('#taskTypeInput option:selected').text(),
      importance: $('#taskImportance option:selected').text(),
      notes: $('#notesInput').val(),
    };
    $('#taskNameInput').val('');
    $('#taskTypeInput option:eq(0)').prop('selected', true);
    $('#taskImportance option:eq(0)').prop('selected', true);
    $('#notesInput').val('');
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
}

// PUT route to router

function updateTask() {
  let taskIdToUpdate = $(this).closest('tr').data('id');
  $.ajax({
    method: 'PUT',
    url: `/tasks/${taskIdToUpdate}`,
  })
    .then((response) => {
      getTasks();
    })
    .catch((error) => {
      console.log('Error in PUT', error);
    });
}

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
