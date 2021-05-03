<template>
   <div>
   <span>
        Hello {{message}}
   </span>
   <span v-html="rawHTML"></span>

        <span v-bind:title="message">
            Hey!
        </span>
        
        <span v-if="seen">
          Testing Done
        </span>
        
        <div id="test">
            <ul>
            <li v-for="item in todos" v-bind:key="item">
               {{item}}
            </li>
            </ul>
        </div>

        <div id="app-5">
            <p>{{message}}</p>
            <button v-on:click="reverseMessage">Reverse Message</button>
             <input v-model="message">
        </div>

   </div>
</template>

<script>
export default {
    name : "phase1",
    data : function() {
                return {
                    message: 'Some Message',
                    seen : true,
                    todos : [1,2,3,4,5],
                    rawHTML : `<p style="color:red">Hello I am kunvar testing raw html</p>`
                }
            },
    methods : {
        reverseMessage :function (){
                this.message = this.message.split('').reverse().join('')
        }
    }
}
</script>

<style scoped>

</style>