<template>
    <v-container row nowrap sm6 align-center class="message-list">
      <v-card>
      <v-flex xs12>
        <MessageList :currentUser="currentUser"/>
      </v-flex>
      <v-flex xs12>
        <MessageTextField :currentUser="currentUser"/>
      </v-flex>
      </v-card>
    </v-container>
</template>

<script>
import MessageList from "@/components/MessageList";
import MessageTextField from "@/components/MessageTextField";

export default {
  name : 'Messages',
  components : {
    MessageList,
    MessageTextField
  },
  computed :{
    currentUser(){
      return this.$store.getters["user/getUserDetails"];
    }
  },
};
</script>

<style lang="scss" scoped>
@media only screen and (max-width: 500px) {
  .message-list{
    padding: 1px;
  }
}
</style>

