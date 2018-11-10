<template>
<div>
    <h3>Top Heroes</h3>
    <div class="grid grid-pad">
      <router-link v-for="hero in sliced_heroes" :to="{ name: 'detail', params: {id: hero.id} }" class="col-1-4" :key="hero.id">
        <div class="module hero">
          <h4>{{hero.name}}</h4>
        </div>
      </router-link>
    </div>

    <app-hero-search></app-hero-search>
</div>
</template>

<script>
import HeroSearch from './HeroSearch.vue';
export default {
  components: {
    appHeroSearch: HeroSearch
  },
  created() {
    this.$store.dispatch('initHeroes');
  },
  computed: {
    sliced_heroes() {
      return this.$store.getters.heroes.slice(1,5);
    }
  }
}
</script>
