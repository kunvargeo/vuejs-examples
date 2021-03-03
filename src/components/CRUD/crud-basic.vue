<template>
<div id="todo-list-example">
  <form v-on:submit.prevent="addNewTodo">
    <label for="new-todo">Add a todo</label>
    <input
      v-model="newTodoText"
      id="new-todo"
      placeholder="E.g. Feed the cat"
    >
    <button>Add</button>
    <br/>
    <span v-show="showTodoError" v-bind:style="{marginTop:'5px'}">
      <alert> Please Fill new TODO item!</alert>
    </span>
    <span v-show="!showTodoError && todos.length===0">
      <alert> No TODO item, Please Add!</alert>
    </span>
  </form>
  <ul>
    <li
      v-for="(todo, index) in todos"
      :key="todo.id"
    >{{todo.title}}
    <button v-on:click="remove(index)">Remove</button>
    </li>
  </ul>
</div>
</template>

<script>
import alert from '../alert-box.vue'
export default {
  data : function(){
    return {
      todos: [
      {
        id: 1,
        title: 'Do the dishes',
      },
      {
        id: 2,
        title: 'Take out the trash',
      },
      {
        id: 3,
        title: 'Mow the lawn'
      }
    ],
    nextTodoId: 4,
    newTodoText: '',
    showTodoError : false
    }
  },
  methods : {
    addNewTodo : function(){
      if(this.newTodoText){
       this.todos.push({
        id: this.nextTodoId++,
        title: this.newTodoText
      })
      this.newTodoText = ''
      this.showTodoError = false
      }else{
        this.showTodoError = true
      }
    },
    remove :function(index){
      this.todos.splice(index, 1)
    }
  },
  components : {
    alert
  }
}
</script>