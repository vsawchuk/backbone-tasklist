import Backbone from 'backbone';
import _ from 'underscore';
import Task from '../models/task';
import TaskView from '../views/task_view';

const TaskListView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.listenTo(this.model, 'update', this.render);
  },
  render() {
    const list = this.$('#todo-items');
    list.empty();
    this.model.each((task) => {
      const taskView = new TaskView({
        model: task,
        template: this.template,
        tagName: 'li',
        className: 'task',
      });
      list.append(taskView.render().$el);
    });
    return this;
  },
  events: {
    'click #add-new-task': 'addTask',
  },
  addTask(event) {
    event.preventDefault();
    const taskData ={};
    ['task_name', 'assignee'].forEach( (field) => {
      const val = this.$(`#add-task-form input[name=${field}]`).val();
      if (val != '') {
        taskData[field] = val;
      }
    });
    const newTask = new Task(taskData);
    if (newTask.isValid()) {
      this.model.add(newTask);
    this.updateStatusMessages(`New task added: ${newTask.get('task_name')}`);
    } else {
      this.updateStatusMessages(newTask.validationError);
    }
  },
  updateStatusMessages(input) {
    const statusMessagesEl = this.$('#status-messages');
    statusMessagesEl.empty();
    if (typeof input === 'string') {
      statusMessagesEl.append(`<li>${input}</li>`);
    } else if (typeof input === 'object') {
      _.each(input, (messageType) => {
        messageType.forEach((message) => {
          statusMessagesEl.append(`<li>${message}</li>`);
        })
      });
    }
    statusMessagesEl.show();
  },
});

export default TaskListView;
