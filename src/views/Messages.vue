<template>
    <v-container row nowrap sm6 align-center class="message-box-2">
      <v-card>
      <v-flex xs12>
        <MessageList/>
      </v-flex>
      <v-flex xs12>
        <MessageTextField/>
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
  }
};
</script>

<style lang="scss" scoped>
.message-box-2{
  width: 50vw;
  min-width: 410px;
}
</style>

