<template>
  <div>
    <div :style="{ fontSize: postFontSize + 'em' }">
      Blog Post :
      <blogPost
        v-for="post in postData"
        :key="post.id"
        :post="post"
        @enlarge-text="postFontSize += 0.1"
        @shrink-text="postFontSize -= 0.1"
      />
    </div>
  </div>
</template>

<script>
import blogPost from "./blog-post.vue";

export default {
  components: {
    blogPost
  },
  data: function() {
    return {
      postData: [
        { id: 1, title: "My journey with Vue" },
        { id: 2, title: "Blogging with Vue" },
        { id: 3, title: "Why Vue is so fun" }
      ],
      postFontSize: 1
    };
  }
};
</script>
