import Vue from "vue";
import Vuex from "vuex";
import movies from "./modules/movie";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: { movies },
});
