<template>
  <div id="todo-list-example">
    <form @submit.prevent="addNewTodo">
      <label
        for="new-todo"
        class="pr-2"
      >Add a todo</label>
      <input
        id="new-todo"
        v-model="newTodoText"
        placeholder="E.g. Feed the cat"
        class="border mr-2"
      >
      <button class="inline-flex items-center px-4 py-2 mr-2 text-sm font-medium leading-5 text-white transition duration-150 ease-in-out bg-green-600 border border-transparent rounded-md hover:bg-green-500 focus:outline-none focus:border-green-700 focus:shadow-outline-green active:bg-green-700">
        Add
      </button>
      <br>
      <span
        v-show="showTodoError"
        :style="{ marginTop: '5px' }"
      >
        <alert> Please Fill new TODO item!</alert>
      </span>
      <span v-show="!showTodoError && todos.length === 0">
        <alert> No TODO item, Please Add!</alert>
      </span>
    </form>
    <ul>
      <li
        v-for="(todo, index) in todos"
        :key="todo.id"
        class="mt-2 flex justify-center"
      >
        {{ todo.title }}
        <button
          class="inline-flex items-center px-4 py-2 mr-2 ml-2 text-sm font-medium leading-5 text-white transition duration-150 ease-in-out bg-red-600 border border-transparent rounded-md hover:bg-red-500 focus:outline-none focus:border-red-700 focus:shadow-outline-red active:bg-red-700"
          @click="remove(index)"
        >
          Remove
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
import alert from "../alert-box.vue";
export default {
  components: {
    alert
  },
  data: function() {
    return {
      todos: [
        {
          id: 1,
          title: "Do the dishes"
        },
        {
          id: 2,
          title: "Take out the trash"
        },
        {
          id: 3,
          title: "Mow the lawn"
        }
      ],
      nextTodoId: 4,
      newTodoText: "",
      showTodoError: false
    };
  },
  methods: {
    addNewTodo: function() {
      if (this.newTodoText) {
        this.todos.push({
          id: this.nextTodoId++,
          title: this.newTodoText
        });
        this.newTodoText = "";
        this.showTodoError = false;
      } else {
        this.showTodoError = true;
      }
    },
    remove: function(index) {
      this.todos.splice(index, 1);
    }
  }
};
</script>
