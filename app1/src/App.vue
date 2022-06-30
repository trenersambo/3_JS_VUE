<template>
<div class="app"><!-- start -->

<form>
  <h3>Создать пост</h3>

  <input
  class="input"  
  type="text"
  placeholder="name of post" 

  v-on:value="title"
  @input="titleInput($event.target.value)"
   >

  <input
  class="input"
   type="text"
   placeholder="description"

   v-on:value="body"
   @input="body = $event.target.value"

   >

  <button 
  class="btn" 
  @click="createPost"
  >
  Создать пост</button>
</form>

<div 
class="post" 
v-for="post in posts" 
:key="post.id"
>
  <div ><strong>Name:</strong>{{post.title}}</div>
  <div><strong>Description:</strong>{{post.body}}</div>
</div>

</div><!-- end -->
</template>


<script>
 
export default{
  data(){
    return{
      title: '',
      body: '',
      posts: [
      {id:1, title: "Пост о САМБО и BJJ",  body: "Борьба за мир" },      
      {id:2, title: "note about judo",  body: "fight for world peace" },
      {id:3, title: "заметка про Муай-Тай",  body: " руками и ногами за мир" },

      ],

    }

  }, 

  methods: {
    createPost(){
    },

    titleInput(value){
      this.title = value
      console.log (value)
    }
 
  }


}// export default::end
 
</script>

<style>
/*обнуление*/
*{
margin: 0;
padding: 0;
box-sizing: border-box;
}
.post{
padding: 15px;
border: 3px solid #008080;
margin-top: 8px;
}

.input{
width: 100%;
border: 1px solid #008080;
padding: 10px 15px;
margin-top: 8px;
}
.app{
padding: 20px;
}

form {
display: flex;
flex-direction: column;
}

.btn{
align-self: start;
margin-top: 10px;
padding: 10px 15px;
background: none;
color: teal;
border: 1px solid #000;
border-radius: 8px;
}

</style>