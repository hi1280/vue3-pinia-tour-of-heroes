export type State = {
  heroes: Hero[];
  searchedHeroes: Hero[];
};

export type Hero = {
  id: number;
  name: string;
};