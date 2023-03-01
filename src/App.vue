<template>
  <div class="wrapper">
    <div class="title has-text-centered">
      My ToDo
    </div>
    <form @submit.prevent="addCard" class="mb-5">
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
<div v-for="item in cardData"
:key="item.id" 
class="card mb-5"
:class="{'has-background-success-light':item.done}">
  <div class="card-content">
    <div class="content">
      <div class="columns is-mobile is-vcentered">
        <div class="column"
        :class="{'has-text-success line-throught':item.done}">
          {{ item.content }}
        </div>
        <div class="column is-5 has-text-right">
          <button class="button is-light"
          @click="item.done=!item.done"
          :class="{'is-success': item.done}">
            &check; 
          </button>
          <button class="button is-danger ml-2"
          @click="deleteCard(item.id)">
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

const cardData = ref([])



const addCard = ()=>{
  const newToDo = {
    id: uuidv4(),
    content: textContent.value,
    done: false
  }
  cardData.value.unshift(newToDo);
  textContent.value='';
}

const deleteCard=(id)=>{
  cardData.value = cardData.value.filter((card)=>card.id!=id);
}
</script>

<style lang="sass">
  @import 'bulma/css/bulma.min.css'

  .wrapper
    max-width:  400px
    margin: 0 auto
    padding: 20px
    .line-throught
      text-decoration: line-through

</style>
