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

<script>
export default {
  created() {
    this.$store.dispatch('fetchHero',this.$route.params.id);
  },
  computed: {
    hero() {
      return this.$store.getters.heroes.find(element => element.id == this.$route.params.id);
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    save() {
      console.log('save:' + JSON.stringify(this.hero));
    }
  }
}
</script>
