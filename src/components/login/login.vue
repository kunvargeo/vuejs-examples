<template>
  <!-- Login Form -->
  <div
    v-if="!register"
    class="login-form"
  >
    <h1>{{ message }}</h1>
    <div class="form">
      <span class="form-label">Username : </span>
      <input
        v-model="username"
        type="username"
        placeholder="for eg. kunvar"
        class="form-input"
      >
    </div>
    <div class="form">
      <span class="form-label">Password : </span>
      <input
        v-model="password"
        type="password"
        placeholder="*****"
        class="form-input"
      >
    </div>
    <a @click="onRegister">Register</a>
    <button
      class="loginbtn"
      @click="login"
    >
      login
    </button>
    <h1 v-if="isLogin">
      Login successfully!
    </h1>
    <h1 v-else>
      Oh no 😢
    </h1>
  </div>

  <!-- Registration Form -->
  <div v-else>
    <h1>{{ message }}</h1>
    <div class="form">
      <span class="form-label">Username : </span>
      <input
        v-model="username"
        type="username"
        placeholder="for eg. kunvar"
        class="form-input"
      >
    </div>
    <div class="form">
      <span class="form-label">Password : </span>
      <input
        v-model="password"
        type="password"
        placeholder="*****"
        class="form-input"
      >
    </div>
    <a @click="onRegister">Login</a>
    <h1 v-if="isLogin">
      Register successfully!
    </h1>
    <h1 v-else>
      Oh no 😢
    </h1>
    <button
      class="loginbtn"
      @click="close"
    >
      Close
    </button>
    <button
      class="loginbtn"
      @click="close"
    >
      Register
    </button>
  </div>
</template>

<script>
export default {
  props: {
    message: String
  },
  data: function() {
    return {
      username: null,
      password: null,
      isLogin: false,
      register: false
    };
  },
  computed: {
    nameGetters: function() {
      return this.username;
    }
  },
  methods: {
    login: function() {
      this.isLogin = !this.isLogin;
      console.log(this.username, this.password);
    },
    onRegister: function() {
      this.register = true;
    },
    close: function() {
      this.register = false;
    }
  }
};
</script>

<style src="./login-component.css"></style>
