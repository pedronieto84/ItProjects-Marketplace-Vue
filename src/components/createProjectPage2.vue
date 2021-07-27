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
                id="priceId"
                type="number" 
                placeholder="Bid In Euros" 
                v-model="projectPrice"
                :state="statePrice"
                @click="entrada($event)"></b-form-input>
                </b-form-group>
            </b-col>
            </b-row>
        </div>
        <div class="add-technology m-5">
              <b-row class="my-1">
      

      <!--*** TECHNOLOGY NEEDED-->
      <b-col sm="12">
         <b-form-group label-for="tags-component-select">
      <!-- Prop `add-on-change` is needed to enable adding tags vie the `change` event -->
      <b-form-tags
        id="tags-component-select"
        v-model="value"
        size="lg"
        class="mb-2"
        add-on-change
        no-outer-focus
      >
        <template v-slot="{ tags, inputAttrs, inputHandlers, disabled, removeTag }">
           <b-form-select
            v-bind="inputAttrs"
            v-on="inputHandlers"
            :disabled="disabled || technologies.length === 0"
            :options="technologies"
          >
            <template #first>
              <!-- This is required to prevent bugs with Safari -->
              <option disabled value="">Choose a technology...</option>
            </template>
          </b-form-select>
          <ul v-if="tags.length > 0" class="list-inline d-inline-block mb-2">
            <li v-for="tag in tags" :key="tag" class="list-inline-item">
              <b-form-tag
                @remove="removeTag(tag)"
                :title="tag"
                :disabled="disabled"
                variant="info"
              >{{ tag }}</b-form-tag>
            </li>
          </ul>
        
        </template>
      </b-form-tags>
    </b-form-group>
      </b-col>

    </b-row>

        </div>

        <div class="navigation">
            <div class="d-flex justify-content-between mt-3" >
                <b-button pill variant="outline-danger" class="mb-5">Back</b-button>
          <b-button pill variant="outline-danger" class="mb-5">Next</b-button>
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
       /*  pickedTechnologies:[], */
        projectPrice:0,
        value:"",
        min: minDate,
        max: maxDate,
        projectPriceId:true,
        projectTechnologyId:true
        
      }
     
  },
  computed:{
    stateTechnology() {
      if (this.projectTechnologyId) {
        return null;
      }
      return this.technologyNeeded.length > 0 && this.technologyNeeded.length <= 35;
    },
    statePrice() {
      if (this.projectPriceId) {
        return null;
      }
      return this.projectPrice > 0 && this.projectPrice <= 5000;
    },
    filteredTechnologies() {
      const matches = this.technologies.filter((matchy) => matchy.includes(this.technologyNeeded))
      return matches;
    }
  },
  methods:{
      deleteTechnology(e) {
            let techToDelete = e.target.previousSibling.textContent;
            let deleteThis = this.technologies.indexOf(techToDelete);
            this.technologies.splice(deleteThis,1);
      },
         entrada(event) {
       switch (event.target.id) {
          case "priceId":
          this.projectPriceId = false;
          break;
           case "projectTechnologyId":
          this.projectTechnologyId = false;
          break;
      }
    }
  },
   mounted () {
    axios
      .get('https://us-central1-asamblea-27a8d.cloudfunctions.net/getTechSet')
      .then(response => this.technologies = response.data );
  }
}
</script>