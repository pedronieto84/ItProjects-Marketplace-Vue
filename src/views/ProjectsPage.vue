<template>
  <b-container>

    <b-row align-v="center">
      <b-col v-for="user in users" :key="user.id">
        <b-card
          title="Proyect"
          style="max-width: 20rem;"
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
</template>

<script>
// @ is an alias to /src
export default {
  name: "Projects",
  components: {
  },
  data(){
    return{
      users:[
        {
          user_id: 1,
          name: 'alberto'
        },
        {
          user_id: 2,
          name: 'david'
        },
        {
          user_id: 3,
          name: 'alvaro'
        },
        {
          user_id: 4,
          name: 'keita'
        },
        {
          user_id: 5,
          name: 'kar'
        },
        {
          user_id: 6,
          name: 'ben'
        },
        {
          user_id: 7,
          name: 'leon'
        },
        {
          user_id: 8,
          name: 'oriol'
        }
      ]
    }
  }
};
</script>
