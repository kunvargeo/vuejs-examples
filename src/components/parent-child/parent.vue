<template>
    <div>
        <div :style="{ fontSize: postFontSize + 'em' }">
        Blog Post : 
        <blogPost 
            v-for="post in postData"
            v-bind:key="post.id"
            v-bind:post="post"
            v-on:enlarge-text="postFontSize += 0.1"
            v-on:shrink-text="postFontSize -= 0.1"
            >
        </blogPost>
       </div>
    </div>
</template>

<script>
import blogPost from './blog-post.vue'

export default {
    data : function(){
        return {
            postData : [
                      { id: 1, title: 'My journey with Vue' },
                    { id: 2, title: 'Blogging with Vue' },
                    { id: 3, title: 'Why Vue is so fun' }
            ],
            postFontSize : 1
        }
    },
    components :{
        blogPost
    }
}
</script>