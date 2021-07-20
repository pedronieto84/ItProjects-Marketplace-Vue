<template>
    <b-container>
  <b-row align-v="center w-100">
    <crearProjecte/>
  </b-row>
</b-container>

</template>

<script>
// @ is an alias to /src
import crearProjecte from '../components/crearProjecte.vue'
export default {
  name: "CreateProject",
  components: {
    crearProjecte
  },
};
</script>