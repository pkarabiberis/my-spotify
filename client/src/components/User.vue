<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <img v-if="profile.avatar" class="avatar" :src="profile.avatar" />
        <h1>{{ profile.displayName }}</h1>
        <v-row justify="center">
          <p>Followers {{ profile.followers }}</p>
          <p>Following {{ profile.following}}</p>
          <p>Playlists {{ profile.playlists}}</p>
        </v-row>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="4">
        <v-toolbar flat>
          <v-toolbar-title>Top Artists</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn color="white">See more</v-btn>
        </v-toolbar>
        <div class="userdata" v-for="(el, i) in profile.artists" :key="i">
          <v-card class="ml-1 my-5" flat>
            <v-card-actions>
              <img :src="el.img.url" alt="Artist Img" />
              <router-link tag="span" :to="{name: 'artist', params: { id: el.id }}">
                <span class="ml-5">{{el.name}}</span>
              </router-link>
            </v-card-actions>
          </v-card>
        </div>
      </v-col>
      <v-col cols="4">
        <v-toolbar flat>
          <v-toolbar-title>Top Tracks</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn color="white">See more</v-btn>
        </v-toolbar>
        <div class="userdata" v-for="(el, i) in profile.tracks" :key="i">
          <v-card class="ml-1 my-5" flat>
            <v-card-actions>
              <img :src="el.img.url" alt="Artist Img" />
              <span class="ml-5">
                {{el.name}}
                <br />
                {{el.artist}} -
                {{el.albumName}}
              </span>
              <v-spacer></v-spacer>
              <span class="mr-2">{{el.duration}}</span>
            </v-card-actions>
          </v-card>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Nav from './Nav';
import Spotify from 'spotify-web-api-js';
const spotifyWebApi = new Spotify();

export default {
  components: {
    Nav
  },
  data: () => ({
    profile: {
      displayName: null,
      avatar: null,
      followers: null,
      following: null,
      playlists: null,
      artists: null,
      tracks: null
    }
  }),
  mounted() {
    spotifyWebApi.getMe().then(data => {
      this.profile.avatar = data.images[0].url;
      this.profile.displayName = data.display_name;
      this.profile.followers = data.followers.total;
    });

    spotifyWebApi.getMyTopArtists().then(data => {
      const topArtists = data.items.map(artist => ({
        id: artist.id,
        name: artist.name,
        img: artist.images[0]
      }));
      this.profile.artists = topArtists.splice(0, 10);
    });

    spotifyWebApi.getMyTopTracks().then(data => {
      const millisToMinutesAndSeconds = millis => {
        let minutes = Math.floor(millis / 60000);
        let seconds = ((millis % 60000) / 1000).toFixed(0);
        return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
      };

      const topTracks = data.items.map(track => ({
        name: track.name,
        img: track.album.images[0],
        albumName: track.album.name,
        duration: millisToMinutesAndSeconds(track.duration_ms),
        artist: track.album.artists[0].name
      }));

      this.profile.tracks = topTracks.splice(0, 10);
    });

    spotifyWebApi.getFollowedArtists().then(data => {
      this.profile.following = data.artists.total;
    });

    spotifyWebApi
      .getUserPlaylists()
      .then(data => (this.profile.playlists = data.items.length));
  },
  methods: {
    testeri(id) {
      console.log(id);
    }
  }
};
</script>

<style scoped>
p {
  padding: 5px;
}

.userdata img {
  width: 50px;
  min-width: 50px;
  height: 50px;
  border-radius: 100%;
}

.avatar {
  border-radius: 100%;
  width: 150px;
  height: 150px;
}
</style>
