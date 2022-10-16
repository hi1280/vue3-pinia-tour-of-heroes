import Vue from 'vue';
import Vuex from 'vuex';

import heroes from './modules/heroes';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    heroes,
  },
});
