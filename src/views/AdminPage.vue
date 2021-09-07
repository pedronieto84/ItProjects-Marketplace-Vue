<template>
  <div class="container">
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

    <b-tabs content-class="mt-3" pills>
      <b-tab title="USUARIOS" active>
        <b-overlay :show="getOverlay" rounded="sm">
          <b-table striped bordered :items="getUsers" :per-page="perPage" :current-page="currentPage" :fields="fields" :sort-by.sync="sortBy" :filter="filter"
          >
          <template #cell(show_details)="row">
            <b-button size="sm" @click="row.toggleDetails" class="mr-2">
              {{ row.detailsShowing ? 'Hide' : 'Show'}} Details
            </b-button>

            <!-- As `row.showDetails` is one-way, we call the toggleDetails function on @change -->
          </template>

          <template #row-details="row">
            <b-card>
              <b-row class="mb-2">
                <b-col sm="3" class="text-sm-right"><b>Name:</b></b-col>
                <b-col>{{ row.item.name }}</b-col>
              </b-row>

              <b-row class="mb-2">
                <b-col sm="3" class="text-sm-right"><b>Email:</b></b-col>
                <b-col>{{ row.item.email }}</b-col>
              </b-row>

              <b-button size="sm" @click="row.toggleDetails">Hide Details</b-button>
              <b-button size="sm" class="m-3" @click="deleteUser(row.item.userId)">Delete <i class="fas fa-trash-alt"></i></b-button>
            </b-card>
          </template>
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
          v-model="currentPage"
          :total-rows="rows"
          :per-page="perPage"
          align="center"
        >
        </b-pagination>
      </b-tab>

      <b-tab title="PROJECTS">
        <b-overlay :show="getOverlay2" rounded="sm">
          <b-table striped bordered :items="getProjects" :per-page="perPage2" :current-page="currentPage2" :fields="fields2" :sort-by.sync="sortBy2" :filter="filter2"
          >
          <template #cell(show_details)="row">
            <b-button size="sm" @click="row.toggleDetails" class="mr-2">
              {{ row.detailsShowing ? 'Hide' : 'Show'}} Details
            </b-button>

            <!-- As `row.showDetails` is one-way, we call the toggleDetails function on @change -->
          </template>

          <template #row-details="row">
            <b-card>
              <b-row class="mb-2">
                <b-col sm="3" class="text-sm-right"><b>Title:</b></b-col>
                <b-col>{{ row.item.title }}</b-col>
              </b-row>

              <b-row class="mb-2">
                <b-col sm="3" class="text-sm-right"><b>Published Date:</b></b-col>
                <b-col>{{ row.item.shortExplanation }}</b-col>
              </b-row>

              <b-button size="sm" @click="row.toggleDetails">Hide Details</b-button>
              <!-- <b-button size="sm" class="m-3" @click="deleteUser(row.item.userId)">Delete <i class="fas fa-trash-alt"></i></b-button> -->
            </b-card>
          </template>
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
import {mapGetters} from 'vuex'

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
        { key:'state', label: 'STATE', sortable: true },
        { key: 'shortExplanation', label: 'SHORT_EXPLANATION', sortable: true },
        { key: 'show_details', label: 'ACTIONS' }
      ]
    }
  },
  computed: {
    rows(){
      // return this.items ? this.items.length : 0
      return this.getUsers ? this.getUsers.length : 0
    },
    rows2(){
      // return this.items ? this.items.length : 0
      return this.getProjects ? this.getProjects.length : 0
    },
    ...mapGetters({
      getUsers : 'getUsers',
      getOverlay : 'getOverlay',
      getProjects : 'getProjects',
      getOverlay2 : 'getOverlay2',
    }),
  },
  // watch: {
  //   items: (newVal) => {
  //     this.items = newVal
  //   }
  // },
  methods: {
    // deleteUser: userid => {
    //   let index = 0;
    //   let items = this.items
    //   this.items.forEach(item =>
    //     if(item.userId === userid){
    //       items.splice(index, 1)
    //     }
    //     index++
    //   )
    // }
    deleteUser(userId){
      // console.log(index)
      // console.log(row)
      // let users = store.state.users.splice(index, 1)
      // let users = store.state.users.splice(index, 1)
      // console.log(users)
      // items.splice(items.index, 1)
      // store.dispatch('deleteUser', userId)
      store.commit('SET_OVERLAY', 'true')
      store.dispatch('deleteUser', userId)
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
    }
  },
  created(){
    store.dispatch('getUsers'),
    store.commit('SET_OVERLAY', 'true'),
    store.dispatch('getProjects'),
    store.commit('SET_OVERLAY2', 'true')
  },
};
</script>
