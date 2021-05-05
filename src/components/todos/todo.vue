<template>
  <div id="test">
    <span
      class="name"
      :class="{ active: hover }"
      @mouseover="nameHighlight"
    >{{
      name
    }}</span>
    <ul>
      <li
        v-for="item in geoceryList"
        :key="item"
      >
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  test: "abc",
  data: function() {
    return {
      geoceryList: ["A", "B", "C", "D", "E"],
      name: "kunvar singh",
      hover: false
    };
  },
  methods: {
    nameHighlight: function() {
      this.hover = !this.hover;
    }
  }
};
</script>

<style src="./todo-component.css"></style>
