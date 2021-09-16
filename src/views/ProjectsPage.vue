<template>
  <div>
    <b-container style="display:flex; justify-content: flex-start; font-size: 2rem; color: red; margin-bottom: 1rem">
      Total project : {{getProjects.length}}
    </b-container>
    <b-container>
      <b-row align-v="center" >
        <b-col v-for="project in getProjects" :key="project.id">
          <b-card
            title="Proyect"
            style="max-width: 20rem; height: 15rem;"
            class="mb-2"
          >
            <b-card-text>
              {{ project.title }}
              {{ project.projectId }}
            </b-card-text>

            <b-button
            router :to="{
              name:'ProjectDetail',
              params: {
                id: project.projectId
              }
            }" variant="primary">Detail</b-button>
          </b-card>
        </b-col>
      </b-row>
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
      getProjects: 'getProjects',
    })
  },
  created(){
    store.dispatch('getProjects'),
    store.commit('SET_OVERLAY2', 'true')
  },
};
</script>

<style lang="scss" scoped>
</style>