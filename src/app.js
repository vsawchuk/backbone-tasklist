// Vendor Modules
import $ from 'jquery';
import _ from 'underscore';

// CSS
import './css/foundation.css';
import './css/style.css';

import Task from './models/task';
import TaskList from './collections/task_list';

const taskList = new TaskList();
let taskTemplate;

const renderList = function(taskList) {
  const $taskList = $('#todo-items');
  $taskList.empty();

  for(let i = 0; i < taskList.length; i++) {
    const task = taskList.models[i];
    $taskList.append(taskTemplate(task.attributes));
  }

}

// helper method for updating the DOM with the status from a hash
const updateStatusMessageFrom = (messageHash) => {
  $('#status-messages ul').empty();
  for(let messageType in messageHash) {
    messageHash[messageType].forEach((message) => {
      $('#status-messages ul').append($(`<li>${messageType}:  ${message}</li>`));
    })
  }
  $('#status-messages').show();
}

// helper method for updating the DOM with the status from a string
const updateStatusMessageWith = (message) => {
  $('#status-messages ul').empty();
  $('#status-messages ul').append(`${message}</li>`);
  $('#status-messages').show();
}

const addNewTask = function(event) {
  event.preventDefault();

  const taskData ={};
  ['task_name', 'assignee', 'is_complete'].forEach( (field) => {
    const val = $(`input[name=${field}]`).val();
    if (val != '') {
      taskData[field] = val;
    }
  });
  const newTask = new Task(taskData);

  if (newTask.isValid()) {
    taskList.add(newTask);
    newTask.save({}, {
      success: successSaveNewTask,
      error: failedSaveNewTask,
    });
  } else {
    updateStatusMessageFrom(newTask.validationError);
  }
}

const successSaveNewTask = function(task) {
  updateStatusMessageWith(`New task added: ${task.get('task_name')}`);
}

const failedSaveNewTask = function(task) {
  updateStatusMessageWith(`Unable to save new task`);
  task.destroy();
}

$(document).ready( () => {
  taskTemplate = _.template($('#task-template').html());

  $('#add-task-form').submit(addNewTask);

  taskList.on('update', renderList, taskList);

  taskList.add(new Task({task_name: "Put rendering logic in Backbone Views", assignee: "Me"}));
  taskList.add(new Task({task_name: "Put handling events in Backbone Views", assignee: "Me"}));
  taskList.add(new Task({task_name: "Eat a tasty thing"}));
});
