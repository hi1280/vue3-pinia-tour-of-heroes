import { createRouter, createWebHistory } from 'vue-router';
import type { NavigationGuardNext } from 'vue-router';
import Dashboard from './components/Dashboard.vue';
import Heroes from './components/Heroes.vue';
import HeroDetail from './components/HeroDetail.vue';
import Login from './components/Login.vue';
import { currentUser, signOut } from './lib/firebase';

export async function authenticate(to: any, next: NavigationGuardNext) {
  if (to.meta.isPublic) {
    next();
    return;
  }
  const user = await currentUser();
  if (user) {
    next();
    return;
  }
  await signOut();
  next('/login');
}

export const routes = [
  { path: '/', redirect: '/dashboard' },
  { path: '/dashboard', component: Dashboard, meta: { isPublic: false } },
  {
    path: '/detail/:id',
    component: HeroDetail,
    name: 'detail',
    meta: { isPublic: false },
  },
  { path: '/heroes', component: Heroes, meta: { isPublic: false } },
  { path: '/login', component: Login, meta: { isPublic: true } },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, _, next) => {
  authenticate(to, next);
});
