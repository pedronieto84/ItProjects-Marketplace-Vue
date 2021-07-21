import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    baseURL: "https://us-central1-asamblea-27a8d.cloudfunctions.net/",
  },
  getters: {
    getBaseURL(state) {
      return state.baseURL;
    },
  },
  mutations: {},
  actions: {},
  modules: {},
});
