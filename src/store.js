import { createStore } from 'vuex';

export default createStore({
  state: {
    tasks: [],
  },
  mutations: {
    addTask(state, task) {
		state.tasks.push(task);
		localStorage.setItem('tasks', JSON.stringify(state.tasks));
	},
    deleteTask(state, index) {
      state.tasks.splice(index, 1);
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },
    toggleTaskCompletion(state, index) {
		state.tasks[index].completed = !state.tasks[index].completed;
		localStorage.setItem('tasks', JSON.stringify(state.tasks));
	},
    loadTasks(state) {
      const savedTasks = localStorage.getItem('tasks');
      if (savedTasks) {
        state.tasks = JSON.parse(savedTasks);
      }
    },
  },
  actions: {
    addTask({ commit }, task) {
      commit('addTask', task);
    },
    deleteTask({ commit }, index) {
      commit('deleteTask', index);
    },
    toggleTaskCompletion({ commit }, index) {
      commit('toggleTaskCompletion', index);
    },
    loadTasks({ commit }) {
      commit('loadTasks');
    },
  },
  getters: {
    tasks: (state) => state.tasks,
  },
});
