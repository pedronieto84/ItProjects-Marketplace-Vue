<template>
  <div class="container">
    <h1>This is an administrator page</h1>
    <b-table striped bordered :items="items" :fields="fields"></b-table>
    <div>{{items2}}</div>
    <div>{{items2.name}} / {{items2.email}}</div>
  </div>
</template>

<script>
// @ is an alias to /src
import store from '@/store'

let items = store.state.allUsers.sort((a,b) => {return b.user_id - a.user_id}) // probar sort Seokju
export default {
  name: "Admin",
  data() {
    return {
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
};
</script>