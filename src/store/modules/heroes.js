import heroes from '../../data/heroes';

const state = {
  heroes: []
};

const mutations = {
  'SET_HEROES' (state, heroes) {
    state.heroes = heroes;
  }
}

const actions = {
  initHeroes: ({commit}) => {
    commit('SET_HEROES', heroes);
  }
}

const getters = {
  heroes: hero => {
    return hero.heroes;
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}