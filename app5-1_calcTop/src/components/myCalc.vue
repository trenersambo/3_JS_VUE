<template>  
 <div>
 <h2>{{titul}}</h2>
<div class="calc_wrapper"><!-- "calc_wrapper":: start -->

<div class="notNumber" v-if =" isNaN(numLeft) || isNaN(numLeft)|| isNaN(total)"
>Введи число!
</div>

  <div class="calc_input">

  

    <input type="number" 
    v-model.number="numLeft"
    >        

    <p> {{testShowOperat}}</p>
    <!-- {{clickBtnNum( )}} -->

    <input type="number" 
    v-model.number="numRight">

    <p>result:</p>
    <input type="text" v-model.number="total">

  </div> <!-- "calc_input"::end -->
  

  <div class="calc_btnOperation" >

  <!-- кнопки +, - , / ,  *, степень, целочисл.деление -->
  <div class="btnOperation" 
  v-for="(btnOperat, index)  in btnOperation" 
  :key = "index"
  @click = 'mathOperation(btnOperat)'

  > {{btnOperat}}   </div>

  </div> <!--"calc_btnOperation"::end  -->


  <div class="checkBtn" > <input type="checkbox" checked> Включить эл.клавиатуру </div>


  <div class="calc_showBtnNumber">
  
  <div class="calc_btnNumber" 
  v-for="(btnNum, index) in btnNumber" 
  :key ="index"
  @click = 'clickBtnNum(btnNum)'
  > {{btnNum}} 
  </div> <!-- "calc_btnNumber" ::end-->
  
  
  </div> <!-- "calc_showBtnNumber" ::end -->

  <div class="calc_switchOperand">

    <input type="radio" class="radioLeft"> Операнд_1
    <input type="radio" class="radioRight">Операнд_2
    
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
     btnOperation: ['+', '-','x','/','pow','round','CE/C','='],
     btnNumber: [0,1,2,3,4,5,6,7,8,9,'.'],
     testShowOperat:'', // показ на экране знака операции
  }
 },

methods:{
  //какая ОПЕРАЦИЯ -> вывод ИТОГа ('total')
  mathOperation(btnOperat){
      console.log (btnOperat) // Имя кнопки: +,-,/,х ...

      if (btnOperat === '+') this.total = this.numLeft+this.numRight;
      if (btnOperat === '-') this.total = this.numLeft-this.numRight;
      if (btnOperat === 'x') this.total = this.numLeft*this.numRight;
      if (btnOperat === '/') this.total = this.numLeft/this.numRight;
      if (btnOperat === 'pow') this.total = Math.pow(this.numLeft, this.numRight);
      if (btnOperat === 'round') this.total = Math.round(this.numLeft / this.numRight);
      if (btnOperat === 'CE/C') {this.total='', this.numLeft='' , this.numRight=''}
      
      this.testShowOperat = btnOperat ;//показ ЗНАКА операции
    
    },

  //Какая кликнута  ЦИФРА   
  clickBtnNum(btnNum){
    console.log (btnNum);
    return btnNum
  }
}

} 
</script> 

<style>
.calc_wrapper{

width: 450px;
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
 justify-content: space-evenly;
 align-items: center;

 margin-top: 25px;
}

input[type="radio"]{
  height: 14px;
}
</style>
