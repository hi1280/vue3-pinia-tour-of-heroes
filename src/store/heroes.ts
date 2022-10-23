import { defineStore } from 'pinia';
import type { State, Hero } from '../hero';

const key = 2;
const rootUrl = 'http://127.0.0.1:4010/api/heroes';

export const useHeroStore = defineStore('hero', {
  state: (): State => ({
    heroes: [],
    searchedHeroes: [],
  }),
  actions: {
    fetchHeroes() {
      fetch(`${rootUrl}?key=${key}`, {
        method: 'GET',
      })
        .then((response) => response.json())
        .then((heroes) => {
          if (heroes) {
            this.heroes = heroes;
          }
        });
    },
    fetchHero(id: string) {
      fetch(`${rootUrl}/${id}?key=${key}`, {
        method: 'GET',
      })
        .then((response) => response.json())
        .then((hero) => {
          if (hero) {
            this.spliceHero(hero);
          }
        });
    },
    createHero(values: Omit<Hero, 'id'>) {
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
            this.heroes.push(hero);
          }
        });
    },
    updateHero(values: Hero) {
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
            this.spliceHero(hero);
          }
        });
    },
    deleteHero(id: number) {
      fetch(`${rootUrl}/${id}?key=${key}`, {
        method: 'DELETE',
      })
        .then((response) => response.json())
        .then((hero) => {
          if (hero) {
            const idx = this.heroes.findIndex((element) => element.id == hero.id);
            this.heroes.splice(idx, 1);
          }
        });
    },
    searchHeroes(value: string) {
      if (!value) {
        this.searchedHeroes = [];
      } else {
        fetch(`${rootUrl}?name=${value}&key=${key}`, {
          method: 'GET',
        })
          .then((response) => response.json())
          .then((heroes) => {
            if (heroes) {
              this.searchedHeroes = heroes;
            }
          });
      }
    },
    spliceHero(hero: Hero) {
      const idx = this.heroes.findIndex((element: Hero) => element.id == hero.id);
      this.heroes.splice(idx, 1, hero);
    },
  },
});
