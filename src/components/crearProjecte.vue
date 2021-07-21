<template>
    <div class="crear-projecte-container border p-5">
        <createProjectPage1 v-on:sendProjectData1="updateProjectData1($event)"/>
        <hr>
        <createProjectPage2/>
    </div>
</template>

<script>
import createProjectPage1 from '../components/createProjectPage1.vue'
import createProjectPage2 from '../components/createProjectPage2.vue'
export default {
    data(){
        return {
            project:{}
        }
    },
   components: {
       createProjectPage1,
       createProjectPage2

   },
   methods:{
       updateProjectData1(project){
           console.log(project);
            this.project=project;
       }
   }
}
</script>