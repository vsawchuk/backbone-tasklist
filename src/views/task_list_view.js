import Backbone from 'backbone';
import _ from 'underscore';
import Task from 'models/task';
import TaskList from 'collections/task_list';
import TaskView from 'views/task_view';

const TaskListView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.listenTo(this.model, 'update', this.render);
  },
  render() {
    this.$('#todo-items').empty();

    this.model.each((task) => {
      console.log(`rendering ${task}`);
      const taskView = new TaskView({
        model: task,
        template: this.template,
        tagName: 'li',
        className: 'task',
      });

      this.$('#todo-items').append(taskView.render().$el);
    });


    return this;
  },
  events: {
    'click #add-new-task': 'addTask',
  },
  getTaskData() {
    const taskData = {};
    ['task_name', 'assignee'].forEach((field) => {
      const val = this.$(`#add-task-form input[name=${field}]`).val();
      if (val !== '') {
        taskData[field] = val;
      }
    });
    return taskData;
  },
  addTask(event) {
    event.preventDefault();

    const newTask = new Task(this.getTaskData());

    if (newTask.isValid()) {
      this.model.add(newTask);
      this.updateStatusMessageWith(`New task added ${newTask.get('task_name')}`);
    }
    else {
      this.updateStatusMessageFrom(newTask.validationError);
    }
  },
  updateStatusMessageFrom(messageHash) {
      const $statusMessage = this.$('#status-messages');
      $statusMessage.empty();
      _.each(messageHash, (messageType) => {
        console.log(messageType);
        messageType.forEach((message) => {
          $statusMessage.append(`<li>${message}</li>`);
        });
      });
      $statusMessage.show();
  },
  updateStatusMessageWith(message) {
    const $statusMessage = this.$('#status-messages');
    $statusMessage.empty();
    $statusMessage.append('<li>${message}</li>');
    $statusMessage.show();
  }
});

export default TaskListView;
