<template>
  <div class="chatComponent">
    <!--Screen to show the messages-->
    <div class="chatScreen">
      <p>Hola, Soy María, ¿en qué puedo ayudarte?</p>
      <p v-show="showAnswer">Escribiendo...</p>
      <p v-for="message in messages" :key="message.id">{{message}}</p>
    </div>
    <!--Input to write the text-->
    <div class="input-group rounded ">
      <input type="search" v-model="message" class="form-control rounded " placeholder="Escriba su consulta" aria-label="Search"
      aria-describedby="search-addon"/>
      <button @click="submitMessage()" class="input-group-text border-0" id="search-addon">Enviar</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'chatComponent',

  data(){
    return{
      messages: [],
      message: "",
      //showMessage: false,
      answer: "Ahora mismo no podemos atenderle, llame al 600 000 000",
      showAnswer: false
    }
  }, 

  methods:{
    //To submit the message
    submitMessage(){
      if(this.message !== ""){
        this.messages.push(this.message);
        setTimeout(()=>{ this.messages.push(this.answer);}, 3000);
        this.showAnswer = true;
        setTimeout(()=>{ this.showAnswer = false;}, 3000);
      }

      //To reset the message
      this.message = "";
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.chatComponent{
  width: 250px;
  border: 2px solid black;
  border-radius: 5px;
  padding: 10px
}

.chatScreen{
  font-size: 13px;
}
</style>