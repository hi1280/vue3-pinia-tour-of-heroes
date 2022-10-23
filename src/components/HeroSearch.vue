<template>
  <div id="search-component">
    <h4>Hero Search</h4>

    <input id="search-box" @keyup="search(($event.target as HTMLInputElement).value)"/>

    <ul class="search-result">
      <li v-for="hero in heroes" :key="hero.id">
        <router-link :to="{ name: 'detail', params: {id: hero.id} }">
          {{hero.name}}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import _ from 'lodash';
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const heroes = computed(() => {
  return store.getters.searchedHeroes;
});

const search = _.debounce(function (this: any, value: string): void {
  store.dispatch('searchHeroes', value);
}, 300);
</script>

<style scoped>
/* HeroSearch private styles */
.search-result li {
  border-bottom: 1px solid gray;
  border-left: 1px solid gray;
  border-right: 1px solid gray;
  width:195px;
  height: 16px;
  padding: 5px;
  background-color: white;
  cursor: pointer;
  list-style-type: none;
}

.search-result li:hover {
  background-color: #607D8B;
}

.search-result li a {
  color: #888;
  display: block;
  text-decoration: none;
}

.search-result li a:hover {
  color: white;
}
.search-result li a:active {
  color: white;
}
#search-box {
  width: 200px;
  height: 20px;
}


ul.search-result {
  margin-top: 0;
  padding-left: 0;
}


/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
</style>
