<template>
<div class="wrapper">
  <MyCalculator></MyCalculator> 
</div>
</template>

 <script>
//Подключ-е компонента из «путь» (чтоб компонент заработал)
import MyCalculator from './components/myCalc.vue'

 export default {
 name: 'appCalc', // на экспорт в файл main.js

 components:{
   MyCalculator //Чтоб Родитель узнал о наличии Дочернего компонента
 }
   }
 </script> 

