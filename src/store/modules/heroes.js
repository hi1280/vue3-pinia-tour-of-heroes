import Vue from 'vue';

const key = 2;

const state = {
  heroes: [],
  searchedHeroes: []
};

const updateHero = (state, hero) => {
  const idx = state.heroes.findIndex(element => element.id == hero.id);
  state.heroes.splice(idx, 1, hero);
};

const mutations = {
  'FETCH_HEROES' (state, heroes) {
    state.heroes = heroes;
  },
  'FETCH_HERO' : updateHero,
  'UPDATE_HERO' : updateHero,
  'CREATE_HERO' (state, hero) {
    state.heroes.push(hero);
  },
  'DELETE_HERO' (state, hero) {
    const idx = state.heroes.findIndex(element => element.id == hero.id)
    state.heroes.splice(idx, 1);
  },
  'SEARCH_HEROES' (state, heroes) {
    state.searchedHeroes = heroes;
  }
};

const actions = {
  fetchHeroes: ({commit}) => {
    Vue.http.get(`?key=${key}`)
      .then(response => response.json())
      .then(heroes => {
        if(heroes) {
          commit('FETCH_HEROES', heroes);
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
  },
  createHero: ({commit}, values) => {
    Vue.http.post(`?key=${key}`, values)
      .then(response => response.json())
      .then(hero => {
        if(hero) {
          commit('CREATE_HERO', hero);
        }
      });
  },
  updateHero: ({commit}, values) => {
    Vue.http.put(`${values.id}?key=${key}`, {name: values.name})
      .then(response => response.json())
      .then(hero => {
        if(hero) {
          commit('UPDATE_HERO', hero);
        }
      });
  },
  deleteHero: ({commit}, id) => {
    Vue.http.delete(`${id}?key=${key}`)
      .then(response => response.json())
      .then(hero => {
        if(hero) {
          commit('DELETE_HERO', hero);
        }
      });
  },
  searchHeroes: ({commit}, value) => {
    if(!value) {
      commit('SEARCH_HEROES', []);
    } else {
      Vue.http.get(`?name=${value}&key=${key}`)
        .then(response => response.json())
        .then(heroes => {
          if(heroes) {
            commit('SEARCH_HEROES', heroes);
          }
        });
    }
  }
};

const getters = {
  heroes: state => {
    return state.heroes;
  },
  searchedHeroes: state => {
    return state.searchedHeroes;
  }
};

export default {
  state,
  mutations,
  actions,
  getters
};