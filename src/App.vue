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
  mounted() {
    this.checkIfLoggedIn();
  },
  methods: {
    checkIfLoggedIn() {
      api.checkIfLoggedIn().then(res => {
        console.log(res.data)
        console.log(res.data.user);
        console.log(this);
        if(res.data.user){
          this.$store.commit("user/setUserDetails", res.data.user);
          this.$router.push("/messages");
        }
      })
    }
  }
};
</script>

<style></style>
