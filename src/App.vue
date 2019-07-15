<template>
  <v-app>
    <v-content transition="slide-x-transition">
      <NavBar/>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import NavBar from "@/components/NavBar";

export default {
  name: "App",
  components: {
    NavBar
  }
};
</script>

<style>
</style>