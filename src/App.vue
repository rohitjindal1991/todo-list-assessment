<template>
  <div id="app">
    <h1>To-Do List</h1>
    <input type="text" v-model="newTask" @keyup.enter="addTask" placeholder="Add new task...">
    <ul>
      <li v-for="(task, index) in tasks" :key="index" :class="{ completed: task.completed }">
        <input type="checkbox" v-model="task.completed" @change="toggleTaskCompletion(index)">
        <span>{{ task.text }}</span>
        <button @click="deleteTask(index)">Delete</button>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'App',
  setup() {
    const newTask = ref('');
    const store = useStore();

    onMounted(() => {
      store.dispatch('loadTasks');
    });

    const addTask = () => {
      if (newTask.value.trim() === '') return;
      store.dispatch('addTask', { text: newTask.value, completed: false });
      newTask.value = '';
    };

    const deleteTask = (index) => {
      store.dispatch('deleteTask', index);
    };

	const toggleTaskCompletion = (index) => {
		store.dispatch('toggleTaskCompletion', index);
	};

    const tasks = computed(() => store.state.tasks);

    return {
      newTask,
      tasks,
      addTask,
      deleteTask,
      toggleTaskCompletion,
    };
  },
};
</script>

<style>
ul {
  list-style: none;
  padding: 0;
}

li {
  margin-bottom: 5px;
}

.completed {
  text-decoration: line-through;
}
</style>
