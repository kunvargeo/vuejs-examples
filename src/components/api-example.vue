<template>
  <div>
    <table v-if="postId === 0">
      <tr>
        <th>Post Id</th>
        <th>Title</th>
        <th>Description</th>
      </tr>
      <tr v-for="post in postData" :key="post.id" @click="postClick(post.id)">
        <td class="listitems">{{ post.id }}</td>
        <td class="listitems">{{ post.title }}</td>
        <td class="listitems">{{ post.body }}</td>
      </tr>
    </table>

    <div v-if="postId !== 0">
      <button @click="postId = 0">Go Back to Posts</button>
      <div v-for="comment in postComments" :key="comment.id" class="card">
        <div class="profile">
          <span class="username">{{
            comment.name.substr(0, 2).toUpperCase()
          }}</span>
        </div>
        <h3 class="title">Post By : {{ comment.name }}</h3>
        <span class="small-email">{{ comment.email }}</span
        ><br />
        <span> Comments : {{ comment.body }}</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data: function() {
    return {
      postData: [],
      postComments: [],
      postId: 0,
    };
  },
  mounted(){
      fetch("https://jsonplaceholder.typicode.com/posts")
        .then((response) => response.json())
        .then((data) => {
          this.postData = data;
        });
  },
  methods: {
    postClick: function(postId) {
      this.postId = postId;
      fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
        .then((response) => response.json())
        .then((data) => {
          this.postComments = data;
        });
    },
  },
};
</script>
