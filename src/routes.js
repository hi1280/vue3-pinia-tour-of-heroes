import Dashboard from './components/Dashboard.vue';
import Heroes from './components/Heroes.vue';
import HeroDetail from './components/HeroDetail.vue';

export const routes = [
  {path: '/dashboard', component: Dashboard},
  {path: '/detail/:id', component: HeroDetail, name: 'detail'},
  {path: '/heroes', component: Heroes},
  {path: '', redirect: '/dashboard'}
];