import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    baseURL: 'https://us-central1-asamblea-27a8d.cloudfunctions.net/',
    user: {
      userId: '',
      name: '',
      email: '',
      admin: false,
      projectsPublished: [],
      typeOfInstitution: '',
      verified: false
    },
    name: '',
    email: '',
    title: '',
    state: '',
    shortExplanation: '',
    /////////////////// Seokju
    // isAdmin: true,
    // allUsers: [
    //   // dejado para probar Seokju
    //   { user_id: 1, name: 'alberto', content: 'hola1' },
    //   { user_id: 2, name: 'ber', content: 'hola2' },
    //   { user_id: 3, name: 'car', content: 'hola3' },
    //   { user_id: 4, name: 'david', content: 'hola4' },
    //   { user_id: 5, name: 'elisa', content: 'hola5' },
    //   { user_id: 6, name: 'alberto', content: 'hola6' },
    //   { user_id: 1, name: 'alberto', content: 'hola1' },
    //   { user_id: 2, name: 'ber', content: 'hola2' },
    //   { user_id: 3, name: 'car', content: 'hola3' },
    //   { user_id: 4, name: 'david', content: 'hola4' },
    //   { user_id: 5, name: 'elisa', content: 'hola5' },
    //   { user_id: 6, name: 'alberto', content: 'hola6' },
    //   { user_id: 1, name: 'alberto', content: 'hola1' },
    //   { user_id: 2, name: 'ber', content: 'hola2' },
    //   { user_id: 3, name: 'car', content: 'hola3' },
    //   { user_id: 4, name: 'david', content: 'hola4' },
    //   { user_id: 5, name: 'elisa', content: 'hola5' }
    // ],
    // isLogin: false,
    // ifLoginError: false
    users: null,
    projects: null,
    overlay: false
  },
  getters: {
    getBaseURL(state) {
      return state.baseURL
    },
    /////////////////// Seokju
    // allUsers: (state) => {
    //   // he dejado Seokju para probar
    //   return state.allUsers
    // },
    // allUsersCount: (state) => {
    //   // he dejado Seokju para probar
    //   // comentario para ignorar
    //   return state.allUsers.length
    // },
    getUser(state) {
      if (state.user.userId === '') {
        let storedUser = sessionStorage.getItem('itAcademyProjects-storedUser')
        if (storedUser !== null) {
          state.user = JSON.parse(storedUser)
        }
      }
      return state.user
    },
    getUsers(state) {
      return state.users
    },
    getProjects(state) {
      return state.projects
    },
    getOverlay(state) {
      return state.overlay
    },
    getOverlay2(state) {
      return state.overlay2
    }
  },
  mutations: {
    SET_USERS(state, payload) {
      state.users = payload
    },
    SET_PROJECTS(state, payload) {
      state.projects = payload
    },
    SET_OVERLAY(state, payload) {
      state.overlay = payload
    },
    SET_NAME(state, payload) {
      state.name = payload
    },
    SET_EMAIL(state, payload) {
      state.email = payload
    },
    SET_TITLE(state, payload) {
      state.title = payload
    },
    SET_SHORTEXPLANATION(state, payload) {
      state.shortExplanation = payload
    },
    SET_STATE(state, payload) {
      state.state = payload
    },
    //////////////// Seokju
    // DELETE_USERS(state, index) { // he dejado Seokju para probar
    //   state.users.splice(index, 1);
    //   console.log('')
    // },
    // loginAdmin(state){ // he dejado Seokju para probar
    //   state.isAdmin = true;
    // }
    // loginSuccess(state) { // el codigo probado para Seokju
    //   state.isLogin = true
    //   state.isLoginError = false
    // },
    // loginError(state) { // el codigo probado para Seokju
    //   state.isLogin = false
    //   state.isLoginError = true
    // },
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
      const key = data[0]
      const value = data[1]
      switch (key) {
        case 'userId':
          state.user.userId = value
          break
        case 'name':
          state.user.name = value
          break
        case 'email':
          state.user.email = value
          break
        case 'typeOfInstitution':
          state.user.typeOfInstitution = value
          break
        case 'projectsPublished':
          state.user.projectsPublished = value
          break
        case 'object':
          // Change the whole user object
          state.user.userId = value.userId
          state.user.name = value.name
          state.user.email = value.email
          state.user.typeOfInstitution = value.typeOfInstitution
          if (value.admin !== undefined) {
            state.user.admin = value.admin
          } else {
            state.user.admin = false
          }
          if (value.projectsPublished !== undefined) {
            state.user.projectsPublished = value.projectsPublished
          } else {
            state.user.projectsPublished = []
          }
          if (value.verified !== undefined) {
            state.user.verified = value.verified
          } else {
            state.user.verified = false
          }
          break
        default:
          // Initialize user object
          state.user.userId = ''
          state.user.name = ''
          state.user.email = ''
          state.user.admin = false
          state.user.projectsPublished = []
          state.user.typeOfInstitution = ''
          state.user.verified = false
          break
      }
      sessionStorage.setItem('itAcademyProjects-storedUser', JSON.stringify(state.user))
    }
  },
  actions: {
    async getUsers({ state, commit }) {
      const users = await axios.get(state.baseURL + 'getUsers')
      // console.log(users)
      commit('SET_USERS', users.data)
      commit('SET_OVERLAY', false)
    },
    async updateUser({ state, commit, dispatch }, userId) {
      const name = state.name
      const email = state.email
      await axios.post(state.baseURL + 'updateUser', { userId, name, email })
      commit('SET_NAME', '')
      commit('SET_EMAIL', '')
      // commit('SET_USERS', user.data)
      commit('SET_OVERLAY', false)
      dispatch('getUsers')
    },
    async deleteUser({ state, commit, dispatch }, userId) {
      await axios.delete(state.baseURL + 'deleteUser', { data: { userId } })
      commit('SET_OVERLAY', false)
      dispatch('getUsers')
    },
    async getProjects({ state, commit }) {
      const projects = await axios.get(state.baseURL + 'getProjects')
      commit('SET_PROJECTS', projects.data)
      commit('SET_OVERLAY', false)
    },
    async updateProject({ commit, dispatch }, project) {
      const projectId = project.projectId
      const title = project.title
      const shortExplanation = project.shortExplanation
      const state = project.state
      await axios.post('https://us-central1-asamblea-27a8d.cloudfunctions.net/updateProject', { projectId, title, shortExplanation, state })
      commit('SET_TITLE', '')
      commit('SET_SHORTEXPLANATION', '')
      commit('SET_STATE', '')
      commit('SET_OVERLAY', false)
      dispatch('getProjects')
    },
    async deleteProject({ state, commit, dispatch }, projectId) {
      await axios.delete(state.baseURL + 'deleteProject', { projectId })
      console.log(projectId)
      commit('SET_OVERLAY', false)
      dispatch('getProjects')
    },
    logout({ commit }) {
      sessionStorage.removeItem('itAcademyProjects-storedUser')
      commit('setUser', ['logout', null])
    }

    //////////////// Seokju
    // login({ state, commit }, loginObj) {
    //   let selectedUser = null;
    //   state.allUsers.forEach(user => {
    //     if (user.email === loginObj.email) selectedUser = user
    //   })
    //   selectedUser === null || selectedUser.password !== loginObj.password
    //     ? commit('loginError')
    //     : commit('loginSuccess')
    // }
  }
})
