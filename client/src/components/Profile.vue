<template>
  <v-container>
    <Nav />
    <router-view />
  </v-container>
</template>

<script>
import Nav from './Nav';
import User from './User';
import Artist from './Artist';

export default {
  name: 'Profile',

  components: {
    Nav,
    User,
    Artist
  }
};
</script>

