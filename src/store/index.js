import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    baseURL: "https://us-central1-asamblea-27a8d.cloudfunctions.net/",
    allRegister: [
      {
        register_id: 1,
        name: 'admin'
      }
    ],
    allUsers: [
      {
        user_id: 1,
        name: 'alberto'
      },
      {
        user_id: 2,
        name: 'david'
      },
      {
        user_id: 3,
        name: 'alvaro'
      },
      {
        user_id: 4,
        name: 'keita'
      },
      {
        user_id: 5,
        name: 'kar'
      },
      {
        user_id: 6,
        name: 'ben'
      },
      {
        user_id: 7,
        name: 'leon'
      },
      {
        user_id: 8,
        name: 'oriol'
      }
    ]
  },
  getters: {
    getBaseURL(state) {
      return state.baseURL;
    },
    allUsers: (state) => {
      return state.allUsers
    },
    allUsersCount: (state) => {
      return state.allUsers.length;
    }
  },
  mutations: {},
  actions: {},
  modules: {},
});
