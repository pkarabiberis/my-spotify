<template>
  <v-app>
    <v-container>
      <v-content>
        <Profile v-if="token" />
        <Login v-else />
      </v-content>
    </v-container>
  </v-app>
</template>

<script>
import Login from './components/Login';
import Profile from './components/Profile';
import { token } from './Spotify';
import Spotify from 'spotify-web-api-js';
const spotifyWebApi = new Spotify();

export default {
  name: 'App',

  components: {
    Login,
    Profile,
  },

  data: () => ({
    token: '',
  }),
  mounted() {
    this.token = token;
    if (this.token) spotifyWebApi.setAccessToken(this.token);
  },
};
</script>
