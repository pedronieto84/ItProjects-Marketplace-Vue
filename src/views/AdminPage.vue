<template>
  <div class="container">
    <b-tabs content-class="mt-3" pills>
      <b-tab title="USUARIOS" active>
        <b-input-group size="m" class="mb-3">
          <b-form-input
            type="search"
            placeholder="Type to Search"
            v-model="filter"
          ></b-form-input>
          <b-input-group-append>
            <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
          </b-input-group-append>
        </b-input-group>
        <b-overlay :show="getOverlay" rounded="sm">
          <b-table striped bordered :items="getUsers" :per-page="perPage" :current-page="currentPage" :fields="fields" :sort-by.sync="sortBy" :filter="filter"
          >
          <template #cell(show_details)="row">
            <b-button size="sm" @click="row.toggleDetails" class="mr-2">
              {{ row.detailsShowing ? 'Hide' : 'Show'}} Details
            </b-button>
          </template>

            <template #row-details="row">

              <b-card v-if="!editUsuario">
                <b-row class="mb-2">
                  <b-col sm="3" class="text-sm-right"><b>Name:</b></b-col>
                  <b-col>{{ row.item.name }}</b-col>
                </b-row>

                <b-row class="mb-2">
                  <b-col sm="3" class="text-sm-right"><b>Email:</b></b-col>
                  <b-col>{{ row.item.email }}</b-col>
                </b-row>

                  <b-button size="sm" variant="secondary" @click="row.toggleDetails">Hide Details</b-button>

                  <b-button size="sm" class="m-3" variant="primary"  @click="editUsuario = true">Edit <i class="fas fa-pencil-alt"></i></b-button>

                  <b-button size="sm" variant="danger" @click="deleteUser(row.item.userId)">Delete <i class="fas fa-trash-alt"></i></b-button>
              </b-card>

              <b-card v-if="editUsuario">

              <!-- Seokju -->
              <!-- <b-row class="mb-2">
                <b-col sm="3" class="text-sm-right"><b>Name:</b></b-col>
                <b-col>{{row.item.name}}</b-col>
              </b-row>

              <b-row class="mb-2">
                <b-col sm="3" class="text-sm-right"><b>Email:</b></b-col>
                <b-col>{{ row.item.email }}</b-col>
              </b-row> -->
                <b-input-group style="width: 80%" class="mx-auto m-2">
                  <template #prepend>
                    <b-input-group-text >Name:</b-input-group-text>
                  </template>
                  <b-form-input v-model="row.item.name"></b-form-input>
                </b-input-group>
                <b-input-group style="width: 80%" class="mx-auto">
                  <template #prepend>
                    <b-input-group-text >Email:</b-input-group-text>
                  </template>
                  <b-form-input v-model="row.item.email"></b-form-input>
                </b-input-group>

                <b-button size="sm" class="m-3" variant="success"  @click="updateUser(row.item.userId, row.item.name, row.item.email)">Guardar <i class="fas fa-pencil-alt"></i></b-button>

                <b-button size="sm" variant="info" @click="editUsuario = false">Cerrar <i class="fas fa-trash-alt"></i></b-button>

              </b-card>
            </template>

          </b-table>
        </b-overlay>

        <b-pagination
          v-model="currentPage"
          :total-rows="rows"
          :per-page="perPage"
          align="center"
        >
        </b-pagination>
      </b-tab>

      <b-tab title="PROJECTS">
        <b-input-group size="m" class="mb-3">
          <b-form-input
            type="search"
            placeholder="Type to Search"
            v-model="filter2"
          ></b-form-input>
          <b-input-group-append>
            <b-button :disabled="!filter2" @click="filter2 = ''">Clear</b-button>
          </b-input-group-append>
        </b-input-group>
        <b-overlay :show="getOverlay" rounded="sm">
          <b-table striped bordered :items="getProjects" :per-page="perPage2" :current-page="currentPage2" :fields="fields2" :sort-by.sync="sortBy2" :filter="filter2"
          >
          <template #cell(show_details)="row">
            <b-button size="sm" @click="row.toggleDetails" class="mr-2">
              {{ row.detailsShowing ? 'Hide' : 'Show'}} Details
            </b-button>

            <!-- As `row.showDetails` is one-way, we call the toggleDetails function on @change -->
          </template>

          <template #row-details="row">

            <b-card v-if="!editProject">

                <b-row class="mb-2">
                  <b-col sm="3" class="text-sm-right"><b>TITLE:</b></b-col>
                  <b-col>{{ row.item.title }}</b-col>
                </b-row>

                <b-row class="mb-2">
                  <b-col sm="3" class="text-sm-right"><b>SHORTEXPLANATION:</b></b-col>
                  <b-col>{{ row.item.shortExplanation }}</b-col>
                </b-row>

                <b-row class="mb-2">
                  <b-col sm="3" class="text-sm-right"><b>STATE:</b></b-col>
                  <b-col>{{ row.item.state }}</b-col>
                </b-row>

                <b-button size="sm" variant="secondary" @click="row.toggleDetails">Hide Details</b-button>

                <b-button size="sm" class="m-3" variant="primary"  @click="editProject = true">Edit <i class="fas fa-pencil-alt"></i></b-button>

                <b-button size="sm" variant="danger" @click="deleteProject(row.item.projectId)">Delete <i class="fas fa-trash-alt"></i></b-button>

            </b-card>

            <b-card v-if="editProject">

              <b-input-group style="width: 80%" class="mx-auto">
                <template #prepend>
                  <b-input-group-text >TITLE:</b-input-group-text>
                </template>
                <b-form-input v-model="row.item.title"></b-form-input>
              </b-input-group>

              <b-input-group style="width: 80%" class="mx-auto">
                <template #prepend>
                  <b-input-group-text >SHORTEXPLANATION:</b-input-group-text>
                </template>
                <b-form-input v-model="row.item.shortExplanation"></b-form-input>
              </b-input-group>

              <b-input-group style="width: 80%" class="mx-auto m-2">
                <template #prepend>
                  <b-input-group-text >STATE:</b-input-group-text>
                </template>
                <b-form-input v-model="row.item.state"></b-form-input>
              </b-input-group>

              <b-button size="sm" class="m-3" variant="success"  @click="updateProject(row.item.projectId, row.item.title, row.item.shortExplanation, row.item.state)">Guardar <i class="fas fa-pencil-alt"></i></b-button>

              <b-button size="sm" variant="info" @click="editProject = false">Cerrar <i class="fas fa-trash-alt"></i></b-button>

            </b-card>
          </template>

          <!-- Seokju -->
          <!-- <template #cell(name)="row">
              {{ row.value }}
            </template>

          <template #cell(actions)="row">
            <b-button size="sm" @click="row.toggleDetails">
              {{ row.detailsShowing ? 'Hide' : 'Show' }} Details
            </b-button>

          </template>

          <template #row-details="row">
            <b-card>
              <ul>
                <li v-for="(item, index) in row.item" :key="index">{{ index }}: {{ item }}</li>
                <b-button size="sm" @click="deleteUser(index)">Delete
                </b-button>
              </ul>
            </b-card>
          </template> -->
          </b-table>
        </b-overlay>

        <b-pagination
          v-model="currentPage2"
          :total-rows="rows2"
          :per-page="perPage2"
          align="center"
        >
        </b-pagination>
      </b-tab>
    </b-tabs>
  </div>
</template>

<script>
// @ is an alias to /src
import store from '@/store'
import {mapGetters, mapMutations, mapActions} from 'vuex'

export default {
  name: "Admin",
  data() {
    // let items = store.state.allUsers.sort((a,b) => {return b.user_id - a.user_id}) // probar sort Seokju
    return {
      currentPage: 1,
      perPage: 10,
      sortBy:'name',
      filter: null,
      spinner: null,
      // fields: ['name', 'content'] // probar Seokju
      // items: store.getters.getUsers,
      fields: [
        { key: 'name', label: 'NOMBRE', sortable: true},
        { key:'email', label: 'EMAIL', sortable: true },
        { key: 'userId', label: 'USER_ID', sortable: true },
        { key: 'show_details', label: 'ACTIONS' }
      ],
      currentPage2: 1,
      perPage2: 10,
      sortBy2:'title',
      filter2: null,
      spinner2: null,
      fields2: [
        { key: 'title', label: 'TITLE', sortable: true},
        { key: 'shortExplanation', label: 'SHORT_EXPLANATION', sortable: true },
        { key:'state', label: 'STATE', sortable: true },
        { key: 'show_details', label: 'ACTIONS' }
      ],
      editUsuario: false,
      editProject: false
    }
  },
  created(){
    // this.getUsers
    store.dispatch('getUsers')
    this.SET_OVERLAY(true)
    store.dispatch('getProjects')

    /////////////////// Seokju
    // store.commit('SET_OVERLAY', 'true')
    // store.commit('SET_OVERLAY2', 'true')
  },
  computed: {
    rows(){
      /////////////////// Seokju
      // return this.items ? this.items.length : 0

      return this.getUsers ? this.getUsers.length : 0
    },
    rows2(){
      /////////////////// Seokju
      // return this.items ? this.items.length : 0

      return this.getProjects ? this.getProjects.length : 0
    },
    ...mapGetters({
      getUsers : 'getUsers',
      getOverlay : 'getOverlay',
      getProjects : 'getProjects',
    }),
  },

  /////////////////// Seokju
  // watch: {
  //   items: (newVal) => {
  //     this.items = newVal
  //   }
  // },

  methods: {
    ...mapMutations({
      SET_NAME : 'SET_NAME',
      SET_EMAIL : 'SET_EMAIL',
      SET_TITLE : 'SET_TITLE',
      SET_SHORTEXPLANATION : 'SET_SHORTEXPLANATION',
      SET_STATE : 'SET_STATE',
      SET_OVERLAY: 'SET_OVERLAY',
    }),
    ...mapActions({
      getUsers : 'getUsers',
      updateUser : 'updateUser',
      deleteUser : 'deleteUser',
      getProjects : 'getProjects',
      updateProject : 'updateProject',
      deleteProject : 'deleteProject'
    }),
    updateProject(projectId, title, shortExplanation, state){
      /////////////////// Seokju
      // store.commit('SET_OVERLAY2', 'true')
      // console.log(projectId, title, shortExplanation, state);
      // store.commit('SET_OVERLAY', 'true')

      this.SET_TITLE(title)
      this.SET_SHORTEXPLANATION(shortExplanation)
      this.SET_STATE(state)
      this.SET_OVERLAY(true)
      store.dispatch('updateProject', projectId)
    },
    deleteProject(projectId){
      this.SET_OVERLAY(true)
      store.dispatch('deleteProject', projectId)
    },
    updateUser(userId, name, email){
      /////////////////// Seokju
      // store.commit('SET_OVERLAY2', 'true')
      // console.log(userId, name, email);
      // store.commit('SET_OVERLAY', 'true')
      this.SET_NAME(name)
      this.SET_EMAIL(email)
      this.SET_OVERLAY(true)
      store.dispatch('updateUser', userId)
    },
    deleteUser(userId){
      this.SET_OVERLAY(true)
      store.dispatch('deleteUser', userId)

      /////////////////// Seokju
      // store.commit('SET_OVERLAY', 'true')
      // console.log(index)
      // console.log(row)
      // let users = store.state.users.splice(index, 1)
      // let users = store.state.users.splice(index, 1)
      // console.log(users)
      // items.splice(items.index, 1)
      // store.dispatch('deleteUser', userId)

      // this.$router.push('/redirac-admin')
      // this.items = store.getters.getUsers
      // if(store.dispatch('getUsers')){
      //   this.items = store.getters.getUsers
      // }
      // console.log(userid)
      // const idx = this.items.findIndex(item => item.userId === userid)
      // this.items.splice(idx, 1)
      // store.commit('SET_USERS', users)
      // console.log(users)
      // const idx = items.findIndex(item => {
      //   return item.userId === userid
      // })
      // console.log(idx)
      // let users = store.state.users.splice(idx, 1)
      // console.log(users)
      // items.splice(idx, 1)
      // console.log(items)
      // console.log(store.state.users)
      // console.log(store.state.users[index])
      // store.dispatch("actionUsers", users)
    },
  },
};
</script>
