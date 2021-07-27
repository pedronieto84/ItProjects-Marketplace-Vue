<template>
  <div>
    <b-nav pills class="container">
      <b-nav-item router :to="{name:'Admin'}" exact v-if="getUser.admin" :active="getUser.admin">Admin</b-nav-item>
      <b-nav-item router :to="{name:'Projects'}" exact>Projects</b-nav-item>
      <b-nav-item router :to="{name:'CreateProject'}" exact active>CREATE PROJECT</b-nav-item>

      <!-- <b-nav-item v-if="getUser.name!==''">Hi ! {{getUser.name | upperCase}}</b-nav-item> -->  <!-- dejo para recordar Seokju -->
      <b-nav-item v-if="getUser.name==''" router :to="{name:'Login'}" exact>LOGIN</b-nav-item>
      <b-button-group v-if="getUser.name!==''">
        <b-dropdown :text="getUser.name">
          <b-dropdown-item router :to="{name:'MyAccount'}">My Page</b-dropdown-item>
          <b-dropdown-item v-if="getUser.name!==''" router :to="{name:'Projects'}">Logout</b-dropdown-item>
        </b-dropdown>
      </b-button-group>
    </b-nav>
    <hr>
  </div>
</template>

<script>
// @ is an alias to /src
import {mapGetters} from 'vuex'

export default {
  name: "Navbar",
  computed: {
    // ...mapState({
    //   isAdmin: 'isAdmin'
    // }), <!-- dejo para recordar Seokju -->
    ...mapGetters({
      getUser: 'getUser'
    })
  },
  filters: {
    upperCase: value => {
      return value.toUpperCase();
    }
  }
};
</script>

<style scoped lang="scss">
.container{
  display: flex;
  justify-content: space-around;
  width: 100%;
}
</style>