<template>
  <div>
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

          <template #cell(change_state)="row">
            <b-form-select v-model="row.item.state" :options="options" @change="updateProject(row.item)" class="w-75"></b-form-select>
          </template>

          <template #cell(show_details)="row">
            <b-button size="sm" @click="row.toggleDetails" class="mr-2">
              {{ row.detailsShowing ? 'Hide' : 'Show'}} Details
            </b-button>
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

                <b-button size="sm" class="m-3" variant="success"  @click="updateProject(row.item)">Guardar <i class="fas fa-pencil-alt"></i></b-button>

                <b-button size="sm" variant="info" @click="editProject = false">Cerrar <i class="fas fa-trash-alt"></i></b-button>

              </b-card>
           </template>
          </b-table>
        </b-overlay>

        <b-pagination
          v-model="currentPage2"
          :total-rows="rows2"
          :per-page="perPage2"
          align="center"
        >
        </b-pagination>
  </div>
</template>

<script>
import store from '@/store'
import {mapGetters, mapMutations, mapActions} from 'vuex'

export default {
  data() {
    return {
      currentPage2: 1,
      perPage2: 10,
      sortBy2:'title',
      filter2: null,
      spinner2: null,
      fields2: [
        { key: 'title', label: 'TITLE', sortable: true},
        { key: 'shortExplanation', label: 'SHORT_EXPLANATION', sortable: true },
        { key:'state', label: 'STATE', sortable: true },
        { key:'change_state', label: 'CHANGE_STATE'},
        { key: 'show_details', label: 'ACTIONS' }
      ],
      options: [ 'accepted', 'published', 'refused', 'doing', 'finished'],
      editProject: false,
      selected: null
    }
  },
  created(){
    this.SET_OVERLAY(true)
    store.dispatch('getProjects')
  },
  computed: {
    rows2(){
      return this.getProjects ? this.getProjects.length : 0
    },
    ...mapGetters({
      getOverlay : 'getOverlay',
      getProjects : 'getProjects',
    }),
  },
  methods: {
    ...mapMutations({
      SET_TITLE : 'SET_TITLE',
      SET_SHORTEXPLANATION : 'SET_SHORTEXPLANATION',
      SET_STATE : 'SET_STATE',
      SET_OVERLAY: 'SET_OVERLAY',
    }),
    ...mapActions({
      updateProject : 'updateProject',
      deleteProject : 'deleteProject'
    }),
    updateProject(projectId, title, shortExplanation, state){
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
  },
};
</script>
