<template>
    <div class="crear-projecte-container border p-5">
        <createProjectPage1/>
        <hr>
        <createProjectPage2/>
    </div>
</template>

<script>
import createProjectPage1 from '../components/createProjectPage1.vue'
import createProjectPage2 from '../components/createProjectPage2.vue'
export default {
   components: {
       createProjectPage1,
       createProjectPage2

   }
}
</script>