import Vue from 'vue';

const key = 1;

const state = {
  heroes: []
};

const mutations = {
  'SET_HEROES' (state, heroes) {
    state.heroes = heroes;
  },
  'FETCH_HERO' (state, hero) {
    const idx = state.heroes.findIndex(element => element.id == hero.id)
    state.heroes.splice(idx, 1, state.heroes[idx]);
  }
}

const actions = {
  initHeroes: ({commit}) => {
    Vue.http.get(`?key=${key}`)
      .then(response => response.json())
      .then(heroes => {
        if(heroes) {
          commit('SET_HEROES', heroes);
        }
      });
  },
  fetchHero: ({commit}, id) => {
    Vue.http.get(`${id}?key=${key}`)
      .then(response => response.json())
      .then(hero => {
        if(hero) {
          commit('FETCH_HERO', hero);
        }
      });
  }
}

const getters = {
  heroes: state => {
    return state.heroes;
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}