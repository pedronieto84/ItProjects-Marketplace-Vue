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
      items: store.state.users,
      fields: [
        { key: 'name', label: 'NOMBRE', sortable: true},
        { key:'email', label: 'EMAIL', sortable: true },
        { key: 'userId', label: 'USER_UD', sortable: true }
      ]
    }
  },
  computed: {
    rows(){
      return this.items.length
    }
  },
  created(){
    store.getters.getUsers()
  },
};
/*
<b-col lg="6" class="my-1">
        <b-form-group
          label="Filter"
          label-for="filter-input"
          label-cols-sm="3"
          label-align-sm="right"
          label-size="sm"
          class="mb-0"
        >
          <b-input-group size="sm">
            <b-form-input
              id="filter-input"
              v-model="filter"
              type="search"
              placeholder="Type to Search"
            ></b-form-input>

            <b-input-group-append>
              <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>

      <b-table
      :items="items"
      :fields="fields"
      :current-page="currentPage"
      :per-page="perPage"
      :filter="filter"
      :filter-included-fields="filterOn"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      :sort-direction="sortDirection"
      stacked="md"
      show-empty
      small
      @filtered="onFiltered"
    >
    */
</script>
