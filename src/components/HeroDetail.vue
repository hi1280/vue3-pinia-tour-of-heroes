<template>
  <div v-if="hero">
    <h2>{{ hero.name }} Details</h2>
    <div><span>id: </span>{{ hero.id }}</div>
    <div>
      <label
        >name:
        <input v-model="hero.name" placeholder="name" />
      </label>
    </div>
    <button @click="goBack()">go back</button>
    <button @click="save()">save</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useHeroStore } from '../store/heroes';
import { useRouter, useRoute } from 'vue-router';
import type { Hero } from '../hero';

const store = useHeroStore();
const router = useRouter();
const route = useRoute();
const hero = ref({
  id: 0,
  name: '',
});

store.fetchHero(route.params.id[0]);
hero.value = store.heroes.find(
  (element: Hero) => String(element.id) === route.params.id
)!;

const goBack = () => {
  router.go(-1);
};

const save = () => {
  store.updateHero(hero.value);
  router.go(-1);
};
</script>

<style scoped>
/* HeroDetailComponent's private CSS styles */
label {
  display: inline-block;
  width: 3em;
  margin: 0.5em 0;
  color: #607d8b;
  font-weight: bold;
}
input {
  height: 2em;
  font-size: 1em;
  padding-left: 0.4em;
}
button {
  margin-top: 20px;
  font-family: Arial;
  background-color: #eee;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  cursor: hand;
}
button:hover {
  background-color: #cfd8dc;
}
button:disabled {
  background-color: #eee;
  color: #ccc;
  cursor: auto;
}

/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
</style>
