<template>
    <div>

<b-container fluid>
    <b-row class="m-5">
      <b-col sm="4">
        <label :for="name">Project title</label>
      </b-col>
      <b-col sm="8">
        <b-form-input></b-form-input>
      </b-col>
    </b-row>
      <b-form-textarea
      id="textarea"
      v-model="text"
      placeholder="Project description , 500 char"
      rows="3"
      max-rows="6"
    ></b-form-textarea>
    <div class="next-icon">
      <b-icon-arrow-up></b-icon-arrow-up>
    </div>
  </b-container>

    </div>
</template>
<style scoped>

</style>