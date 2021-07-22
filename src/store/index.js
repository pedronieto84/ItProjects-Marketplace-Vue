import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    baseURL: "https://us-central1-asamblea-27a8d.cloudfunctions.net/",
    user: {
      userId: "",
      name: "",
      email: "",
      admin: false,
      projectsPublished: [],
      typeOfInstitution: "",
      verified: false,
    },
    isAdmin: true, // dejado para probar Seokju
    allUsers: [
      // dejado para probar Seokju
      { user_id: 1, name: "alberto" },
      { user_id: 2, name: "ber" },
      { user_id: 3, name: "car" },
      { user_id: 4, name: "david" },
      { user_id: 5, name: "elisa" },
      { user_id: 6, name: "alberto" },
    ],
  },
  getters: {
    getBaseURL(state) {
      // he dejado Seokju para probar
      return state.baseURL;
    },
    allUsers: (state) => {
      // he dejado Seokju para probar
      return state.allUsers;
    },
    allUsersCount: (state) => {
      // he dejado Seokju para probar
      return state.allUsers.length;
    },
    getUser(state) {
      if (state.user.userId === "") {
        let storedUser = sessionStorage.getItem("itAcademyProjects-storedUser");
        if (storedUser !== null) {
          state.user = JSON.parse(storedUser);
        }
      }
      return state.user;
    },
  },
  // mutations: {
  //   // loginAdmin(state){ // he dejado Seokju para probar
  //   //   state.isAdmin = true;
  //   // }
  // },
  // actions: {
  //   // login({state, commit}, loginObj){ // he dejado Seokju para probar
  //   //   ...
  //   // }
  // },

  mutations: {
    setUser(state, data) {
      /* data is a 2 element array.
          data[0] is the property to modify:
            [property-name] - name of the user property
            "object" - change the whole object
            [not-listed-value] - initialize user object
          data[1] is the value to assign to the user property
            It must be a user object if data[0] = "object"
            It may be an empty string (but anything would be ok) if the object is to be initialized
      */
      const key = data[0];
      const value = data[1];
      switch (key) {
        case "userId":
          state.user.userId = value;
          break;
        case "name":
          state.user.name = value;
          break;
        case "email":
          state.user.email = value;
          break;
        case "typeOfInstitution":
          state.user.typeOfInstitution = value;
          break;
        case "object":
          // Change the whole user object
          state.user.userId = value.userId;
          state.user.name = value.name;
          state.user.email = value.email;
          state.user.typeOfInstitution = value.typeOfInstitution;
          if (value.admin !== undefined) {
            state.user.admin = value.admin;
          } else {
            state.user.admin = false;
          }
          if (value.projectsPublished !== undefined) {
            state.user.projectsPublished = value.projectsPublished;
          } else {
            state.user.projectsPublished = [];
          }
          if (value.verified !== undefined) {
            state.user.verified = value.verified;
          } else {
            state.user.verified = false;
          }
          break;
        default:
          // Initialize user object
          state.user.userId = "";
          state.user.name = "";
          state.user.email = "";
          state.user.admin = false;
          state.user.projectsPublished = [];
          state.user.typeOfInstitution = "";
          state.user.verified = false;
          break;
      }

      sessionStorage.setItem(
        "itAcademyProjects-storedUser",
        JSON.stringify(state.user)
      );
    },
  },
  actions: {},
  modules: {},
});
