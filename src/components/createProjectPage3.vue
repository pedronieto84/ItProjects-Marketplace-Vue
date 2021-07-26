<template>
  <div>
    <h4 class="text-left mb-2 mt-5">Drag and drop files (pdf, png, jpg)</h4>
    <b-form-file
      v-model="file1"
      :state="Boolean(file1)"
      placeholder="Choose a file or drop it here..."
      drop-placeholder="Drop file here..."
      class="pt-5 pb-5 mt-5 h-50 text-left"
    ></b-form-file>
    
    <div class="d-flex align-items-center justify-content-end">
    <b-button variant="info">publish</b-button>
    </div>
    <p class="text-left">Published files:<span>{{file1}}</span></p>
    
  </div>
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