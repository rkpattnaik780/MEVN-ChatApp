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
        <template v-for="(item, index) in items">
          <v-list-tile :key="index">
            <v-list-tile-content>{{ item.title }}</v-list-tile-content>
          </v-list-tile>
          <v-divider :key="`divider-${index}`"></v-divider>
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
        <router-link class="white--text" :to="'home'">About Us</router-link>
      </v-btn>
      <v-menu bottom nudge-bottom left>
        <template v-slot:activator="{ on }">
          <v-btn
            dark
            icon
            v-on="on"
          >
            <v-icon>home</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-tile
            v-for="(item, i) in items"
            :key="i"
          >
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-toolbar>
  </span>
</template>

<script>
export default {
  name: "AppNavigation",
  data() {
    return {
      appTitle: "Meal Prep",
      drawer: false,
      items: [{ title: "Menu" }, { title: "Sign In" }, { title: "Join" }]
    };
  }
};
</script>

<style scoped></style>
