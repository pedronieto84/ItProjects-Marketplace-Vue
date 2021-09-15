<template>
<b-container fluid>
  <div>
    <h4 class="text-left mb-2 mt-5">Drag and drop files (pdf, png, jpg)</h4>
    <UploadImages
    :max="5"
    maxError="Max files exceed"
    uploadMsg="upload product images" 
    @changed="handleImages"/>
     
   <div>
      <h4 class="text-left my-5">Published files:</h4>
      <p>File name: </p></div>
      <div v-for="(file, index) in project3.filesArray" :key="file.id" 
      class="d-flex col-12 justify-content-between align-items-center">
        {{file.name}} <loadingUploading class="col-8"/>
      <!-- <b-button pill variant="primary" @click="proof(index)">X</b-button> -->
      <b-button pill variant="primary" @click="delteDoc(index)">X</b-button>
      </div>
      
    
     <div class="d-flex align-items-center justify-content-end">
    <b-button variant="info" @click="sendProjectData3">PUBLISH</b-button>
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
                      // console.log(files)
            // const arrayFilteringFiles = files.filter((item)=>{
            //   const fileName = item.name;
            //   const wordsArray = fileName.split('.');
            //   const fileType = wordsArray[wordsArray.length-1]
            //   const lowerCasedFileType = fileType.toLowerCase();
            //   if( (lowerCasedFileType === 'jpg' ) || lowerCasedFileType === 'pdf' || lowerCasedFileType === 'png'){
            //     return true
            //   }else {
            //     return false
            //   }
            // })
            // console.log('AFFAY FILTRADO', arrayFilteringFiles)
            if(this.project3.filesArray.name != files[files.length-1].name){
            this.project3.filesArray.push(files[files.length-1])
            }
        },
        sendProjectData3 () {
          this.$emit('sendProjectData3', this.project3);
        },
        delteDoc(index){  
          this.project3.filesArray.splice(index, 1);          
        }
    }
    
  }
</script>