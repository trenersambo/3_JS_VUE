<template>  
 <div>
 <h2>{{titul}}</h2>
<div class="calc_wrapper"><!-- "calc_wrapper":: start -->

    <p>Математическая операция: {{showOperat}}</p>

  <div class="calc_input">

    <!-- ЛЕВОЕ поле ввода-->
    <input type="number" 
    v-model.number="numLeft" >                         

    <!-- ПРАВОЕ поле ввода-->
    <input type="number" 
    v-model.number="numRight">

    <p>result:</p>
    <input type="text" v-model.number="total">

  </div> <!-- "calc_input"::end -->
  

  <div class="calc_btnOperation" >

  <!-- кнопки +, - , / ,  *, степень, целочисл.деление -->
  <div class="btnOperation" 
  v-for="(btnOperat, index)  in btnOperation" 
  :key="index"
  :title="btnOperat"  
  @click = 'mathOperation(btnOperat)'

  > {{btnOperat}}   </div>

  </div> <!--"calc_btnOperation"::end  -->


  <div class="checkBtn" > 
  
  <input type="checkbox"  id="checkBox"   v-model="klavaChecked" > 
  <label for="checkBox">Включить эл.клавиатуру</label>
   
  </div> <!--чекБокс::end  -->


  <div class="calc_showBtnNumber"  v-if="this.klavaChecked">
  
      <div class="calc_btnNumber" 
      v-for="(btnNum, index) in btnNumber" 
      :key ="index"
      @click = 'input(btnNum)'
      > {{btnNum}} 
      </div> <!-- "calc_btnNumber" ::end-->
  
  </div> <!-- "calc_showBtnNumber" ::end -->

  <div class="calc_switchOperand">

    <input type="radio" 
    id = "idLeft"
    value="valueLeft"
    class="radioLeft"
    v-model="radioPicked"
    >
    <label for ="idLeft">ЛЕВОЕ поле ввода</label>

    <input type="radio" 
    id = "idRight"
    value="valueRight"    
    class="radioRight"
    v-model="radioPicked"
    >
    <label for ="idRight">ПРАВОЕ поле ввода</label>
    
  </div> <!-- "calc_switchOperand" ::end-->


</div><!-- "calc_wrapper":: end -->
 
    </div>
</template>

<script> 
// Компонент КАЛЬКУЛЯТОРА

export default {
 name:'MyCalculator', // имя компонента js-скрипта

 data(){ 
  return{
    titul: 'VueJS CLI Calculator' ,
    numLeft: '', //левое окно ввода
     numRight: '', // правое окно ввода
     total: 0, // окно итога
     btnOperation: ['+', '-','x','/','pow','round','ClearAll','DelLast'],
     btnNumber: [0,1,2,3,4,5,6,7,8,9,],
    // inputString:'', // ?? для цифр (2- и более значых)
     showOperat:'', // показ на экране знака операции
     radioPicked:'' , //какая радиокнопка выбрана (picked=выбор)
     klavaChecked: true,//показать/убрать эл.клавиатуру
  }
 },

methods:{
  //какая ОПЕРАЦИЯ -> вывод ИТОГа ('total')
  mathOperation(btnOperat){
      console.log (btnOperat) // Имя кнопки: +,-,/,х ...

      if (btnOperat === '+') this.total = +this.numLeft + +this.numRight;
      if (btnOperat === '-') this.total = this.numLeft-this.numRight;
      if (btnOperat === 'x') this.total = this.numLeft*this.numRight;
      if (btnOperat === '/') this.total = this.numLeft/this.numRight;
      if (btnOperat === 'pow') this.total = Math.pow(this.numLeft, this.numRight);
      if (btnOperat === 'round') this.total = Math.round(this.numLeft / this.numRight);
      if (btnOperat === 'ClearAll') {this.total='', this.numLeft='' , this.numRight=''} ;
      //if (btnOperat === 'DelLast') {this.numLeft=this.numLeft.replace(/.$/,"") }

      if (btnOperat === 'DelLast') { 
          if(this.radioPicked === 'valueLeft'){
            this.numLeft=this.numLeft.replace(/.$/,"")
          }else{
            this.numRight=this.numRight.replace(/.$/,"")
          }
        }

      this.showOperat = btnOperat ;//для показа ЗНАКА операции
    
    },

  //Какая кликнута  ЦИФРА   
  input: function(btnNum){
    //this.inputString +=btnNum  ;//вводим 2-х и  более значные цифры
  
    //console.log (this.inputString);//проверка ввода многозначных цифр
    //console.log (btnNum);
    //return btnNum 

    // ToDo: 
    // 1.сделать ввод в левое поле и в правое поле - независимым
    // 2.обнулять inputString можно через CE/C: inputString=''

    // this.numLeft = this.inputString; //work, bad

    //console.log(`выбрана радиокнопка: ${this.radioPicked}`)

    //Логика для ввода 2-х и  более значных цифр
    //Выбор поля ввода цифр
    if(this.radioPicked === 'valueRight'){
       this.numRight +=btnNum
    }else{
       this.numLeft +=btnNum
    }

//ToDO: удаление последнего знака
//Поиск: метод slice(-1); charAt();
   // console.log (toString(this.numLeft).slice(-1) ) bad
   //console.log (this.numLeft.replace(/.$/,"") )

  },
 

  
} // methods:: end


} //export default:: end
</script> 

<style>
.calc_wrapper{

width: 480px;
margin: 0 auto;
border: 1px solid #909090;
padding: 20px 5px 25px 5px;
}

.calc_input{
display: flex;
justify-content: space-evenly;
}

input{
width: 100px;
height: 35px;
font-size: 16px;
padding-left: 8px;
}

/*Блок Кнопки Операций*/
.calc_btnOperation{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;

    gap: 8px;
    margin-top: 10px;
    margin-bottom: 10px;
}

/*кнопка*/
.btnOperation{
width: 100px;
border: 1px solid #000;
text-align: center;

font-size: 16px;
line-height: 32px;
height: 32px;

border-radius: 5px;
background: #dadada;
}

/*кнопка Чек*/
.checkBtn{
font-size: 16px;
margin: 15px 0 15px 0;
}

input[type="checkbox"]{
  height: 14px;
}

/*Блок с ЦИФРАМИ*/
.calc_showBtnNumber{
display: grid;
grid-template-columns: repeat(3,1fr);
grid-gap: 10px;
}

/*кнопка с цифрами*/
.calc_btnNumber{
height: 32px;
border: 1px solid #000;
text-align: center;

font-size: 16px;
line-height: 32px;
height: 32px;

border-radius: 5px;
background: #ecffd6;
 
}

/*радиокнопки*/
.calc_switchOperand{
 display: flex;
 justify-content: center;
 align-items: center;

 margin-top: 25px;
}

input[type="radio"]{
  height: 14px;
  width:30px;
}
</style>
