<template>
  <div class="wrapper">
    <div v-for="screen in status"
    :key="screen.id" 
    :style="{ 'background': screen.color }"
    @wheel.self="wheelSlide($event)"
    class="area">
    <div class="main-area">
      <div class="title has-text-centered">
      My ToDo
    </div>
    <form @submit.prevent="addCard(screen.name)" class="mb-5">
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
    </div>
    <div class="card-area">
      <div v-for="item in Cardfilter(cardData, screen)"
      :key="item.id" 
      class="card mb-5"
      :class="{ 'has-background-success-light': item.done }">
      <div class="card-content">
        <div class="content">
          <div class="columns is-mobile is-vcentered">
            <div class="column text-item is-6"
            :class="{ 'has-text-success line-throught': item.done }">
              {{ item.content }}
            </div>
            <div class="column is-2 has-text-grey-light">
              {{ item.status }}
            </div>
            <div class="column is-4 has-text-right">
              <button class="button is-light"
              @click="toggleDone(item.id)"
              :class="{ 'is-success': item.done }">
                &check; 
              </button>
              <button class="button is-danger ml-2"
              @click="deleteCard(item.id)">
                &cross;
              </button>
            </div>
          </div>
          <div class="columns is-half is-offset-one-quarter">
              <button class="column sort-item"
              v-for="btn in status"
              :key="btn.name"
              @click="switchCard(item.id, btn.name)">
                <img :src="`src/assets/img/${btn.id}.png`" alt="">
              </button>
            </div>
        </div>
  </div>
</div>
    </div>
  </div>
  </div>
  <div class="status-btns">
    <button class="btn"
    v-for="screen in status"
    :key="screen.id" 
    :style="{ 'background': screen.color }"
    @click="Slide(screen.id - 1)">
      <img :src="`src/assets/img/${screen.id}.png`" alt="">    
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import {
  collection,
  onSnapshot,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
  query, 
  orderBy,
} from "firebase/firestore";
import { db } from '@/firebase';

//VARIABLES AND CONST

//local varibles

const status = [{
  id: 1,
  name: 'общие',
  color: '#fff',
},
{
  id: 2,
  name: 'важно',
  color: '#ffcb2f',
},
{
  id: 3,
  name: 'работа',
  color: '#3eaf7c',
},
{
  id: 4,
  name: 'семья',
  color: '#e06159',
},]

const textContent = ref('')

const cardData = ref([])

//firebase varibles

const cardDataCollectinRef = collection(db, "cardData");
const cardDataCollectinQuery = query(cardDataCollectinRef, orderBy("date", "desc"));

//METHODS

//card methods

const addCard = async (status) => {
  await addDoc(cardDataCollectinRef, {
    content: textContent.value,
    done: false,
    status: status,
    date: Date.now()
  });
  textContent.value = '';
}

const deleteCard = (id) => {
  deleteDoc(doc(cardDataCollectinRef, id));
}

//выводит карты в зависимости от экрана
const Cardfilter = (cardData, screen) => {
  return cardData.filter(card => card.status == screen.name)
}

const toggleDone = (id) => {
  const index = cardData.value.findIndex((card) => card.id === id);
  updateDoc(doc(cardDataCollectinRef, id), {
    done: !cardData.value[index].done
  });
}

//меняет статус карточки
const switchCard = (id, status) => {
  updateDoc(doc(cardDataCollectinRef, id), {
    status: status
  });
}

//screen and ux methods

const Slide = (value) => {
  document.querySelector('.wrapper').style.transform = `translateX(-${value * 100}vw)`;
  move = document.querySelector('.area').clientWidth * value;
}

//вот тут не забыть спросить почему клиент видз не робит и про рефсы
let move = 0;
let wrapper = 0;

const wheelSlide = (e) => {
  wrapper = document.querySelector('.wrapper').clientWidth * 0.75;
  if (move > wrapper) {
    move = wrapper;
  }
  else if (move >= 0) {
    move -= e.deltaY;
    document.querySelector('.wrapper').style.transform = `translateX(-${move}px)`;
  }
  else
    move = 0
}

//request to the server

onMounted(() => {
  onSnapshot(cardDataCollectinQuery, (querySnapshot) => {
    const fbTodos = [];
    querySnapshot.forEach((doc) => {
      const todo = {
        id: doc.id,
        content: doc.data().content,
        done: doc.data().done,
        status: doc.data().status
      }
      fbTodos.push(todo);
    });
    cardData.value = fbTodos;
  });
})
</script>

<style lang="sass">
  @import 'bulma/css/bulma.min.css'
  body
    scrollbar-width: none
    -ms-overflow-style: none
    &::-webkit-scrollbar
      display: none
  .wrapper
    display: flex
    width: 400vw
  .area
    width: 100vw
    height: 100vh
    overflow: hidden
    .card-area
      max-width: 500px
      height: 100%
      margin: 0 auto
      overflow-y: scroll
      scrollbar-width: none
      -ms-overflow-style: none
      &::-webkit-scrollbar
        display: none
      .card
        max-width: 400px
        margin: 0 auto
        .line-throught
          text-decoration: line-through
        .text-item
          overflow: hidden
        .sort-item
          background: none
          border: none
          border-radius: 20px
          width: 20px
          height: 40px
          &:hover
            background: #f2f5fa
          img
            width: 20px
            height: 20px
  .main-area
    max-width: 400px
    margin-bottom: 20px
    margin: 20px auto
  .status-btns
    position: fixed
    z-index: 2
    display: flex
    width: 100vw
    height: 80px
    bottom: 0
    .btn
      flex-basis: 25%
      height: 100%
      border: none
      border-radius: 20px 20px 0 0 
      img
        width: 50px
        height: 50px
</style>
