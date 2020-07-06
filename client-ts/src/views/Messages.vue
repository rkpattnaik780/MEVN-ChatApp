<template>
  <v-container fluid grid-list-md row nowrap align-center class="message-list">
    <v-layout row>
      <v-flex :class="{ xs10: isSidebarOpened, xs11: !isSidebarOpened }">
        <v-card>
          <MessageList :currentUser="currentUser" />
          <MessageTextField :currentUser="currentUser" />
        </v-card>
      </v-flex>

      <v-flex
        align-self-center
        v-show="!isSidebarOpened"
        class="xs1"
        height="100%"
      >
        <v-btn @click="openSidebar" class="info v-btn--small">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
      </v-flex>

      <v-flex v-show="isSidebarOpened" class="xs2" text-xs-left>
        <v-card height="100%" class="sidebar-card">
          <v-card-text class="font-weight-bold text-xs-center"
            >Active users</v-card-text
          >
          <v-card-text
            v-for="active_user in this.active_users"
            :key="active_user._id"
          >
            <v-avatar height="36px" width="36px" class="pr-2">
              <img v-if="active_user" :src="active_user.image" alt="Avatar" />
              <v-icon v-else>person</v-icon>
            </v-avatar>

            <v-badge v-if="currentUser._id === active_user._id">
              <template v-slot:badge>
                <span>Me</span>
              </template>
              <span>{{ active_user.username }}</span>
            </v-badge>

            <span v-else>{{ active_user.username }}</span>
          </v-card-text>

          <div class="text-xs-center sidebar-card-btn-container">
            <v-btn class="v-btn--small" @click="closeSidebar" color="info">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </div>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import MessageList from "@/components/MessageList.vue";
import MessageTextField from "@/components/MessageTextField.vue";
import Vue from "vue";
import { UserConnectDTO } from "@/interfaces/user.model.dto";
import { Events } from "@/enums/SocketIO";
import { UserGetters, UserMutations } from "@/enums/Vuex";

export default Vue.extend({
  name: "Messages",
  components: {
    MessageList,
    MessageTextField
  },
  data() {
    return {
      active_users: [] as UserConnectDTO[],
      isSidebarOpened: true
    };
  },
  mounted() {
    this.join();
    this.socket.on(Events.UsersFetched, (data: UserConnectDTO[]) => {
      this.active_users = data;
    });
  },
  methods: {
    join() {
      this.socket.emit(Events.UserJoined, this.currentUser);
    },
    openSidebar() {
      this.isSidebarOpened = true;
    },
    closeSidebar() {
      this.isSidebarOpened = false;
    }
  },
  computed: {
    currentUser() {
      return this.$store.getters[UserGetters.GetUserDetails];
    }
  }
});
</script>

<style lang="scss" scoped>
.sidebar-card {
  position: relative;
}

.sidebar-card-btn-container {
  position: absolute;
  bottom: 1rem;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  text-align: center;
}

@media only screen and (max-width: 500px) {
  .message-list {
    padding: 1px;
  }
}
</style>
