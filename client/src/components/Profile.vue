<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <img
          v-if="profile.avatar"
          class="avatar"
          max-width="150px"
          max-height="150px"
          :src="profile.avatar"
        />
        <h1>{{ profile.displayName }}</h1>
        <p>Followers {{ profile.followers }}</p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Spotify from 'spotify-web-api-js';
const spotifyWebApi = new Spotify();

export default {
  props: {
    token: {
      type: Object,
    },
  },
  data: () => ({
    profile: {
      displayName: null,
      avatar: null,
      followers: null,
      following: null,
      playlists: null,
    },
  }),
  mounted() {
    spotifyWebApi.setAccessToken(this.token.access_token);

    spotifyWebApi.getMe().then((data) => {
      console.log(data);
      this.profile.avatar = data.images[0].url;
      this.profile.displayName = data.display_name;
      this.profile.followers = data.followers.total;
    });

    spotifyWebApi.getMyTopArtists().then((data) => {
      let allArtistNames = data.items.map((el) => el.name);
      console.log(allArtistNames);
    });
  },
};
</script>

<style scoped>
.avatar {
  border-radius: 100%;
}
</style>
