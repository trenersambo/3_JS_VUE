Vue.component('details-prod', {
  props:{
    details:{
    type:Array,
    required: true,
    }
  },
  template:
  ` 
  <ol>
    <li v-for="oneList in details">{{oneList}}</li>
  </ol>
  `
})

Vue.component('product', {

props:{
cart: {
  type: Array,
  required: true,
  default:[],
  },
variants:{
  type: Array,
  required: true
}
},

  data() {
    return{
          product: 'Socks',
          brand: 'Vue Mastery',
          selectedVariant: 0,
          details: ['80% cotton', '20% polyester', 'Gender-neutral'],
    
    }

          
      },
      methods: {
          addToCart () {
              //this.cart += 1

              //проверка id Товара, кликнутого через кнопку "add to cart"
              console.log('id Товара для передачи от Ребенка '+this.variants[this.selectedVariant].variantId)

              //передача клика кнопки от Ребенка к родителю
              this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId)

          },

          delFromCart(){
          console.log('На удаление id: '+this.variants[this.selectedVariant].variantId);
          this.$emit('del-from-cart', this.variants[this.selectedVariant].variantId);

          },
          


          updateProduct: function(index) {  
              this.selectedVariant = index
          }
      },
      computed: {
          title() {
              return this.brand + ' ' + this.product  
          },
          image(){
              return this.variants[this.selectedVariant].variantImage
          },
          inStock(){
              return this.variants[this.selectedVariant].variantQuantity
          },
          sale() {
            if (this.variants[this.selectedVariant].onSale) {
              return this.brand + ' ' + this.product + ' are on sale!'
            } 
              return  this.brand + ' ' + this.product + ' are not on sale'
          }
      },

      template:
`
  <div class="product">
        
    <div class="product-image">
      <img :src="image" />
    </div>

    <div class="product-info">
      <h1>{{ title }}</h1>
      <p v-if="inStock">In Stock</p>
      <p v-else 
      :class="{outOfStock: !inStock}">Out of Stock</p>
      <p :class="{notOnsale: !inStock}" >{{ sale }}</p>
 
<!--  <ul> <li v-for="detail in details">{{ detail }}</li> </ul>  -->

        <details-prod 
        :details="details"
        ></details-prod>


        <div class="color-box"
             v-for="(variant, index) in variants" 
             :key="variant.variantId"
             :style="{ backgroundColor: variant.variantColor }"
             @mouseover="updateProduct(index)"
             >
        </div> 

        <button 
          @click="addToCart" 
          :disabled="!inStock"
          :class="{ disabledButton: !inStock }"
          >
        Add to cart
        </button>

       <button
       @click="delFromCart"
       :disabled="this.cart<=0"
       :class="{disabledButton: this.cart==0}"
       >Delete </button>

        <div class="cart">
          <p>Cart({{ cart.length }})</p>
        </div>

      </div>  
    
  </div>
`
})

Vue.component('premium-component', {
  props:{
    userName:{
      type:String,
      required:true,
    },

    userArr:{
      type:Array,
    }
  },

  data() {
    return {
      // 2a). копилка для передачи в Родителя
      text:'',
      //shippingFree:'free',
    }
  },

  methods:{
    textInput(){
      // console.log(this.text)
      //3а). Подготвка трансляции в родителя введенных слов ( параметр: this.text)
      this.$emit('add-Text-Input', this.text)
    }
  },

  computed:{
    freeOrBye(){

      //console.log (this.userArr)    
      // this.userArr.forEach((el) => {
      //   if(this.text == el){
      //     console.log('test') ; console.log(this.text);
      //   }  
      // });

      // for (let el in this.userArr){
      //   //console.log(this.userArr[el])
      //   if(this.text === this.userArr[el]){
      //     return "БЕСПЛАТНО" 
      //   } 
      // }

      let dataEl = this.userArr.indexOf(this.text);
      console.log(dataEl)

      if(dataEl !=-1){
      // console.log('тест пройден')
      return "БЕСПЛАТНО" 
      }else{
      return "2$"
      }

 
    }
  },

  // 1а). поле ввода ЛОГИНА (ввод улетает в text + @вызов метода)
  template:
  `<div class='premium_component'>
<h2>Расчет доставки: </h2>
  <input type="text" placeholder="logins: a,b,c,d" 
   @input="textInput"  v-model="text">

  
   <p>
   <span v-if="this.text.length >0">для логина "{{text}}"</span> 
   доставка: {{freeOrBye}}
   </p>

  </div>
  `
})


let app = new Vue({
    el: '#app',

    data:{
      cart: [],
      variants: [
        {
          variantId: 2234,
          variantColor: 'green',
          variantImage: 'https://www.vuemastery.com/images/challenges/vmSocks-green-onWhite.jpg',
          variantQuantity: 10,
          onSale: true,
        },
        {
          variantId: 2235,
          variantColor: 'blue',
          variantImage: 'https://www.vuemastery.com/images/challenges/vmSocks-blue-onWhite.jpg',
          variantQuantity: 0,
          onSale: false,
        }
      ],

      userName:'',
      userArr:["a","b","c","d"],
    },

     methods:{
      addtext(text){
        //console.log(text)//working
        //в userName попадают все введенные слова
        this.userName = text
      },
      addToCart(id){
      console.log ('в родителя от ребенка Товар с id ' + id)

      //наполнение массива Корзины добавленными товарами
      this.cart.push(id)
      },

      delCart(ids){
      console.log ('в родителя от ребенка Товар с id (удаление) ' + ids);
      this.cart.pop(ids)
      }

    },

    template:
    `<div>
    <product 
    :cart="cart"
    :variants="variants"
    @add-to-cart="addToCart"
    @del-from-cart="delCart"
    ></product>

    <premium-component
    :userName="userName"
    :userArr="userArr"
    @add-Text-Input="addtext"

    ></premium-component>
    </div> `

  })
  