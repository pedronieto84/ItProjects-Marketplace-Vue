<template>
<b-container fluid>
  <div>
    <h4 class="text-left mb-2 mt-5">Drag and drop files (pdf, png, jpg)</h4>
    <UploadImages
    uploadMsg="upload product images" 
    @changed="handleImages"/>
     
   <div>
      <h4 class="text-left my-5">Published files:</h4>
      <p>File name: </p></div>
      <div v-for="(file, index) in project3.filesArray" :key="file.id" 
      class="d-flex col-12 justify-content-between align-items-center">
        {{file.name}} <loadingUploading class="col-8"/>
      <b-button pill variant="primary" @click="deleteDoc(index)">X</b-button>
    </div>
      
    
    <div class="d-flex align-items-center justify-content-between">
      <b-button pill variant="outline-danger" @click="$emit('go-back')">Back</b-button>
      <b-button variant="info" :disabled="disabledBtn" @click="sendProjectData3">PUBLISH</b-button>
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
          // Files is an array with all the uploaded documents, also with the deleted files with deleteDoc()
          // console.log(files)
          if(this.project3.filesArray.name != files[files.length-1].name){
          this.project3.filesArray.push(files[files.length-1])
          }
        },
        sendProjectData3 () {
          this.$emit('sendProjectData3', this.project3);
        },
        deleteDoc(index){  
          this.project3.filesArray.splice(index, 1);          
        }
    },
  computed:{
    disabledBtn(){
      return this.project3.filesArray.length === 0
    }
  }
    
  }
</script>