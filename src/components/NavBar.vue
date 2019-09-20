<template>
  <span>
    <v-navigation-drawer
      app
      v-model="drawer"
      dark
      color="primary"
      disable-resize-watcher
    >
      <v-list>
        <template>
          <v-list-tile @click="() => this.$router.push('about')">
            <v-list-tile-content>About us</v-list-tile-content>
          </v-list-tile>
          <v-list-tile v-if="currentUser" @click="signOut">
            <v-list-tile-content>Sign out</v-list-tile-content>
          </v-list-tile>
          <v-divider></v-divider>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app color="primary" dark>
      <v-toolbar-side-icon
        class="hidden-md-and-up"
        @click="drawer = !drawer"
      ></v-toolbar-side-icon>
      <v-spacer class="hidden-md-and-up"></v-spacer>
      <v-toolbar-title>Vestelda</v-toolbar-title>
      <v-spacer class="hidden-sm-and-down"></v-spacer>
      <v-btn flat class="hidden-sm-and-down">
        <router-link class="white--text" :to="'/about'">About Us</router-link>
      </v-btn>
      <v-menu bottom nudge-bottom left v-if="currentUser">
        <template v-slot:activator="{ on }">
          <v-btn
            dark
            icon
            v-on="on"
          > 
            <v-avatar size="36px">
              <img
                v-if="currentUser"
                :src="currentUser.image"
                alt="Avatar"
              >
              <v-icon v-else>person</v-icon>
            </v-avatar>
            <!-- <image :src="currentUser.image"/> -->
          </v-btn>
        </template>

        <v-list>
          <v-list-tile @click.prevent = "signOut()">
            <v-list-tile-title>Sign Out</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-toolbar>
  </span>
</template>

<script>

import api from "@/api";
export default {
  name: "AppNavigation",
  computed :{
    currentUser(){
      return this.$store.getters["user/getUserDetails"];
    }
  },
  methods: {
    signOut(){
      api.signOut().then(res => {
        this.$store.commit("user/reset");
        this.$router.push("/");
      });
    }
  },
  data() {
    return {
      drawer: false
    };
  }
};
</script>

<style scoped></style>
