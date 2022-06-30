let app = new Vue({
el:'#app',

data:{
 test:"test",
 nameGood: "Camp Sambo & BJJ ",// наименов.товара
 imgOne:'./img/rass.png',//картинка 1 товара

 webLink: 'https://yandex.ru',// ссылка под картинкой
 api:'./db',//данные  JSON
 arrApi:[], //массив для сбора данных из JSON
 selectSport:' нет данных',
 registred:0,//регистр-я Чел-ка на трен-ку
 regIntermediate:0, //промежуточ.значение (скрытое)
 
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
  })     } ,


},

methods:{
  regTrening( ){

    // this.regIntermediate = this.selectSport.man;
    // console.log (this.regIntermediate); 
    if (this.registred+this.selectSport.man < this.selectSport.max){
        this.registred +=1;
    }
    console.log (this.registred ); 



  },
  showImg(img){
    console.log (`клик на фото ${img}`)
    this.imgOne = `./img/${img}`
  },


},


template:
`<div class="wrapper">

  <div class="zero bord">

    <div class="size">

      <p>Выбор спорта:</p>

      <select v-model="selectSport" class="sportsel"> 
        <option v-for="elm of arrApi" 
        :value="elm"
         >
          {{elm.man}}_{{elm.name}}  
        </option>
      </select>

      <p> покажет значение selectSport.man: {{selectSport.man}}</p>
      <p> Внутри МАССИВ из value: {{selectSport}}</p>
    
    </div>

  </div>

<div class="basket bord" >

<p>Уже записано человек:
{{ selectSport.man}} из {{ selectSport.max}} 
</p>

<p >
<span > Вы записались:  {{registred}} на {{ selectSport.name}} </span> 
</p>
<p v-if="this.registred+this.selectSport.man >= this.selectSport.max">
Превышен лимит записей на {{ selectSport.name}} с 1 логина
</p>

</div>



<div class="name bord">
<h2>{{nameGood}}</h2>
</div>

<div class="add bord">
<button @click="regTrening" class="btnRegistr"
>Запись</button>
</div>


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
      <img 
      class="imgSport" alt="its BJJ" 
      :src=" ('./img/' + el.img)" 
      @click="showImg(el.img)"
      />
    </div>

  </main>

</div>


<div class="feedback bord">feedback</div>

</div><!--wrapper:: end -->`

})//new Vue:: end