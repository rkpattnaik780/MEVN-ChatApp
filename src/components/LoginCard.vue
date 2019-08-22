<template>
  <v-layout align-center justify-center fill-height>
    <v-flex xs6 sm6 class="login-card">
      <v-card>
        <v-card-title primary-title>
          <div>
            <h3 class="headline text-xs-center">Join The Discussion</h3>
            <div> {{ card_text }} </div>
          </div>
        </v-card-title>

        <v-card-actions>
          <v-btn outline block @click="signInGithub">
            <img width="30" height="30" :src="github_logo"/>
              Sign In with GitHub
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>

export default {
  data () {
    return {
      github_logo : "https://assets.gitlab-static.net/assets/auth_buttons/github_64-84041cd0ea392220da96f0fb9b9473c08485c4924b98c776be1bd33b0daab8c0.png",
      card_text: 'Lorem ipsum dolor sit amet, brute iriure accusata ne mea. Eos suavitate referrentur ad, te duo agam libris qualisque, utroque quaestio accommodare no qui. Et percipit laboramus usu, no invidunt verterem nominati mel. Dolorem ancillae an mei, ut putant invenire splendide mel, ea nec propriae adipisci. Ignota salutandi accusamus in sed, et per malis fuisset, qui id ludus appareat.'
    }
  },
  methods: {
    signInGithub(){
      window.location.href = "http://localhost:3000/auth/github";
    }
  }
};
</script>

<style lang="scss" scoped>
.login-card{
  max-width: 400px;
  width: 400px;
}
</style>