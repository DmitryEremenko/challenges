import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from '../pages/Dashboard.vue';
import Challenge1 from '../pages/Challenge1.vue';
import Challenge2 from '../pages/Challenge2.vue';
import Challenge3 from '../pages/Challenge3.vue';
import { Routes } from '../enums';

const routes = [
  { path: '/', name: 'Dashboard', component: Dashboard },
  { path: `/${Routes.ChallengeOne}`, name: 'Challenge 1', component: Challenge1 },
  { path: `/${Routes.ChallengeTwo}`, name: 'Challenge 2', component: Challenge2 },
  { path: `/${Routes.ChallengeThree}`, name: 'Challenge 3', component: Challenge3 },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
