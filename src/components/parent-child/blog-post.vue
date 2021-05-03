<template>
    <div class="blog-post">
      <h3>{{ post.title }}</h3>
      <button v-on:click="$emit('enlarge-text')">
        Enlarge text
      </button>
      <button v-on:click="$emit('shrink-text')">
        Shrink text
      </button>
      <div v-html="post.content"></div>
    </div>
</template>

<script>
export default {
    data : function(){
        return{

        }
    },
    props : {
        post : {}
    },
    components:{

    },
}
</script>