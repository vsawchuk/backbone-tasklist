// Vendor Modules
import $ from 'jquery';
import _ from 'underscore';

// CSS
import './css/foundation.css';
import './css/style.css';

import Task from './models/task';
import TaskList from './collections/task_list';
import TaskListView from './views/task_list_view';

const taskList = new TaskList();

$(document).ready( () => {
  const taskListView = new TaskListView({
    model: taskList,
    template: _.template($('#task-template').html()),
    el: 'main',
  });

  taskListView.render();

  taskList.add(new Task({task_name: "Put rendering logic in Backbone Views", assignee: "Me"}));
  taskList.add(new Task({task_name: "Put handling events in Backbone Views", assignee: "Me"}));
  taskList.add(new Task({task_name: "Eat a tasty thing"}));
});
