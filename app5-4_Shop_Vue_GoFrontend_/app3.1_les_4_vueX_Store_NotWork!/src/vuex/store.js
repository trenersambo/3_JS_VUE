//этому store.js в main.js пропиши import ...from...

 import { createStore } from 'vuex';


// импорт из предустановленных зависимостей
import axios from 'axios';
import Vue from 'vue'
import Vuex from 'vuex'


//прошу Vue использовать vueX
Vue.use(Vuex) ;

//создам само ХРАНИЛИЩЕ для всего приложения = это  нов.Object
//внутри хранилища -опции (options: {...})
  
//let store = new Vuex.Store({
 export default createStore ({

//Состояние: хранит переменные, массивы, объекты, проч.
state:{
  products:[]
},

//state меняется через мутации / экшены 
//(тут только СИНХРОННОСТЬ: выполнение по порядку очереди)
mutations:{
  SET_PRODUCTS_TO_STATE:(state,products)=>{
    state.products = products;
  }

}, 

//(тут только АСИНХРОННОСТЬ: выполнение без ожидания очереди)
actions:{
  GET_PRODUCTS_FROM_API({commit}){
    return axios('http://localhost:3000/products',{
      method:"GET"
    })
      .then((products)=>{
        commit('SET_PRODUCTS_TO_STATE', products.data);
        return products;
      })
      .catch((error)=>{
        console.log(error);
        return error;
      })
  }
},

//корот.ссылка до переменной 
getters:{
  PRODUCTS(state){
    return state.products;
  }
},

})//let store::end



