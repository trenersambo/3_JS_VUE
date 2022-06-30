<template>

<div class="catalog_wrapper">
  <p> Я-каталог Catalog.vue (я ребенок main-wrapper'a)</p>
  <div class="catalog">
    <catalogItem
    v-for="product in products" 
    :key="product.article"
    :product_data="product"
    @sendDataToParent ="showArticleFromChild"  
    />

  </div>

</div><!-- "catalog_wrapper"::end -->

</template>

<script>

  //№1.импорт ребенка 'main-wrapper.vue' в родителя 'app.vue'
  import catalogItem from './catalog-item.vue'

export default {
name:'v-catalog',

    methods:{
      showArticleFromChild(articleChild){
        console.log (articleChild)
      }
    },

    //  сообщение родителю - кто его ребенок
    components:{
      catalogItem
    },

    //в props прилетает из Родителя (не персональные данные)
    props:{},

    //( персональные данные  компонента 'catalog')
    data() {
      return {

  "products": [
    {
      image: "bear.png",
      name: "T-shirt 1",
      price: 2100.23 ,
      article: "T1",
      available: true,
      category: "Мужские"
    },
    {
      image: "panda1.png",
      name: "T-shirt 2",
      price: 3150.12 ,
      article: "T2",
      available: true,
      category: "Женские"
    },
    {
      image: "rass.png",
      name: "T-shirt 3",
      price: 4200.51 ,
      article: "T3",
      available: false,
      category: "Женские"
    },
    {
      image: "tiger1.png",
      name: "T-shirt 4",
      price: 5300.12 ,
      article: "T4",
      available: true,
      category: "Мужские"
    },
    {
      image: "tiger.png",
      name: "T-shirt 5",
      price: 6500.35 ,
      article: "T5",
      available: false,
      category: "Женские"
    },
    {
      image: "panda2.png",
      name: "T-shirt 6",
      price: 8700.41 ,
      article: "T6",
      available: true,
      category: "Женские"
    }
  ] 
      }
    },



}
</script>

<style>
.catalog{
    border: 1px solid #707070;
    padding: 15px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    row-gap: 15px;
}
</style>