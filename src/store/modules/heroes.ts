import type { State, Hero } from '../../hero';

const key = 2;
const rootUrl = 'http://127.0.0.1:4010/api/heroes';

const state: State = {
  heroes: [],
  searchedHeroes: [],
};

const updateHero = (state: State, hero: Hero) => {
  const idx = state.heroes.findIndex((element: Hero) => element.id == hero.id);
  state.heroes.splice(idx, 1, hero);
};

const mutations = {
  FETCH_HEROES(state: State, heroes: Hero[]) {
    state.heroes = heroes;
  },
  FETCH_HERO: updateHero,
  UPDATE_HERO: updateHero,
  CREATE_HERO(state: State, hero: Hero) {
    state.heroes.push(hero);
  },
  DELETE_HERO(state: State, hero: Hero) {
    const idx = state.heroes.findIndex((element) => element.id == hero.id);
    state.heroes.splice(idx, 1);
  },
  SEARCH_HEROES(state: State, heroes: Hero[]) {
    state.searchedHeroes = heroes;
  },
};

const actions = {
  fetchHeroes: ({ commit }: any) => {
    fetch(`${rootUrl}?key=${key}`, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((heroes) => {
        if (heroes) {
          commit('FETCH_HEROES', heroes);
        }
      });
  },
  fetchHero: ({ commit }: any, id: number) => {
    fetch(`${rootUrl}/${id}?key=${key}`, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((hero) => {
        if (hero) {
          commit('FETCH_HERO', hero);
        }
      });
  },
  createHero: ({ commit }: any, values: Hero) => {
    fetch(`${rootUrl}?key=${key}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    })
      .then((response) => response.json())
      .then((hero) => {
        if (hero) {
          commit('CREATE_HERO', hero);
        }
      });
  },
  updateHero: ({ commit }: any, values: Hero) => {
    fetch(`${rootUrl}/${values.id}?key=${key}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: values.name }),
    })
      .then((response) => response.json())
      .then((hero) => {
        if (hero) {
          commit('UPDATE_HERO', hero);
        }
      });
  },
  deleteHero: ({ commit }: any, id: number) => {
    fetch(`${rootUrl}/${id}?key=${key}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((hero) => {
        if (hero) {
          commit('DELETE_HERO', hero);
        }
      });
  },
  searchHeroes: ({ commit }: any, value: string) => {
    if (!value) {
      commit('SEARCH_HEROES', []);
    } else {
      fetch(`${rootUrl}?name=${value}&key=${key}`, {
        method: 'GET',
      })
        .then((response) => response.json())
        .then((heroes) => {
          if (heroes) {
            commit('SEARCH_HEROES', heroes);
          }
        });
    }
  },
};

const getters = {
  heroes: (state: State) => {
    return state.heroes;
  },
  searchedHeroes: (state: State) => {
    return state.searchedHeroes;
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
