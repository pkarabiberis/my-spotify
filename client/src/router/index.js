import Vue from 'vue';
import VueRouter from 'vue-router';
import Artist from '../components/Artist';
import User from '../components/User';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'user',
    component: User,
  },
  {
    path: '/artist/:id',
    name: 'artist',
    component: Artist,
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
