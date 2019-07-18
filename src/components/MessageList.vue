<template>
    <v-flex xs12>
      <v-card class="message-box">
        <template v-for="(message, index) in messages">
          <v-layout row nowrap :key="index" class="message" v-if="message.githubId == currentUser.githubId">
            <v-flex xs11>
              <v-layout class="message-text">
                {{ message.message }}
              </v-layout>
            </v-flex>
            <v-flex xs1>
              <img :src="message.image" width="40px" height="40px">
            </v-flex>
            <!-- <v-divider/> -->
          </v-layout> 
          <v-layout v-else row nowrap :key="index" class="message">
            <v-flex xs1>
              <img :src="message.image" width="40px" height="40px">
            </v-flex>
            <v-flex xs11>
              <v-layout class="message-text">
                {{ message.message }}
              </v-layout>
            </v-flex>
            <!-- <v-divider/> -->
          </v-layout>         
        </template>
      </v-card>
    </v-flex>
</template>

<script>
import NavBar from "@/components/NavBar";

export default {
  name : 'MessageList',
  components: {
    NavBar
  },
  props: ['currentUser'],
  data () {
    return {
      messages: []
    }
  },
  mounted(){
    this.fetchMessages();
    this.socket.on('messages_fetched', (data) => {
      console.log(data);
      this.messages = data;
    });
  },
  methods: {
    fetchMessages() {
      this.socket.emit("fetch_messages");
    }
  }
};
</script>

<style lang="scss" scoped>
.message-box {
  height : 65vh !important;
  min-width: 410px;
  overflow-y: scroll;
}
.message{
  padding: 10px;
}
.message-text{
  padding: 5px 10px 5px 10px;
  border: 0.1px solid grey;
  margin: 0 10px;
  border-radius: 10px;
}
</style>
