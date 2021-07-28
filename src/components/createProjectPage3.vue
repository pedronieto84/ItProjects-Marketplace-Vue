<template>
<b-container fluid>
  <div>
    <h4 class="text-left mb-2 mt-5">Drag and drop files (pdf, png, jpg)</h4>
    <b-form-file
      v-model="file1"
      :state="Boolean(file1)"
      placeholder="Drag and drop files here..."
      class="pt-5 pb-5 mt-5 h-50 text-left"
    ></b-form-file>
    
   <div>
      <h4 class="text-left mb-5">Published files:</h4>
      <p>File name: </p></div>
    
     <div class="d-flex align-items-center justify-content-end">
    <b-button variant="info">publish</b-button>
    </div>
    <div class="d-flex justify-content-start mt-3" >
           <b-button pill variant="outline-danger" class="mb-5" @click="$emit('go-back')">Back</b-button>
        </div>
    
  </div>
  </b-container>
</template>

<script>
  export default {
    data() {
      return {
        file1: null,
        file2: null
      }
    }
  }
</script>