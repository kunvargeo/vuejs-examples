<template>
<!-- Login Form -->
    <div class="login-form"  v-if="!register">
        <h1>{{message}}</h1>
        <div class="form">
            <span class="form-label">Username : </span>
            <input type="username" v-model="username" placeholder="for eg. kunvar" class="form-input"/>
        </div>
        <div class="form">
            <span class="form-label">Password : </span>
            <input type="password" v-model="password" placeholder="*****" class="form-input"/>
        </div>
        <a @click="onRegister">Register</a>
        <button v-on:click="login" class="loginbtn">login</button>
        <h1 v-if="isLogin">Login successfully!</h1>
        <h1 v-else>Oh no 😢</h1>
    </div>

    <!-- Registration Form -->
    <div v-else>
        <h1>{{message}}</h1>
        <div class="form">
            <span class="form-label">Username : </span>
            <input type="username" v-model="username" placeholder="for eg. kunvar" class="form-input"/>
        </div>
        <div class="form">
            <span class="form-label">Password : </span>
            <input type="password" v-model="password" placeholder="*****" class="form-input"/>
        </div>
        <a @click="onRegister">Login</a>
        <h1 v-if="isLogin">Register successfully!</h1>
        <h1 v-else>Oh no 😢</h1>
         <button v-on:click="close" class="loginbtn">Close</button>
         <button v-on:click="close" class="loginbtn">Register</button>
    </div>
</template>

<script>
export default {
    data : function() {
        return {
            username : null,
            password : null,
            isLogin : false,
            register : false
        }
    },
    props : {
        message : String
    },
    methods : {
        login : function(){
            this.isLogin = !this.isLogin
            console.log(this.username,this.password)
        },
        onRegister : function(){
            this.register = true
        },
        close : function(){
            this.register = false
        }
    },
    computed : {
       nameGetters : function(){
           return this.username
       }
    }
}
</script>

<style src="./login-component.css">
</style>