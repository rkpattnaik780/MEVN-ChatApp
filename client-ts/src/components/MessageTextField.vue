<template>
  <v-card class="message-input">
    <v-form @submit.prevent="sendMessage(message)">
      <v-container class="message-form">
        <v-layout row nowrap>
          <v-flex column xs9>
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
                <input
                  v-show="false"
                  ref="inputUpload"
                  type="file"
                  @change="uploadFile($event.target.files[0])"
                />
                <v-btn color="success" @click="$refs.inputUpload.click()"
                  >Upload</v-btn
                >
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-container>
    </v-form>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import { MessageCreateDTO } from "@/interfaces/message.model.dto";
import { Events } from "@/enums/SocketIO";

export default Vue.extend({
  data() {
    return {
      message: "",
      file: null
    };
  },
  props: ["currentUser"],
  methods: {
    sendMessage(message: MessageCreateDTO) {
      let id = this.currentUser.providerId;
      this.socket.emit(Events.SendMessage, {
        message: message,
        providerId: id,
        time: new Date().getTime()
      });
      this.message = "";
    },
    uploadFile(file: File) {
      console.log("hello, file:", file);
    }
  }
});
</script>

<style lang="scss" scoped>
.message-input {
  min-width: 400px;
}
</style>
