<template>
    <div class="w-75 m-auto">
        <div class="btn-toolbar">
            <b-button variant="primary" class="border-upper-radius" @click="pageCounter=1">1</b-button>
            <b-button :disabled="disableBtn2" variant="primary" class="border-upper-radius"  @click="pageCounter=2">2</b-button>
            <b-button :disabled="disableBtn3" variant="primary" class="border-upper-radius" @click="pageCounter=3">3</b-button>
        </div>
        <div class="crear-projecte-container border p-5">
            <createProjectPage1 v-on:sendProjectData1="updateProjectData1($event)" v-show="pageCounter===1"/>
            <createProjectPage2 v-on:sendProjectData2="updateProjectData2($event)" v-show="pageCounter===2" v-on:go-back="goBack2"/>
            <createProjectPage3 v-show="pageCounter===3" v-on:go-back="goBack3"/>
        </div>
    </div>
</template>

<script>
import createProjectPage1 from '../components/createProjectPage1.vue'
import createProjectPage2 from '../components/createProjectPage2.vue'
import createProjectPage3 from '../components/createProjectPage3.vue'
export default {
    data(){
        return {
            project:{},
            pageCounter:1
        }
    },
   components: {
       createProjectPage1,
       createProjectPage2,
       createProjectPage3

   },
   methods:{
       updateProjectData1(project){ 
            this.project=project;
            this.pageCounter=2
       },
        updateProjectData2(project2){
            this.project={...this.project, ...project2}
            this.pageCounter=3
       },
       goBack2(){
           this.pageCounter=1
       },
       goBack3(){
           this.pageCounter=2
       }
   },
   computed:{
       disableBtn2(){
           return this.pageCounter === 1
       },
       disableBtn3(){
           return this.pageCounter != 3
       }
   }
}
</script>

<style>
.border-upper-radius {
    border-top-right-radius: 20px;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  } 
</style>
