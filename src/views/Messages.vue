<template>
  <v-container fluid grid-list-md row nowrap align-center class="message-list">
    <v-layout row>
      <v-flex xs9>
        <v-card>
          <MessageList :currentUser="currentUser" />
          <MessageTextField :currentUser="currentUser" />
        </v-card>
      </v-flex>

      <v-flex xs3 text-xs-center>
        <v-card height="100%">
          <v-card-text class="font-weight-bold">Active users</v-card-text>
          <v-card-text class="justify-center" v-for="active_user in this.active_users" :key="active_user._id">
            <v-avatar height="36px" width="36px" class="pr-2">
              <img
                v-if="active_user"
                :src="active_user.image"
                alt="Avatar"/>
              <v-icon v-else>person</v-icon>
            </v-avatar>


            <v-badge v-if="currentUser._id === active_user._id">
              <template v-slot:badge>
                <span>Me</span>
              </template>
              <span>{{active_user.username}}</span>
            </v-badge>

            <span v-else>{{active_user.username}}</span>

          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import MessageList from "@/components/MessageList";
import MessageTextField from "@/components/MessageTextField";

export default {
  name: "Messages",
  components: {
    MessageList,
    MessageTextField
  },
  data() {
    return {
      active_users: []
    };
  },
  mounted() {
    this.join();
    this.socket.on("users_fetched", data => {
      console.log(data);
      this.active_users = data;
    });
  },
  methods: {
    join() {
      this.socket.emit("user_joined", this.currentUser);
    }
  },
  computed: {
    currentUser() {
      return this.$store.getters["user/getUserDetails"];
    }
  }
};
</script>

<style lang="scss" scoped>
@media only screen and (max-width: 500px) {
  .message-list {
    padding: 1px;
  }
}
</style>
