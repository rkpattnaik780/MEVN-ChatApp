<template>
    <v-flex xs12>
      <v-card class="message-box">
        <template v-for="(message, index) in messages">
          <v-layout row nowrap :key="index" class="message" v-if="message.username == currentUser.username">
            <v-flex xs11 class="message__text-1">
              {{ message.message }}
            </v-flex>
            <v-flex xs1 class="text-xs-center">
               <v-tooltip dark left>
                <template v-slot:activator="{ on }">
                  <img v-on="on" :src="message.image" width="50px" height="50px">
                </template>
                <div>
                  <span>{{ moment(message.time).format("hh:mm:ss A") }}</span><br>
                  <span>{{ moment(message.time).format("Do MMM 'YY") }}</span>
                </div>
              </v-tooltip>
            </v-flex>
            <!-- <v-divider/> -->
          </v-layout> 
          <v-layout v-else row nowrap :key="index" class="message">
            <v-flex xs1 class="text-xs-center">
              <v-tooltip right close-delay="2000">
                <template v-slot:activator="{ on }">
                  <img v-on="on" :src="message.image" width="50px" height="50px">
                </template>
                <div>
                  <span>
                    <a class="white--text" :href="'https://github.com/' + message.username">
                      {{ message.name }}
                    </a>
                  </span>
                  <br>
                  <span>{{ moment(message.time).format("hh:mm:ss A") }}</span><br>
                  <span>{{ moment(message.time).format("Do MMM 'YY") }}</span>
                </div>
              </v-tooltip>
            </v-flex>
            <v-flex xs11 class="message__text-2">
              {{ message.message }}
            </v-flex>
            <!-- <v-divider/> -->
          </v-layout>         
        </template>
      </v-card>
    </v-flex>
</template>

<script>
import NavBar from "@/components/NavBar";
import Loader from "@/components/Loader";

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
@media only screen and (max-width: 500px) {
  .message{
    &__text-1{
      font-size: 12px;
    }
    &__text-2{
      font-size: 12px;
    }
  }
}
.message-box {
  height : 65vh !important;
  min-width: 300px;
  overflow-y: scroll;
  overflow-x: hidden;
  scrollbar-color: gray lightgray;
  scrollbar-width: thin;
  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-track {
    background: lightgray;
  }
  &::-webkit-scrollbar-thumb {
    background: gray;
    border-radius: 2px;;
  }
}
.message{
  padding: 10px;
  &__text-1{
    padding: 15px 20px 15px 20px;
    margin: 0 10px;
    background : #1976d2;
    color: white;
    font-size: 16px;
    border-radius: 10px;
  }
  &__text-2{
    padding: 15px 20px 15px 20px;
    margin: 0 10px 0 30px;
    background : #d9d9d9;
    color: black;
    font-size: 16px;
    border-radius: 10px;
  }
}
</style>
