<template>
  <div>
    <h3>{{ message }}</h3>
    <br />
    <ul>
      <li v-for="user in users" :key="user.id">
        {{ user.name }}
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: {
    message: String,

    users: {
      type: Array
    }
  },
  mounted() {
  }
};
</script>
