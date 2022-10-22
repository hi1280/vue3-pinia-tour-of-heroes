import { createStore } from 'vuex';

import heroes from './modules/heroes';

export default createStore({
  modules: {
    heroes,
  },
});
