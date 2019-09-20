<template fill-height>
<v-layout align-center justify-center fill-height>
    <v-flex xs6 sm6 class="my-card">
      <v-card>
        <v-img
          class="white--text"
          height="300px"
          src="https://avatars3.githubusercontent.com/u/23582438?v=4"
        />
        <v-card-title primary-title>
          <div>
            <h3 class="headline text-xs-center">Developed By : Ramakrishna Pattnaik</h3>
          </div>
        </v-card-title>

        <v-card-text>
          <div>
            <v-container fluid>
              <v-layout row justify-space-between>
                <a href="https://github.com/rkpattnaik780" class="ma-1"><img width="30" height="30" :src="github_logo"/></a>
                <a href="https://medium.com/@rkpattnaik780" class="ma-1"><img width="30" height="30" :src="medium_logo"/></a>
                <a href="https://www.linkedin.com/in/rkpattnaik780/" class="ma-1"><img width="30" height="30" :src="linkedin_logo"/></a>
                <a href="https://twitter.com/rkpattnaik_780" class="ma-1"><img width="30" height="30" :src="twitter_logo"/></a>
                <a href="https://www.facebook.com/ramakrishna.pattnaik" class="ma-1"><img width="30" height="30" :src="facebook_logo"/></a>
                <a href="https://codepen.io/rkpattnaik780/" class="ma-1"><img width="30" height="30" :src="codepen_logo"/></a>
              </v-layout>
            </v-container>
          </div>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<style lang="scss">
.my-card{
  max-width: 320px !important;
}
</style>

<script>
export default {
  data () {
    return {
      github_logo : "https://assets.gitlab-static.net/assets/auth_buttons/github_64-84041cd0ea392220da96f0fb9b9473c08485c4924b98c776be1bd33b0daab8c0.png",
      facebook_logo : "https://upload.wikimedia.org/wikipedia/commons/f/fb/Facebook_icon_2013.svg",
      twitter_logo : "https://upload.wikimedia.org/wikipedia/fr/c/c8/Twitter_Bird.svg",
      linkedin_logo : "https://upload.wikimedia.org/wikipedia/commons/e/e9/Linkedin_icon.svg",
      medium_logo : "https://cdn.onlinewebfonts.com/svg/img_424230.png",
      codepen_logo : "https://cdn.onlinewebfonts.com/svg/img_336066.png"
    }
  }
}
</script>