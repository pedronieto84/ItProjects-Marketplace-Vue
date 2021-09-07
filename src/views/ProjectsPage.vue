<template>
  <div>
    <b-container>
      <b-row align-v="center">
        <b-col v-for="user in allUsers" :key="user.id">
          <b-card
            title="Proyect"
            style="max-width: 10rem;"
            class="mb-2"
          >
            <b-card-text>
              {{ user.user_id }} || {{ user.name }}
            </b-card-text>

            <b-button href="#" variant="primary">Detail</b-button>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
    <hr>
    <b-container>
      Total Proejct : {{allUsersCount}}
    </b-container>
  </div>
</template>

<script>
// @ is an alias to /src
import store from '@/store'
import {mapGetters} from 'vuex'

export default {
  name: "Projects",
  data() {
    return {
      items: store.getters.getProjects,
    }
  },
  computed: {
    ...mapGetters({
      allUsers: 'allUsers',
      allUsersCount: 'allUsersCount'
    })
  },
  // created(){
  //   store.dispatch('getProjects')
  // },
};
</script>
