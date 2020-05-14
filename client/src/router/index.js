import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../components/Login';
import Profile from '../components/Profile';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
