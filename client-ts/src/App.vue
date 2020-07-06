<template>
  <v-app>
    <v-content transition="slide-x-transition">
      <NavBar />
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import api from "@/api/";
import NavBar from "@/components/NavBar.vue";
import { UserMutations } from "@/enums/Vuex";
import Vue from "vue";
import { AxiosResponse } from "axios";

export default Vue.extend({
  name: "App",
  components: {
    NavBar
  },
  created() {
    this.checkIfLoggedIn();
  },
  methods: {
    checkIfLoggedIn() {
      api.checkIfLoggedIn().then((res: AxiosResponse) => {
        if (res.data.user && this.$router.currentRoute.name === "home") {
          this.$store.commit(UserMutations.SetUserDetails, res.data.user);
          this.$router.push("/messages");
        }
      });
    }
  }
});
</script>

<style></style>
