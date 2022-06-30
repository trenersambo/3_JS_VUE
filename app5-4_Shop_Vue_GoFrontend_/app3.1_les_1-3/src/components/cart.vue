<template>

<div class="cart">
<p>Корзина 'cart.vue' (я - ребенок main-wrapper'a)</p>
</div>
  
</template>

<script>
export default {
name:'cart' ,

    // сообщение родителю - кто его ребенок
    components:{},

    // в props прилетает из Родителя (не персональные данные)
    props:{},

    // ( персональные данные  компонента 'КОРЗИНА')
    data() {
      return {
   
      }
    },

}
</script>

<style>
.cart{
margin: 15px;
border: 1px solid #4a4545;
padding: 5px;
}
</style>