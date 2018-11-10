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
        <a>
          <span class="badge">{{hero.id}}</span> {{hero.name}}
        </a>
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
    this.$store.dispatch('initHeroes');
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

