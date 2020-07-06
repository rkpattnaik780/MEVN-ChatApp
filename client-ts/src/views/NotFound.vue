<template>
  <v-container row nowrap sm6 align-center>
    <v-card>
      <v-img
        class="white--text"
        height="200px"
        alt="A dead end"
        src="https://fusedesk-wpengine.netdna-ssl.com/wp-content/uploads/The_dead_end-e1444191761608.jpg"
      >
        <v-card-title class="align-end fill-height"
          >A route that leads to nowhere !!</v-card-title
        >
      </v-img>

      <v-card-text>
        <span>Seems you are lost!!</span><br />
        <span>No problem, we will safely guide you back.</span>
      </v-card-text>

      <v-card-actions>
        <v-btn block text color="primary" @click="redirectToLogin()">
          Click here lost traveller! :)
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "NotFound",
  methods: {
    redirectToLogin() {
      this.$router.push("/");
    }
  }
});
</script>
