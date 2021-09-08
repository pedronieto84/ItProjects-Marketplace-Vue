<template>
    <div>
    <b-container fluid>
        <b-row class="d-flex align-items-center justify-content-center">
          <b-col sm="5">
            <h4>Project title</h4>
          </b-col>
          <b-col sm="7">
            <b-form-group 
            :invalid-feedback="invalidFeedbackTitle" 
            class="text-left">
            <b-form-input 
            id="projectTitleId"
            :state="stateTitle"
            placeholder="Insert your project title" 
            trim 
            class="w-100" 
            v-model="project.title"
            label-for="project.title"
            @keydown="entrada($event)">
            </b-form-input>
        </b-form-group>
        </b-col>
      </b-row>
        <b-form-group 
        :invalid-feedback="invalidFeedbackDescription" 
        class="text-left">
          <b-form-textarea
          v-model="project.shortExplanation"
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
           <b-button @click="sendProjectData1" pill variant="outline-primary" class="mb-5">Next</b-button>
        </div>
      </b-container>
    </div>
</template>
<script>
export default {
  data () {
      return {
        project : {
          title: "",
          shortExplanation: "",
          ownerId: ""          
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
      return this.project.title.length > 0 && this.project.title.length <= 150;
    },
    stateDescription() {
      if (this.projectDescription) {
        return null;
      }
      return this.project.shortExplanation.length > 0 && this.project.shortExplanation.length <= 500;
    },
    //ivalid feedback
     invalidFeedbackTitle() {
      if (this.project.title.length == 0) {
        return "Add some title...";
      } else if (this.project.title.length > 35) {
        return "the title shouldn't be longer than 35 letters";
      }
      return "";
    },
     invalidFeedbackDescription() {
      if (this.project.shortExplanation.length == 0) {
        return "Add some description...";
      } else if (this.project.shortExplanation.length > 500) {
        return "the description shouldn't be longer than 500 letters";
      }
      return "";
    }

  }
}
</script>
