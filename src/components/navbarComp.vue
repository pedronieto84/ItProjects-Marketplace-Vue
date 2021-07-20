<template>
  <div>
    <b-nav pills class="container">
      <b-nav-item active>Admin</b-nav-item>
      <b-nav-item>Projects</b-nav-item>
      <b-nav-item-dropdown>CREATE PROJECT</b-nav-item>
      <b-nav-item disabled>My Name</b-nav-item>
    </b-nav>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Navbar",
  components: {
  },
};
</script>

<style lang="scss">
.container{
  display: flex;
  justify-content: space-around;
}
</style>