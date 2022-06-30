let app = new Vue({
el:'#app',

data:{
 test:"test",
 nameGood: "goods for Sambo & BJJ ",// наименов.товара
 imgOne:'./img/rass.png',//картинка 1 товара
 imgTwo:'./img/tiger.png',//картинка 2 товара
 //imgLink:'./img/',// не сработает 
 webLink: 'https://yandex.ru',// ссылка под картинкой
 api:'./db',//данные  JSON
 arrApi:[], //массив для сбора данных из JSON
 selectSport:'Выбери из списка',
},

computed:{
  goodsArrayFromAPI(){

fetch ( `${this.api}/db.json` )
  .then ( (result)=>{
    return result.json();
  })
  .then( (data)=>{
    console.log ( data );

      for (let el of data){
        this.arrApi.push(el)
          } 
      console.log ( this.arrApi );
   })
   .catch (function(erorr){
    console.log (erorr)
  })     }

},


template:
`<div class="wrapper">

<div class="zero bord">{{test}}</div>
<div class="basket bord">basket</div>

<div class="name bord">
<h2>{{nameGood}}</h2>
</div>

<div class="add bord">add</div>


<div class="img bord">
  <img class="imgGoods" alt="image BJJ"
  :src="imgOne"  
  />
    <p><a :href="webLink">Наш спортклуб</a> </p>
</div>



<div class="descript bord">
  <main class="main_descript">

    {{goodsArrayFromAPI}}

    <div v-for="el of arrApi" :key="el.id" class="main_arrApi">
      <p v-if="el.max-el.man<=0"> {{el.name}}: набор закончился </p>
      <p v-if="el.max-el.man<=6&&el.max-el.man>=1"> {{el.name}}: набор завершается </p>
      <p v-if="el.max-el.man>6"> {{el.name}}: набор идет </p>
      <img class="imgSport" alt="its BJJ" :src=" ('./img/' + el.img)" />
    </div>

    <div class="size">

      <p>Выбор спорта:</p>

      <select v-model="selectSport" class="sportsel"> 
          <option 
          v-for="elm of arrApi" 
          :name="elm.name"
          >
          {{elm.name}}  
        </option>
      </select>

     <p>  Из списка выбран : {{selectSport}}</p>
 
    </div>


  </main>

</div>


<div class="feedback bord">feedback</div>

</div><!--wrapper:: end -->`

})//new Vue:: end