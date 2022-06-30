<template>

<div class="catalog-item">
<p> catalog-item(я ребенок для catalog.vue) </p>
 <img :src=" require('../assets/img/' + `${product_data.image}`)  " alt=""> 
<p>Имя товара: {{product_data.name}}</p>
<p>Цена: {{product_data.price}}</p>

<button
@click="sendDataToParent"
>В корзину</button>

</div>
  
</template>

<script>
export default {
name:'catalog-item' ,

//передача метода ($emit) от Ребенка к Родителю 
    methods:{
      sendDataToParent(){
        this.$emit('sendDataToParent',this.product_data.article)
      }
    },
    
  //  сообщение родителю - кто его ребенок
    components:{},

    //в props прилетает из Родителя (не персональные данные)
    props:{
      product_data: {
        type: Object,
        default(){
          return {}
        }
      }
    },

    //( персональные данные  компонента 'КарточкаТовара')
    data() {
      return {

      }
    },

  

}
</script>

<style>
.catalog-item{
/*ширина Карточки макс=25% */
flex-basis: 25%;

border: 1px solid #bab9b9;
padding: 10px;
margin: 8px;
box-shadow: -1px 0px 8px 3px #a7a7a7;
border-radius: 4px;
}
</style>