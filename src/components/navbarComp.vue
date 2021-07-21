<template>
  <div>
    <b-nav pills class="container">
      <b-nav-item active>Admin</b-nav-item>
      <b-nav-item>Projects</b-nav-item>
      <b-nav-item active>CREATE PROJECT</b-nav-item>
      <!-- <b-nav-item-dropdown>CREATE PROJECT</b-nav-item> -->
      <b-nav-item disabled>My Name</b-nav-item>
      <!-- <b-form-input>{{name}}</b-form-input> -->
    </b-nav>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Navbar",
  components: {
  },
  props:{
    user: Object
  }
};
</script>

<style lang="scss">
.container{
  display: flex;
  justify-content: space-around;
  width: 1000%;
}
</style>