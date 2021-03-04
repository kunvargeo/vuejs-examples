<template>
    <form v-on:submit.prevent="save" v-if="!onsave">
    <label for="new-todo">Name : </label>
    <input
      v-model="name"
      id="new-todo"
      placeholder="E.g. Feed the cat"
    > <br>

    <label for="new-todo">Bio : </label>
    <textarea v-model="bio" placeholder="add multiple lines"></textarea> <br>

    <label for="new-todo">Agree : </label>
    <input type="checkbox" id="checkbox" v-model="agree"> <br>

    <label for="new-todo">Gender : </label>
    <input type="radio" id="one" value="Male" v-model="gender">
    <label for="one">Male</label>
    <br>
    <input type="radio" id="two" value="Female" v-model="gender">
    <label for="two">Female</label>
    <br>

    <label for="new-todo">State : </label>
    <select v-model="state">
    <option disabled value="">Please select one</option>
    <option>Delhi</option>
    <option>Pune</option>
    <option>Hydrabad</option>
    </select>
    <br>

    <label for="new-todo">You Love to : </label>
    <select v-model="interest" multiple>
    <option>Music</option>
    <option>Travelling</option>
    <option>Playing</option>
    <option>Reading</option>
    </select>
    <br>


    <button>Save</button>
    <br/>
    <!-- <span v-show="showTodoError" v-bind:style="{marginTop:'5px'}">
      <alert> Please Fill new TODO item!</alert>
    </span>
    <span v-show="!showTodoError && todos.length===0">
      <alert> No TODO item, Please Add!</alert>
    </span> -->
  </form>
  <div v-else>
       <button @click="goBack">Go Back to Form</button><br/>
        Name : <span>{{formData.name}}</span><br/>
        Bio : <span>{{formData.bio}}</span><br/>
        Gender : <span>{{formData.gender}}</span><br/>
        Agree : <span>{{formData.agree}}</span><br/>
        Interest : <span>{{formData.interest}}</span><br/>
        State : <span>{{formData.state}}</span><br/>
    </div>
</template>

<script>
export default {
    data : function(){
        return {
            gender : '',
            agree : '',
            bio : '',
            name :'',
            state :'',
            interest :[],
            onsave : false,
            formData : {}
        }
    },
    methods : {
        save : function(){
            if(this.name){
                this.onsave = true
                this.formData = {
                    gender : this.gender,
                    agree : this.agree,
                    bio : this.bio,
                    name : this.name,
                    state : this.state,
                    interest : this.interest
                }
            }
        },
        goBack : function(){
            this.onsave = false
            this.formData={}
             this.gender =''
            this.agree =''
            this.bio =''
            this.name =''
            this.state =''
            this.interest = []
    }
    }
}
</script>