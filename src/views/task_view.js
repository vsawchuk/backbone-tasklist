import Backbone from 'backbone';
import Task from 'models/task';

const TaskView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;

    this.listenTo(this.model, 'change', this.render);
  },
  render() {
    console.log(this.model.toJSON());
    console.log(this.model.attributes);
    const compiledTemplate = this.template(this.model.attributes);
    console.log('rendered 1');

    this.$el.html(compiledTemplate);

    return this;
  },
  events: {
    'click button.delete': 'deleteTask',
    'click button.toggle-complete': 'toggleComplete',
  },
  deleteTask() {
    this.model.destroy();
    this.remove();
  },
  toggleComplete(event) {
    this.model.toggleComplete();
    this.$el.toggleClass('is-complete');
  },
});

export default TaskView;
