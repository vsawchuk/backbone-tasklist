import Backbone from 'backbone';

const Task = Backbone.Model.extend({
  defaults: {
    assignee: "nobody",
    is_complete: false,
  },
  initialize: function(attributes) {
  },
  validate: function(attributes) {
    const errors = {};

    if (!attributes.task_name) {
      errors['task_name'] = ["Task name is required"];
    }

    if ( Object.keys(errors).length > 0 ) {
      return errors;
    } else {
      return false;
    }
  },
  toString: function() {
    return `task_name: ${this.get('task_name')}, assignee: ${this.get('assignee')}`;
  },
  toggleComplete() {
    this.set('is_complete', !this.get('is_complete'));
  }
});

export default Task;
