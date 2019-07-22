<template>
  <v-form @submit.prevent="sendMessage(message)">
    <v-container class="message-form">
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
            <v-btn type="submit">Submit</v-btn>
          </v-flex>
          <v-flex row>
            <input v-show="false" ref="inputUpload" type="file" @change="uploadFile($event.target.files[0])">
            <v-btn @click="$refs.inputUpload.click()">Upload</v-btn>
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
      message : "",
      file : null
    }
  },
  props: ['currentUser'],
  methods: {
    sendMessage(message){
      let id = this.currentUser.githubId;      
      this.socket.emit("send_message",{
        "message": message,
        "githubId": id,
        "time": new Date().getTime()
      });
      this.message = "";
    },
    uploadFile(file) {
      console.log("hello");
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
