<template>
    <div class="w-75 m-auto">
        <div class="btn-toolbar">
            <b-button variant="primary" class="border-upper-radius" @click="pageCounter=1">1</b-button>
            <b-button :disabled="disableBtn2" variant="primary" class="border-upper-radius"  @click="pageCounter=2">2</b-button>
            <b-button :disabled="disableBtn3" variant="primary" class="border-upper-radius" :project="project" @click="pageCounter=3">3</b-button>
        </div>
        <div class="crear-projecte-container border p-5">
            <createProjectPage1 v-on:sendProjectData1="updateProjectData1($event)" v-show="pageCounter===1"/>
            <createProjectPage2 v-on:sendProjectData2="updateProjectData2($event)" v-show="pageCounter===2" v-on:go-back="goBack2"/>
            <createProjectPage3 :project="project" v-on:sendProjectData3="confirmProjectData($event)" v-show="pageCounter===3" v-on:go-back="goBack3"/>
        </div>
    </div>
</template>

<script>
import createProjectPage1 from '../components/createProjectPage1.vue'
import createProjectPage2 from '../components/createProjectPage2.vue'
import createProjectPage3 from '../components/createProjectPage3.vue'
import {mapGetters} from 'vuex'
import axios from "axios"
export default {
    data(){
        return {
            project:{
                projectsPublished:[]
            },
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
    //    Here there is creation of a new project
        confirmProjectData(project3){
            this.project={...this.project, ...project3};
            const aixo = this;
            const baseURL = this.$store.getters.getBaseURL;
        
            axios({
                method: "post",
                url: baseURL + "createProject",
                data: this.project,
            }).then(function (response) {
                if (response.data != undefined) {
                    aixo.$bvToast.toast("You project is created successfully", {
                    variant: "success",
                    toaster: "b-toaster-top-center",
                    solid: true,
                    title: "Èxit",
                    autoHideDelay: 3000,
                    });

                    setTimeout(() => {
                    let project = response.data;
                    aixo.$store.commit("setUser", ["projectsPublished", project]);
                    aixo.$router.push("/");

                    }, 3000);
                } else {
                    aixo.$bvToast.toast("Error, the project is not save", {
                    variant: "warning",
                    toaster: "b-toaster-top-center",
                    solid: true,
                    title: "Fallada",
                    autoHideDelay: 5000,
                    });
                }
            });
       },
       goBack2(){
           /// comentario 1
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
       },
       ...mapGetters({
        getUser: 'getUser'
       })
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
