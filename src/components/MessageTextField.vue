<template>
  <v-form @submit.prevent="sendMessage(message)">
    <v-container class="widened-container">
      <v-layout row nowrap>
        <v-flex column
          xs9
        >
          <v-textarea
            rows="3"
            class="message-text"
            outline
            v-model="message"
            placeholder="Type something ..."
          ></v-textarea>
        </v-flex>
        <v-flex xs3 column align-center>
        <v-layout column nowrap pa-1>
          <v-flex row>
            <v-btn type="submit" class="send-btn">Submit</v-btn>
          </v-flex>
          <v-flex row>
            <v-btn class="send-btn">Hello World!</v-btn>
          </v-flex>
        </v-layout>
        </v-flex>
      </v-layout>
    </v-container>
  </v-form>
</template>

<script>


export default {
  data(){
    return {
      message : ""
    }
  },
  methods: {
    sendMessage(message){
      this.socket.emit("send_message",{
        "msg": message
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.widened{
  max-width: 100% !important;
}
.message-text{
  // width: 35vw;
}
.send-btn{
  width: 10vw;
}
</style>
