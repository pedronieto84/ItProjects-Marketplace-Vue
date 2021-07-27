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

    <b-table striped bordered :items="items" :per-page="perPage" :current-page="currentPage" :fields="fields" :sort-by.sync="sortBy" :filter="filter"
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

    <b-pagination
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      align="center"
    >
    </b-pagination>
  </div>
</template>

<script>
// @ is an alias to /src
import store from '@/store'

export default {
  name: "Admin",
  data() {
    // let items = store.state.allUsers.sort((a,b) => {return b.user_id - a.user_id}) // probar sort Seokju
    return {
      currentPage: 1,
      perPage: 10,
      sortBy:'name',
      filter: null,
      // items: store.state.allUsers, // probar Seokju
      // fields: ['name', 'content'] // probar Seokju
      items: store.getters.getUsers,
      fields: [
        { key: 'name', label: 'NOMBRE', sortable: true},
        { key:'email', label: 'EMAIL', sortable: true },
        { key: 'userId', label: 'USER_UD', sortable: true },
        { key: 'show_details', label: 'ACTIONS' }
      ]
    }
  },
  computed: {
    rows(){
      return this.items ? this.items.length : 0
    }
  },
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
    deleteUser(userid){
      // console.log(index)
      // console.log(row)
      // let users = store.state.users.splice(index, 1)
      // let users = store.state.users.splice(index, 1)
      // console.log(users)
      // items.splice(items.index, 1)
      console.log(userid)
      const idx = this.items.findIndex(item => item.userId === userid)
      this.items.splice(idx, 1)
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
    store.dispatch('actionUsers')
  },
};
</script>
