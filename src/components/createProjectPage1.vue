<template>
    <div>
    <b-container fluid>
        <b-row class="d-flex w-100 align-items-center">
          <b-col sm="6">
            <label :for="name">Project title</label>
          </b-col>
          <b-col sm="6">
            <b-form-input class="w-100"></b-form-input>
          </b-col>
        </b-row>
          <b-form-textarea
          id="textarea"
          v-model="text"
          placeholder="Project description , 500 char"
          rows="3"
          max-rows="6"
          class="mt-5"
        ></b-form-textarea>
        <div class="d-flex justify-content-end mt-3" >
           <b-button pill variant="outline-danger">Next</b-button>
        </div>
      </b-container>
    </div>
</template>
