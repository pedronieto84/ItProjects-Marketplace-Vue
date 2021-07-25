<template>
  <div class="container">

    <b-table striped bordered :items="items" :per-page="perPage" :current-page="currentPage" :fields="fields"></b-table>
    <b-pagination
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      align="center"
    >
    </b-pagination>
    <div>{{items2}}</div>
    <div>{{items2.name}} / {{items2.email}}</div>
  </div>
</template>

<script>
// @ is an alias to /src
import store from '@/store'


export default {
  name: "Admin",
  data() {
    let items = store.state.allUsers.sort((a,b) => {return b.user_id - a.user_id}) // probar sort Seokju
    return {
      currentPage: 1,
      perPage: 5,
      items: items,
      // items: store.state.allUsers, // probar Seokju
      items2: store.getters.getUser,
      // fields: ['name', 'content'] // probar Seokju
      fields: [
        {
          key: 'user_id',
          label: 'Numero'
        },
        {
          key:'name',
          label: 'Nombre'
        },
        {
          key: 'content',
          label: 'Nomobre de title'
        }
      ]
    }
  },
  computed: {
    rows(){
      return this.items.length
    }
  }
};
</script>