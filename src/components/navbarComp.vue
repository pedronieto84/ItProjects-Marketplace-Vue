<template>
  <div>
    <b-nav pills class="container">
      <b-nav-item router :to="{name:'Admin'}" exact :active="isAdmin">Admin</b-nav-item>
      <b-nav-item router :to="{name:'Projects'}" exact>Projects</b-nav-item>
      <b-nav-item router :to="{name:'CreateProject'}" exact active>CREATE PROJECT</b-nav-item>
      <!-- <b-nav-item-dropdown>CREATE PROJECT</b-nav-item> -->
      <b-nav-item router :to="{name:'MyAccount'}" exact>My Name</b-nav-item>
      <!-- <b-form-input>{{name}}</b-form-input> -->
    </b-nav>
    <hr>
  </div>
</template>

<script>
// @ is an alias to /src
import {mapState} from 'vuex'

export default {
  name: "Navbar",
  computed: {
    ...mapState({
      isAdmin: 'isAdmin'
    })
  }
};
</script>

<style lang="scss">
.container{
  display: flex;
  justify-content: space-around;
  width: 100%;
}
</style>