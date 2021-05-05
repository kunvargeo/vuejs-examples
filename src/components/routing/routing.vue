<template>
  <div>
    <p>Main route</p>
    <a :href="'/about'">about</a><br>
    <a :href="'/home'">Home</a>
  </div>
</template>
<script>
import home from "../routing/home.vue";
import about from "../routing/about.vue";
import notFound from "../routing/not-found.vue";

const routes = {
  "/home": home,
  "/about": about
};
export default {
  data: function() {
    return {
      currentRoute: window.location.pathname
    };
  },
  computed: {
    ViewComponent() {
      return routes[this.currentRoute] || notFound;
    }
  },
  render(h) {
    return h(this.ViewComponent);
  }
};
</script>
