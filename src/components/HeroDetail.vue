<template>
  <div v-if="hero">
    <h2>{{hero.name}} Details</h2>
    <div><span>id: </span>{{hero.id}}</div>
    <div>
      <label>name:
        <input v-model="hero.name" placeholder="name"/>
      </label>
    </div>
    <button @click="goBack()">go back</button>
    <button @click="save()">save</button>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      hero: {
        id: 0,
        name: ''
      }
    }
  },
  created() {
    this.$store.dispatch('fetchHero', this.$route.params.id);
    this.hero = this.$store.getters.heroes.find(element => element.id == this.$route.params.id);
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    save() {
      this.$store.dispatch('updateHero', this.hero);
      this.$router.go(-1);
    }
  }
}
</script>

<style scoped>
/* HeroDetailComponent's private CSS styles */
label {
  display: inline-block;
  width: 3em;
  margin: .5em 0;
  color: #607D8B;
  font-weight: bold;
}
input {
  height: 2em;
  font-size: 1em;
  padding-left: .4em;
}
button {
  margin-top: 20px;
  font-family: Arial;
  background-color: #eee;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer; cursor: hand;
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
