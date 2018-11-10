<template>
  <div id="search-component">
    <h4>Hero Search</h4>

    <input @keyup="search($event.target.value)"/>

    <ul class="search-result" v-for="hero in heroes" :key="hero.id">
      <li>
        <router-link :to="{ name: 'detail', params: {id: hero.id} }">
          <a>{{hero.name}}</a>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import _ from 'lodash';

export default {
  computed: {
    heroes() {
      return this.$store.getters.searchedHeroes;
    }
  },
  methods: {
    search : _.debounce(function(value) {
      this.$store.dispatch('searchHeroes', value);
    }, 300)
  }
}
</script>
