<template>
     <b-container fluid>
         <div class="d-flex align-items-center justify-content-center">
            <!--published-->
            <b-row class="m-1">
              <b-col sm="12">
                  <label>Published: </label>
                  {{date}}
              </b-col>
            <b-col>
                <b-form-datepicker v-model="value" :min="min" :max="max" locale="en"></b-form-datepicker>
            </b-col>
          </b-row>
            <!--deadline-->
            <b-row class="m-1">
            <b-col sm="12">
                <label>Deadline: </label>
            </b-col>
            <b-col>
                <b-form-datepicker v-model="publishData" :min="min" :max="max" locale="en"></b-form-datepicker>
            </b-col>
            </b-row>
            <!--price-->
            <b-row class="mt-4">
            <b-col>
          <b-form-group :invalid-feedback="invalidFeedbackPrice">
                <b-form-input 
                type="number" 
                placeholder="Bid In Euros" 
                v-model="projectPrice"
                :state="statePrice"></b-form-input>
                </b-form-group>
            </b-col>
            </b-row>
        </div>
        <div class="add-technology m-5">
              <b-row class="my-1">
      <b-col sm="6" class="">
        <label>Add technology needed / desired </label>
      </b-col>
      <b-col sm="5">
        <b-form-input 
        type="text" 
        placeholder="technology"
        :state="stateTechnology"
        trim
        v-model="technologyNeeded"></b-form-input>
      </b-col>
      <b-col sm="1">
        <b-button pill variant="info" @click="addTechnology">+</b-button>
      </b-col>
    </b-row>
        </div>
        <div class="tech-set border d-flex flex-wrap p-3 m-2">
            <div class="technology d-flex align-items-center m-2 p-1 bg-danger rounded" v-for="technology in technologies" :key="technology">
                <p class="pr-3">{{technology}}</p>
            <b-button pill variant="info" @click="deleteTechnology">-</b-button>
            </div>
         
            
        </div>
        <div class="navigation">
            <div class="d-flex justify-content-between mt-3" >
                <b-button pill variant="outline-danger">Back</b-button>
          <b-button pill variant="outline-danger">Next</b-button>
        </div>
        </div>
  </b-container>
</template>
<script>
import axios from 'axios';
export default {
  data () {
      const now = new Date()
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
      // min date today
      const minDate = new Date(today)
      //max date in 6 months
      const maxDate = new Date(today)
      maxDate.setMonth(maxDate.getMonth() + 6)
      return {
        technologyNeeded:"",
        technologies:[],
        projectPrice:0,
        value:"",
        min: minDate,
        max: maxDate
      }
     
  },
  computed:{
    stateTechnology() {
      return this.technologyNeeded.length > 0 && this.technologyNeeded.length <= 35;
    },
    statePrice() {
      return this.projectPrice > 0 && this.projectPrice <= 5000;
    }
  },
  methods:{
      addTechnology () {
          if(this.technologyNeeded.length>0){
            this.technologies.push(this.technologyNeeded);
            this.technologyNeeded="";
          }
      },
      deleteTechnology(e) {
            let techToDelete = e.target.previousSibling.textContent;
            let deleteThis = this.technologies.indexOf(techToDelete);
            this.technologies.splice(deleteThis,1);
      } 
  },
   mounted () {
    axios
      .get('https://us-central1-asamblea-27a8d.cloudfunctions.net/getTechSet')
      .then(response => this.technologies = response.data );
  }
}
</script>