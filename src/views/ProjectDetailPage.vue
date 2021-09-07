<template>

    <b-container>
      <b-row align-v="center">
        <projectDetail/>
      </b-row>
    </b-container>

</template>

<script>
// @ is an alias to /src
import projectDetail from '../components/projectDetail.vue'
export default {
  name: "ProjectDetail",
  components: {
    projectDetail
  },
};
</script>