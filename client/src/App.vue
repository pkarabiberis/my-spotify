<template>
  <v-app>
    <v-container>
      <v-content>
        <Profile :token="params" v-if="params.access_token" />
        <Login v-else />
      </v-content>
    </v-container>
  </v-app>
</template>

<script>
import Login from './components/Login';
import Profile from './components/Profile';

export default {
  name: 'App',

  components: {
    Login,
    Profile,
  },

  data: () => ({
    params: '',
  }),
  mounted() {
    this.params = this.getHashParams();
    console.log(`ACCESS TOKEN:`, this.params.access_token);
    console.log('REFRESH TOKEN:', this.params.refresh_token);
  },
  methods: {
    getHashParams() {
      const hashParams = {};
      let e;
      const r = /([^&;=]+)=?([^&;]*)/g;
      const q = window.location.hash.substring(1);
      while ((e = r.exec(q))) {
        hashParams[e[1]] = decodeURIComponent(e[2]);
      }
      return hashParams;
    },
  },
};
</script>
