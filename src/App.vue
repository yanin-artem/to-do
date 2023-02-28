<template>
  <div class="wrapper">
    <div class="title has-text-centered">
      My ToDo
    </div>
    <form @submit.prevent="addCart" class="mb-5">
      <div class="field is-grouped">
        <p class="control is-expanded">
          <input v-model="textContent" class="input" type="text" placeholder="Add To Do">
        </p>
        <p class="control">
          <button class="button is-info"
          :disabled="!textContent">
            Add
          </button>
        </p>
      </div>
    </form>
<div v-for="item in postData" :key="item.id" class="card mb-5">
  <div class="card-content">
    <div class="content">
      <div class="columns is-mobile is-vcentered">
        <div class="column">
          {{ item.content }}
        </div>
        <div class="column is-5 has-text-right">
          <button class="button is-light">
            &check; 
          </button>
          <button class="button is-danger ml-2">
            &cross;
          </button>
        </div>
      </div>
    </div>
  </div>
</div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import {v4 as uuidv4} from 'uuid'; 

const textContent = ref('')

const postData = ref([])



const addCart = ()=>{
  const newToDo = {
    id: uuidv4(),
    content: textContent.value,
    done: false
  }
  postData.value.unshift(newToDo);
  textContent.value='';
}
</script>

<style lang="sass">
  @import 'bulma/css/bulma.min.css'

  .wrapper
    max-width:  400px
    margin: 0 auto
    padding: 20px
    

</style>
