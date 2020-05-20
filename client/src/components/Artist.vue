<template>
  <v-container>
    <div class="artistImage text-center">
      <img :src="artistImg" alt="Artist image" />
    </div>

    <h1 class="text-center">{{ artistName }}</h1>
    <v-row justify="center">
      <h4>
        {{ artistFollowers }} <br />
        followers
      </h4>
      <h4>
        {{ artistPopularity }} % <br />
        popularity
      </h4>
    </v-row>
    <div class="text-center pa-3">
      <hr width="25%" style="margin:auto;" />
    </div>
    <h4 class="text-center" v-for="(genre, i) in artistGenres" :key="i">
      {{ genre }}
    </h4>
  </v-container>
</template>

<script>
import Spotify from 'spotify-web-api-js';
const spotifyWebApi = new Spotify();
export default {
  data: () => ({
    artistImg: '',
    artistName: '',
    artistGenres: '',
    artistPopularity: '',
    artistFollowers: '',
  }),
  mounted() {
    spotifyWebApi.getArtist(this.$route.params.id).then((data) => {
      console.log(data);
      this.artistImg = data.images[1].url;
      this.artistName = data.name;
      this.artistGenres = data.genres;
      this.artistPopularity = data.popularity;
      this.artistFollowers = data.followers.total;
    });
  },
};
</script>

<style scoped>
.artistImage img {
  border-radius: 100%;
}
</style>
