<template>
  <div class="ml-5">
    <p>Main route</p>
    <div class="flex">
      <a
        :href="'/about'"
        class="mr-5 hover:text-green-500"
      >About</a>
      <a
        :href="'/home'"
        class="mr-5 hover:text-green-500"
      >Home</a>
      <a
        :href="'/about'"
        class="mr-5 hover:text-green-500"
      >Contact Us</a>
      <a
        :href="'/about'"
        class="mr-5 hover:text-green-500"
      >Service</a>
      <a
        :href="'/about'"
        class="mr-5 hover:text-green-500"
      >Testimonials</a>
    </div>
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
