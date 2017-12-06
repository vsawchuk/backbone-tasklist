import Backbone from 'backbone';
import Task from '../models/task';

const TaskList = Backbone.Collection.extend({
  model: Task,
});

export default TaskList;
