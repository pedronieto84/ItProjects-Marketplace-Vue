<template>
    <div>
    <b-container fluid>
        <b-row class="d-flex w-100 align-items-center">
          <b-col sm="5">
            <label>Project title</label>
          </b-col>
          <b-col sm="7">
            <b-form-group :invalid-feedback="invalidFeedbackTitle">
            <b-form-input 
            :state="stateTitle"
            placeholder="project title" 
            trim 
            class="w-100" 
            v-model="project.projectTitle"
            label-for="project.projectTitle">
            </b-form-input>
        </b-form-group>
          </b-col>
        </b-row>
        <b-form-group :invalid-feedback="invalidFeedbackDescription">
          <b-form-textarea
          v-model="project.projectDescription"
          id="textarea"
          placeholder="Project description , max 500 char"
          rows="3"
          max-rows="6"
          class="mt-5 overflow-hidden"
          :state="stateDescription"
          trim
        ></b-form-textarea>
        </b-form-group>
        <div class="d-flex justify-content-end mt-3" >
           <b-button @click="sendProjectData1" pill variant="outline-danger">Next</b-button>
        </div>
      </b-container>
    </div>
</template>
<script>
export default {
  data () {
      return {
        project : {
          projectTitle:"",
          projectDescription:"" 
        }
      }
     
  },
  methods:{
    sendProjectData1 () {
      this.$emit('sendProjectData1', this.project);
    }
  },
  computed:{
     stateTitle () {
      return this.project.projectTitle.length > 0 && this.project.projectTitle.length <= 150;
    },
    stateDescription() {
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
