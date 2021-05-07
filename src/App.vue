<template>
  <div id="app">
    <img
      alt="Vue logo"
      src="./assets/logo.png"
      class="logo"
    >
    <HelloWorld />
    <!-- Nav Bar Start-->
    <div class="navbar">
      <a
        class="heading"
        @click="open('model')"
      >Model Binding</a>
      <a
        class="heading"
        @click="open('data')"
      >Data Binding</a>
      <a
        class="heading"
        @click="open('raw-html')"
      >Raw HTML Binding</a>
      <a
        class="heading"
        @click="open('inline-style')"
      >InLine Style Rendering</a>
      <a
        class="heading"
        @click="open('dynamic-class')"
      >Dynamic Class Binding</a>
      <a
        class="heading"
        @click="open('list')"
      >List Rendering</a>
      <a
        class="heading"
        @click="open('condition')"
      >Conditional Rendering</a>
    </div>
    <div class="navbar">
      <a
        class="heading"
        @click="open('parent-child')"
      >Parent Child relationship</a>
      <a
        class="heading"
        @click="open('child-parent')"
      >Child Parent relationship</a>
      <a
        class="heading"
        @click="open('component-state')"
      >Component State management</a>
      <a
        class="heading"
        @click="open('alert-box')"
      >Alert Box</a>
      <a
        class="heading"
        @click="open('crud')"
      >CRUD Example</a>
      <a
        class="heading"
        @click="open('form')"
      >Form elements Example</a>
      <a
        class="heading"
        @click="open('api')"
      >API Example</a>
    </div>
    <div class="navbar">
      <a
        class="heading"
        @click="open('routing')"
      >Routing</a>
      <a
        class="heading"
        @click="open('mapbox')"
      >Mapbox</a>
      <a
        class="heading"
        @click="open('generic-component')"
      >Generic Component</a>
      <a
        class="heading"
        @click="open('mapbox')"
      >Tailwind Examples</a>
    </div>
    <div class="flex justify-end text-xs px-4">
      V{{ version }}
    </div>
    <!-- End -->

    <!-- Sections -->
    <template v-if="openBlock === 'model'">
      <div class="section">
        <h2>Model Example</h2>
        <input
          v-model="name"
          type="text"
        >
        <p>Model value is : {{ getName }}</p>
      </div>
    </template>

    <template v-if="openBlock === 'data'">
      <h2>Data Example</h2>
      <div class="section">
        {{ dataBinding }}
      </div>
    </template>

    <template v-if="openBlock === 'raw-html'">
      <h2>Raw HTML Example</h2>
      <div class="section">
        <span v-html="rawHtml" />
      </div>
    </template>

    <template v-if="openBlock === 'dynamic-class'">
      <h2>Dynamic Class Example</h2>
      <div class="section">
        <span
          :class="{ dynamic: dynamicClass }"
          class="static"
          @mouseover="addclass"
          @mouseleave="addclass"
        >I am a simple text, hover on me, adding class dynamically</span>
      </div>
    </template>

    <template v-if="openBlock === 'list'">
      <h2>List Example</h2>
      <div class="section">
        <ol>
          <li
            v-for="user in users"
            :key="user.id"
            class="listitems"
          >
            <p>Name : {{ user.name }}</p>
            <p>Email : {{ user.email }}</p>
            <p>
              Address : {{ user.address.street + " ," + user.address.city }}
            </p>
            <p>Website {{ user.website }}</p>
          </li>
        </ol>
      </div>
    </template>

    <template v-if="openBlock === 'condition'">
      <h2>Conditional Example</h2>
      <button
        class="inline-flex items-center px-4 py-2 mr-2 text-sm font-medium leading-5 text-white transition duration-150 ease-in-out bg-green-600 border border-transparent rounded-md hover:bg-green-500 focus:outline-none focus:border-green-700 focus:shadow-outline-green active:bg-green-700"
        @click="toggleMe"
      >
        Toggle Me
      </button>
      <div class="section">
        <span v-if="toggle">Yes, It's me &#128540;</span>
        <span v-else>Oh no 😢</span>
      </div>
      <h1 v-show="show">
        Hello!
      </h1>
    </template>

    <template v-if="openBlock === 'inline-style'">
      <h2>Inline Style Example</h2>
      <div class="section">
        <span
          :style="{ color: 'red', backgroundColor: 'cyan' }"
        >Applied inline Styles</span>
      </div>
    </template>

    <template v-if="openBlock === 'parent-child'">
      <h2>Parent Child Example</h2>
      <div class="section">
        <simpleChild
          message="This data is sent from parent and displaying here"
          :users="users"
        />
      </div>
    </template>

    <template v-if="openBlock === 'child-parent'">
      <h2>Child Parent Example</h2>
      <div class="section">
        <parent />
      </div>
    </template>

    <template v-if="openBlock === 'component-state'">
      <h2>Component State Example</h2>
      <div class="section">
        <child />
        <child />
        <child />
        <child />
      </div>
    </template>

    <template v-if="openBlock === 'alert-box'">
      <h2>Alert Box Example</h2>
      <div class="section">
        <alertBox>Something bad happened.</alertBox>
      </div>
    </template>

    <template v-if="openBlock === 'crud'">
      <h2>CRUD Example</h2>
      <div class="section">
        <crud />
      </div>
    </template>

    <template v-if="openBlock === 'form'">
      <h2>Form Example</h2>
      <div class="section">
        <formExample />
      </div>
    </template>

    <template v-if="openBlock === 'api'">
      <h2>API Example</h2>
      <div class="section">
        <apiExample />
      </div>
    </template>

    <template v-if="openBlock === 'routing'">
      <h2>Routing Example</h2>
      <div class="section">
        <routing />
      </div>
    </template>

    <template v-if="openBlock === 'mapbox'">
      <div class="section">
        <mapbox />
      </div>
    </template>
    <template v-if="openBlock === 'generic-component'">
      <div class="section">
        <genericComponent />
      </div>
    </template>

    <!-- <login message="Welcome To Login"></login>
     <div id="components-demo">
      BTN Counter :
      <btnCounter></btnCounter>
      Parent-Child : <parent></parent>
    </div> -->
    <!-- <phase></phase> -->
    <!-- <todo></todo> -->
  </div>
</template>

<script>
// import phase from './components/phase1Test.vue'
// import todo from './components/todos/todo.vue'

import HelloWorld from "./components/HelloWorld.vue";
import users from "./components/mock-data/users.json";
import simpleChild from "./components/parent-child/simple-props-child.vue";
// import login from './components/login/login.vue'
// import btnCounter from './components/btn-counter/btn-counter.vue'
import parent from "./components/parent-child/parent.vue";
import child from "./components/parent-child/child";
import alertBox from "./components/alert-box.vue";
import crud from "./components/CRUD/crud-basic.vue";
import apiExample from "./components/api-example.vue";
import formExample from "./components/form-example.vue";
import routing from "./components/routing/routing.vue";
import mapbox from "./components/mapbox/mapbox.vue";
import packageJson from ".././package.json";
import genericComponent from './components/mapbox/generic.vue'

// export default {
//   name: 'App',
//   components: {
//     HelloWorld,
//     login,
//     btnCounter,
//     parent,
//   }
// }

export default {
  components: {
    HelloWorld,
    simpleChild,
    parent,
    child,
    alertBox,
    crud,
    apiExample,
    formExample,
    routing,
    mapbox,
    genericComponent
  },
  data: function() {
    return {
      version: packageJson.version,
      openBlock: "",
      dataBinding: "I am data binding",
      name: "",
      rawHtml: `<div class="card">
                <img src="https://www.w3schools.com//w3images/team2.jpg" alt="John" style="width:25%">
                <h1>John Doe</h1>
                <p class="title">CEO & Founder, Example</p>
                <p>Harvard University</p>
                <a href="#"><i class="fa fa-dribbble"></i></a>
                <a href="#"><i class="fa fa-twitter"></i></a>
                <a href="#"><i class="fa fa-linkedin"></i></a>
                <a href="#"><i class="fa fa-facebook"></i></a>
                <p><button>Contact</button></p>
              </div>`,
      dynamicClass: false,
      users: users,
      toggle: false,
      show: false,
    };
  },
  computed: {
    getName: function() {
      return this.name;
    },
  },
  methods: {
    open: function(type) {
      this.openBlock = type;
    },
    close: function() {
      this.open = "";
    },
    addclass: function() {
      this.dynamicClass = !this.dynamicClass;
    },
    toggleMe: function() {
      this.show = true;
      this.toggle = !this.toggle;
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 40px;
}
.logo {
  height: 80px;
  float: left;
  margin-left: 10px;
}
.navbar {
  display: flex;
  justify-content: space-around;
  margin-top: 10px;
}
.heading {
  color: #2bb769;
  cursor: pointer;
}
.section {
  margin-top: 60px;
}
.static {
  color: black;
  background-color: red;
}
.dynamic {
  color: blue;
  background-color: cyan;
}
.listitems {
  border: 1px solid black;
  cursor: pointer;
}
.profile {
  height: 35px;
  border-radius: 20px;
  width: 37px;
  background-color: red;
}
.username {
  margin-top: 5px;
}
.small-email {
  font-size: 10px;
}
</style>
