<template>
  <div id="app">

    <!-- текст от родителя -->
    <h2>{{test}}</h2>

    <!-- №3. текст от ребенка (импорт из другого компонента) -->
    <mainWrapper/>

  </div>
 
</template>

<script>
  //№1.импорт ребенка 'main-wrapper.vue' в родителя 'app.vue'
  import mainWrapper from './components/main-wrapper.vue'
  
  //  экспорт дефолтного состояния файла app
  export default {
    name: 'app',
    data(){
      return{
        test:'Я общий файл: арр.vue (ниже мой ребенок + его дети)'
      }
    }, 
    // №2.сообщение родителю - кто его ребенок
    components: {
      mainWrapper
    },  

    // computed: { },
    // methods: { },
    // mounted() { }
  }
</script>

<style>
#app {
  text-align: center;
   margin-top: 160px;
}
</style>