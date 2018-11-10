<template>
  <div>
    <h2>My Heroes</h2>

    <div>
      <label>Hero name:
        <input type="text" v-model="hero.name">
      </label>
      <button @click="submit">add</button>
    </div>

    <ul class="heroes">
      <li v-for="hero in heroes" :key="hero.id">
        <router-link :to="{ name: 'detail', params: {id: hero.id} }">
          <span class="badge">{{hero.id}}</span> {{hero.name}}
        </router-link>
        <button @click="deleteHero(hero.id)" class="delete" title="delete hero">x</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      hero: {
        name: ''
      }
    }
  },
  created() {
    this.$store.dispatch('fetchHeroes');
  },
  computed: {
    heroes() {
      return this.$store.getters.heroes;
    }
  },
  methods: {
    submit() {
      this.$store.dispatch('createHero', this.hero);
      this.hero.name = '';
    },
    deleteHero(id) {
      this.$store.dispatch('deleteHero', id);
    }
  }
}
</script>

<style scoped>
/* HeroesComponent's private CSS styles */
.heroes {
  margin: 0 0 2em 0;
  list-style-type: none;
  padding: 0;
  width: 15em;
}
.heroes li {
  position: relative;
  cursor: pointer;
  background-color: #EEE;
  margin: .5em;
  padding: .3em 0;
  height: 1.6em;
  border-radius: 4px;
}

.heroes li:hover {
  color: #607D8B;
  background-color: #DDD;
  left: .1em;
}

.heroes a {
  color: #888;
  text-decoration: none;
  position: relative;
  display: block;
  width: 250px;
}

.heroes a:hover {
  color:#607D8B;
}

.heroes .badge {
  display: inline-block;
  font-size: small;
  color: white;
  padding: 0.8em 0.7em 0 0.7em;
  background-color: #607D8B;
  line-height: 1em;
  position: relative;
  left: -1px;
  top: -4px;
  height: 1.8em;
  min-width: 16px;
  text-align: right;
  margin-right: .8em;
  border-radius: 4px 0 0 4px;
}

button {
  background-color: #eee;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  cursor: hand;
  font-family: Arial;
}

button:hover {
  background-color: #cfd8dc;
}

button.delete {
  position: relative;
  left: 194px;
  top: -32px;
  background-color: gray !important;
  color: white;
}



/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
</style>
