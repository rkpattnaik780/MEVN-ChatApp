<template>
  <v-card class="message-input">
    <v-form @submit.prevent="sendMessage(message)">
      <v-container class="message-form">
        <v-layout row nowrap>
          <v-flex column
            xs9
          >
            <v-textarea
              hide-details
              rows="3"
              class="message-text"
              outline
              v-model="message"
              @keyup.enter="sendMessage(message)"
              placeholder="Say hi ..."
            ></v-textarea>
          </v-flex>
          <v-flex xs3 column align-center>
          <v-layout column nowrap pa-1>
            <v-flex row>
              <v-btn color="primary" type="submit">Submit</v-btn>
            </v-flex>
            <v-flex row>
              <input v-show="false" ref="inputUpload" type="file" @change="uploadFile($event.target.files[0])">
              <v-btn color="success" @click="$refs.inputUpload.click()">Upload</v-btn>
            </v-flex>
          </v-layout>
          </v-flex>
        </v-layout>
      </v-container>
    </v-form>
  </v-card>
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
.message-input{
  min-width: 400px;
}
</style>
