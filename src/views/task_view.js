import Backbone from 'backbone';

const TaskView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;
    this.listenTo(this.model, "change", this.render);
  },
  render() {
    // const compiledTemplate = this.template(this.model.toJSON());
    const compiledTemplate = this.template(this.model.attributes);
    this.$el.html(compiledTemplate);
    this.model.get('is_complete') ? this.$el.addClass('is-complete') : this.$el.removeClass('is-complete');
    return this;
  },
  events: {
    'click button.delete': 'deleteTask',
    'click button.toggle-complete': 'toggleComplete',
    'click button.edit': 'editTask',
  },
  deleteTask(e) {
    this.model.destroy();
    this.remove();
  },
  toggleComplete(e) {
    this.model.set('is_complete', !this.model.get('is_complete'));
  },
  editTask(e) {
    this.trigger('editMe', this);
  },
});

export default TaskView;
