<template>
  <div>
    <h2>My Heroes</h2>

    <div>
      <label>Hero name:
        <input />
      </label>
      <button>add</button>
    </div>

    <ul class="heroes">
      <li v-for="hero in heroes">
        <router-link  :to="{ name: 'detail', params: {id: hero.id} }">
        <a>
          <span class="badge">{{hero.id}}</span> {{hero.name}}
        </a>
        </router-link>
        <button class="delete" title="delete hero">x</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  created() {
    this.$store.dispatch('initHeroes');
  },
  computed: {
    heroes() {
      return this.$store.getters.heroes;
    }
  }
}
</script>

