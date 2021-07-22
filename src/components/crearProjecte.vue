<template>
    <div class="crear-projecte-container border p-5">
        <h2>1</h2>
        <createProjectPage1 v-on:sendProjectData1="updateProjectData1($event)"/>
        <hr>
        <h2>2</h2>
        <createProjectPage2/>
        <hr>
        <h2>3</h2>
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