<template>
  <v-app>
    <v-content transition="slide-x-transition">
      <NavBar />
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import api from "@/api/";
import NavBar from "@/components/NavBar";

export default {
  name: "App",
  components: {
    NavBar
  },
  created() {
    this.checkIfLoggedIn();
  },
  methods: {
    checkIfLoggedIn() {
      api.checkIfLoggedIn().then(res => {
        console.log(res.data);
        if(res.data.user && this.$router.currentRoute.name === "home"){
          console.log(res.data.user);
          this.$store.commit("user/setUserDetails", res.data.user);
          this.$router.push("/messages");
        }
      })
    }
  }
};
</script>

<style></style>
