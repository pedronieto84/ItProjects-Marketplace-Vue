<template>
    <div class="crear-projecte-container">
        <createProjectPage1/>
    </div>
</template>
<style scoped>
.crear-projecte-container {
    border: 1px solid black;
    padding: 2rem;
    margin: 0 auto;
}
</style>
<script>
import createProjectPage1 from '../components/createProjectPage1.vue'
export default {
   components: {
       createProjectPage1
   }
}
</script>