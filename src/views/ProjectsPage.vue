<template>
<div>
  <b-container>
    <b-row align-v="center">
      <b-col v-for="user in $store.getters.allUsers" :key="user.id">
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
  <hr>
  <b-container>
    Total Proejct : {{$store.getters.allUsersCount}}
  </b-container>
</div>

</template>

<script>
// @ is an alias to /src
export default {
  name: "Projects",
  components: {
  },
};
</script>
