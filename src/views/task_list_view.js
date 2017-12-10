import Backbone from 'backbone';
import TaskView from '../views/task_view';

const TaskListView = Backbone.View.extend({
  initialize: function(params) {
    this.template = params.template;
    this.listenTo(this.model, 'update', this.render);
  },
  render: function() {
    // Clear the unordered list
    this.$('#todo-items').empty();
    // Iterate through the list rendering each Task
    this.model.each((task) => {
      // Create a new TaskView with the model & template
      const taskView = new TaskView({
        model: task,
        template: this.template,
        tagName: 'li',
        className: 'task',
      });
      // Then render the TaskView
      // And append the resulting HTML to the DOM.
      this.$('#todo-items').append(taskView.render().$el);
    });
    return this;
  }
});

export default TaskListView;
