<template>

  <div class="main-wrapper">
    <h3>{{title}}</h3>
    <vCatalog/>
    <cart/>
  </div>
  
</template>

<script>
    //import - принимает в себя детей
    import vCatalog from './catalog.vue'
    import cart from './cart.vue'



    //первым делом - ЭКСПОРТ ДЕФОЛТНОГО СОСТОЯНИЯ
  export default {
    //имя компонента (на него завязан экспорт)
    name:'main-wrapper' ,

    //инфо о детях - для  компонента 'main-wrapper'
    components:{
      vCatalog,
      cart
    },

    //в props прилетает из Родителя (не персональные данные)
    props:{},

    //( персональные данные  компонента 'main-wrapper')
    data() {
      return {
        title:' (Я компонент  "main-wrapper", ниже -мои дети + внук(плиткаТовара))'
      }
    },

    // computed:{},
    // methods:{},
    // watch:{},
    mounted() {
      console.log('Тест работы хука ж.цикла')
    },
}//export default:: end
</script>

<style>
.main-wrapper{
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
max-width: 900px;
margin: 0 auto;
border-left: 26px solid #ed0c0c;
border-top: 1px solid #ed0c0c;
}

</style>