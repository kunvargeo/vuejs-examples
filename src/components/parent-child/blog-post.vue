<template>
  <div class="blog-post">
    <h3>{{ post.title }}</h3>
    <button @click="$emit('enlarge-text')">
      Enlarge text
    </button>
    <button @click="$emit('shrink-text')">
      Shrink text
    </button>
    <div v-html="post.content" />
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    post: {}
  },
  data: function() {
    return {};
  }
};
</script>
