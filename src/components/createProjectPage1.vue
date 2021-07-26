<template>
    <div>
    <b-container fluid>
        <b-row class="d-flex w-100 align-items-center">
          <b-col sm="5">
            <label>Project title</label>
          </b-col>
          <b-col sm="7">
            <b-form-group 
            :invalid-feedback="invalidFeedbackTitle" 
            class="text-left">
            <b-form-input 
            id="projectTitleId"
            :state="stateTitle"
            placeholder="project title" 
            trim 
            class="w-100" 
            v-model="project.projectTitle"
            label-for="project.projectTitle"
            @keydown="entrada($event)">
            </b-form-input>
        </b-form-group>
          </b-col>
        </b-row>
        <b-form-group 
        :invalid-feedback="invalidFeedbackDescription" 
        class="text-left">
          <b-form-textarea
          v-model="project.projectDescription"
          id="projectDescriptionId"
          placeholder="Project description , max 500 char"
          rows="3"
          max-rows="6"
          class="mt-5 overflow-hidden"
          :state="stateDescription"
          trim
          @keydown="entrada($event)"
        ></b-form-textarea>
        </b-form-group>
        <div class="d-flex justify-content-end mt-3" >
           <b-button @click="sendProjectData1" pill variant="outline-danger" class="mb-5">Next</b-button>
        </div>
      </b-container>
    </div>
</template>
<script>
export default {
  data () {
      return {
        project : {
          projectTitle: "",
          projectDescription: "",
          
        },
        projectTitle: true,
        projectDescription:true
      }
     
  },
  methods:{
    sendProjectData1 () {
      this.$emit('sendProjectData1', this.project);
    },
    entrada(event) {
       switch (event.target.id) {
        case "projectTitleId":
          this.projectTitle = false;
          break;
        case "projectDescriptionId":
          this.projectDescription = false;
          break;
      }
    }
  },
  computed:{
     stateTitle () {
       if (this.projectTitle) {
         return null;
       }
      return this.project.projectTitle.length > 0 && this.project.projectTitle.length <= 150;
    },
    stateDescription() {
      if (this.projectDescription) {
        return null;
      }
      return this.project.projectDescription.length > 0 && this.project.projectDescription.length <= 500;
    },
    //ivalid feedback
     invalidFeedbackTitle() {
      if (this.project.projectTitle.length == 0) {
        return "Add some title...";
      } else if (this.project.projectTitle.length > 35) {
        return "the title shouldn't be longer than 35 letters";
      }
      return "";
    },
     invalidFeedbackDescription() {
      if (this.project.projectDescription.length == 0) {
        return "Add some description...";
      } else if (this.project.projectDescription.length > 35) {
        return "the description shouldn't be longer than 500 letters";
      }
      return "";
    }

  }
}
</script>
