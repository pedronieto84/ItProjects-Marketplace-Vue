<template>
     <b-container fluid>
         <div class="d-flex align-items-center justify-content-center">
            <!--published-->
            <b-row class="m-1">
              <b-col sm="12">
                  <label>Published: </label>
              </b-col>
            <b-col>
                <b-form-datepicker v-model="project2.publishedDate" :min="min" :max="max" locale="en"></b-form-datepicker>
            </b-col>
          </b-row>
            <!--deadliasdfasdfasdfne-->
            <b-row class="m-1">
            <b-col sm="12">
                <label>Deadline: </label>
            </b-col>
            <b-col>
                <b-form-datepicker v-model="project2.deadline" locale="en"></b-form-datepicker>
            </b-col>
            </b-row>
            <!--price-->
            
              <b-col sm="3 mt-5">
                <b-form-group :invalid-feedback="invalidFeedbackPrice">
                  <b-form-input 
                    id="priceId"
                    type="text" 
                    placeholder="Bid In Euros" 
                    v-model="project2.projectPrice"
                    :state="statePrice"
                    @click="entrada($event)">
                  </b-form-input>
                </b-form-group>
              </b-col>
            
        </div>
        <div class="add-technology m-5">
              <b-row class="my-1">
      <!--*** TECHNOLOGY NEEDED-->
      <b-col sm="4"><p>Add technology needed</p></b-col>
      <b-col sm="8">
         <b-form-group label-for="tags-component-select">
      <!-- Prop `add-on-change` is needed to enable adding tags vie the `change` event -->
      <b-form-tags
        id="tags-component-select"
        v-model="project2.value"
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
                <b-button pill variant="outline-danger" class="mb-5" @click="$emit('go-back')">Back</b-button>
          <b-button pill variant="outline-danger" class="mb-5" @click="sendProjectData2" >Next</b-button>
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
        project2:{
          techSet:"",
          projectPrice:"",
          publishedDate:"",
          deadline:"",
          value:""
        },
        
        technologies:[],
        projectPriceId:true,
        projectTechnologyId:true,
        min: minDate,
        max: maxDate,
      }
     
  },
  computed:{
    stateTechnology() {
      if (this.project2.projectTechnologyId) {
        return null;
      }
      return this.project2.techSet.length > 0 && this.project2.techSet.length <= 35;
    },
    statePrice() {
      if (this.projectPriceId) {
        return null;
      }
      //return this.project2.projectPrice > 0 && this.project2.projectPrice <= 5000;
      if(this.project2.projectPrice>0 && this.project2.projectPrice <= 5000) {
        return true;
      } else {
        return false;
      }
    },
    filteredTechnologies() {
      const matches = this.technologies.filter((matchy) => matchy.includes(this.project2.techSet))
      return matches;
    }
  },
  methods:{
         entrada(event) {
       switch (event.target.id) {
          case "priceId":
          this.projectPriceId = false;
          break;
           case "projectTechnologyId":
          this.projectTechnologyId = false;
          break;
      }
    },
    sendProjectData2 () {
      this.$emit('sendProjectData2', this.project2);
    }
  },
   mounted () {
    axios
      .get('https://us-central1-asamblea-27a8d.cloudfunctions.net/getTechSet')
      .then(response => this.technologies = response.data );
  }
}
</script>