<template>
<b-container fluid>
  <div>
    <h4 class="text-left mb-2 mt-5">Drag and drop files (pdf, png, jpg)</h4>
    <UploadImages
    :max="5"
    maxError="Max files exceed"
    uploadMsg="upload product images" 
    @changed="handleImages"/>
    <!-- <b-form-file
      v-model="file1"
      :state="Boolean(file1)"
      placeholder="Drag and drop files here..."
      class="pt-5 pb-5 mt-5 h-50 text-left"
    ></b-form-file> -->
    
   <div>
      <h4 class="text-left mb-5">Published files:</h4>
      <p>File name: </p></div>
      <div v-for="file in project3.filesArray" :key="file.id" class="d-flex col-12">
        {{file.name}} <loadingUploading class="col-10"/>
        </div>
      
    
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
import UploadImages from "vue-upload-drop-images"
import loadingUploading from "./loadingUploading.vue"
  export default {
    data() {  
      return {
        project3:{
          filesArray: []
        }
      }
    },
    components: {
        UploadImages,
        loadingUploading
    },
    methods:{
            handleImages(files){
                console.log(files)
                this.project3.filesArray=[...files]
            }
        }
    
  }
</script>